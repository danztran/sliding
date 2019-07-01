const {
	pgRandomDollarQuotedLength: rdqLength,
	pgRandomDollarQuotedCharacters: rdqCharacters,
	pgDollarQuotedPrefix: rdqPrefix
} = requireWrp('config');
const rdqCharactersLength = rdqCharacters.length;

const queryHelper = {
	randomString(len) {
		return [...Array(len)].reduce(a => a + rdqCharacters[Math.floor((Math.random() * rdqCharactersLength))], '');
	},

	randomDollarQuoted() {
		return `$${rdqPrefix + this.randomString(rdqLength)}$`;
	},

	toDollarQuoted(str) {
		const rdq = this.randomDollarQuoted();
		return rdq + str + rdq;
	},

	toClause(object, {
		symbol = ' ',
		alias
	} = {}) {
		const states = [];
		const prefix = alias ? `${alias}.` : '';
		for (const key in object) {
			if (Object.prototype.hasOwnProperty.call(object, key)) {
				const value = object[key];
				switch (value) {
					case undefined: break;
					case null: states.push(`${prefix}"${key}"=NULL`); break;
					default: states.push(`${prefix}"${key}"=${this.toDollarQuoted(object[key])}`);
				}
			}
		}
		const clause = states.join(symbol);
		return clause;
	},

	// @info: Object
	// e.g.: {name: "Nguyên", username: "deeptry"}
	// => WHERE "name"='Nguyên' AND "username"='deeptry'
	toWhereClause(info, { alias } = {}) {
		if (!info) return '';
		const opt = { symbol: ' AND ', alias };
		let clause = '';
		if (Array.isArray(info)) {
			const array = [];
			for (const object of info) {
				array.push(`(${this.toClause(object, opt)})`);
			}
			clause = array.join(' OR ');
		}
		else {
			clause = this.toClause(info, opt);
		}
		return clause ? `WHERE ${clause}` : '';
	},

	// @info: Object
	// e.g.: {name: "Nguyên", username: "deeptry"}
	// => SET "name"='Nguyên', "username"='deeptry'
	toSetClause(info) {
		return `SET ${this.toClause(info, { symbol: ', ' })}`;
	},

	// @order: String
	// e.g.: "username -id"
	// => ORDER BY "username" ASC, "id" DESC
	toInsertClause(info) {
		const keys = [];
		const values = [];
		for (const key in info) {
			if (Object.prototype.hasOwnProperty.call(info, key)) {
				const value = info[key];
				// ignore undefined value
				if (value !== undefined) {
					keys.push(`"${key}"`);
					// handle null value
					if (value === null) {
						values.push('NULL');
					}
					else {
						values.push(this.toDollarQuoted(info[key]));
					}
				}
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
	},

	as(alias) {
		return alias ? `AS ${alias}` : '';
	},

	toConflictClause(info) {
		return `ON CONFLICT (${Object.keys(info).map(e => `"${e}"`).join(', ')})`;
	}
};

module.exports = queryHelper;
