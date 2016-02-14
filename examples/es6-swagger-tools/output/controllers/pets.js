'use strict';

const petsImplementation = require('../implementation/pets');

/**
 * Helper function to validate that various attributes of
 * the request state are valid.
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function validateSwaggerRequest(req, res) {
  // Validate arguments
  if (!req) {
    throw new Error('req (Request state) cannot be null');
  } else if (!res) {
    throw new Error('res (Response object) cannot be null');
  } else if (!(req.swagger)) {
    throw new Error('req.swagger (Swagger State) cannot be null');
  } else if (!(req.swagger.params)) {
    throw new Error('req.swagger.params (Incoming parameters array) cannot be null');
  }
}

/**
 * Resolve the implementation of this controller
 * @param {object} impl     - Implementation object
 * @returns                 - Same object if object, calls function if function
 **/
function resolveImplementation(impl) {
  // Validate arguments
  if (!impl) {
    throw new Error('Cannot resolve implementation. require() returned null');
  }

  // Call generator function, if required
  if (typeof impl === 'function') {
    // Determine if we are an ES6 class, if so, generate via new()
    if (/^\s*class\s+/.test(impl.toString())) {
      return new impl();
    }
    return impl();
  }

  // POJSO.
  return impl;
}


/**
 * Add a new pet to the store
 * @remarks Operation handler for addPet
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function addPet(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  const bodyGenerator = () => {
    const TypeDefinition = require('/pet');
    return new TypeDefinition(req.swagger.params.body.value);
  };
  const body = bodyGenerator(); 

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Result code 405 does not have a "x-gulp-swagger-codegen-outcome
    // 405 = Not mapped
  };

  // Validate implementation presence
  const impl = resolveImplementation(petsImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of pets');
  } else if (!impl.addPet) {
    throw new Error('Implementation is missing operation addPet for pets');
  } else if (!(typeof impl.addPet === 'function')) {
    throw new Error('Implementation is not a function: addPet for pets');
  }

  // Execute
  return impl.addPet(
    body,
    responder
  );
}

/**
 * Update an existing pet
 * @remarks Operation handler for updatePet
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function updatePet(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  const bodyGenerator = () => {
    const TypeDefinition = require('/pet');
    return new TypeDefinition(req.swagger.params.body.value);
  };
  const body = bodyGenerator(); 

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Result code 400 does not have a "x-gulp-swagger-codegen-outcome
    // 400 = Not mapped
    // Result code 404 does not have a "x-gulp-swagger-codegen-outcome
    // 404 = Not mapped
    // Result code 405 does not have a "x-gulp-swagger-codegen-outcome
    // 405 = Not mapped
  };

  // Validate implementation presence
  const impl = resolveImplementation(petsImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of pets');
  } else if (!impl.updatePet) {
    throw new Error('Implementation is missing operation updatePet for pets');
  } else if (!(typeof impl.updatePet === 'function')) {
    throw new Error('Implementation is not a function: updatePet for pets');
  }

  // Execute
  return impl.updatePet(
    body,
    responder
  );
}

/**
 * Finds Pets by status
 * @remarks Multiple status values can be provided with comma seperated strings
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function findPetsByStatus(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  const status = req.swagger.params.status.value;

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Result code 200 does not have a "x-gulp-swagger-codegen-outcome
    // 200 = Not mapped
    // Result code 400 does not have a "x-gulp-swagger-codegen-outcome
    // 400 = Not mapped
  };

  // Validate implementation presence
  const impl = resolveImplementation(petsImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of pets');
  } else if (!impl.findPetsByStatus) {
    throw new Error('Implementation is missing operation findPetsByStatus for pets');
  } else if (!(typeof impl.findPetsByStatus === 'function')) {
    throw new Error('Implementation is not a function: findPetsByStatus for pets');
  }

  // Execute
  return impl.findPetsByStatus(
    status,
    responder
  );
}

/**
 * Finds Pets by tags
 * @remarks Muliple tags can be provided with comma seperated strings. Use tag1, tag2, tag3 for testing.
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function findPetsByTags(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  const tags = req.swagger.params.tags.value;

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Result code 200 does not have a "x-gulp-swagger-codegen-outcome
    // 200 = Not mapped
    // Result code 400 does not have a "x-gulp-swagger-codegen-outcome
    // 400 = Not mapped
  };

  // Validate implementation presence
  const impl = resolveImplementation(petsImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of pets');
  } else if (!impl.findPetsByTags) {
    throw new Error('Implementation is missing operation findPetsByTags for pets');
  } else if (!(typeof impl.findPetsByTags === 'function')) {
    throw new Error('Implementation is not a function: findPetsByTags for pets');
  }

  // Execute
  return impl.findPetsByTags(
    tags,
    responder
  );
}

/**
 * Find pet by ID
 * @remarks Returns a pet when ID &lt; 10.  ID &gt; 10 or nonintegers will simulate API error conditions
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function getPetById(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  if (req.swagger.params.petId === null || req.swagger.params.petId === undefined) {
    throw new Error('Cannot process : parameter petId cannot be null.');
  }
  const petId = req.swagger.params.petId.value;

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 200 [success]
    success: function endSuccess(result) {
      const Pet = require('/pet');
      const typedResult = new Pet(result);
      res.json(typedResult || {}, 200);
    },
    // Handle status 400 [invalidId]
    invalidId: function endInvalidId(result) {
      res.json(result || {}, 400);
    },
    // Handle status 404 [notFound]
    notFound: function endNotFound(result) {
      res.json(result || {}, 404);
    },
  };

  // Validate implementation presence
  const impl = resolveImplementation(petsImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of pets');
  } else if (!impl.getPetById) {
    throw new Error('Implementation is missing operation getPetById for pets');
  } else if (!(typeof impl.getPetById === 'function')) {
    throw new Error('Implementation is not a function: getPetById for pets');
  }

  // Execute
  return impl.getPetById(
    petId,
    responder
  );
}

/**
 * Updates a pet in the store with form data
 * @remarks Operation handler for updatePetWithForm
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function updatePetWithForm(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  if (req.swagger.params.petId === null || req.swagger.params.petId === undefined) {
    throw new Error('Cannot process : parameter petId cannot be null.');
  }
  if (req.swagger.params.name === null || req.swagger.params.name === undefined) {
    throw new Error('Cannot process : parameter name cannot be null.');
  }
  if (req.swagger.params.status === null || req.swagger.params.status === undefined) {
    throw new Error('Cannot process : parameter status cannot be null.');
  }
  const petId = req.swagger.params.petId.value;
  const name = req.swagger.params.name.value;
  const status = req.swagger.params.status.value;

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 405 [invalidInput]
    invalidInput: function endInvalidInput(result) {
      res.json(result || {}, 405);
    },
  };

  // Validate implementation presence
  const impl = resolveImplementation(petsImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of pets');
  } else if (!impl.updatePetWithForm) {
    throw new Error('Implementation is missing operation updatePetWithForm for pets');
  } else if (!(typeof impl.updatePetWithForm === 'function')) {
    throw new Error('Implementation is not a function: updatePetWithForm for pets');
  }

  // Execute
  return impl.updatePetWithForm(
    petId,
    name,
    status,
    responder
  );
}

/**
 * Deletes a pet
 * @remarks Operation handler for deletePet
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function deletePet(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  if (req.swagger.params.api_key === null || req.swagger.params.api_key === undefined) {
    throw new Error('Cannot process : parameter api_key cannot be null.');
  }
  if (req.swagger.params.petId === null || req.swagger.params.petId === undefined) {
    throw new Error('Cannot process : parameter petId cannot be null.');
  }
  const api_key = req.swagger.params.api_key.value;
  const petId = req.swagger.params.petId.value;

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 400 [invalidPet]
    invalidPet: function endInvalidPet(result) {
      res.json(result || {}, 400);
    },
  };

  // Validate implementation presence
  const impl = resolveImplementation(petsImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of pets');
  } else if (!impl.deletePet) {
    throw new Error('Implementation is missing operation deletePet for pets');
  } else if (!(typeof impl.deletePet === 'function')) {
    throw new Error('Implementation is not a function: deletePet for pets');
  }

  // Execute
  return impl.deletePet(
    api_key,
    petId,
    responder
  );
}

module.exports = {
  addPet,
  updatePet,
  findPetsByStatus,
  findPetsByTags,
  getPetById,
  updatePetWithForm,
  deletePet,
};
