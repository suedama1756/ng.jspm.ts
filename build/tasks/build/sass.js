'use strict';

var gulp = require('gulp'),
	gulpSass = require('gulp-sass'),
	htmlReplace = require('gulp-html-replace'),
	rename = require('gulp-rename'),
	path = require('path'),
	autoPrefixer = require('gulp-autoprefixer');

function sass(config) {
	console.log('logging');
	var sassOptions = config.isRelease ? {
		sourceMapEmbed : true,
		sourceMapContents : true
	} : {
		outputStyle : 'compressed'
	};

	gulp.task('build:sass:core', cb => {
		return gulp.src(config.paths.assets('sass', 'main.scss'))
			.pipe(gulpSass(sassOptions)
				.on('error', gulpSass.logError))
			.pipe(autoPrefixer('last 2 versions', '> 1%'))
			.pipe(rename(config.pkg.name + '.css'))
			.pipe(gulp.dest(config.paths.dist('assets')));
	});

	gulp.task('build:sass', config.watch ? 
		['build:sass:watch'] : ['build:sass:core']);

	gulp.task('build:sass:watch', ['build:sass:core'], () => {
		gulp.watch(config.paths.assets('sass/**/*.scss'), ['build:sass:core']);
	});
}

module.exports = sass;