const pool = requireWrp('modules/postgresql');
const qh = requireWrp('modules/query-helper');

class Model {
	constructor(name) {
		this.name = name;
		this.query = '';
		this.rowReturn = -1; // [-1, 0, 1] => result, rows, rows[0]
	}

	// @info can be Object or Array of objects
	find(info, {
		select = '*',
		order,
		limit,
		offset
	} = {}) {
		this.query = `
			SELECT ${select}
			FROM ${this.name}
			${qh.toWhereClause(info)}
			${qh.toOrderClause(order)}
			${qh.toLimitClause(limit)}
			${qh.toOffsetClause(offset)}
		`;
		this.rowReturn = 0;
		return this;
	}

	findOne(object, { select } = {}) {
		this.query = this.find(object, {
			select,
			limit: 1
		}).query;
		this.rowReturn = 1;
		return this;
	}

	findLastOf(column, { select } = {}) {
		this.query = this.find(null, {
			select,
			order: `-${column}`,
			limit: 1
		}).query;
		this.rowReturn = 1;
		return this;
	}

	createOne(object, { select } = {}) {
		this.query = `
			INSERT INTO ${this.name}
			${qh.toInsertClause(object)}
			${qh.toReturningClause(select)}
		`;
		if (select) {
			this.rowReturn = 1;
		}
		return this;
	}

	updateOne(object, newInfo, { select } = {}) {
		const column = Object.keys(object)[0];
		this.query = `
			UPDATE ${this.name}
			${qh.toSetClause(newInfo)}
			WHERE ${column} in (
					${this.findOne(object, {
		select: column
	}).query}
				)
			${qh.toReturningClause(select)}
		`;
		if (select) {
			this.rowReturn = 1;
		}
		return this;
	}

	exec(rowReturn) {
		return new Promise((resolve, reject) => {
			this.rowReturn = rowReturn || this.rowReturn;
			pool.query(this.query)
				.then((result) => {
					switch (this.rowReturn) {
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
