const gulp = require("gulp");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const postcss = require("gulp-postcss");
const concat = require("gulp-concat");
const cssnano = require("cssnano");
const browserSync = require("browser-sync").create();

const src = "src";
const dest = "dist";

//Start series
const clean = () => {
  return del([dest]);
};

//Start parallel
const html = () => {
  return gulp
    .src(src + "/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        useShortDoctype: true,
        removeComments: true,
        minifyCSS: true,
      })
    )
    .pipe(gulp.dest(dest));
};

const css = () => {
  return gulp
    .src([src + "/css/styles.css"])
    .pipe(concat("app.min.css"))
    .pipe(postcss([cssnano({ discardComments: { removeAll: true } })]))
    .pipe(gulp.dest(dest + "/css"));
};

const js = () => {
  return gulp
    .src([src + "/js/*.js"])
    .pipe(concat("app.min.js"))
    .pipe(gulp.dest(dest + "/js"));
};

const vendorJs = () => {
  return gulp
    .src(src + "/js/vendor/*.min.js")
    .pipe(gulp.dest(dest + "/js/vendor"));
};
//End parallel
//End series

const reload = (done) => {
  browserSync.reload();
  done();
};

const serve = (done) => {
  browserSync.init({
    server: {
      baseDir: "./" + dest,
      https: true,
      notify: false,
    },
  });
  done();
};

const watch = () => {
  gulp.watch("js/*.js", { delay: 1000 }, gulp.series(js, reload));
  gulp.watch("*.html", { delay: 1000 }, gulp.series(html, reload));
  gulp.watch("css/*.css", { delay: 1000 }, gulp.series(css, reload));
};

exports.default = gulp.series(
  clean,
  gulp.parallel(html, css, js, vendorJs),
  serve,
  watch
);
exports.build = gulp.series(clean, gulp.parallel(html, css, js, vendorJs));
exports.serve = gulp.series(serve);
