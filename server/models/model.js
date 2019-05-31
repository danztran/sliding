const pool = requireWrp('modules/postgresql');
const qh = requireWrp('modules/query-helper');

class Model {
	constructor(name) {
		this.name = name;
		this.query = '';
		// re = -1: return result,
		// re = 0: return rows,
		// re = 1: return rows[0]
		this.re = -1;
	}

	find(object, select = '*') {
		this.query = `
			SELECT ${select}
			FROM ${this.name}
			WHERE ${qh.toWhereClause(object)}
		`;
		this.re = 0;
		return this;
	}

	findOne(object, select = '*') {
		this.query = `${this.find(object, select).query}LIMIT 1`;
		this.re = 1;
		return this;
	}

	createOne(object, select) {
		this.query = `
			INSERT INTO ${this.name}
			${qh.toInsertClause(object)}
			${select ? `RETURNING ${select}` : ''}
		`;
		if (select) {
			this.re = 1;
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
			this.re = 0;
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
			this.re = 1;
		}
		return this;
	}

	exec() {
		return new Promise((resolve, reject) => {
			pool.query(this.query)
				.then((result) => {
					switch (this.re) {
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
