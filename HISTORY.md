# Release Note History

## Version 1.0.0
Because it's basically 'done'/good-enough for common cases.

## Version 0.0.8
Updated templates:

  - `swagger-tools-controller.hbs`
      - Support for void return properties on operations.

## Version 0.0.7
Updated dependencies:

  - lodash (4.2.1 to 4.3.0)
  - through2 (2.0.0 to 2.0.1)
  - eslint-config-airbnb (5.0.0 to 5.0.1)
  - gulp (3.9.0 to 3.9.1)

No functional changes to behavior or generated code.

## Version 0.0.6
Fixed some minor issues in the ES6 code generation template for Swagger-tools:

  - When the `implementation` of a controller is an ES6 class, we now call new() on it.
    Future roadmap will include a way to pass dynamic dependencies to constructors.
  - Minor stylistic changes to generated code:
      - Fixed a few missing semicolons.
      - Formatting and line-breaks.
