const gulp = require('gulp')
const less = require('gulp-less')
const del = require('del')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}
function clean(){
    return del(['dist'])
}
function styles(){
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
}
// scripts
function scripts(){
    return gulp.src(paths.scripts.src, {
        sourcemaps: true
    })
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest))
}

function watch(){
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
}

const build = gulp.series(clean, gulp.parallel(styles, scripts), watch)

exports.clean = clean
exports.styles = styles
exports.watch = watch
exports.scripts = scripts
exports.build = build
exports.default = build
