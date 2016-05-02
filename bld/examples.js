'use strict';

const gulp = require('gulp');
const templateSet = require('swagger-template-es6-server');
const codegen = require('../task');

module.exports = () =>
  gulp.src(['./examples/waffle-maker/service-contract.yaml'])
    .pipe(codegen(templateSet({
      implementationPath: '../implementation',
    })))
    .pipe(gulp.dest('./examples/waffle-maker'));
