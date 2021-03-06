'use strict';

var pathArgs = require('./lib/path-args'),
	args = pathArgs(require('yargs').argv),
	fs = require('fs');

// define paths used by build
var rootPath = require('./lib/path-builder')(__dirname, '..');
var paths = {
	root: rootPath,
	src: rootPath.make('src'),
	ts: rootPath.make('src', 'ts'),
	assets: rootPath.make('src', 'assets'),
	tmp: rootPath.make('tmp'),
	jspm: rootPath.make('jspm'),
	jspmModules: rootPath.make('jspm', 'modules'),
	typings: rootPath.make('typings'),
	dist: rootPath.make('dist'),
	nodeModules: rootPath.make('node_modules'),
	nodeBin: rootPath.make('node_modules', '.bin')
};

// read package
var pkg = JSON.parse(fs.readFileSync(rootPath('package.json')));

var isRelease = args('config', 'debug') === 'release';

// define config
var config = {
	config: args('config', 'debug'),
	isRelease: isRelease,
	watch: args('watch', false),
	paths: paths,
	pkg: pkg,
	bundle: {
		'no-mangle': args('bundle.no-mangle', isRelease ?
			false :
			true)
	},

	server: {
		activeProfiles : args.asArray('host.activeProfiles', ['debug']),
		profiles: {
			debug: {
				port: args('host.debug.port', 8080),
				alias: {
					'/': [
						paths.src(),
						paths.jspm(),
						paths.dist()
					]
				},
				proxy: [{
					path: '/api',
					target: 'http://localhost:8081/api'
				}]
			}
		}
	}
}


// allow config to be access via (path) args
config.args = pathArgs(config);

// export
module.exports = config;