'use strict';

var gulp = require('gulp'),
	htmlReplace = require('gulp-html-replace');

function html(config) {
	gulp.task('bundle:html', ['build:sass'], cb => {
		return gulp.src(config.paths.src('index.html'))
		.pipe(htmlReplace({
			'js' : {
				src : config.bundle.jsOutputPath
			}, 
			'css' : {
				src : config.bundle.sassOutputPath,
				tpl : '<link rel="stylesheet" type="text/css" href="%s">'
			}
		}, {
			keepUnsassigned : true,
			keepBlockTags : true
		}))
		.pipe(gulp.dest(config.paths.dist()));
	});
}

module.exports = html;