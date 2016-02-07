'use strict';


/**
 * Object definition for Tag
 * @class
 **/
class Tag {
  /**
   * Initialize a new instance of Tag
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
    }
    if (input.name !== null) {
      this._name = input.name;
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
    this._name = newVal;
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
    return result;
  }

  /**
   * Completely clone this instance.
   * @returns Tag - Cloned object.
   **/
  clone() {
    // Complete serialize and deserialize.
    const obj = JSON.parse(JSON.stringify(this));

    // Re-parse using constructor
    return new Tag(obj);
  }
}

module.exports = Tag;
