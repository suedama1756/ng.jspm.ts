function format(s, o) {
	var args = Array.prototype.slice.call(arguments, 1);
	return s.replace(/{([^{}]*)}/g,
		(a, b) => {
			var index = Number(b),
			replace = null;
			if (isNaN(index)) {
				replace = args[0][b];
			} else {
				replace = args[index];
			}
			return typeof replace !== 'undefined' ? replace : a;
		});
}

module.exports = format;