const dollarQuotedLength = 10;

const queryHelper = {
	randomString(len) {
		const p = '_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const plen = p.length;
		return [...Array(len)].reduce(a => a + p[Math.floor((Math.random() * plen))], '');
	},

	randomDollarQuoted() {
		return `$q${this.randomString(dollarQuotedLength)}$`;
	},

	toDollarQuoted(str) {
		const rdq = this.randomDollarQuoted();
		return rdq + str + rdq;
	},

	toClause(object, symbol = ' ') {
		const states = [];
		for (const key in object) {
			if (Object.prototype.hasOwnProperty.call(object, key)) {
				if (object[key] !== undefined) {
					states.push(`"${key}"=${this.toDollarQuoted(object[key])}`);
				}
			}
		}
		const clause = states.join(symbol);
		return clause;
	},

	// @info: Object
	// e.g.: {name: "Nguyên", username: "deeptry"}
	// => WHERE "name"='Nguyên' AND "username"='deeptry'
	toWhereClause(info) {
		if (!info) return '';
		let clause = '';
		if (Array.isArray(info)) {
			const array = [];
			for (const object of info) {
				array.push(`(${this.toClause(object, ' AND ')})`);
			}
			clause = array.join(' OR ');
		}
		else {
			clause = this.toClause(info, ' AND ');
		}
		return clause ? `WHERE ${clause}` : '';
	},

	// @info: Object
	// e.g.: {name: "Nguyên", username: "deeptry"}
	// => SET "name"='Nguyên', "username"='deeptry'
	toSetClause(info) {
		return `SET ${this.toClause(info, ', ')}`;
	},

	// @order: String
	// e.g.: "username -id"
	// => ORDER BY "username" ASC, "id" DESC
	toInsertClause(info) {
		const keys = [];
		const values = [];
		for (const key in info) {
			if (Object.prototype.hasOwnProperty.call(info, key)) {
				keys.push(`"${key}"`);
				values.push(this.toDollarQuoted(info[key]));
			}
		}
		return `(${keys.join(',')}) VALUES (${values.join(',')})`;
	},

	// @order: String
	// e.g.: "username -id"
	// => ORDER BY "username" ASC, "id" DESC
	toOrderClause(order) {
		if (!order) return '';
		const orders = [];
		for (const column of order.split(' ')) {
			if (column.charAt(0) === '-') {
				orders.push(`"${column.substr(1)}" DESC`);
			}
			else {
				orders.push(`"${column}" ASC`);
			}
		}
		return `ORDER BY ${orders.join(', ')}`;
	},

	// @select: String
	// e.g.: "id, username"
	// => RETURNING "id", "username"
	toReturningClause(select) {
		return select ? `RETURNING ${select}` : '';
	},

	// @limit: Integer
	// e.g.: limit = 3
	// => LIMIT 3
	toLimitClause(limit) {
		return limit ? `LIMIT ${this.toDollarQuoted(limit)}` : '';
	},

	// @offset: Integer
	// e.g.: offset = 4
	// => OFFSET 4
	toOffsetClause(offset) {
		return offset ? `OFFSET ${this.toDollarQuoted(offset)}` : '';
	}
};

module.exports = queryHelper;
