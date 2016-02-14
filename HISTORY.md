# Release Note History

## Version 0.0.6
Fixed some minor issues in the ES6 code generation template for Swagger-tools:

  - When the `implementation` of a controller is an ES6 class, we now call new() on it.
    Future roadmap will include a way to pass dynamic dependencies to constructors.
  - Minor stylistic changes to generated code:
      - Fixed a few missing semicolons.
      - Formatting and line-breaks.
