'use strict';


/**
 * Object definition for Order
 * @class
 **/
class Order {
  /**
   * Initialize a new instance of Order
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
    if (input.petId !== null) {
      this._petId = input.petId;
    }
    if (input.quantity !== null) {
      this._quantity = input.quantity;
    }
    if (input.shipDate !== null) {
      this._shipDate = input.shipDate;
    }
    if (input.status !== null) {
      this._status = input.status;
    }
    if (input.complete !== null) {
      this._complete = input.complete;
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
   * Get value of petId
   * @returns - Current value of petId.
   **/
  get petId() {
    return this._petId;
  }

  /**
   * Change the value of petId.
   * @param newVal - New value to assign.
   **/
  set petId(newVal) {
    this._petId = newVal;
  }

  /**
   * Get value of quantity
   * @returns - Current value of quantity.
   **/
  get quantity() {
    return this._quantity;
  }

  /**
   * Change the value of quantity.
   * @param newVal - New value to assign.
   **/
  set quantity(newVal) {
    this._quantity = newVal;
  }

  /**
   * Get value of shipDate
   * @returns - Current value of shipDate.
   **/
  get shipDate() {
    return this._shipDate;
  }

  /**
   * Change the value of shipDate.
   * @param newVal - New value to assign.
   **/
  set shipDate(newVal) {
    this._shipDate = newVal;
  }

  /**
   * Order Status
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
   * Get value of complete
   * @returns - Current value of complete.
   **/
  get complete() {
    return this._complete;
  }

  /**
   * Change the value of complete.
   * @param newVal - New value to assign.
   **/
  set complete(newVal) {
    this._complete = newVal;
  }

  /**
   * Convert the current instance to a plain object
   * for serialization purposes.
   * @returns {object} - Plain object.
   **/
  toJSON() {
    const result = {};
    result.id = this._id;
    result.petId = this._petId;
    result.quantity = this._quantity;
    result.shipDate = this._shipDate;
    result.status = this._status;
    result.complete = this._complete;
    return result;
  }

  /**
   * Completely clone this instance.
   * @returns Order - Cloned object.
   **/
  clone() {
    // Complete serialize and deserialize.
    const obj = JSON.parse(JSON.stringify(this));

    // Re-parse using constructor
    return new Order(obj);
  }
}

module.exports = Order;
