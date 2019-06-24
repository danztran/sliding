const Model = requireWrp('models/model');
// const qh = requireWrp('modules/query-helper');
const crypto = requireWrp('modules/crypto-custom');

class UserModel extends Model {
	constructor() {
		super('_.user');
	}

	findById(id, opt) {
		return this.findOne({ id }, opt);
	}

	findByUsername(username, opt) {
		return this.findOne({ username }, opt);
	}

	findAsJsonById(id, { select = '*' } = {}) {
		const alias = 'userrrr';
		this.setQuery(`
			SELECT ROW_TO_JSON(${alias})
			FROM
				(
					SELECT ${select}
					FROM ${this.getName()}
				) as ${alias}
			WHERE ${alias}.id=${id}
			LIMIT 1
		`);
		return this;
	}

	create(user, opt) {
		return this.createOne({
			name: user.name,
			email: user.email,
			username: user.username,
			password: crypto.enc(user.password),
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		}, opt);
	}

	update(user) {
		// ...
	}

	setLastAccessed(user) {
		const { id } = user;
		const accessed_at = new Date().toISOString();
		return this.updateOne({ id }, { accessed_at });
	}
}

module.exports = UserModel;
