/*global require*/

var gulp = require('gulp');
var through = require('through2');
require('coffee-script').register();
var del = require('del');

var changed = require('gulp-changed');
var csslint = require('gulp-csslint');
var debug = require('gulp-debug');
var fileinclude = require('gulp-file-include');
var html5Lint = require('gulp-html5-lint');
var resemble = require('./lib/gulp-resemble');
var runSequence = require('run-sequence');

var app = require('./lib/app');

// Test

gulp.task('html5-lint', function() {
  return gulp.src('dest/*.html')
    .pipe(html5Lint({ errorsOnly: true }));
});

gulp.task('csslint', function() {
  gulp.src('dest/assets/*.css')
    .pipe(csslint({
      'box-model': false
    }))
    .pipe(csslint.reporter());
});

gulp.task('csslint-fail', function() {
  gulp.src('dest/assets/*.css')
    .pipe(csslint({
      'box-model': false
    }))
    .pipe(csslint.reporter('fail'));
});


gulp.task('resemble', function() {
  return gulp.src('src/*.html')
    .pipe(resemble({ misMatch: 100, fail: true }));
});

// Build
gulp.task('clean', function () {
  return del(['dest/**/*']);
});

gulp.task('fileinclude', function() {
  gulp.src('src/*.html')
    .pipe(changed('dest'))
    .pipe(debug())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/components'
    }))
    .pipe(gulp.dest('dest'));
});

gulp.task('copyAssets', function() {
  gulp.src('src/assets/**/*')
    .pipe(changed('dest/assets'))
    .pipe(debug())
    .pipe(gulp.dest('dest/assets'));
});

// Serve

gulp.task('servePages', function() {
  app();
});

gulp.task('watch', function(){
  gulp.watch('./src/**/*', ['build']);
});

gulp.task('test', function(cb) {
  runSequence('clean', ['html5-lint', 'csslint'], cb);
});

gulp.task('test-machine', function(cb) {
  runSequence('clean', ['html5-lint', 'csslint-fail'], cb);
});

gulp.task('build', ['fileinclude', 'copyAssets']);
gulp.task('serve', ['servePages', 'watch']);

gulp.task('default', function(cb) {
  runSequence('clean', 'build', 'serve', cb);
});
