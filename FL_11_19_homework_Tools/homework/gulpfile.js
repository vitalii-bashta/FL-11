const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const minify = require('gulp-minify');
const rename = require("gulp-rename");
const server = require('gulp-webserver');

gulp.task('sass', function(){
    return gulp.src('src/scss/*.scss')
       .pipe(concat('styles.css'))
       .pipe(sass())
       .pipe(cssnano())
       .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function() {
    return gulp.src(['./src/js/main-variables.js', './src/js/add-listeners.js', './src/js/game-starter.js', './src/js/helpers.js'])
      .pipe(concat('app.js'))
      .pipe(babel({presets: ['@babel/env']}))
      .pipe(minify({noSource: true}))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('./dist/js'));
});

gulp.task('images', function() {
    return gulp .src('./src/img/*')
    .pipe(imagemin()) 
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('html', function() {
    return gulp .src('./src/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    gulp.watch("./src/scss/*", gulp.series('sass'));
    gulp.watch("./src/js/*", gulp.series('scripts'));
    gulp.watch('./src/img/*', gulp.series('images'));
    gulp.watch('./src/index.html', gulp.series('html'));
});

gulp.task('server', function() {
    gulp.src('dist')
      .pipe(server({
        livereload: true,
        open: true
      }));
});
  
gulp.task('default', gulp.parallel('sass', 'scripts', 'images', 'html'));
gulp.task('serve-and-watch', gulp.parallel('watch', 'server'));
