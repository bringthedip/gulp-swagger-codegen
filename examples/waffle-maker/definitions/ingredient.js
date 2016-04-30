'use strict';


/**
 * A type of ingredient.
 * @class
 **/
class Ingredient {
  /**
   * Initialize a new instance of Ingredient
   * @param {object}    input     - Optional input to initialize with a fixed value.
   **/
  constructor(input) {
    // No input? Skip.
    if (!input) {
      return;
    }

    // Load property values from input object
    if (input.name !== null) {
      this._name = input.name;
    } else {
      throw new Error('Cannot initialize  - name cannot be null');
    }
    this._sellers = [];
    for (const subItem of (input.sellers || [])) {
      // Primative/string mapping.
      this._sellers.push(subItem);
    }
  }

  /**
   * Name of ingredient
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
   * Get value of sellers
   * @returns - Current value of sellers.
   **/
  get sellers() {
    return this._sellers;
  }

  /**
   * Change the value of sellers.
   * @param newVal - New value to assign.
   **/
  set sellers(newVal) {
    this._sellers = newVal;
  }
  /**
   * Convert the current instance to a plain object
   * for serialization purposes.
   * @returns {object} - Plain object.
   **/
  toJSON() {
    const result = {};
    result.name = this._name;
    result.sellers = this._sellers;
    return result;
  }

  /**
   * Completely clone this instance.
   * @returns Ingredient - Cloned object.
   **/
  clone() {
    // Complete serialize and deserialize.
    const obj = JSON.parse(JSON.stringify(this));

    // Re-parse using constructor
    return new Ingredient(obj);
  }
}

module.exports = Ingredient;
