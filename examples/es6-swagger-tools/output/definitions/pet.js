'use strict';

const Category = require('./category');

/**
 * Object definition for Pet
 * @class
 **/
class Pet {
  /**
   * Initialize a new instance of Pet
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
    if (input.category !== null) {
        this._category = new Category(input.category);
    }
    if (input.name !== null) {
      this._name = input.name;
    } else {
      throw new Error('Cannot initialize  - name cannot be null');
    }
    this._photoUrls = [];
    if (input.photoUrls === null) {
      throw new Error('Cannot initialize. The photoUrls array cannot be null');
    }
    for (const subItem of input.photoUrls) {
      this._photoUrls.push(new (input.photoUrls));
    }
    this._tags = [];
    for (const subItem of (input.tags || [])) {
      this._tags.push(new (input.tags));
    }
    if (input.status !== null) {
      this._status = input.status;
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
   * Get value of category
   * @returns - Current value of category.
   **/
  get category() {
    return this._category;
  }

  /**
   * Change the value of category.
   * @param newVal - New value to assign.
   **/
  set category(newVal) {
    this._category = newVal;
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
   * Get value of photoUrls
   * @returns - Current value of photoUrls.
   **/
  get photoUrls() {
    return this._photoUrls;
  }

  /**
   * Change the value of photoUrls.
   * @param newVal - New value to assign.
   **/
  set photoUrls(newVal) {
    if (newVal === null) {
      throw new Error('Cannot change value to null, not permitted.');
    }
    this._photoUrls = newVal;
  }

  /**
   * Get value of tags
   * @returns - Current value of tags.
   **/
  get tags() {
    return this._tags;
  }

  /**
   * Change the value of tags.
   * @param newVal - New value to assign.
   **/
  set tags(newVal) {
    this._tags = newVal;
  }

  /**
   * pet status in the store
   * @returns - Current value of status.
   **/
  get status() {
    return this._status;
  }

  /**
   * Change the value of status.
   * @param newVal - New value to assign.
   **/
  set status(newVal) {
    this._status = newVal;
  }
  /**
   * Convert the current instance to a plain object
   * for serialization purposes.
   * @returns {object} - Plain object.
   **/
  toJSON() {
    const result = {};
    result.id = this._id;
    result.category = this._category;
    result.name = this._name;
    result.photoUrls = this._photoUrls;
    result.tags = this._tags;
    result.status = this._status;
    return result;
  }

  /**
   * Completely clone this instance.
   * @returns Pet - Cloned object.
   **/
  clone() {
    // Complete serialize and deserialize.
    const obj = JSON.parse(JSON.stringify(this));

    // Re-parse using constructor
    return new Pet(obj);
  }
}

module.exports = Pet;
