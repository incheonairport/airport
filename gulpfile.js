var gulp = require('gulp');

var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

var include = require('gulp-include');

var sass = require('gulp-sass');

var sourcemaps = require('gulp-sourcemaps');

var index = require('gulp-index');

var pubList = require('gulp-pub-list');

//var concat = require('gulp-concat');

// 새로 고침
gulp.task('livereload', function(){
  gulp.src(['html/*', 'css/*', 'js/*', '*'])
      .pipe( livereload() );
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('*', ['livereload']);
  gulp.watch('html_src/**', ['include:html', 'livereload']);
  gulp.watch('css_src/**', ['sass', 'livereload']);
  //gulp.watch('js_src/**', ['jsconcat', 'livereload']);
  gulp.watch('guide_src/**', ['include:guide', 'livereload']);
});

// html - header, footer, 공통영역 분리
gulp.task('include:html', function(){
  gulp.src("html_src/*.html")
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest("html/"));
});

// guide - header, footer 공통영역 분리
gulp.task('include:guide', function(){
  gulp.src("guide_src/*.html")
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest("guide/"));
});

// sass 실행
gulp.task('sass', function(){
  return gulp.src('css_src/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('css/'));
});

gulp.task('buildPubList', function() {
  pubList();
});

// concat 실행

// copy
gulp.task('copy:jsLib', function() {
  return gulp.src('js_src/lib/*.*')
      .pipe(gulp.dest('js/lib/'));
});

gulp.task('copy:jsonData', function(){
  return gulp.src('guide_src/data/*.*')
      .pipe(gulp.dest('guide/data/'));
});

gulp.task('default', ['livereload', 'include:html', 'include:guide', 'sass', 'watch']);