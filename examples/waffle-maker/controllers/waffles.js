'use strict';

const wafflesImplementation = require('../implementation/waffles');

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
 * List the types of Waffles known to the waffle making machine.
 * @remarks Operation handler for getWaffleList
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function getWaffleList(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 200 [success]
    success: function endSuccess(result) {
      // Result is an array
      const typedResult = [];
      for (const resultItem of result) {
        // Parse the Waffle instance.
        const Waffle = require('../definitions/waffle');
        const parsedItem = new Waffle(resultItem);
        typedResult.push(parsedItem);
      }
      res.json(typedResult, 200);
    },
  };

  // Validate implementation presence
  const impl = resolveImplementation(wafflesImplementation, req);
  if (!impl) {
    throw new Error('Cannot resolve implementation of waffles');
  } else if (!impl.getWaffleList) {
    throw new Error('Implementation is missing operation getWaffleList for waffles');
  } else if (!(typeof impl.getWaffleList === 'function')) {
    throw new Error('Implementation is not a function: getWaffleList for waffles');
  }

  // Execute, passing the parameters
  // (variable-list) - All extracted parameters in declaration order.
  // responder - The responder helper object.
  // req - The raw request object
  // res - The raw response object
  return impl.getWaffleList(
    responder
  );
}

/**
 * Bulk insert waffles for the system.
 * @remarks Operation handler for bulkLoadWaffles
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function bulkLoadWaffles(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  const data = req.swagger.params.data.value;

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 200 [success]
    success: function endSuccess(result) {
      // Void result
      if (result) {
        throw new Error('Should not have any \'result\' for this operation outcome');
      }
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end();
    },
  };

  // Validate implementation presence
  const impl = resolveImplementation(wafflesImplementation, req);
  if (!impl) {
    throw new Error('Cannot resolve implementation of waffles');
  } else if (!impl.bulkLoadWaffles) {
    throw new Error('Implementation is missing operation bulkLoadWaffles for waffles');
  } else if (!(typeof impl.bulkLoadWaffles === 'function')) {
    throw new Error('Implementation is not a function: bulkLoadWaffles for waffles');
  }

  // Execute, passing the parameters
  // (variable-list) - All extracted parameters in declaration order.
  // responder - The responder helper object.
  // req - The raw request object
  // res - The raw response object
  return impl.bulkLoadWaffles(
    data,
    responder
  );
}

/**
 * Fetch a single waffle type by id
 * @remarks Operation handler for getWaffleById
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function getWaffleById(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  if (req.swagger.params.id === null || req.swagger.params.id === undefined) {
    throw new Error('Cannot process : parameter id cannot be null.');
  }
  const id = req.swagger.params.id.value;

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 200 [success]
    success: function endSuccess(result) {
      const Waffle = require('../definitions/waffle');
      const typedResult = new Waffle(result);
      res.json(typedResult, 200);
    },
    // Handle status 404 [notFound]
    notFound: function endNotFound(result) {
      // Void result
      if (result) {
        throw new Error('Should not have any \'result\' for this operation outcome');
      }
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 404;
      res.end();
    },
  };

  // Validate implementation presence
  const impl = resolveImplementation(wafflesImplementation, req);
  if (!impl) {
    throw new Error('Cannot resolve implementation of waffles');
  } else if (!impl.getWaffleById) {
    throw new Error('Implementation is missing operation getWaffleById for waffles');
  } else if (!(typeof impl.getWaffleById === 'function')) {
    throw new Error('Implementation is not a function: getWaffleById for waffles');
  }

  // Execute, passing the parameters
  // (variable-list) - All extracted parameters in declaration order.
  // responder - The responder helper object.
  // req - The raw request object
  // res - The raw response object
  return impl.getWaffleById(
    id,
    responder
  );
}

/**
 * Fetch ingredients for a single waffle type by id
 * @remarks Operation handler for getIngredientsOfWaffle
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function getIngredientsOfWaffle(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  if (req.swagger.params.id === null || req.swagger.params.id === undefined) {
    throw new Error('Cannot process : parameter id cannot be null.');
  }
  const id = req.swagger.params.id.value;

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 200 [success]
    success: function endSuccess(result) {
      // Result is an array
      const typedResult = [];
      for (const resultItem of result) {
        // Primative type mapping - Copy verbatim.
        typedResult.push(resultItem);
      }
      res.json(typedResult, 200);
    },
  };

  // Validate implementation presence
  const impl = resolveImplementation(wafflesImplementation, req);
  if (!impl) {
    throw new Error('Cannot resolve implementation of waffles');
  } else if (!impl.getIngredientsOfWaffle) {
    throw new Error('Implementation is missing operation getIngredientsOfWaffle for waffles');
  } else if (!(typeof impl.getIngredientsOfWaffle === 'function')) {
    throw new Error('Implementation is not a function: getIngredientsOfWaffle for waffles');
  }

  // Execute, passing the parameters
  // (variable-list) - All extracted parameters in declaration order.
  // responder - The responder helper object.
  // req - The raw request object
  // res - The raw response object
  return impl.getIngredientsOfWaffle(
    id,
    responder
  );
}

module.exports = {
  getWaffleList,
  bulkLoadWaffles,
  getWaffleById,
  getIngredientsOfWaffle,
};
