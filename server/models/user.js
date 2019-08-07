const Model = requireWrp('models/model');
// const qh = requireWrp('modules/query-helper');
const crypto = requireWrp('modules/crypto-custom');

class UserModel extends Model {
	constructor() {
		super('public.user');
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
			updated_at: new Date().toISOString(),
		}, opt);
	}

	quickCreate(user, opt) {
		return this.createOne({
			name: user.name,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		}, opt);
	}

	completeCreate(user, opt) {
		this.updateOne({
			id: user.id,
		}, {
			name: user.name,
			email: user.email,
			username: user.username,
			password: crypto.enc(user.password),
			updated_at: new Date().toISOString(),
		}, {
			select: '*',
			...opt,
		});
		this.setRowReturn(1);
		return this;
	}

	update(user, newInfo, opt) {
		return this.updateOne({
			id: user.id,
		}, {
			name: newInfo.name ? newInfo.name : user.name,
			password: newInfo.password ? crypto.enc(newInfo.password) : user.password,
			updated_at: new Date().toISOString(),
		}, {
			select: '*',
		});
	}

	createOutlook(info, opt) {
		return this.createOne({
			name: info.name,
			email: info.email,
			outlook_id: info.outlook_id,
			outlook_access_token: info.outlook_access_token,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		}, opt);
	}

	updateOutlook(info, opt) {
		return this.updateOne({
			id: info.id,
		}, {
			name: info.name,
			email: info.email,
			outlook_access_token: info.outlook_access_token,
			outlook_refresh_token: info.outlook_refresh_token,
			updated_at: new Date().toISOString(),
		}, opt);
	}

	setLastAccessed(user) {
		const { id } = user;
		const accessed_at = new Date().toISOString();
		return this.updateOne({ id }, { accessed_at });
	}
}

module.exports = UserModel;
