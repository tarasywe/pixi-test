var gulp = require("gulp"),
    ts = require("gulp-typescript"),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    watch = require('gulp-watch'),
    tsProject = ts.createProject("tsconfig.json"),
    webpack = require('webpack-stream');

var DIST_DIR = './dist';

var srcHTML = './views/index.html';
var srcCSS = './views/style.css';
var srcAssets = './assets/*';

gulp.task('copy:html', function() {
	gulp.src(srcHTML).pipe(gulp.dest(DIST_DIR));
});

gulp.task('copy:css', function() {
    gulp.src(srcCSS).pipe(gulp.dest(DIST_DIR));
});

gulp.task('copy:assets', function() {
    gulp.src(srcAssets).pipe(gulp.dest(DIST_DIR + '/assets/'));
});

gulp.task("ts:build", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task('webpack', function() {
	return gulp.src('dist/')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['ts:build'], function() {
  return gulp.src('dist/')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function () {
    watch('src/**/*.ts', function() {
        gulp.start('build');
    });
});

gulp.task('connect', function() {
    var server = connect.server({
        root: 'dist/',
        livereload: true
    });

    return gulp.src('dist/')
        .pipe(open({
            uri: 'http://' + server.host + ':' + server.port
        }));
});

gulp.task('default', ['copy:html', 'copy:css', 'copy:assets', 'build', 'connect', 'watch']);