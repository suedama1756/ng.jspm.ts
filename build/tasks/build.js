'use strict';

var gulp = require('gulp');

function build(config) {
	[
		'sass',
		'tsc',
		'templates'
	].forEach(x => {
		require('./build/' + x)(config);
	});

	gulp.task('build', [
		'build:sass',
		'build:tsc',
		'build:templates'
	]);
}

module.exports = build;