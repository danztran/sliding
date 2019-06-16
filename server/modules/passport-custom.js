const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

// load up the user model
const crypto = requireWrp('modules/crypto-custom');
const UserModel = requireWrp('models/user');
// const User = new UserModel();

// used to serialize the user for the session
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
	const User = new UserModel();
	User.findById(id).exec()
		.then(user => done(null, user))
		.catch(error => done(error));
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

module.exports = passport;
