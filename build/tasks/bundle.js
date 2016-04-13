'use strict';

var gulp = require('gulp'),
	runSequence = require('run-sequence');

function bundle(config) {
	[
		'app',
		'html'
	].forEach(x => {
		require('./bundle/' + x)(config);
	});

	gulp.task('bundle', cb => {
		runSequence(
			'clean',
			'build', [
				'bundle:app',
				'bundle:html'
			], cb);
	})
}

module.exports = bundle;