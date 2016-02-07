'use strict';
const gulp = require('gulp');
const task = require('../task');

module.exports = () =>
  gulp.src(['./examples/es6-swagger-tools/petstore.yaml'])
    .pipe(task({
      perDefinition: {
        './templates/es6/definition.hbs': {
          target: './definitions',
          extension: '.js',
        },
      },
      perPath: {
        './templates/es6/swagger-tools-controller.hbs': {
          groupBy: 'x-swagger-router-controller',
          target: './controllers',
          extension: '.js',
          operations: ['get', 'put', 'post', 'delete'],
          implementationPath: '../implementation',
        },
      },
    }))
    .pipe(gulp.dest('./examples/es6-swagger-tools/output'));
