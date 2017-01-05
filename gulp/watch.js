'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

function isChangeEvent(event) {
    return event.type === 'changed';
}

gulp.task('deploy:watch', ['deploy'], function () {
    gulp.watch([path.join(conf.paths.src, '/**/*.js'), path.join(conf.paths.src, '/**/*.css')], function(event) {
        if(isChangeEvent(event)) {
            gulp.start('deploy');
        }
    });
});