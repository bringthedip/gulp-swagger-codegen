'use strict';

const task = require('../../task');
/* global after, afterEach, before, beforeEach, describe, it */

// NPM Dependencies

describe('File Streaming', () => {
  it('Should not error with null input', () => {
    const plugin = task({
      perDefinition: {
        './templates/es6/definition.hbs': {
          target: './definitions',
          extension: '.js',
        },
      },
    });

    plugin.write(null);
  });
});
