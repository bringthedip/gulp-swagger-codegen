'use strict';

const edgeCasesImplementation = require('../implementation/edgecases');

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
 * @param {object} req      - HTTP Request
 * @returns                 - Same object if object, calls function if function
 **/
function resolveImplementation(impl, req) {
  // Validate arguments
  if (!impl) {
    throw new Error('Cannot resolve implementation. require() returned null');
  }

  // If we've got a resolver, then use that.
  if (req && req.resolver && typeof req.resolver === 'function') {
    return req.resolver(impl);
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
 * Get a list of native array values
 * @remarks Returns a list of something
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function getNativeArray(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 200 [nativeArray]
    nativeArray: function endNativeArray(result) {
      // Result is an array
      const typedResult = [];
      for (const resultItem of result) {
        // Primative type mapping - Copy verbatim.
        typedResult.push(resultItem);
      }
      res.json(typedResult, 200);
    },
    // Handle status 201 [objectArray]
    objectArray: function endObjectArray(result) {
      // Result is an array
      const typedResult = [];
      for (const resultItem of result) {
        // Parse the Pet instance.
        const Pet = require('../definitions/pet');
        const parsedItem = new Pet(result);
        typedResult.push(parsedItem);
      }
      res.json(typedResult, 201);
    },
  };

  // Validate implementation presence
  const impl = resolveImplementation(edgeCasesImplementation, req);
  if (!impl) {
    throw new Error('Cannot resolve implementation of edgeCases');
  } else if (!impl.getNativeArray) {
    throw new Error('Implementation is missing operation getNativeArray for edgeCases');
  } else if (!(typeof impl.getNativeArray === 'function')) {
    throw new Error('Implementation is not a function: getNativeArray for edgeCases');
  }

  // Execute, passing the parameters
  // (variable-list) - All extracted parameters in declaration order.
  // responder - The responder helper object.
  // req - The raw request object
  // res - The raw response object
  return impl.getNativeArray(
    responder,
    req,
    res
  );
}

module.exports = {
  getNativeArray,
};
