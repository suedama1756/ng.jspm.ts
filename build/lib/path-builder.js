var path = require('path');

module.exports = function pathBuilder(/* pathString... */) {
    var fullPath = path.join.apply(path, arguments);
    fullPath = path.resolve(path.normalize(fullPath));
	var result = function() {
		if (arguments.length) {
			var elements = Array.prototype.slice.call(arguments);
			elements.unshift(fullPath);
			return path.join.apply(path, elements);
		}
		return fullPath;
	}

	result.make = function() {
		return arguments.length ? 
			pathBuilder(result.apply(null, Array.prototype.slice.call(arguments))) :
			result;
	}

	return result;
}