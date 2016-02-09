'use strict';

// NPM Imports
const _ = require('lodash');
const debug = require('debug')('gulp-swagger-codegen');
const defaults = require('defaults-deep');
const fs = require('fs');
const gutil = require('gulp-util');
const hbs = require('handlebars');
const path = require('path');
const through = require('through2');
const util = require('util');
const yamljs = require('yamljs');

// Configuration Defaults
const configDefaults = {
  helpers: require('./handlebars-helpers'),
};

/**
 * Generate a new instance of the task with the specified options.
 *
 * @param taskOptions           - Task options for the plugin.
 * @returns                     - Streaming task for processing objects.
 */
function generateTask(taskOptions) {
  debug('Processing configuration');
  const config = defaults(taskOptions, configDefaults);
  debug('Initializing handlebars');
  const handlebars = hbs.create();
  for (const helper in config.helpers) {
    debug('   Registering helper: %s', helper);
    handlebars.registerHelper(helper, config.helpers[helper]);
  }

  /**
   * Load a template file with handlebars and return
   * it's compiled state.
   * @param   {object}    file        - File to load
   * @param   {string}    encoding    - Text encoding to use when reading file
   * @param   {number}    debugIndent - Spaces to indent debug with
   * @returns {object}                - Compiled template
   */
  function loadTemplate(file, encoding, debugIndent) {
    debug('%sLoading text file template from %s', Array(debugIndent + 1).join(' '), path);
    const fileContent = fs.readFileSync(file, encoding);

    debug('%sParsing with handlebars', Array(debugIndent + 5).join(' '));
    const template = handlebars.compile(fileContent);

    debug('%sCompiled succesfully.', Array(debugIndent + 5).join(' '));
    return template;
  }

  /**
   * Process the code-generation activities for a single Swagger file.
   * @param   {object}    file        - File being processed from input stream.
   * @param   {string}    encoding    - Text encoding to use when reading file
   * @param   {Function}  callback    - File encoding callback
   * @returns {object}                - Overall result (dummy/not used by gulp upstream).
   */
  function processStreamItem(file, encoding, callback) {
    // Validate arguments
    /* istanbul ignore if */
    if (file === null) {
      this.push(file);
      return callback();
    }

    debug('Processing file: %s', file.path);
    const fileContent = file.contents.toString(encoding);

    debug('    Parsing file text as YAML');
    const model = yamljs.parse(fileContent);

    // Load definitions
    const definitionMap = [];
    if (model.definitions) {
      debug('    Parsing %s definitions', Object.keys(model.definitions).length);
      for (const definitionName in model.definitions) {
        debug('        Reading definition for %s', definitionName);
        const definitionKey = util.format('#/definitions/%s', definitionName);
        const currentDef = model.definitions[definitionName];
        currentDef.definitionName = definitionName;
        currentDef.referencePath = definitionKey;
        definitionMap[definitionKey] = currentDef;
      }
    }

    // Execute definition templates
    if (config.perDefinition) {
      debug('    Executing per-definition templates:');
      for (const templateFile in config.perDefinition) {
        debug('        Iterating template: %s', templateFile);
        const options = config.perDefinition[templateFile];
        const template = loadTemplate(templateFile, 'utf8', 12);
        for (const definitionKey in definitionMap) {
          const definition = definitionMap[definitionKey];

          debug('            Processing definition %s', definitionKey);
          // Copy fields from options into definition for
          const context = {
            model,
            definition,
            definitionMap,
            options,
          };

          debug('                   Rendering template');
          const output = template(context);
          const subPath = path.join(options.target,
            definition.definitionName.toLowerCase() +
            options.extension);
          debug('                   Pushing %s', subPath);
          this.push(new gutil.File({
            path: subPath,
            contents: new Buffer(output),
          }));
        }
      }
    } else {
      /* istanbul ignore next */
      debug('    No per-definition templates specified in perDefinition');
    }

    // Execute path templates
    if (config.perPath) {
      debug('    Executing per-definition templates:');
      for (const templateFile in config.perPath) {
        debug('        Processing template: %s', templateFile);
        const options = config.perPath[templateFile];
        const template = loadTemplate(templateFile, 'utf8', 8);
        debug('        Iterating paths, grouping operations by %s', options.groupBy);

        const groups = {};

        for (const pathString in model.paths) {
          debug('            Path: %s', pathString);
          const pathDef = model.paths[pathString];
          let groupKey = pathDef[options.groupBy];
          pathDef.pathString = path;

          // Iterate through the allowed operations
          for (const operationString of _.intersection(Object.keys(pathDef), options.operations)) {
            debug('                Operation: %s', operationString);
            const operationDef = model.paths[pathString][operationString];
            groupKey = operationDef[options.groupBy] || groupKey;
            operationDef.pathDef = pathDef;
            operationDef.operationString = operationString;

            // We need a grouping key at either operation or path level
            /* istanbul ignore if */
            if (groupKey === null || groupKey === undefined) {
              throw new Error(util.format(
                'Cannot map path operation. No groupBy match at path/operation level: %s/%s [%s]',
                pathString,
                operationString,
                options.groupBy));
            }
            debug('                     Assigned to output group: %s', groupKey);

            // If the group does not exist, create it
            if (groups[groupKey] === undefined) {
              groups[groupKey] = [];
            }

            // Add to group
            groups[groupKey].push(operationDef);
          } // per operationString
        } // per pathString

        debug('        Rendering template for %s group(s)', Object.keys(groups).length);
        for (const groupKey in groups) {
          debug('            Processing group: %s', groupKey);

          const context = {};
          context.fileName = groupKey.trim().toLowerCase();
          context.groupKey = groupKey;
          context.members = groups[groupKey];
          context.definitionMap = definitionMap;
          context.model = model;
          context.options = options;

          const output = template(context);
          const subPath = path.join(options.target,
            context.fileName + options.extension);
          debug('                   Pushing %s', subPath);
          this.push(new gutil.File({
            path: subPath,
            contents: new Buffer(output),
          }));
        }
      } // per templateFile
    } // if perPath

    // All done
    debug('Finished file: %s', file.path);
    return callback();
  }

  debug('Returning stream processor instance to pipeline');
  return through.obj(processStreamItem);
}

module.exports = generateTask;
