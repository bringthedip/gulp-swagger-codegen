'use strict';

const config = require('config');
const eslint = require('gulp-eslint');
const gulp = require('gulp');

module.exports = function runLinting() {
  return gulp.src(config.get('build.linting.testPaths'))
  .pipe(eslint({
    extends: 'airbnb',
    rules: {
      'guard-for-in': 0,
      'no-loop-func': 0,
      strict: [0, 'global'],
    },
    ecmaFeatures: {
      modules: false,
    },
    env: {
      es6: true,
      mocha: true,
    },
  }))
  .pipe(eslint.format(config.get('build.linting.formatter')))
  .pipe(eslint.failAfterError());
};
