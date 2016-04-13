'use strict';

var gulp = require('gulp'),
	gulpSass = require('gulp-sass'),
	htmlReplace = require('gulp-html-replace'),
	rename = require('gulp-rename'),
	path = require('path'),
	autoPrefixer = require('gulp-autoprefixer');

function sass(config) {
	// set sass options
	var sassOptions = config.isRelease ? {
		sourceMapEmbed : true,
		sourceMapContents : true,
		outputStyle : 'compressed'
	} : {
		outputStyle : 'nested'
	};

	// generate output file name
	var sassOutputFilename = config.pkg.name +
		'-' +
		config.pkg.version +
		'.css';

	// update bundle information
	config.bundle = config.bundle || {};
	config.bundle.sassOutputPath = config.paths.dist('assets',
		sassOutputFilename);

	gulp.task('build:sass:core', cb => {
		return gulp.src(config.paths.assets('sass', 'main.scss'))
			.pipe(gulpSass(sassOptions)
				.on('error', gulpSass.logError))
			.pipe(autoPrefixer('last 2 versions', '> 1%'))
			.pipe(rename(sassOutputFilename))
			.pipe(gulp.dest(config.paths.dist('assets')));
	});

	gulp.task('build:sass', config.watch ? 
		['build:sass:watch'] : ['build:sass:core']);

	gulp.task('build:sass:watch', ['build:sass:core'], () => {
		gulp.watch(config.paths.assets('sass/**/*.scss'), ['build:sass:core']);
	});
}

module.exports = sass;