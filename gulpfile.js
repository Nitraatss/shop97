let gulp = require(`gulp`);
let sass = require(`gulp-sass`);
let plumber = require(`gulp-plumber`);
let postcss = require(`gulp-postcss`);
let autoprefixer = require(`autoprefixer`);
let minify = require(`gulp-csso`);
let rename = require(`gulp-rename`);
let imagemin = require(`gulp-imagemin`);
let webp = require(`gulp-webp`);
let svgstore = require(`gulp-svgstore`);
let posthtml = require(`gulp-posthtml`);
let include = require(`posthtml-include`);
let babel = require(`gulp-babel`);
let uglify = require(`gulp-uglify`);
let del = require(`del`);
let browserSync = require(`browser-sync`).create();
let rollup = require(`gulp-better-rollup`);
let sourcemaps = require(`gulp-sourcemaps`);
let purify = require(`gulp-purifycss`);
let resolve = require(`rollup-plugin-node-resolve`);
let commonjs = require(`rollup-plugin-commonjs`);

gulp.task(`html`, function (done) {
  return gulp
    .src(`source/**/*.html`)
    .pipe(posthtml([include()]))
    .pipe(gulp.dest(`build`));
});

gulp.task(`style`, function (done) {
  return gulp
    .src(`source/sass/style.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(purify([`build/**/*.js`, `build/**/*.html`]))
    .pipe(
        postcss([
          autoprefixer({
            browsers: [`last 2 versions`, `IE 11`, `Firefox ESR`]
          })
        ])
    )
    .pipe(minify())
    .pipe(rename(`style.min.css`))
    .pipe(gulp.dest(`build/css`))
    .pipe(browserSync.stream());
});

gulp.task(`scripts`, function (done) {
  return gulp
    .src([`source/js/**/index.js`])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rollup({plugins: [resolve(), commonjs()]}, `iife`))
    .pipe(
        babel({
          presets: [`env`]
        })
    )
    .pipe(uglify())
    .pipe(
        rename({
          suffix: `.min`
        })
    )
    .pipe(sourcemaps.write(``))
    .pipe(gulp.dest(`build/js`));
});

gulp.task(`images`, function (done) {
  return gulp
    .src(`source/img/**/*.{png,jpg,jpeg,svg}`)
    .pipe(
        imagemin([
          imagemin.optipng({
            optimizationLevel: 3
          }),
          imagemin.jpegtran({
            progressive: true
          }),
          imagemin.svgo()
        ])
    )
    .pipe(gulp.dest(`build/img`));
});

gulp.task(`sprite`, function () {
  return gulp
    .src([`source/img/**/*.svg`])
    .pipe(imagemin([imagemin.svgo()]))
    .pipe(
        svgstore({
          inlineSvg: true
        })
    )
    .pipe(rename(`sprite.svg`))
    .pipe(gulp.dest(`build/img`));
});

gulp.task(`webp`, function (done) {
  return gulp
    .src(`source/img/**/*.{png,jpg}`)
    .pipe(
        webp({
          quality: 90
        })
    )
    .pipe(gulp.dest(`build/img`));
});

gulp.task(`copy`, function (done) {
  return gulp
    .src([`source/fonts/**`, `source/assets/**`], {
      base: `source`
    })
    .pipe(gulp.dest(`build`));
});

gulp.task(`clean`, function (done) {
  return del(`build`);
});

gulp.task(`clean-js`, function (done) {
  return del(`build/js/**`);
});

gulp.task(`serve`, function (done) {
  browserSync.init({
    server: `build/`,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(`source/sass/**/*.{scss,sass}`, gulp.series(`style`));
  gulp.watch(
      `source/js/**/*.js`,
      gulp.series(`clean-js`, `scripts`, function (done) {
        browserSync.reload();
        done();
      })
  );
  gulp.watch(
      `source/**/*.html`,
      gulp.series(`html`, function (done) {
        browserSync.reload();
        done();
      })
  );

  done();
});

gulp.task(
    `build`,
    gulp.series(
        `clean`,
        `images`,
        `sprite`,
        `webp`,
        `copy`,
        `html`,
        `scripts`,
        `style`
    )
);

gulp.task(`start`, gulp.series(`build`, `serve`));
