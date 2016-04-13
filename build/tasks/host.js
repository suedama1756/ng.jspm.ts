var gulp = require('gulp'),
	express = require('express');

function host(config) {
	gulp.task('host', function() {
		var app = express(),
			server;

		app.use('/', express.static(
			config.paths.src()));
		app.use('/', express.static(
			config.paths.jspm()));
		app.use('/', express.static(
			config.paths.dist()));
		
		server = app.listen(8080, function() {
			console.log(server.address().port);
		});
	});
}

module.exports = host;