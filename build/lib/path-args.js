function make(source) {
	function arg(name, defaultValue) {
		var elements = name.split('.'),
			obj = source;
		for (var i = 0, n = elements.length; i < n; i++) {
			var element = elements[i];
			if (!obj.hasOwnProperty(element)) {
				return defaultValue;
			}
			obj = obj[element];
		}
		return obj;

	}

	arg.asArray = function(name, defaultValue) {
		var result = arg(name, defaultValue);
		if (result !== null && typeof result !== 'undefined') {
			return Array.isArray(result) ? result : [result];
		}
		return [];
	}

	return arg;
}


module.exports = make;