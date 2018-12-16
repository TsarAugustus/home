let gulp = require('gulp');
let pug = require('gulp-pug');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let browserSync = require('browser-sync').create();

let paths = {
  htmls: {
    src: 'src/htmls/**/*.pug',
    dest: 'public/'
  },
  styles: {
    src: 'src/styles/**/*.sass',
    dest: 'public/styles/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'public/scripts/'
  }
}

function htmls() {
  return gulp.src(paths.htmls.src)
  .pipe(pug())
  .pipe(gulp.dest(paths.htmls.dest))
  .pipe(browserSync.stream());
}

function styles() {
  return gulp.src(paths.styles.src)
  .pipe(sass())
  .pipe(rename({
    basename: 'main',
    suffix: '.min'
  }))
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(browserSync.stream())
}

function scripts() {
  return gulp.src(paths.scripts.src)
  .pipe(uglify())
  .pipe(concat('main.min.js'))
  .pipe(gulp.dest(paths.scripts.dest))
  .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: "./public"
  });

  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.htmls.src, htmls);
}

gulp.task('serve', serve);
