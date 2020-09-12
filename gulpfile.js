const { src, dest, parallel, watch } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');

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

function minifyAndCompressCSS() {
  return src(paths.css.src)
    .pipe(cleanCSS())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(paths.css.dest));
}

function minifyAndCompressJS() {
  return src(paths.js.src)
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(paths.js.dest));
}

function watchFiles() {
  watch(paths.css.src, { ignoreInitial: false }, minifyAndCompressCSS);
  watch(paths.js.src, { ignoreInitial: false }, minifyAndCompressJS);
}

exports.watch = watchFiles;
exports.build = parallel(minifyAndCompressCSS, minifyAndCompressJS);
