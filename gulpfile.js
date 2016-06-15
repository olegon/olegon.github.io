var gulp = require('gulp');

var htmlmin = require('gulp-htmlmin');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var ghPages = require('gulp-gh-pages');

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            conservativeCollapse: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
    return gulp.src('./src/css/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(postcss([require('autoprefixer'), require('cssnano')]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('image', function() {
    return gulp.src('src/**/*.{jpeg,jpg,png,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    return gulp.watch('src/**/*', ['default']);
});

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages({
            branch: 'master'
        }));
});

gulp.task('default', ['html', 'css', 'image']);
