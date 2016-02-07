'use strict';


/**
 * Object definition for User
 * @class
 **/
class User {
  /**
   * Initialize a new instance of User
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
    if (input.username !== null) {
      this._username = input.username;
    }
    if (input.firstName !== null) {
      this._firstName = input.firstName;
    }
    if (input.lastName !== null) {
      this._lastName = input.lastName;
    }
    if (input.email !== null) {
      this._email = input.email;
    }
    if (input.password !== null) {
      this._password = input.password;
    }
    if (input.phone !== null) {
      this._phone = input.phone;
    }
    if (input.userStatus !== null) {
      this._userStatus = input.userStatus;
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
   * Get value of username
   * @returns - Current value of username.
   **/
  get username() {
    return this._username;
  }

  /**
   * Change the value of username.
   * @param newVal - New value to assign.
   **/
  set username(newVal) {
    this._username = newVal;
  }

  /**
   * Get value of firstName
   * @returns - Current value of firstName.
   **/
  get firstName() {
    return this._firstName;
  }

  /**
   * Change the value of firstName.
   * @param newVal - New value to assign.
   **/
  set firstName(newVal) {
    this._firstName = newVal;
  }

  /**
   * Get value of lastName
   * @returns - Current value of lastName.
   **/
  get lastName() {
    return this._lastName;
  }

  /**
   * Change the value of lastName.
   * @param newVal - New value to assign.
   **/
  set lastName(newVal) {
    this._lastName = newVal;
  }

  /**
   * Get value of email
   * @returns - Current value of email.
   **/
  get email() {
    return this._email;
  }

  /**
   * Change the value of email.
   * @param newVal - New value to assign.
   **/
  set email(newVal) {
    this._email = newVal;
  }

  /**
   * Get value of password
   * @returns - Current value of password.
   **/
  get password() {
    return this._password;
  }

  /**
   * Change the value of password.
   * @param newVal - New value to assign.
   **/
  set password(newVal) {
    this._password = newVal;
  }

  /**
   * Get value of phone
   * @returns - Current value of phone.
   **/
  get phone() {
    return this._phone;
  }

  /**
   * Change the value of phone.
   * @param newVal - New value to assign.
   **/
  set phone(newVal) {
    this._phone = newVal;
  }

  /**
   * User Status
   * @returns - Current value of userStatus.
   **/
  get userStatus() {
    return this._userStatus;
  }

  /**
   * Change the value of userStatus.
   * @param newVal - New value to assign.
   **/
  set userStatus(newVal) {
    this._userStatus = newVal;
  }

  /**
   * Convert the current instance to a plain object
   * for serialization purposes.
   * @returns {object} - Plain object.
   **/
  toJSON() {
    const result = {};
    result.id = this._id;
    result.username = this._username;
    result.firstName = this._firstName;
    result.lastName = this._lastName;
    result.email = this._email;
    result.password = this._password;
    result.phone = this._phone;
    result.userStatus = this._userStatus;
    return result;
  }

  /**
   * Completely clone this instance.
   * @returns User - Cloned object.
   **/
  clone() {
    // Complete serialize and deserialize.
    const obj = JSON.parse(JSON.stringify(this));

    // Re-parse using constructor
    return new User(obj);
  }
}

module.exports = User;
