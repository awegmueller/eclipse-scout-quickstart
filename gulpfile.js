// FIXME more dynamic dependencies

var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var insert = require('gulp-insert');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();
                                
gulp.task('serve', ['build-js', 'clean-css', 'build-less', 'concat-css', 'watch'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('reload', function() {
  browserSync.reload();
});

/**
 * Checks for file-changes and then triggers one more tasks. In the end
 * we always trigger the reload task so browser sync can reload the browser
 * page.  
 */
gulp.task('watch', function() {
    gulp.watch('*.html', ['reload']);
    gulp.watch('src/**/*.less', ['build-less', 'concat-css', 'reload']);
    gulp.watch('src/**/*.js', ['build-js', 'reload']);
});

/**
 * This is the default task which is run when someone simply types 'gulp'
 * in the project directory. Other tasks can be executed directly with
 * 'gulp [task-name]'.  
 */ 
gulp.task('default', function() {
  gulp.start('serve');
});

// ### JavaScript ### //

gulp.task('build-js', function() {
  return gulp.src('src/**/*.js')
      .pipe(concat('videogames.js'))
      // Add IIFE (Immediately-Invoked Function Expression)
      .pipe(insert.wrap('(function(videogames, $, undefined) {\n', '\n}(window.videogames = window.videogames || {}, jQuery));'))
      .pipe(gulp.dest('build/js'));
});

gulp.task('minify-js', function() {
  // FIXME check why file gets so huge with sourcemaps
  return gulp.src('build/js/videogames.js')
      .pipe(rename({suffix: '.min'}))
      // .pipe(sourcemaps.init())
      .pipe(uglify())
      // .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/js'));
});

// ### CSS ### //

// creates a single CSS file for each LESS file
gulp.task('build-less', function() {
  return gulp.src('src/**/*.less')
      .pipe(less({
        paths: ['src']
      }))
      .pipe(gulp.dest('build/css'));
});

gulp.task('clean-css', function() {
  return gulp.src('build/css/videogames.css')
      .pipe(clean());
});

// takes all the single css files and concats them to a single eclipse-scout.css
gulp.task('concat-css', ['clean-css'], function() {
  return gulp.src('build/**/*.css')
      .pipe(concat('videogames.css'))
      .pipe(gulp.dest('build/css'));
});

gulp.task('minify-css', function() {
  return gulp.src('build/css/videogames.css')
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/css'));
});