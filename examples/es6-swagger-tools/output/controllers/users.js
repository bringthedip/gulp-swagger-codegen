'use strict';

const usersImplementation = require('../implementation/users');

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
 * Create user
 * @remarks This can only be done by the logged in user.
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function createUser(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  const bodyGenerator = () => {
    const TypeDefinition = require('/user');
    return new TypeDefinition(req.swagger.params.body.value);
  };
  const body = bodyGenerator(); 

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status default [success]
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
  const impl = resolveImplementation(usersImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of users');
  } else if (!impl.createUser) {
    throw new Error('Implementation is missing operation createUser for users');
  } else if (!(typeof impl.createUser === 'function')) {
    throw new Error('Implementation is not a function: createUser for users');
  }

  // Execute
  return impl.createUser(
    body,
    responder
  );
}

/**
 * Creates list of users with given input array
 * @remarks Operation handler for createUsersWithArrayInput
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function createUsersWithArrayInput(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status default [success]
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
  const impl = resolveImplementation(usersImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of users');
  } else if (!impl.createUsersWithArrayInput) {
    throw new Error('Implementation is missing operation createUsersWithArrayInput for users');
  } else if (!(typeof impl.createUsersWithArrayInput === 'function')) {
    throw new Error('Implementation is not a function: createUsersWithArrayInput for users');
  }

  // Execute
  return impl.createUsersWithArrayInput(
    body,
    responder
  );
}

/**
 * Creates list of users with given input array
 * @remarks Operation handler for createUsersWithListInput
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function createUsersWithListInput(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status default [success]
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
  const impl = resolveImplementation(usersImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of users');
  } else if (!impl.createUsersWithListInput) {
    throw new Error('Implementation is missing operation createUsersWithListInput for users');
  } else if (!(typeof impl.createUsersWithListInput === 'function')) {
    throw new Error('Implementation is not a function: createUsersWithListInput for users');
  }

  // Execute
  return impl.createUsersWithListInput(
    body,
    responder
  );
}

/**
 * Logs user into the system
 * @remarks Operation handler for loginUser
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function loginUser(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  const username = req.swagger.params.username.value;
  const password = req.swagger.params.password.value;

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 200 [success]
    success: function endSuccess(result) {
      res.json(typedResult || {}, 200);
    },
    // Handle status 400 [invalidId]
    invalidId: function endInvalidId(result) {
      // Void result
      if (result) {
        throw new Error('Should not have any \'result\' for this operation outcome');
      }
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.end();
    },
  };

  // Validate implementation presence
  const impl = resolveImplementation(usersImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of users');
  } else if (!impl.loginUser) {
    throw new Error('Implementation is missing operation loginUser for users');
  } else if (!(typeof impl.loginUser === 'function')) {
    throw new Error('Implementation is not a function: loginUser for users');
  }

  // Execute
  return impl.loginUser(
    username,
    password,
    responder
  );
}

/**
 * Logs out current logged in user session
 * @remarks Operation handler for logoutUser
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function logoutUser(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status default [success]
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
  const impl = resolveImplementation(usersImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of users');
  } else if (!impl.logoutUser) {
    throw new Error('Implementation is missing operation logoutUser for users');
  } else if (!(typeof impl.logoutUser === 'function')) {
    throw new Error('Implementation is not a function: logoutUser for users');
  }

  // Execute
  return impl.logoutUser(
    responder
  );
}

/**
 * Get user by user name
 * @remarks Operation handler for getUserByName
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function getUserByName(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  if (req.swagger.params.username === null || req.swagger.params.username === undefined) {
    throw new Error('Cannot process : parameter username cannot be null.');
  }
  const username = req.swagger.params.username.value;

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 200 [success]
    success: function endSuccess(result) {
      const User = require('/user');
      const typedResult = new User(result);
      res.json(typedResult || {}, 200);
    },
    // Handle status 400 [invalidId]
    invalidId: function endInvalidId(result) {
      // Void result
      if (result) {
        throw new Error('Should not have any \'result\' for this operation outcome');
      }
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.end();
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
  const impl = resolveImplementation(usersImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of users');
  } else if (!impl.getUserByName) {
    throw new Error('Implementation is missing operation getUserByName for users');
  } else if (!(typeof impl.getUserByName === 'function')) {
    throw new Error('Implementation is not a function: getUserByName for users');
  }

  // Execute
  return impl.getUserByName(
    username,
    responder
  );
}

/**
 * Updated user
 * @remarks This can only be done by the logged in user.
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function updateUser(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  if (req.swagger.params.username === null || req.swagger.params.username === undefined) {
    throw new Error('Cannot process : parameter username cannot be null.');
  }
  const username = req.swagger.params.username.value;
  const bodyGenerator = () => {
    const TypeDefinition = require('/user');
    return new TypeDefinition(req.swagger.params.body.value);
  };
  const body = bodyGenerator(); 

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 400 [invalidUser]
    invalidUser: function endInvalidUser(result) {
      // Void result
      if (result) {
        throw new Error('Should not have any \'result\' for this operation outcome');
      }
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.end();
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
  const impl = resolveImplementation(usersImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of users');
  } else if (!impl.updateUser) {
    throw new Error('Implementation is missing operation updateUser for users');
  } else if (!(typeof impl.updateUser === 'function')) {
    throw new Error('Implementation is not a function: updateUser for users');
  }

  // Execute
  return impl.updateUser(
    username,
    body,
    responder
  );
}

/**
 * Delete user
 * @remarks This can only be done by the logged in user.
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function deleteUser(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.
  if (req.swagger.params.username === null || req.swagger.params.username === undefined) {
    throw new Error('Cannot process : parameter username cannot be null.');
  }
  const username = req.swagger.params.username.value;

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 400 [invalidId]
    invalidId: function endInvalidId(result) {
      // Void result
      if (result) {
        throw new Error('Should not have any \'result\' for this operation outcome');
      }
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.end();
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
  const impl = resolveImplementation(usersImplementation);
  if (!impl) {
    throw new Error('Cannot resolve implementation of users');
  } else if (!impl.deleteUser) {
    throw new Error('Implementation is missing operation deleteUser for users');
  } else if (!(typeof impl.deleteUser === 'function')) {
    throw new Error('Implementation is not a function: deleteUser for users');
  }

  // Execute
  return impl.deleteUser(
    username,
    responder
  );
}

module.exports = {
  createUser,
  createUsersWithArrayInput,
  createUsersWithListInput,
  loginUser,
  logoutUser,
  getUserByName,
  updateUser,
  deleteUser,
};
