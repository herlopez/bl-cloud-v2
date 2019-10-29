let gulp = require('gulp');
let sass = require('gulp-sass');
let prefix = require('gulp-autoprefixer');
let notify = require("gulp-notify");
let babel = require('gulp-babel');
let plumber = require('gulp-plumber');
let concat = require('gulp-concat');

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
gulp.task('concat', function() {
    return gulp.src(['app/UI/tools.js','app/UI/app.js', 'app/UI/view-switcher.js', 'app/UI/views/sign-in.js', 'app/UI/views/password-reset-success.js', 'app/UI/views/sign-up.js', 'app/UI/views/project.js',  'app/UI/views/projects.js', 'app/UI/views/forgot-password.js', 'app/UI/components/input.js', 'app/UI/profile.js', 'app/UI/window-switcher.js', "app/UI/commands.js", "app/UI/message-processor.js", "app/UI/functions/projects.js",  "app/UI/functions/project.js"])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/js'));
});
gulp.task('babel', () =>
    gulp.src(['app/UI/tools.js','app/UI/app.js', 'app/UI/view-switcher.js', 'app/UI/views/sign-in.js', 'app/UI/views/password-reset-success.js', 'app/UI/views/sign-up.js', 'app/UI/views/project.js',  'app/UI/views/projects.js', 'app/UI/views/forgot-password.js', 'app/UI/components/input.js', 'app/UI/profile.js', 'app/UI/window-switcher.js', "app/UI/commands.js", "app/UI/message-processor.js", "app/UI/functions/projects.js",  "app/UI/functions/project.js"])
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

gulp.task('default',  gulp.series(['sass', 'autoprefixer', 'babel', 'concat'], function () {
    gulp.watch('sass/**/*.scss',  gulp.series(['sass', 'autoprefixer']));
    gulp.watch('app/UI/**/*.js',  gulp.series(['babel', 'concat']));
}));