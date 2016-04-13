var gulp = require('gulp'),
	exec = require('child_process').exec;

function tsc(config) {
	gulp.task('build:tsc', cb => {
		var command = 'tsc';
		if (config.watch) {
			command += ' --watch';
		}
		
		// execute tsc and pipe output
		var p = exec(command, cb);
		p.stdout.pipe(process.stdout);
		p.stderr.pipe(process.stderr);
	});
}

module.exports = tsc;