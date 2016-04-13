'use strict';

var gulp = require('gulp'),
	exec = require('child_process').exec;

function app(config) {
	var jsOutputFileName = config.pkg.name +
		'-' +
		(config.isRelease ? 'min' : 'debug') +
		'-' + 
		config.pkg.version +
		'.js';

	config.bundle = config.bundle || {};
	config.bundle.jsOutputPath = 
		config.paths.dist('js', jsOutputFileName);

	gulp.task('bundle:app', ['build:tsc', 'build:templates'], cb => {
		var command = config.paths.nodeModules('.bin', 'jspm') + ' bundle-sfx app/main ';
		command += config.bundle.jsOutputPath;
		if (config.isRelease) {
			command += ' --minify';
		}

		if (config.bundle['no-mangle']) {
			command += ' --no-mangle';
		}
		
		console.log('Executing: ', command);
		exec(command, {
			cwd : config.paths.jspm()
		}, (err, stdout, stderr) => {
			console.log(stdout);
			cb(err);
		});
	});
}

module.exports = app;