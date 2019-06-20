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
	},
	dayCreate(createdAt) {
		const toMs = new Date().getTime() - Date.parse(createdAt);
		const calMs = toMs / 86000000; // milisecond per day;
		if (calMs <= 1) {
			return `Today, ${new Date(createdAt).toTimeString().substr(0, 5)}`;
		}
		if (calMs <= 2 && calMs > 1) {
			return `Yesterday, ${new Date(createdAt).toTimeString().substr(0, 5)}`;
		}
		return (new Date(createdAt).toUTCString().substr(0, 22));
	}
};

export default _cm;
