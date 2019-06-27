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
		const toTimeString = new Date(createdAt).toTimeString().substr(0, 5);
		const calMs = toMs / 86000000; // milisecond per day;
		if (calMs <= 1) {
			return `Today, ${toTimeString}`;
		}
		if (calMs <= 2 && calMs > 1) {
			return `Yesterday, ${toTimeString}`;
		}
		const date = new Date(createdAt).toGMTString().split(' ');
		const result = `${date[1]} ${date[2]}, ${toTimeString}`;
		return result;
	},
	customSort(array = [], order = 'asc', field) {
		if (Array.isArray(array) && array.length > 0) {
			array.sort((_a, _b) => {
				const [a, b] = ['desc', false].includes(order) ? [_b, _a] : [_a, _b];
				if (!field) {
					if (typeof a === 'number' && typeof b === 'number') {
						return a - b;
					}
					return a.toString().localeCompare(b.toString());
				}
				const props = field.split('.');
				let m = JSON.parse(JSON.stringify(a));
				let n = JSON.parse(JSON.stringify(b));
				for (const prop of props) {
					if (typeof m[prop] === 'object') {
						m = JSON.parse(JSON.stringify(m[prop]));
						n = JSON.parse(JSON.stringify(n[prop]));
					}
					else {
						m = m[prop];
						n = n[prop];
					}
				}
				if (typeof m === 'number' && typeof n === 'number') {
					return m - n;
				}
				return m.toString().localeCompare(n.toString());
			});
		}
		return array;
	}
};

export default _cm;
