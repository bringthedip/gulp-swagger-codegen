# gulp-swagger-codegen
![Travis-CI Build](https://travis-ci.org/bringthedip/gulp-swagger-codegen.svg?branch=master)
![Prod Dependencies](https://david-dm.org/bringthedip/gulp-swagger-codegen/status.svg)
![Dev Dependencies](https://david-dm.org/bringthedip/gulp-swagger-codegen/dev-status.svg)

![Stats]( https://nodei.co/npm/gulp-swagger-codegen.png?downloads=true&downloadRank=true&stars=true)

![Downloads](https://nodei.co/npm-dl/gulp-swagger-codegen.png)


This gulp module generates code from Swagger API definitions and is intended
to be used to simplify implementation of API servers/clients by providing 
generated code for the request/response objects, and also some templates to
simplify use of the [swagger-tools](https://www.npmjs.com/package/swagger-tools)
package.

*This package uses ES6, and thus is only available for Node.js 4.x+ or suitable
Io.js versions*. If in doubt, please review our .travis.yml file to determine if
we are currently testing for your particular version of Node.

## Installation
To install this plugin:

    npm install --save-dev gulp-swagger-codegen

## Debugging and Troubleshooting
If the plugin fails, a console error message should indicate the nature of the
problem. Typically most errors are templating syntax related. If you are having
trouble and not sure where to look, you can validate the logical behaviour of
the plugin by setting:

    (On windows)
    SET DEBUG=gulp-swagger-codegen

    (On OS/X and Linux)
    export DEBUG=gulp-swagger-codegen

This will cause the debug output to be produced for the plugin when it runs,
giving you an insight into why it's doing certain things or not producing
any output.

## Example Usage
The following code snippet shows the module being used in a standard Gulp
workflow:

    gulp.task('default', () => {
      return gulp.src(['./path/to/your/swagger.yaml'])
        .pipe(task({
          helpers: {
            /* Assign handlebars helpers with this syntax.
            someName: yourHelperFunction
            someName will become the #someName helper in the files.
            */
          }
          perDefinition: {
            './templates/es6/definition.hbs': {
              target:     './definitions',
              extension:  '.js',
            },
          },
          perPath: {
            './templates/es6/swagger-tools-controller.hbs': {
              target: './controllers',
              groupBy: 'x-swagger-router-controller',
              extension: '.js',
              operations: ['get', 'put', 'post', 'delete'],
            },
          }
        }))
        .pipe(gulp.dest('./server/api/'))
    });

## Included Templates
Within the NPM package for this module, several templates are included
to help serve as examples and potentially jump-start your development:

- `{package-root}/templates/es6/definition.hbs`
    - Generates a complete ES6 class for parsing the general structure
    of an entity, with basic null field checking and array/nesting
    support.
- `{package-root}/templates/es6/swagger-tools-controller.hbs`
    - Generates a simple controller wrapper for a 'swagger-tools' router
    that calls methods on another class 'director' that actually performs
    the work. The controllers are intended to remove all the boilerplate 
    parameter pack and unpack work. This template requires:
        - x-swagger-router-controller to be set per-path or per-operation
        - x-gulp-swagger-codegen-outcome to be set on all response schemas. 
    See below for more detail on the swagger-tools-controller example.

Other templates may be included from time to time.

## Task Configuration Options

### perDefinition
This defines templates that are executed per request/response definition
in your Swaggerfile. The **keys** of this object represent the path to a
[handlebars](https://www.npmjs.com/package/handlebars) template.

#### Configuration Schema
The supported schema of perDefinition is:

    {
      'template-file-path': {
        target:     'relative-output-root',
        _extension:  '.ext',
        /* Any user-set options for templates */
      }
    }

#### Worked Example Usage
    perDefinition: {
      './templates/es6/definition.hbs': {
        target:     './definitions',
        extension:  '.js',
      },
    },

This will, for each definition object in a Swaggerfile:

  - Generate from the /templates/es6/definition.hbs template
  - Write the file to /definitions (relative to gulp.dest)
  - Apply the .js extension

Definition file names are by default *lowercase*. You can execute as
many different templates or types of template per definition as you
require, the only constraint is that you cannot use the same template
multiple times per definition.

### perPath
This defines templates that are executed per groups of operations, aggregated by some
attribute of the path (or operation within the path). An operation is a *method* such
as `get`, `put`, `delete`, `post` defined within a path. An example attribute to group
on would by `x-swagger-router-controller` from the  [swagger-tools](https://www.npmjs.com/package/swagger-tools)
swaggerRouter middleware, which lets you map operationId's to controllers.

#### Configuration Schema
The supported schema of perPath is:

    {
      'template-file-path.ext': {
        target: 'output-folder',
        groupBy: 'some-group-attribute',
        operations: ['some-http-verb', 'other-http-verb'],
        extension: '.ext',
        /* Any user-set options for templates */
      },
    }

#### Worked Example
Consider the following example:

      perPath: {
            './templates/es6/swagger-tools-controller.hbs': {
              target: './controllers',
              groupBy: 'x-swagger-router-controller',
              operations: ['get', 'put', 'post', 'delete'],
              extension: '.js',
            },
          }

This example will:

  * Iterate over each group of operations, grouped by x-swagger-controller-router attributes in the YAML.
  * Only operations for get, put, post and delete will be included. Others (head etc) will be ignored.
  * Create a file per group under ./controllers/ relative to the gulp output
  * Save the result with a .js extension

Multiple template sets, grouping by different attributes of paths or operations are possible.

## Templating Details
The structure of data that is passed to the templates is described
in the following section(s):

### Common Annotations / Extensions
When being passed to templates, the following object-schema extensions
are applied:

  - Definitions
      - `definitionName` - The swaggerfile 'name' of this definition
      (i.e. Pet, Purchase etc)
      - `referencePath` - The $ref equivelent path of the definition
      (i.e. #/definitions/Pet)

### Handlebars Template Helper Functions
#### Registering Your Own
You can register your own `handlebars` helper functions by adding a top-level configuration
property called `helpers` and assigning the functions as key-values. The key will be the
exact block-helper name and the value must be the helper function itself.

#### arrayContains
Does the array contain an item?

      {{#arrayContains arrayProp value}}
        // Template if value is in array
      {{else}}
        // Template if value is not in array
      {{/arrayContains}}

#### compare
Perform a comparison operation.

      {{#compare leftVal operand rightVal}}
        // Template if leftVal op rightVal true
      {{else}}
        // False template
      {{/compare}}
Supported operands are ==, ===, !=, >, >=, <, <= and typeof

#### lowercase
Converts a block to lowercase.
    {{#lowercase}}MAKE ME LOWERCASE{{/lowercase}}

#### lowerFirst
Makes the first character of a block lowercase, but leaves the rest
of the block untouched.
    {{#lowerFirst}}MAKES FIRST M LOWERCASE{{/lowerFirst}}

### property
Property name complication helper.

    {{#property someProp "property-name-with-bad-characters" "resultName"}}
      This scope will be `someProp` but with an extra sub-property of resultName
    {{else}
      This scope will be returned if property-name-with-bad-characters does not exist
    {[/property

This is used primarily because handlebars does not natively seem to permit invalid characters
in variable names. Some of the extended swaggerfile attributes are prefixed with x- and so
to reason about them in templates, you'll need this.

#### uppercase
Converts a block to uppercase.
    {{#uppercase}}i want to be tall{{/uppercase}}

#### upperFirst
Makes the first character of a block uppercas, but leaves the rest
of the block untouched.
    {{#upperFirst}}mAKES THE FIRST m UPPERCASE{{/upperFirst}}

#### withDef
Creates a child scope using the specified definition as the context:

    {{#withDef defReferencePath}}
      // Generate a sub-section that relates to a definition.
    {{/withDef}}

This allows creation of cross-entity relations/nesting, and is shown
being used in the included ES6 definition template.

### perDefinition Templates
Each handlebars template in perDefinition is run with the following
initial context:

    {
      model,          (overall parsed YAML/JSON swaggerfile)
      definition,     (the current definition being generated)
      definitionMap,  (name to definition map of all definitions)
      options         (Options for this template path, allows passing of extra fields)
    }

### perPath Templates
Each handlebars template in perPath is run with the following initial context:

    {
      fileName,       (filename of template, i.e. PetsController becomes petscontroller)
      groupKey,       (value of the groupBy attribute)
      members,        (Operations grouped into this group)
      definitions,    (Definition map for all definitions)
      model,          (overall parsed YAML/JSON swaggerfile)
      options,        (Options for this template path, allows passing of extra fields)
    }

## Template Additional Information - swagger-tools-controller
The `swagger-tools-controller.hbs` template is intended to provide a simplification of
code when using swagger-tools to generate most of your microservice. Each operationId must
be extended with:

 - `x-swagger-router-controller` - Defines which 'controller.js' class contains the operation.
  This can be applied either at the path level or per-operation, overriding the path.
 - `operationId` - Defines a method name on the controller we generate, with a (req, res) input set.

Here's an example config section:

      perPath: {
        './templates/es6/swagger-tools-controller.hbs': {
          groupBy: 'x-swagger-router-controller',
          target: './controllers',
          extension: '.js',
          operations: ['get', 'put', 'post', 'delete'],
          implementationPath: '../implementation',
        },
      },

The configuration for the template must pass an additional `implementationPath`: this is used
because we generate a call to `require('implementationPath/controller-name.js'). However this 
module must have an export per operationId. 

The templated controller will parse out each input in *swaggerfile declaration order* and then
call a method on your `implementation` type, suich as:


    // Create responder: This will set the content type, status code and also
    // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
    // on operations in order to have a mapping here. Enforce typing of the
    // responses with swaggerValidator from swagger-tools.
    const responder = {
      req,
      res,
      // Handle status 200 [success]
      success: function endSuccess(result) {
        res.json(result || {}, 200);
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
    const impl = resolveImplementation(usersImplementation);
    if (!impl) {
      throw new Error('Cannot resolve implementation of users');
    } else if (!impl.getUserByName) {
      throw new Error('Implementation is missing operation getUserByName for users');
    } else if (!(typeof impl.getUserByName === 'function')) {
      throw new Error('Implementation is not a function: getUserByName for users');
    }

    // Execute
    impl.getUserByName(
      username,
      responder
    );

Note that in this example, we are calling getUserByName on the implementation type and
passing both the parameters (username) and a responder object. The responder object is
a function-map for terminating the request, so that when your implementation is done, you
can call the correct result-name and the generated code will set the result code and
end the request.

You can annotate the names of the `responder` actions with the annotation `x-gulp-swagger-codegen-outcome`
such as:

      responses:
        "404":
          x-gulp-swagger-codegen-outcome: notFound
          description: User not found
        "200":
          x-gulp-swagger-codegen-outcome: success
          description: successful operation
          schema:
            $ref: "#/definitions/User"
        "400":
          x-gulp-swagger-codegen-outcome: invalidId
          description: Invalid username supplied

Any operations without an annotation will not be processed by the template. You can
manually use the `res` property from the responder for this scenario if you wish.

## Contributions and Licensing
This code is MIT licensed and free for re-use in your projects and for forking. 
Whilst I'll do my best to maintain it for the forseeable future, you're mor ethan
welcome to submit feature requests or pull requests.
