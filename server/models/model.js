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

	// @info can be Object or Array of objects
	find(info, {
		select = '*',
		order,
		limit,
		offset
	} = {}) {
		this._query = `
			SELECT ${select}
			FROM ${this._name}
			${qh.toWhereClause(info)}
			${qh.toOrderClause(order)}
			${qh.toLimitClause(limit)}
			${qh.toOffsetClause(offset)}
		`;
		this._rowReturn = 0;
		return this;
	}

	findOne(object, { select } = {}) {
		this._query = this.find(object, {
			select,
			limit: 1
		}).getQuery();
		this._rowReturn = 1;
		return this;
	}

	findLastOf(column, { select } = {}) {
		this._query = this.find(null, {
			select,
			order: `-${column}`,
			limit: 1
		}).getQuery();
		this._rowReturn = 1;
		return this;
	}

	createOne(object, { select = '*' } = {}) {
		this._query = `
			INSERT INTO ${this._name}
			${qh.toInsertClause(object)}
			${qh.toReturningClause(select)}
		`;
		if (select) {
			this._rowReturn = 1;
		}
		return this;
	}

	updateOne(object, newInfo, { select } = {}) {
		const column = Object.keys(object)[0];
		this._query = `
			UPDATE ${this._name}
			${qh.toSetClause(newInfo)}
			WHERE ${column} in (
					${this.findOne(object, { select: column }).getQuery()}
				)
			${qh.toReturningClause(select)}
		`;
		if (select) {
			this._rowReturn = 1;
		}
		return this;
	}

	exec(rowReturn) {
		return new Promise((resolve, reject) => {
			this._rowReturn = rowReturn || this._rowReturn;
			pool.query(this._query)
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
