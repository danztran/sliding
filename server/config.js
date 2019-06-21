require('dotenv').config();

module.exports = {
	appName: 'sliding',
	subName: 'sli',

	// ======== ENVIRONMENT
	// Accept: production, development
	nodeEnv: process.env.NODE_ENV || 'development',

	// ======== DATABASE
	// PostGreSql Connection
	pgHost: process.env.PGHOST,
	pgPort: process.env.PGPORT,
	pgDatabase: process.env.PGDATABASE,
	pgUser: process.env.PGUSER,
	pgPassword: process.env.PGPASSWORD,
	pgMaxPool: process.env.PGMAXPOOL || 2,
	// Query Config
	// warning: this only accept underscore, alphabet and numeric with a prefix is a letter
	pgRandomDollarQuotedCharacters: '_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
	pgRandomDollarQuotedLength: 10,
	pgDollarQuotedPrefix: 'q',

	// ========= SESSION
	// Express Session
	sessionName: process.env.SESSION_NAME || '_cns',
	sessionSecret: process.env.SESSION_SECRET || 'googlefirstplease',
	sessionResave: true,
	sessionSaveUninitialized: false,
	sessionMaxAge: 864000000,
	// File Store
	fileStorePath: './temp/sessions',
	fileStoreSecret: process.env.FILE_STORE_SECRET || 'googlesecondplease',
	fileStoreExtension: '',
	fileStoreMaxAge: 864000000,

	// ========= Client
	// Must change from client/vue.config.js too
	vueDist: 'vue-dist',
	vueMain: 'index.html',
	clientHost: 'http://localhost:8080',

	// ========= PM2
	pm2MainScript: './bin/www',
	pm2Instances: 1,
	pm2MMR: '1G',
	pm2ErrorLogDir: './temp/logs/error.log',
	pm2OutLogDir: './temp/logs/out.log',
	pm2MergeLog: true,
	pm2ExecMod: 'cluster',
	pm2IgnoreWatch: ['public', '.git', 'temp', './vue-dist'],
	pm2AutoRestart: true,
	pm2Watch: true,
	pm2DevLogDateFormat: 'YYYY-MM-DD HH:mm Z',
	pm2ProdLogDateFormat: '',

	// ========== AES_KEY
	// secret key for encrypt/decrypt account password
	aesKey: process.env.AES_KEY || 'googlethirdplease',

	// ========== USER MODEL
	// This settings will combined with package validatorjs for validation
	// checke at modules/validator-custom.js
	signUpRules: {
		name: ['required', 'min:3', 'max:100', 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g'],
		email: 'email|required|max:320',
		username: 'alpha_num|required|min:6|max:50|regex:/^[a-z][a-z0-9]*$/g',
		password: 'string|required|min:6|max:50',
		rePassword: 'string|required|min:6|max:50|same:password'
	},
	logInRules: {
		username: 'string|required',
		password: 'string|required'
	},

	// ========== EVENT MODEL
	// auto generate the next event code with auto increment characters
	eventCodeBone: 'abcdefghijklmnopqrstuvwxyz0123456789',
	eventCodeStart: 'aaa'


};
