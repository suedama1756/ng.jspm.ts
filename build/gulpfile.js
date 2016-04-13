'use strict';

var config = require('./config'),
	gulp = require('gulp'),
	taskListing = require('gulp-task-listing');

// import tasks
[
	'build',
	'bundle',
	'clean',
	'host'
].forEach(x => {
	require('./tasks/' + x)(config);
});

// confgure default
gulp.task('default', [
	'host',
	'build'
]);

// configure help
gulp.task('help', taskListing);