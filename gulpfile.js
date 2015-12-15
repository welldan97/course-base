/*global require*/

var gulp = require('gulp');

var html5Lint = require('gulp-html5-lint');
var csslint = require('gulp-csslint');

gulp.task('html5-lint', function() {
  return gulp.src('*.html')
    .pipe(html5Lint());
});

gulp.task('csslint', function() {
  gulp.src('assets/*.css')
    .pipe(csslint({
      'box-model': false
    }))
    .pipe(csslint.reporter());
});

gulp.task('csslint-fail', function() {
  gulp.src('assets/*.css')
    .pipe(csslint({
      'box-model': false
    }))
    .pipe(csslint.reporter('fail'));
});

gulp.task('test', ['html5-lint', 'csslint']);
gulp.task('test-machine', ['html5-lint', 'csslint-fail']);
gulp.task('default', ['test']);
