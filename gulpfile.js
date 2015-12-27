/*global require*/

var gulp = require('gulp');
var through = require('through2');
require('coffee-script').register();
var html5Lint = require('gulp-html5-lint');
var csslint = require('gulp-csslint');

var resemble = require('./lib/gulp-resemble');
var app = require('./lib/app');

gulp.task('html5-lint', function() {
  return gulp.src('src/*.html')
    .pipe(html5Lint({ errorsOnly: true }));
});

gulp.task('csslint', function() {
  gulp.src('src/assets/*.css')
    .pipe(csslint({
      'box-model': false
    }))
    .pipe(csslint.reporter());
});

gulp.task('csslint-fail', function() {
  gulp.src('src/assets/*.css')
    .pipe(csslint({
      'box-model': false
    }))
    .pipe(csslint.reporter('fail'));
});


gulp.task('resemble', function() {
  return gulp.src('src/*.html')
    .pipe(resemble({ misMatch: 100, fail: true }));
});

gulp.task('serve', function() {
  app();
});



gulp.task('test', ['html5-lint', 'csslint']);
gulp.task('test-machine', ['html5-lint', 'csslint-fail']);

gulp.task('default', ['test']);
