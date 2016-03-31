'use strict';

const eslint = require('gulp-eslint');
const gulp = require('gulp');
const Instrumenter = require('isparta').Instrumenter;
const istanbul = require('gulp-istanbul');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');
const mocha = require('gulp-mocha');
const settings = require('./settings').gulpSettings;
const stylish = require('jshint-stylish');

function runTests(tests) {
  return gulp.src(settings.paths.scripts)
  .pipe(istanbul({ // Covering files
    instrumenter: Instrumenter,
    includeUntested: true
  }))
  .pipe(istanbul.hookRequire()) // Force `require` to return covered files
  .on('finish', () => {
    gulp.src(tests, { read: false })
    .pipe(mocha({ reporter: 'spec', timeout: 15000 }))
    .pipe(istanbul.writeReports({
      dir: settings.paths.coverage,
      reportOpts: { dir: settings.paths.coverage },
      reporters: ['text', 'text-summary', 'json', 'html']
    }));
  });
}


gulp.task('jshint', () => (
    gulp.src(settings.filesToChecks)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
  )
);

gulp.task('jscs', () => (
  gulp.src(settings.filesToChecks)
    .pipe(jscs({ fix: true }))
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'))
  )
);

gulp.task('tests', () => {
  process.env.NODE_ENV = 'test';
  return runTests(settings.paths.tests);
});

gulp.task('eslint', () => (
   gulp.src(['**/*.js', '!node_modules/**', '!coverage/**'])
    .pipe(eslint())
    .pipe(eslint.format('table'))
    .pipe(eslint.failAfterError())
));

gulp.task('test', ['lint', 'tests']);
gulp.task('lint', ['jshint', 'jscs', 'eslint']);

