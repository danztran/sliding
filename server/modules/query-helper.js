const queryHelper = {
	toClause(object, symbol = ' ') {
		const states = [];
		for (const key in object) {
			if (Object.prototype.hasOwnProperty.call(object, key)) {
				states.push(`"${key}"='${object[key]}'`);
			}
		}
		const query = states.join(symbol);
		return query;
	},
	toWhereClause(object) {
		return this.toClause(object, ' AND ');
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
