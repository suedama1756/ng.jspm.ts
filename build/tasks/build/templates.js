var gulp = require('gulp'),
	changed = require('gulp-changed'),
	htmlmin = require('gulp-htmlmin');


function templates(config) {
	var templatesPattern = config.paths.ts('**', 'templates', '*.html');

	gulp.task('build:templates:core', function() {
		var result = gulp.src(templatesPattern);
		if (config.watch) {
			result = result.pipe(changed(config.paths.jspm()));
		}

		if (config.isRelease) {
			result = result.pipe(htmlmin({
				collapseWhitespace: true
			}));
		}

		return result.pipe(gulp.dest(config.paths.jspm()));
	});

	gulp.task('build:templates', config.watch ?
		['build:templates:watch'] : ['build:templates:core']);

	gulp.task('build:templates:watch', ['build:templates:core'], function() {
		gulp.watch(templatesPattern, ['build:templates:core']);
	});
}

module.exports = templates;