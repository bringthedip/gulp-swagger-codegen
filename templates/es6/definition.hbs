'use strict';

{{#with definition}}
  {{#each properties}}
    {{#withDef $ref ../../definitionMap}}
const {{definitionName}} = require('./{{#lowercase}}{{definitionName}}{{/lowercase}}');
    {{/withDef}}
  {{/each}}

/**
 * {{#if description}}{{description}}{{else}}Object definition for {{definitionName}}{{/if}}
 * @class
 **/
class {{definitionName}} {
  /**
   * Initialize a new instance of {{definitionName}}
   * @param {object}    input     - Optional input to initialize with a fixed value.
   **/
  constructor(input) {
    // No input? Skip.
    if (!input) {
      return;
    }

    {{#compare type "===" "object"}}
    {{#if properties}}
    // Load property values from input object
    {{/if}}
    {{#each properties}}
    {{#compare type "==" "array"}}
    this._{{@key}} = [];
    {{#arrayContains ../required @key}}
    if (input.{{@key}} === null) {
      throw new Error('Cannot initialize. The {{@key}} array cannot be null');
    }
    for (const subItem of input.{{@key}}) {
    {{else}}
    for (const subItem of (input.{{@key}} || [])) {
    {{/arrayContains}}
      {{#with items}}
      {{#if type}}
      // Primative/{{type}} mapping.
      this._{{@key}}.push(subItem);
      {{else}}
      {{#withDef $ref ../../../definitionMap}}
      // Parse the {{definitionName}} instance.
      const {{#upperFirst}}{{definitionName}}{{/upperFirst}} = require('./{{#lowercase}}{{definitionName}}{{/lowercase}}');
      const parsedItem = new {{#upperFirst}}{{definitionName}}{{/upperFirst}}(subItem);
      this._{{@key}}.push(new {{definitionName}}(input.{{@key}}));
      {{else}}
      throw new Error('Could not find definition for items collection');
      {{/withDef}}
      {{/if}}
      {{else}}
      throw new Error('Cannot handle array: no items collection defined');
      {{/with}}
    }
    {{else}}
    if (input.{{@key}} !== null) {
      {{#withDef $ref ../../definitionMap}}
        this._{{@key}} = new {{definitionName}}(input.{{@key}});
      {{else}}
      this._{{@key}} = input.{{@key}};
      {{/withDef}}
    }{{#arrayContains ../required @key}} else {
      throw new Error('Cannot initialize {{definitionName}} - {{@key}} cannot be null');
    }{{else}}{{/arrayContains}}
    {{/compare}}
    {{/each}}
    {{else}}
    // Direct value storage
    this._value = input;
    {{/compare}}
  }
  {{#compare type "===" "object"}}
  {{#each properties}}

  /**
   * {{#if description}}{{description}}{{else}}Get value of {{@key}}{{/if}}
   * @returns - Current value of {{@key}}.
   **/
  get {{@key}}() {
    return this._{{@key}};
  }

  /**
   * Change the value of {{@key}}.
   * @param newVal - New value to assign.
   **/
  set {{@key}}(newVal) {
    {{#arrayContains ../required @key}}
    if (newVal === null) {
      throw new Error('Cannot change value to null, not permitted.');
    }
    {{/arrayContains}}
    this._{{@key}} = newVal;
  }
  {{/each}}
  {{else}}
  /**
   * Get the value of this entity.
   **/
  get value() {
    return this._value;
  }

  /**
   * Set the value of this entity
   **/
  set value(newValue) {
    this._value = newValue;
  }
  {{/compare}}
  /**
   * Convert the current instance to a plain object
   * for serialization purposes.
   * @returns {object} - Plain object.
   **/
  toJSON() {
    {{#compare type "===" "object"}}
    const result = {};
    {{#each properties}}
    result.{{@key}} = this._{{@key}};
    {{/each}}
    return result;
    {{else}}
    return this._value;
    {{/compare}}
  }

  /**
   * Completely clone this instance.
   * @returns {{{definitionName}}} - Cloned object.
   **/
  clone() {
    // Complete serialize and deserialize.
    const obj = JSON.parse(JSON.stringify(this));

    // Re-parse using constructor
    return new {{definitionName}}(obj);
  }
}

module.exports = {{definitionName}};
{{/with}}