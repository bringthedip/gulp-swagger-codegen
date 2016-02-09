'use strict';

const storesImplementation = require('../implementation/stores');

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
    throw new Error("req.swagger (Swagger State) cannot be null");
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
    return impl();
  }

  // POJSO.
  return impl;
}


/**
 * Place an order for a pet
 * @remarks Operation handler for placeOrder
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function placeOrder(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  const bodyGenerator = () => {
    const TypeDefinition = require('/order');
    return new TypeDefinition(req.swagger.params.body.value);
  };
  const body = bodyGenerator(); 

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 200 [success]
    success: function endSuccess(result) {
      const Order = require('/order');
      const typedResult = new Order(result);
      res.json(typedResult || {}, 200);
    },
    // Handle status 400 [invalid]
    invalid: function endInvalid(result) {
      res.json(result || {}, 400);
    },
  }

  // Validate implementation presence
  const impl = resolveImplementation(storesImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of stores');
  } else if (!impl.placeOrder) {
    throw new Error('Implementation is missing operation placeOrder for stores');
  } else if (!(typeof impl.placeOrder === 'function')) {
    throw new Error('Implementation is not a function: placeOrder for stores');
  }

  // Execute
  return impl.placeOrder(
    body,
    responder
  );
}

/**
 * Find purchase order by ID
 * @remarks For valid response try integer IDs with value &lt;&#x3D; 5 or &gt; 10. Other values will generated exceptions
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function getOrderById(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  if (req.swagger.params.orderId === null || req.swagger.params.orderId === undefined) {
    throw new Error('Cannot process : parameter orderId cannot be null.');
  }
  const orderId = req.swagger.params.orderId.value;

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 200 [success]
    success: function endSuccess(result) {
      const Order = require('/order');
      const typedResult = new Order(result);
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
  }

  // Validate implementation presence
  const impl = resolveImplementation(storesImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of stores');
  } else if (!impl.getOrderById) {
    throw new Error('Implementation is missing operation getOrderById for stores');
  } else if (!(typeof impl.getOrderById === 'function')) {
    throw new Error('Implementation is not a function: getOrderById for stores');
  }

  // Execute
  return impl.getOrderById(
    orderId,
    responder
  );
}

/**
 * Delete purchase order by ID
 * @remarks For valid response try integer IDs with value &lt; 1000. Anything above 1000 or nonintegers will generate API errors
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function deleteOrder(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  if (req.swagger.params.orderId === null || req.swagger.params.orderId === undefined) {
    throw new Error('Cannot process : parameter orderId cannot be null.');
  }
  const orderId = req.swagger.params.orderId.value;

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 400 [invalidId]
    invalidId: function endInvalidId(result) {
      res.json(result || {}, 400);
    },
    // Handle status 404 [notFound]
    notFound: function endNotFound(result) {
      res.json(result || {}, 404);
    },
  }

  // Validate implementation presence
  const impl = resolveImplementation(storesImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of stores');
  } else if (!impl.deleteOrder) {
    throw new Error('Implementation is missing operation deleteOrder for stores');
  } else if (!(typeof impl.deleteOrder === 'function')) {
    throw new Error('Implementation is not a function: deleteOrder for stores');
  }

  // Execute
  return impl.deleteOrder(
    orderId,
    responder
  );
}

module.exports = {
  placeOrder,
  getOrderById,
  deleteOrder,
};
