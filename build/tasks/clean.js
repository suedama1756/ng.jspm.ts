'use strict';

var gulp = require('gulp'),
	del = require('del');

function clean(config) {
	gulp.task('clean:dist', () => {
		return del([config.paths.dist('*')], {
			force: true
		});
	});

	gulp.task('clean:jspm', () => {
		return del([config.paths.jspm('*'), '!' + config.paths.jspm('modules')], {
			force: true
		});
	});

	gulp.task('clean', [
		'clean:jspm',
		'clean:dist'
	]);
}

module.exports = clean;