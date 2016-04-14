var gulp = require('gulp'),
	extend = require('extend');

function server(config) {
	gulp.task('server', function(cb) {
		var serverConfig = config.server;
		if (!serverConfig || !serverConfig.activeProfiles || !serverConfig.profiles) {
			return cb();
		}

		var profiles = serverConfig.activeProfiles.map(activeProfile => {
			var args = activeProfile.split(':')
				.map(x => serverConfig.profiles[x]);
			args.unshift(true, {});
			return extend.apply(null, args);
		});

		var count = profiles.length;
		function complete() {
			count--;
			if (!count) {
				cb();
			}
		}

		profiles.forEach(profile => {
			require('../lib/server')(profile, complete);
		});
	});
}

module.exports = server;