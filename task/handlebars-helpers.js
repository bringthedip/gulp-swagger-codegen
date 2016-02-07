'use strict';

const _ = require('lodash');
const util = require('util');

/**
 * Does an array contain a value?
 *
 * @param {object}      array         - Array to scan
 * @param {object}      value         - Value to find
 * @param {object}      options       - Handlebars options.
 * @returns {string}                  - Result
 */
function arrayContainsItem(array, value, options) {
  if (array && _.indexOf(array, value) >= 0) {
    return options.fn(this);
  }

  return options.inverse(this);
}

/**
 * Compare two values with a predicate to determine some
 * equivelence relation.
 * @remarks Supported operators are ==, ===, !=, <, >, <= and >=
 * @param {object}      lvalue        - Left operand
 * @param {object}      operator      - Comparison operators
 * @param {object}      rvalue        - Right operand
 * @param {object}      options       - Handlebars options.
 * @returns {string}                  - Result
 */
function compareValues(lvalue, operator, rvalue, options) {
  /* istanbul ignore if */
  if (arguments.length !== 4) {
    throw new Error('The compare helper requires 3 parameters');
  }
  const operators = {
    '==': function compareEqual(l, r) { return l === r; },
    '===': function compareIdentical(l, r) { return l === r; },
    '!=': function compareNotEqual(l, r) { return l !== r; },
    '<': function compareLessThan(l, r) { return l < r; },
    '>': function compareGreaterThan(l, r) { return l > r; },
    '<=': function compareLessThanEqual(l, r) { return l <= r; },
    '>=': function compareGreaterThanEqual(l, r) { return l >= r; },
    typeof: function compareTypeOf(l, r) { return typeof l === r; },
  };

  /* istanbul ignore if */
  if (!operators[operator]) {
    throw new Error(util.format('Unknown compare operator: %s', operator));
  }
  const result = operators[operator](lvalue, rvalue);
  if (result) {
    return options.fn(this);
  }

  return options.inverse(this);
}

/**
 * Drop-case the first letter of a string
 * @param {object}      options       - Handlebars options.
 * @returns {string}                  - Original string with lowercased first letter.
 */
function lowercaseFirstLetter(options) {
  const string = options.fn(this);
  return string.charAt(0).toLowerCase() + string.slice(1);
}

/**
 * Convert a block to lowercase
 * @param {object}      options       - Handlebars options.
 * @return {string}                   - Handlebars result
 */
function lowercaseBlock(options) {
  return options.fn(this).toLowerCase();
}

/**
 * Split a string by capital letters and then re-join by another.
 * @param {string}      joiner        - String to join with
 * @param {object}      options       - Handlebars options.
 * @return {string}                   - Handlebars result
 */
function capSplitAndJoin(joiner, options) {
  const string = options.fn(this);
  const members = string.split(/(?=[A-Z])/);
  return members.join(joiner);
}

/**
 * Extract the name of a property with a handlebars-unfriendly
 * name, such as hyphenated names. Sets the property called name
 * into context.propName if it exists and excutes the first block
 * with context value.
 *
 * Executes inverse block otherwise.
 * @param {object}      context       - Object to look in.
 * @param {string}      name          - Property name
 * @param {string}      propName      - New target property name.
 * @param {object}      options       - Handlebars options.
 * @return {string}                   - Handlebars result
 */
function propertyValueExtract(context, name, propName, options) {
  if (context[name] === undefined || context[name] === null) {
    return options.inverse(context);
  }
  this[propName] = context[name];
  /* eslint-disable no-param-reassign */
  context[propName] = context[name];
  /* eslint-enable no-param-reassign */
  return options.fn(context);
}

/**
 * Convert a block to uppercase
 * @param {object}      options       - Handlebars options.
 * @return {string}                   - Handlebars result
 */
function uppercaseBlock(options) {
  return options.fn(this).toUpperCase();
}

/**
 * Capitalize the first letter of a string
 * @param {object}      options       - Handlebars options.
 * @returns {string}                  - Original string with capitalized first letter.
 */
function uppercaseFirstLetter(options) {
  const string = options.fn(this);
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Sub-context creation for a specific variable.
 * @param {object}      variable      - New context.
 * @param {object}      options       - Handlebars options.
 * @returns {string}                  - Handlebars output
 */
function withContext(variable, options) {
  if (variable) {
    return options.fn(variable);
  }
  return options.inverse({});
}

/**
 * Process the primary block if the specified property has a
 * schema/$ref linkage, and the inverse block if not.
 * @param {object}      property      - Property to check
 * @param {object}      definitionMap - Definitions map
 * @param {object}      options       - Handlebars options.
 * @returns {string}                  - Handlebars output
 */
function withDefinition(property, definitionMap, options) {
  const definition = definitionMap[property];
  if (definition) {
    return options.fn(definition);
  }
  return options.inverse(this);
}


module.exports = {
  arrayContains: arrayContainsItem,
  capsplit: capSplitAndJoin,
  compare: compareValues,
  lowercase: lowercaseBlock,
  lowerFirst: lowercaseFirstLetter,
  property: propertyValueExtract,
  uppercase: uppercaseBlock,
  upperFirst: uppercaseFirstLetter,
  with: withContext,
  withDef: withDefinition,
};
