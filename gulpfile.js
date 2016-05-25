var gulp = require('gulp');

var assetsDev = '';
var assetsProd = '';

var appDev = 'typescript/';
var appcss = 'css/';
var appScss = 'scss/';
var apphtml = 'html/';
var appProd = 'app/';

/* Mixed */
var ext_replace = require('gulp-ext-replace');

/* CSS */
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');

/* JS & TS */
var jsuglify = require('gulp-uglify');
var typescript = require('gulp-typescript');

/* Images */
var imagemin = require('gulp-imagemin');

var concat = require('gulp-concat');

var tsProject = typescript.createProject('tsconfig.json');

//gulp.task('build-css', function () {
//    return gulp.src(appcss + '**/*.css')
//        .pipe(gulp.dest(appProd));
//});

gulp.task('build-css', function () {
    return gulp.src(appScss + '**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(postcss([precss, autoprefixer, cssnano]))
        .pipe(sourcemaps.write())
        .pipe(ext_replace('.css'))
        .pipe(gulp.dest(appProd));
});

gulp.task('build-ts', function () {


    return gulp.src(appDev + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        .pipe(jsuglify())
        //.pipe(concat('main.js'))
        .pipe(gulp.dest(appProd));
});

gulp.task('build-img', function () {
    return gulp.src(assetsDev + 'img/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(assetsProd + 'img/'));
});

gulp.task('build-html', function () {
    return gulp.src(apphtml + '**/*.html')
        .pipe(gulp.dest(appProd));
});

gulp.task('watch', function () {
    gulp.watch(appDev + '**/*.ts', ['build-ts']);
    gulp.watch(appScss + '**/*.scss', ['build-css']);
	gulp.watch(apphtml + '**/*.html', ['build-html']);
    gulp.watch(assetsDev + 'img/*', ['build-img']);
});

gulp.task('default', ['watch', 'build-ts', 'build-css', 'build-html']);
gulp.task('build', ['build-ts', 'build-css', 'build-html']);
