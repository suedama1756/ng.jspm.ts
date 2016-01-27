var gulp = require('gulp'),
	express = require('express');

gulp.task('host', function() {
	var app = express(),
		server;
	
	app.use('/', express.static('../'));
	app.use('/src/system.js', express.static('../jspm_packages/system.js'));
	app.use('/src/jspm.config.js', express.static('../jspm.config.js'));
	server = app.listen(8080, function() {
		console.log(server.address().port);
	});
});