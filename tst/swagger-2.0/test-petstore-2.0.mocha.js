'use strict';

/* global after, afterEach, before, beforeEach, describe, it */

// NPM Dependencies
const chai = require('chai');
const expect = chai.expect;
const File = require('vinyl');
const fs = require('fs');
const path = require('path');
const task = require('../../task');
const templateSet = require('swagger-template-es6-server');

describe('Swagger 2.0 Tests', () => {
  describe('Pet Store (Full YAML)', () => {
    describe('Code Generation', () => {
      it('Should succeed without errors', () => {
        const filePath = path.join(__dirname, 'swagger/petstore.yaml');
        const fileContent = fs.readFileSync(filePath);

        const plugin = task(templateSet({
          implementationPath: '../dummy-implementation',
        }));

        const result = plugin.write(new File({
          path: 'dummy-file.yaml',
          contents: fileContent,
        }));
        expect(result).to.equal(true);
      });
    });
  });
});
