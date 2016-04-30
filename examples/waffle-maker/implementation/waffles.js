'use strict';

/**
 * Implementation of the Waffles service
 **/
class WafflesImplementation {
  /**
   * Initialize this waffle service implementation. Note that the generated code will attempt to use a
   * resolver, such as somersault (npm install somersault) to perform IoC backed construction
   */
  constructor() {
    this._waffleTypes = [
      {
        id: 1,
        name: 'First Type of Waffle',
        ingredients: [
          { name: 'Fancy Batter',
            sellers: [
              'first-seller',
              'second-seller',
            ], },
          { name: 'Cinnamon',
            sellers: [
              'third-seller',
              'fourth-seller',
            ], },
          { 
            name: 'Sucre',
            sellers: [
              'fifth-seller',
              'sixth-seller',
            ],
          },
        ],
      }
    ];
  }

  /**
   * Get the list of known waffle types
   * @param {object} responder      - Automatically generated responder object
   */
  getWaffleList(responder) {
    responder.success(this._waffleTypes);
  }

  /**
   * Get a specific waffle type by it's Id
   * @param {number} id             - ID Of waffle to find
   * @param {object} responder      - Automatically generated responder object
   */
  getWaffleById(id, responder) {
    if (id === 1) {
      responder.success(this._waffleTypes[0]);
    } else {
      responder.notFound();
    }
  }

  getIngredientsOfWaffle(id, responder) {
    if (id === 1) {
      responder.success(
        this._waffleTypes[0].ingredients.map((x) => x.name)
      );
    } else {
      responder.notFound();
    }
  }
}

module.exports = WafflesImplementation;
