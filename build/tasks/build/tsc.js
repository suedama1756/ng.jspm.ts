var gulp = require('gulp'),
	exec = require('child_process').exec;

function tsc(config) {
	gulp.task('build:tsc', cb => {
		var command = config.paths.nodeBin('tsc');
		if (config.watch) {
			command += ' --watch';
		}
		
		// execute tsc and pipe output
		var p = exec(command, config.watch ? cb : () => {});
		p.stdout.pipe(process.stdout);
		p.stderr.pipe(process.stderr);
		if (config.watch) {
			cb();
		}
	});
}

module.exports = tsc;