const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

//pipe the css into autoprefixer and save it in build dir 
gulp.task('style', () =>
    gulp.src('css/styles.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build'))
);

//watch for any changes in styles.css and start style task
gulp.task('watch', () =>
	gulp.watch('css/styles.css', ['style'])
);