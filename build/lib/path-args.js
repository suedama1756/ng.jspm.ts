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

	return arg;
}


module.exports = make;