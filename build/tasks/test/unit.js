var gulp = require('gulp'),
	Server = require('Karma').Server;

function unit(config) {
	gulp.task('test:unit', ['build'], cb => {
		new Server({
			configFile: config.paths.root('./karma.conf.js'),
			singleRun: !config.watch
		}, karmaResult => {
			if (karmaResult === 1) {
				cb(new Error('karam: tests failed with code: ' + karmaResult));
			} else {
				cb();
			}
		}).start();
	});
}

module.exports = unit;