var path = require('path');

module.exports = function pathBuilder(pathString) {
	pathString = path.resolve(path.normalize(pathString));
	var result = function() {
		if (arguments.length) {
			var elements = Array.prototype.slice.call(arguments);
			elements.unshift(pathString);
			return path.join.apply(path, elements);
		}
		return pathString;
	}

	result.make = function() {
		return arguments.length ? 
			pathBuilder(result.apply(null, Array.prototype.slice.call(arguments))) :
			result;
	}

	return result;
}