const { src, dest, parallel, watch } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const gulpBrotli = require('gulp-brotli');
const zlib = require('zlib');

const paths = {
  css: {
    src: 'assets/css/*.css',
    dest: 'dist/css/',
  },
  js: {
    src: 'assets/js/*.js',
    dest: 'dist/js/',
  },
};

/*
 * Task to Minify and Compress CSS
 * This task takes a file suppose styles.css from assets/css
 * Minifies it and compresses the file using Brotli Algorithm
 * And saves the file as styles.min.css.br in dist/css directory
 */
function minifyAndCompressCSS() {
  return src(paths.css.src)
    .pipe(cleanCSS())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulpBrotli(brotliOptions()))
    .pipe(rename({ extname: '.br' }))
    .pipe(dest(paths.css.dest));
}

/*
 * Task to Minify and Compress JavaScript
 * This task takes a file suppose main.js from assets/js
 * Minifies it and compresses the file using Brotli Algorithm
 * And saves the file as main.min.js.br in dist/js directory
 */
function minifyAndCompressJS() {
  return src(paths.js.src)
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulpBrotli(brotliOptions()))
    .pipe(rename({ extname: '.br' }))
    .pipe(dest(paths.js.dest));
}

// task to watch files for change in dev environment
function watchFiles() {
  watch(paths.css.src, { ignoreInitial: false }, minifyAndCompressCSS);
  watch(paths.js.src, { ignoreInitial: false }, minifyAndCompressJS);
}

function brotliOptions() {
  return {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
    },
  };
}

// export tasks so they are available in command line
exports.watch = watchFiles;
exports.build = parallel(minifyAndCompressCSS, minifyAndCompressJS);
