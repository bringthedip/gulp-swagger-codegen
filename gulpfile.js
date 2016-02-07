'use strict';

const documentation = require('./bld/documentation');
const examples = require('./bld/examples');
const instrument = require('./bld/instrument-coverage');
const lint = require('./bld/lint');
const lintBuild = require('./bld/lint-build');
const lintTests = require('./bld/lint-tests');
const test = require('./bld/test');
const gulp = require('gulp');

gulp.task('cover', instrument);
gulp.task('docs', documentation);
gulp.task('lint-code', lint);
gulp.task('lint-build', lintBuild);
gulp.task('lint-tests', lintTests);
gulp.task('test', ['lint-tests', 'cover'], test);

gulp.task('build', ['docs', 'lint-build', 'lint-code', 'test']);
gulp.task('examples-raw', examples);
gulp.task('examples', ['build'], examples);
gulp.task('pre-commit', ['build', 'examples']);
gulp.task('default', ['build', 'examples']);
