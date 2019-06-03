const queryHelper = {
	toClause(object, symbol = ' ') {
		const states = [];
		for (const key in object) {
			if (Object.prototype.hasOwnProperty.call(object, key)) {
				states.push(`"${key}"='${object[key]}'`);
			}
		}
		const clause = states.join(symbol);
		return clause;
	},
	toWhereClause(data) {
		let clause = '';
		if (Array.isArray(data)) {
			const array = [];
			for (const object of data) {
				array.push(`(${this.toClause(object, ' AND ')})`);
			}
			clause = array.join(' OR ');
		}
		else {
			clause = this.toClause(data, ' AND ');
		}
		return clause;
	},
	toSetClause(object) {
		return this.toClause(object, ', ');
	},
	toInsertClause(object) {
		const keys = [];
		const values = [];
		for (const key in object) {
			if (Object.prototype.hasOwnProperty.call(object, key)) {
				keys.push(`"${key}"`);
				values.push(`'${object[key]}'`);
			}
		}
		return `(${keys.join(',')}) VALUES (${values.join(',')})`;
	}
};

module.exports = queryHelper;
