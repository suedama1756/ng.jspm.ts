'use strict';

var config = require('./config'),
	gulp = require('gulp'),
	taskListing = require('gulp-task-listing');

// import tasks
[
	'build',
	'bundle',
	'test',
	'clean',
	'server'
].forEach(x => {
	require('./tasks/' + x)(config);
});

// confgure default
gulp.task('default', [
	'server',
	'build'
]);

// configure help
gulp.task('help', taskListing);