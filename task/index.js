'use strict';

// NPM Imports
const codegen = require('swagger-codegen');
const debug = require('debug')('gulp-swagger-codegen:gulpTask');
const defaults = require('defaults-deep');
const gutil = require('gulp-util');
const through = require('through2');
const yaml = require('yamljs');

module.exports = function taskFunction(codegenOptions) {
  return through.obj(function streamProcessor(file, encoding, callback) {
    debug('Processing gulp stream file: %s', file.path);

    // Use a gutil stream to write output
    const fileWriter = (path, content) => {
      debug('  Pushing output file: %s', path);
      this.push(new gutil.File({
        path,
        contents: new Buffer(content),
      }));
    };

    // Load the YAML file for the swagger model
    debug('Parsing swaggerfile (YAML) -> %s', file.path);
    const fileContent = file.contents.toString(encoding);
    const model = yaml.parse(fileContent);

    // Perform the code generation
    codegen(defaults(
      codegenOptions || /* istanbul ignore next */ {},
      {
        swagger: model,
        output: fileWriter,
      }
    ));
    callback();
  });
};
