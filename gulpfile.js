const gulp = require('gulp');
const webp = require('gulp-webp');
const minify = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

gulp.task('webp', () =>
    gulp.src('src/img/*.{jpg,png}')
        .pipe(webp())
        .pipe(rename({extname: '.webp'}))
        .pipe(gulp.dest('dist/img'))
);

gulp.task('minify', () => {
    return gulp.src('src/css/*.css')
      .pipe(minify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('dist/css'));
  });

  gulp.task('minify-js', () => {
    return gulp.src('src/js/*.js')
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('dist/js'));
  });

  gulp.task('renameHTML', function() {
    return gulp.src('src/*.html') 
      .pipe(replace(/\.css/g, '.min.css'))
      .pipe(replace(/\.jpg/g, '.webp'))
      .pipe(replace(/src\/js\//g, 'js/')) 
      .pipe(replace(/\.js/g, '.min.js'))
      .pipe(gulp.dest('dist/')); 
  });

  gulp.task('default', gulp.series('webp', 'minify', 'minify-js', 'renameHTML'));




// si package.json existe {
//     npm install
// } sinon {
// npm install -g gulp
// npm init
// npm install --save-dev gulp
// npm install --save-dev gulp-*plugin*
// }