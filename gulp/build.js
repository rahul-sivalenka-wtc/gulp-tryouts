var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'del']
});
var conf = require('./conf');

gulp.task('deploy', ['build', 'clean'], function () {
    var pattern = '*';//'app-*.js';
    var jsPattern = '*.js';
    var cssPattern = '*.css';

    return gulp.src(path.join(conf.paths.dist, pattern))
        .pipe($.if(jsPattern, $.rename(conf.names.buildOutput.js)))
        .pipe($.if(cssPattern, $.rename(conf.names.buildOutput.css)))
        .pipe($.size({ title: path.join(conf.paths.output, '/'), showFiles: true }))
        .pipe(gulp.dest(conf.paths.output));
});

gulp.task('build', ['clean'], function () {
    var pattern = '*';
    var jsFilter = $.filter('**/*.js', { restore: true });
    var cssFilter = $.filter('**/*.css', { restore: true });
    return gulp.src(path.join(conf.paths.src, pattern))
        .pipe($.size({ title: path.join(conf.paths.src, '/'), showFiles: true }))
        .pipe(jsFilter)
        .pipe($.concat('app.js'))
        .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }))
        .pipe(gulp.dest(conf.paths.dist))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.concat('app.css'))
        .pipe($.cssmin())
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }))
        .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('clean', function () {
    return $.del([
        path.join(conf.paths.dist, '/')
    ]);
});

gulp.task('clean:output', function () {
    return $.del([
        path.join(conf.paths.output, '/')
    ]);
})