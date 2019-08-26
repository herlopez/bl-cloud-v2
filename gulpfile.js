let gulp = require('gulp');
let sass = require('gulp-sass');
let prefix = require('gulp-autoprefixer');
let notify = require("gulp-notify");
let babel = require('gulp-babel');
let plumber = require('gulp-plumber');

gulp.task('autoprefixer', () =>
    gulp.src('public/css/main.css')
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/css/'))
);

gulp.task('sass', function() {
    return gulp.src('sass/main.scss')
        .pipe(sass({ errLogToConsole: false, }))
        .on('error', function(err) {
            notify().write(err);
            this.emit('end');
        })
        .pipe(gulp.dest('public/css'))
});

gulp.task('babel', () =>
    gulp.src('app/UI/app.js')
        .pipe(plumber())
        .pipe(babel({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }))
        .pipe(gulp.dest('public/js'))
);

gulp.task('default',  gulp.series(['sass', 'autoprefixer', 'babel'], function () {
    gulp.watch('sass/**/*.scss',  gulp.series(['sass', 'autoprefixer']));
    gulp.watch('app/UI/**/*.js',  gulp.series(['babel']));
}));