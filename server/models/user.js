// const pool = requireWrp('modules/postgresql');
const crypto = requireWrp('modules/crypto-custom');
const Model = requireWrp('models/model');

class User extends Model {
	constructor() {
		super('_.user');
	}

	findById(id, select = '*') {
		return this.findOne({ id });
	}

	create(user) {
		return this.createOne({
			name: user.name,
			email: user.email,
			username: user.username,
			password: crypto.enc(user.password),
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		}, '*');
	}

	setLastAccessed(user) {
		const { id } = user;
		const accessed_at = new Date().toISOString();
		return this.updateOne({ id }, { accessed_at });
	}
}

module.exports = new User();
