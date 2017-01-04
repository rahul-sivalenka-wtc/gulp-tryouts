var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();

var conf = {
    paths: {
        build: 'build',
        output: 'output'
    },
    names: {
        outputApp: 'app.js'
    }
};

gulp.task('deploy', function() {
    return gulp.src(path.join(conf.paths.build, 'app-*.js')) //, { base: conf.paths.build })
            .pipe($.rename(conf.names.outputApp))
            .pipe(gulp.dest(conf.paths.output));
});