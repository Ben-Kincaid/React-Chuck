
var browserify = require('browserify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync');

/* pathConfig*/
var entryPoint = './src/js/main.js',
    browserDir = './',
    sassWatchPath = './src/scss/*.scss',
    htmlWatchPath = './build/*.html';
  
/**/


gulp.task('browser-sync', function () {
    const config = {
        server: { baseDir: browserDir }
    };

    return browserSync(config);
});

gulp.task('sass', function () {
    return gulp.src(sassWatchPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', function () {
  
    gulp.watch(sassWatchPath, ['sass']);
    gulp.watch(htmlWatchPath, function () {
        return gulp.src('')
            .pipe(browserSync.reload({ stream: true }))
    });
});

gulp.task('run', ['js', 'sass', 'watch', 'browser-sync']);