'use strict';
const gulp = require('gulp');
const task = require('../task');

module.exports = () =>
  gulp.src(['./examples/waffle-maker/service-contract.yaml'])
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
          defsRelativeToController: '../definitions',
        },
      },
    }))
    .pipe(gulp.dest('./examples/waffle-maker'));
