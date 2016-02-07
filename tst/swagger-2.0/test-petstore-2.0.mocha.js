'use strict';

/* global after, afterEach, before, beforeEach, describe, it */

// NPM Dependencies
const chai = require('chai');
const expect = chai.expect;
const File = require('vinyl');
const fs = require('fs');
const path = require('path');

describe('Swagger 2.0 Tests', () => {
  describe('Pet Store (Full YAML)', () => {
    describe('Code Generation', () => {
      it('Should succeed without errors', () => {
        const task = require('../../task');
        const filePath = path.join(__dirname, 'swagger/petstore.yaml');
        const fileContent = fs.readFileSync(filePath);

        const plugin = task({
          perDefinition: {
            './templates/es6/definition.hbs': {
              target: './definitions',
              extension: '.js',
            },
          },
          perPath: {
            './templates/es6/swagger-tools-controller.hbs': {
              target: './controllers',
              groupBy: 'x-swagger-router-controller',
              operations: ['get', 'put', 'post', 'delete'],
              extension: '.js',
            },
          },
        });

        const result = plugin.write(new File({
          path: 'dummy-file.yaml',
          contents: fileContent,
        }));
        expect(result).to.equal(true);
      });
    });
  });
});
