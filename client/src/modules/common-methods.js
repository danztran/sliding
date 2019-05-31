const _cm = {
	notEmpty(arg) {
		switch (typeof arg) {
			case 'string': return arg !== '';
			case 'number': return true;
			case 'boolean': return true;
			case 'object': return arg === null ? false : Object.keys(arg).length > 0;
			case 'undefined': return false;
			default: return false;
		}
	}
};

export default _cm;
