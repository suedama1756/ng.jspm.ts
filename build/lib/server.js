var express = require('express'),
	url = require('url'),
	logger = require('./logger'),
	proxy = require('http-proxy-middleware');

function configureProxies(app, proxyOptions) {
	function configureProxy(proxyOption) {
		try {
			var targetUrl = url.parse(proxyOption.target),
				options = {
					target: targetUrl.protocol + '//' + targetUrl.host,
					logLevel: 'debug',
					pathRewrite: {}
				};

			// configure rewrite rule
			options.pathRewrite['^' + proxyOption.path] =
				targetUrl.pathname;

			// use
			app.use(proxyOption.path, proxy(proxyOption.path, options));

			// log
			logger.infoFmt('Proxy: {path}={target}', proxyOption);
		} catch (e) {
			logger.errorFmt('Invalid proxy configuration, error: {0}, config: {1}.', e, JSON.stringify(proxy, null, 2));
		}
	}

	proxyOptions = proxyOptions || [];
	proxyOptions = Array.isArray(proxyOptions) ? proxyOptions : [proxyOptions];
	proxyOptions.forEach(configureProxy);
}

function configureStatic(app, staticPaths) {
	function useStatic(urlPath, targetPath) {
		app.use(urlPath, express.static(targetPath));
		logger.infoFmt('State: {0}={1}.', urlPath, targetPath);
	}

	staticPaths = staticPaths || [];
	staticPaths = Array.isArray(staticPaths) ? staticPaths : [staticPaths];
	staticPaths.forEach(staticPath => {
		if (typeof staticPath === 'string') {
			useStatic('/', staticPath);
		} else {
			if (Array.isArray(staticPath)) {
				useStatic(staticPath[0], staticPath[1]);
			} else {
				Object.getOwnPropertyNames(staticPath).forEach(urlPath => {
					var targetPaths = staticPath[urlPath];
					targetPaths = Array.isArray(targetPaths) ? targetPaths : [targetPaths];
					targetPaths.forEach(targetPath => {
						useStatic(urlPath, targetPath);
					});
				});
			}
		}
	});
}

function configureError(app) {
	app.use('*', (req, res, next) => {
		logger.errorFmt('Path not found: {originalUrl}', req);
		next();
	});

	app.use((err, req, res, next) => {
		logger.errorFmt('Error: {0}.', err);
		next();
	});
}

function server(options, cb) {
	var app,
		appServer,
		result,
		isComplete;

	function configure() {
		app = express();
		configureStatic(app, options.alias);
		configureProxies(app, options.proxy);
		configureError(app);
		result = {
			close() {
					logger.infoFmt('Closing server on port {port}.', result);
					appServer.close();
				},
				port: null
		};
	}


	function complete(err, server) {
		if (!isComplete) {
			isComplete = true;
			if (cb) {
				if (err) {
					logger.error(err);
					cb(err);
				} else {
					cb(null, server);
				}
			}
		}
	}

	try {
		configure();
	} catch (e) {
		return complete(e);
	}

	appServer = app.listen(options.port, () => {
		result.port = appServer.address().port;
		logger.infoFmt('Server started on port {port}.', result);
		complete(null, result);
	});

	appServer.once('error', complete);
}

module.exports = server;