'use strict';

var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var less = require('gulp-less');

gulp.task('default', ['connect', 'sass', 'watch']);

var paths = {
  sass: ['./public/src/app/assets/styles/scss/**/*.scss'],
  htmlTemplates: ['./public/src/index.html','./public/src/app/**/*.html'],
  scripts: ['./public/src/app/**/*.js']
};

gulp.task('connect', function() {
  connect.server({
    livereload: true,
    root: './public/src/'
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['reload', 'compile-sass']);
  gulp.watch(paths.htmlTemplates, ['reload']);
  gulp.watch(paths.scripts, ['reload']);
});

gulp.task('reload', function(){
  gulp.src('./public/src/index.html')
    .pipe(connect.reload());
});

gulp.task('compile-sass', ['sass'], function(done) {
  gulp.src('./public/src/app/assets/styles/scss/main.scss')
    .pipe(less())
    .pipe(gulp.dest('./public/src/app/assets/styles/css/'))
    .on('end', done);
});

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', done)
    .pipe(sourcemaps.write())
    .on('error', done)
    .pipe(gulp.dest('./public/src/app/assets/styles/css/'))
    .on('error', done)
    .on('end', done);
});
