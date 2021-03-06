const { src, dest, watch, series, parallel } = require("gulp");
const Fiber = require("fibers");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssdeclsort = require("css-declaration-sorter");
const gcmq = require("gulp-group-css-media-queries");
const mode = require("gulp-mode")();
const browserSync = require("browser-sync");
const pug = require("gulp-pug");
const crypto = require("crypto");
const hash = crypto.randomBytes(8).toString("hex");
const replace = require("gulp-replace");

sass.compiler = require("sass");

const compileSass = (done) => {
  const postcssPlugins = [
    autoprefixer({
      grid: "autoplace",
      cascade: false,
    }),
    cssdeclsort({ order: "alphabetical" }),
  ];
  src("./src/scss/**/*.scss", { sourcemaps: true })
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      sass({
        fiber: Fiber,
        outputStyle: "expanded",
      })
    )
    .pipe(postcss(postcssPlugins))
    .pipe(mode.production(gcmq()))
    .pipe(dest("./dist/css", { sourcemaps: "./sourcemaps" }));
  done();
};

const buildServer = (done) => {
  browserSync.init({
    port: 8080,
    server: { baseDir: "./dist" },

    open: true,
    watchOptions: {
      debounceDelay: 1000,
    },
  });
  done();
};

const browserReload = (done) => {
  browserSync.reload();
  done();
};

const compilePug = (done) => {
  src(["./src/pug/**/*.pug", "!" + "./src/pug/**/_*.pug"])
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(dest("./dist"));
  done();
};

const cacheBusting = (done) => {
  src("./dist/index.html")
    .pipe(replace(/\.(js|css)\?ver/g, ".$1?ver=" + hash))
    .pipe(dest("./dist"));
  done();
};

const watchFiles = () => {
  watch("./src/scss/**/*.scss", series(compileSass, browserReload));
  watch("./src/pug/**/*.pug", series(compilePug, browserReload));
};

module.exports = {
  sass: compileSass,
  pug: compilePug,
  cache: cacheBusting,
  default: parallel(buildServer, watchFiles),
};
