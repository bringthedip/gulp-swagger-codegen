'use strict';


/**
 * A type of waffle known to the system.
 * @class
 **/
class Waffle {
  /**
   * Initialize a new instance of Waffle
   * @param {object}    input     - Optional input to initialize with a fixed value.
   **/
  constructor(input) {
    // No input? Skip.
    if (!input) {
      return;
    }

    // Load property values from input object
    if (input.id !== null) {
      this._id = input.id;
    } else {
      throw new Error('Cannot initialize  - id cannot be null');
    }
    if (input.name !== null) {
      this._name = input.name;
    } else {
      throw new Error('Cannot initialize  - name cannot be null');
    }
    this._ingredients = [];
    for (const subItem of (input.ingredients || [])) {
      // Parse the Ingredient instance.
      const Ingredient = require('./ingredient');
      const parsedItem = new Ingredient(result);
      this._ingredients.push(new Ingredient(input.ingredients));
    }
  }

  /**
   * Get value of id
   * @returns - Current value of id.
   **/
  get id() {
    return this._id;
  }

  /**
   * Change the value of id.
   * @param newVal - New value to assign.
   **/
  set id(newVal) {
    if (newVal === null) {
      throw new Error('Cannot change value to null, not permitted.');
    }
    this._id = newVal;
  }

  /**
   * Get value of name
   * @returns - Current value of name.
   **/
  get name() {
    return this._name;
  }

  /**
   * Change the value of name.
   * @param newVal - New value to assign.
   **/
  set name(newVal) {
    if (newVal === null) {
      throw new Error('Cannot change value to null, not permitted.');
    }
    this._name = newVal;
  }

  /**
   * Get value of ingredients
   * @returns - Current value of ingredients.
   **/
  get ingredients() {
    return this._ingredients;
  }

  /**
   * Change the value of ingredients.
   * @param newVal - New value to assign.
   **/
  set ingredients(newVal) {
    this._ingredients = newVal;
  }
  /**
   * Convert the current instance to a plain object
   * for serialization purposes.
   * @returns {object} - Plain object.
   **/
  toJSON() {
    const result = {};
    result.id = this._id;
    result.name = this._name;
    result.ingredients = this._ingredients;
    return result;
  }

  /**
   * Completely clone this instance.
   * @returns Waffle - Cloned object.
   **/
  clone() {
    // Complete serialize and deserialize.
    const obj = JSON.parse(JSON.stringify(this));

    // Re-parse using constructor
    return new Waffle(obj);
  }
}

module.exports = Waffle;
