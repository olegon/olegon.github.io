var gulp = require('gulp');

var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');

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
    return gulp.src('./src/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([require('autoprefixer'), require('cssnano')]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('image', function() {
    return gulp.src('src/**/*.{jpeg,jpg,png,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    return gulp.watch('src/**/*', ['default']);
});

gulp.task('default', ['html', 'css', 'image']);
