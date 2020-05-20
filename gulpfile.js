const { parallel, src, dest } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');

function defaultTask(cb) {
  return src('./engineui/theme-default.scss')
        .pipe(sass())
        .pipe(src('./engineui/engine-source/theme-default.css'))
        .pipe(concat('theme-default.css'))
        .pipe(cleanCSS())
        .pipe(dest('./engineui/libs'));
}

function personalTask(cb) {
  
  return src('./engineui/theme-personal.scss')
        .pipe(sass())
        .pipe(src('./engineui/engine-source/theme-personal.css'))
        .pipe(concat('theme-personal.css'))
        .pipe(cleanCSS())
        .pipe(dest('./engineui/libs'))
}

function advancedTask(cb) {
  
  return src('./engineui/theme-advanced.scss')
        .pipe(sass())
        .pipe(src('./engineui/engine-source/theme-advanced.css'))
        .pipe(concat('theme-advanced.css'))
        .pipe(cleanCSS())
        .pipe(dest('./engineui/libs'));
}

const otherFiles = [
  './engineui/engine-source/libs.css',
  './engineui/engine-source/libs.css.map',
  './engineui/engine-source/libs.js',
]

function otherTask (cb) {
  return src(otherFiles)
         .pipe(dest('./engineui/libs'))
}

exports.build = parallel(defaultTask, personalTask, advancedTask, otherTask)