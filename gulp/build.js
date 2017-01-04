var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();

var conf = {
    paths: {
        build: 'build',
        output: 'output'
    },
    names: {
        buildOutput: {
            js: 'app.js',
            css: 'app.css'
        }
    }
};

gulp.task('deploy', function() {
    var pattern = '*';//'app-*.js';
    var jsPattern = '*.js';
    var cssPattern = '*.css';
    
    return gulp.src(path.join(conf.paths.build, pattern))
            .pipe($.if(jsPattern, $.rename(conf.names.buildOutput.js)))
            .pipe($.if(cssPattern, $.rename(conf.names.buildOutput.css)))
            .pipe(gulp.dest(conf.paths.output));
});