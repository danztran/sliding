const { outlook } = requireWrp('config');
const LocalStrategy = require('passport-local').Strategy;
const OutlookStrategy = require('passport-outlook').Strategy;
const passport = require('passport');

// load up the user model
const crypto = requireWrp('modules/crypto-custom');
const UserModel = requireWrp('models/user');

// used to serialize the user for the session
passport.serializeUser((user, done) => {
	done(null, user);
});

// used to deserialize the user
passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(new LocalStrategy(
	((username, password, done) => {
		const User = new UserModel();
		User.findByUsername(username).exec()
			.then((user) => {
				if (!user) {
					return done(null, false, { username: 'usernameNotFound' });
				}
				if (crypto.dec(user.password) !== password) {
					return done(null, false, { password: 'passwordIncorrect' });
				}
				return done(null, user);
			})
			.catch((error) => {
				done(error);
			});
	})
));

passport.use(new OutlookStrategy({
	clientID: outlook.clientId,
	clientSecret: outlook.clientSecret,
	callbackURL: outlook.callbackUrl,
	userProfileURL: 'https://graph.microsoft.com/v1.0/me',
},
(async (accessToken, refreshToken, _profile, done) => {
	const profile = _profile._json;
	const user = {
		outlook_id: profile.id,
		name: profile.displayName || (profile.givenName || `${profile.surname}` || '') || 'Stranger',
		email: profile.mail,
		outlook_access_token: accessToken,
	};

	try {
		if (!user.outlook_id) {
			throw 'No outlook id';
		}

		const User = new UserModel();
		const userExists = await User.findOne({
			outlook_id: user.outlook_id,
		}).exec();

		if (userExists) {
			return done(null, user);
		}

		const newUser = await User.createOutlook({
			...user,
			name: user.name || `Stranger ${Math.floor(Math.random() * 10000)}`,
		}, {
			select: '*',
		}).exec();
		return done(null, newUser);
	}
	catch (error) {
		return done(error);
	}
})));

module.exports = passport;
