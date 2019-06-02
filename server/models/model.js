const pool = requireWrp('modules/postgresql');
const qh = requireWrp('modules/query-helper');

class Model {
	constructor(name) {
		this.name = name;
		this.query = '';
		// re = -1: return result,
		// re = 0: return rows,
		// re = 1: return rows[0]
		this.rowReturn = -1;
	}

	// @objects can be object or array of objects
	find(objects, select = '*') {
		this.query = `
			SELECT ${select}
			FROM ${this.name}
			WHERE ${qh.toWhereClause(objects)}
		`;
		this.rowReturn = 0;
		return this;
	}

	findOne(object, select) {
		this.query = `${this.find(object, select).query} LIMIT 1`;
		this.rowReturn = 1;
		return this;
	}

	findLastOf(column, select = '*') {
		this.query = `
			SELECT ${select}
			FROM ${this.name}
			ORDER BY ${column} DESC
			LIMIT 1
		`;
		this.rowReturn = 1;
		return this;
	}

	createOne(object, select) {
		this.query = `
			INSERT INTO ${this.name}
			${qh.toInsertClause(object)}
			${select ? `RETURNING ${select}` : ''}
		`;
		if (select) {
			this.rowReturn = 1;
		}
		return this;
	}

	update(object, newInfo, select) {
		this.query = `
			UPDATE ${this.name}
			SET ${qh.toSetClause(newInfo)}
			WHERE ${qh.toWhereClause(object)}
			${select ? `RETURNING ${select}` : ''}
		`;
		if (select) {
			this.rowReturn = 0;
		}
		return this;
	}

	updateOne(object, newInfo, select) {
		const column = Object.keys(object)[0];
		this.query = `
			UPDATE ${this.name}
			SET ${qh.toSetClause(newInfo)}
			WHERE ${column} in (${this.findOne(object, column).query})
			${select ? `RETURNING ${select}` : ''}
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
