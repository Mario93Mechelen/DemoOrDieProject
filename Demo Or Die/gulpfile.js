//dependencies inladen
const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const nodemon = require('gulp-nodemon');

//sass conversie naar css
gulp.task('sass', function() {
    return gulp.src('./public/stylesheets/sass/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/css'));
});

//afbeeldingen kleiner maken en in distr map plaatsen
gulp.task('imagemin', function() {
    return gulp.src('./public/images/src/*.*')
    .pipe(changed('./public/images/distr'))
    .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({plugins: [{removeViewBox: true}]})
]))
    .pipe(gulp.dest('./public/images/distr'))
});

//nodemon aanzetten
gulp.task('nodemon', function () {
  nodemon({
    script: 'bin/www'
  , ext: 'js'
  , env: { 'NODE_ENV': 'development' }
  })
});

//taken niet eenmalig uitvoeren maar continue laten "kijken"
gulp.task('watch', function() {
    gulp.watch('./public/stylesheets/sass/**/*.scss', ['sass']),    
    gulp.watch('./public/images/src/**/*.*', ['imagemin']),
    gulp.watch('./**.js', ['nodemon']);
})

//mongodb aanzetten


//eerst alle taken al eens runnen en watch dan opzetten
gulp.task('default', ['sass','imagemin','nodemon','watch']);