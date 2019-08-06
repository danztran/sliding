/* eslint-disable */
module.exports = function debounce(fn, delay) {
	let timeoutID = null;
	return function () {
		clearTimeout(timeoutID);
		const args = arguments;
		const that = this;
		timeoutID = setTimeout(() => {
			fn.apply(that, args);
		}, delay);
	};
};
