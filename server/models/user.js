const Model = requireWrp('models/model');
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

	setLastAccessed(user) {
		const { id } = user;
		const accessed_at = new Date().toISOString();
		return this.updateOne({ id }, { accessed_at });
	}
}

module.exports = UserModel;
