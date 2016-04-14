var format = require('./format');

var colors = {
	info: '\x1b[32m%s\x1b[29m',
	warn: '\x1b[31m%s\x1b[29m',
	error: '\x1b[33m%s\x1b[29m'
};

var logger = {
	info: console.log.bind(console, colors.info),
	infoFmt(fmt, args) {
		return this.info(format.apply(null, arguments));
	},
	warn: console.log.bind(console, colors.warn),
	warnFmt(fmt, args) {
		return this.warn(format.apply(null, arguments));
	},
	error: console.log.bind(console, colors.error),
	errorFmt(fmt, args) {
		return this.error(format.apply(null, arguments));
	},
};

module.exports = logger;