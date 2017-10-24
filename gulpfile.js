var gulp = require('gulp');

var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

var include = require('gulp-include');

var sass = require('gulp-sass');

var sourcemaps = require('gulp-sourcemaps');

var index = require('gulp-index');

var fileData = require('gulp-pub-list');

var minify = require('gulp-minify');

/**
 * reload
 */

// livereload
gulp.task('reload:livereload', function(){
  gulp.src(['html/*', 'guide/*', 'css/*', 'js/*', '*'])
      .pipe( livereload() );
});

// watch
gulp.task('reload:watch', function() {
  livereload.listen();
  gulp.watch('*', ['reload:livereload']);
  gulp.watch('html_src/**', ['build:include:html', 'reload:livereload']);
  gulp.watch('guide_src/**', ['build:include:guide', 'reload:livereload']);
  gulp.watch('css_src/**', ['build:sass:dev', 'reload:livereload']);
  gulp.watch('js_src/**', ['build:jsCompress', 'reload:livereload']);
});

/**
 * build default
 */

// build site html including header/footer
gulp.task('build:include:html', function(){
  gulp.src("html_src/*.html")
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest("html/"));
});

// build guide html including header/footer
gulp.task('build:include:guide', function(){
  gulp.src("guide_src/*.html")
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest("guide/"));
});

// build sass for dev
gulp.task('build:sass:dev', function(){
  return gulp.src('css_src/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('static/css/'));
});

// build js compress
gulp.task('build:jsCompress', function(){
  gulp.src('js_src/*.js')
      .pipe(minify({
        ext:{
          src : '.debug.js',
          min : '.min.js'
        }
      }))
      .pipe(gulp.dest('static/js'));
});

/**
 * build seperately
 */

// build file list to json data
gulp.task('seperate:build:fileListJson', function() {
  fileData();
});

// copy js library file
gulp.task('seperate:copy:jsLib', function() {
  return gulp.src('js_src/lib/*.*')
      .pipe(gulp.dest('static/js/lib/'));
});

// copy file list json
gulp.task('seperate:copy:fileListJson', function(){
  return gulp.src('guide_src/*.json')
      .pipe(gulp.dest('guide/'));
});

/**
 * release
 */

// release site html
gulp.task('release:html', function(){
  return gulp.src('html/*.*')
      .pipe(gulp.dest('release/html/'));
});

// release guide html
gulp.task('release:guide', function(){
  return gulp.src('guide/*.*')
      .pipe(gulp.dest('release/guide/'));
});

// release sass
gulp.task('release:sass', function(){
  return gulp.src('css_src/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('release/static/css/'));
});

// release js
gulp.task('release:js', function(){
  return gulp.src('js/**')
      .pipe(gulp.dest('release/static/js/'));
});

// release images
gulp.task('release:images', function(){
  return gulp.src('images/*.*')
      .pipe(gulp.dest('release/static/images/'));
});

// release fonts
gulp.task('release:fonts', function(){
  return gulp.src('fonts/**')
      .pipe(gulp.dest('release/static/fonts/'));
});


/**
 * run task
 */

gulp.task('default', ['build:include:html', 'build:include:guide', 'build:sass:dev', 'build:jsCompress', 'reload:watch']);

gulp.task('release', ['release:html', 'release:guide', 'release:sass', 'release:js', 'release:images', 'release:fonts']);