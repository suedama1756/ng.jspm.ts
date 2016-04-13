'use strict';

var gulp = require('gulp');

function test(config) {
	[
		'unit'
	].forEach(x => {
		require('./test/' + x)(config);
	});

	gulp.task('test', ['test:unit']);
}

module.exports = test;