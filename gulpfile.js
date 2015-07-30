'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var inlinesource = require('gulp-inline-source');
var bump = require('gulp-bump');

gulp.task('jshint', function () {
  return gulp.src([
      'src/*.js',
      'src/*.html'
    ])
    .pipe($.jshint.extract()) // Extract JS from .html files
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('inlinesource', function () {
  var options = {
    compress: false
  };
  return gulp.src('./src/*.html')
    .pipe(inlinesource(options))
    .pipe(gulp.dest('./'));
});

gulp.task('bump', function(){
  gulp.src('./bower.json')
  .pipe(bump())
  .pipe(gulp.dest('./'));
});

gulp.task('default', function (callback) {
  runSequence(
    'jshint',
    'inlinesource',
    callback);
});
