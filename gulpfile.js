var gulp = require('gulp');

var del = require('del');
var path = require('path');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

var paths = {
  scripts: 'client/js/**/*.js',
  images: 'client/img/**/*',
  styles: 'client/less/*.less',
  templates: 'client/templates/*.html'
};

// Remove the build
gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('clean:css', function() {
  return del('build/css/*.css');
});

gulp.task('clean:fonts', function() {
  return del('build/css/fonts/*');
});

gulp.task('clean:templates', function() {
  return del('build/templates');
});

// Minify and copy all JavaScript
gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

// Convert less to css
gulp.task('less', ['clean:css', 'copy:bootstrap', 'copy:fonts'], function() {
  return gulp.src(paths.styles)
    .pipe(less()
      .on('error', util.log))   
    .pipe(concat('main.css'))
    .pipe(minifyCSS({advanced: false}))
    .pipe(gulp.dest('build/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.styles, ['less']);
});

gulp.task('copy:fonts', ['clean:fonts'], function() {
  return gulp.src('client/less/fonts/*')
    .pipe(gulp.dest('build/css/fonts'));
});

gulp.task('copy:bootstrap', function() {
  return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('build/css'));
});

gulp.task('templates', ['clean:templates'], function() {
  return gulp.src(paths.templates)
    .pipe(gulp.dest('build/templates'));
});
  
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['templates', 'scripts', 'images', 'less']);