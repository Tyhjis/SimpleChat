var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

var options = {
  entries: ['./client-src/js/app.js']
};

var opts = Object.assign({}, watchify.args, options);
var b = watchify(browserify(opts));

gulp.task('default', ['js', 'sass:watch']);

gulp.task('js', bundle);

// Compile styles. SCSS is used.
gulp.task('sass', () => {
  return gulp.src('./client-src/styles/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/styles/'));
});

// Watching sass files.
gulp.task('sass:watch', () => {
  gulp.watch('./client-src/styles/**/*.scss', ['sass']);
});

// Browserify watch.
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify error.'))
    .pipe(source('app.bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js/'));
}
