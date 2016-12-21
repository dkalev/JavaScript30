const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');

const reload = browserSync.reload;

gulp.task('sass', function () {
    gulp.src('scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}, {errLogToConsole: true}))
        .pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
        .pipe(gulp.dest('public/css'))
        .pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:8080",
        ws: true   //enables websockets
    });
});

gulp.task('default', ['sass', 'nodemon', 'browser-sync'], function () {
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch(["public/js/**/*.js", "public/*.html"], reload);
});

gulp.task('nodemon', function () {
    nodemon({script:'app.js'});
});