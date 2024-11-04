import { parallel, src, dest } from 'gulp';

import rename from 'gulp-rename';

import uglify from 'gulp-uglify';
import babel from 'gulp-babel';

import cssNano from 'gulp-cssnano';
import autoprefixer from 'gulp-autoprefixer';
import gulpSass from 'gulp-sass';
import * as _sass from 'sass';

import webp from 'gulp-webp';

function sass(...args) {
    return gulpSass(_sass)(args);
}

export function processJS(cb) {
   return src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(uglify())
        .pipe(dest('./dist'));
}

export function processCSS(cb) {
   return src('./src/scss/*.scss')
        .pipe(sass().on('error', console.error))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(cssNano())
        .pipe(dest('./dist'));
}

export function optimizeImages(cb) {
    return src('./assets/images/*')
        .pipe(webp())
        .pipe(rename({ extname: '.webp'}))
        .pipe(dest('./dist/images'))
}

export default parallel(
     processJS,
     processCSS,
     optimizeImages,
);
