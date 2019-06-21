const pool = requireWrp('modules/postgresql');
const qh = requireWrp('modules/query-helper');

class Model {
	constructor(name) {
		this._name = name;
		this._query = '';
		this._rowReturn = 0; // [-1, 0, 1] => result, rows, rows[0]
	}

	getName() {
		return this._name;
	}

	setQuery(query) {
		this._query = query;
		return this;
	}

	getQuery() {
		return this._query;
	}

	setRowReturn(num = 0) {
		this._rowReturn = num;
		return this;
	}

	getRowReturn() {
		return this._rowReturn;
	}

	// @info can be Object or Array of objects
	find(info, {
		alias,
		select = '*',
		order,
		limit,
		offset
	} = {}) {
		this.setQuery(`
			SELECT ${select}
			FROM ${this.getName()} ${qh.as(alias)}
			${qh.toWhereClause(info, { alias })}
			${qh.toOrderClause(order)}
			${qh.toLimitClause(limit)}
			${qh.toOffsetClause(offset)}
		`);
		this.setRowReturn(0);
		return this;
	}

	findOne(object, { select, alias } = {}) {
		this.find(object, {
			alias,
			select,
			limit: 1
		});
		this.setRowReturn(1);
		return this;
	}

	findLastOf(column, { select } = {}) {
		this.find(null, {
			select,
			order: `-${column}`,
			limit: 1
		});
		this.setRowReturn(1);
		return this;
	}

	createOne(object, { select = '*' } = {}) {
		this.setQuery(`
			INSERT INTO ${this.getName()}
			${qh.toInsertClause(object)}
			${qh.toReturningClause(select)}
		`);
		this.setRowReturn(1);
		return this;
	}

	updateOne(object, newInfo, {
		alias,
		select
	} = {}) {
		const column = Object.keys(object)[0];
		this.setQuery(`
			UPDATE ${this._name} ${qh.as(alias)}
			${qh.toSetClause(newInfo)}
			WHERE ${column} in (
					${this.findOne(object, { select: column }).getQuery()}
				)
			${qh.toReturningClause(select)}
		`);
		if (select) {
			this.setRowReturn(1);
		}
		return this;
	}

	exec(rowReturn) {
		return new Promise((resolve, reject) => {
			this.setRowReturn(rowReturn || this.getRowReturn());
			pool.query(this.getQuery())
				.then((result) => {
					switch (this._rowReturn) {
						case 1: return resolve(result.rows[0]);
						case 0: return resolve(result.rows);
						default: return resolve(result);
					}
				})
				.catch(reject);
		});
	}
}

module.exports = Model;
