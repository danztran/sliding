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
	// Cookie
	cookie: {
		flashMessage: process.env.VUE_APP_CK_FLASH_MESSAGE,
	},
	// File Store
	fileStorePath: './temp/sessions',
	fileStoreSecret: process.env.FILE_STORE_SECRET || 'googlesecondplease',
	fileStoreExtension: '',
	fileStoreMaxAge: 864000000,

	// REDIS STORE:
	redisOn: process.env.REDIS_ON,
	redisUrl: process.env.REDIS_URL || 'redis://redis',

	// ========= Client
	// Must change from client/vue.config.js too
	vueDist: 'vue-dist',
	vueMain: 'index.html',
	defaultLocale: 'en',
	// cors only works in development env
	corsOptions: { credentials: true, origin: true },

	// ========= PM2
	pm2MainScript: './bin/www',
	pm2Instances: 1,
	pm2MMR: '1G',
	pm2ErrorLogDir: process.env.PM2_LOG_ERROR || '/dev/null',
	pm2OutLogDir: process.env.PM2_LOG_OUT || '/dev/null',
	pm2MergeLog: true,
	pm2ExecMode: 'cluster',
	pm2IgnoreWatch: ['public', '.git', 'temp', './vue-dist'],
	pm2AutoRestart: true,
	pm2Watch: true,
	pm2DevLogDateFormat: process.env.PM2_LOG_FORMAT || 'YYYY-MM-DD HH:mm Z',
	pm2ProdLogDateFormat: '',
	pm2RestartDelay: process.env.PM2_RESTART_DELAY || 5000,

	// ========== AES_KEY
	// secret key for encrypt/decrypt account password
	aesKey: process.env.AES_KEY || 'googlethirdplease',

	// ========== USER MODEL
	// This settings will combined with package validatorjs for validation
	// check at modules/validator-custom.js
	signUpRules: {
		name: ['required', 'min:3', 'max:100', 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g'],
		email: 'email|required|max:320',
		username: 'alpha_num|required|min:6|max:50|regex:/^[a-z][a-z0-9]*$/g',
		password: 'string|required|min:6|max:50',
		rePassword: 'string|required|min:6|max:50|same:password',
	},
	logInRules: {
		username: 'string|required',
		password: 'string|required',
	},
	updateRules: {
		name: ['min:3', 'max:100', 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g'],
		curPassword: 'string|required_with:password|min:6|max:50',
		password: 'string|required_with:curPassword|min:6|max:50',
		rePassword: 'string|required_with:password|min:6|max:50|same:password',
	},

	// ========== OUTLOOK AUTHENTICATION
	outlook: {
		clientID: process.env.OUTLOOK_CLIENT_ID,
		clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
		callbackURL: process.env.OUTLOOK_CALLBACK_URL,
		userProfileURL: 'https://graph.microsoft.com/v1.0/me',
	},

	// ========== EVENT MODEL
	// auto generate the next event code with auto increment characters
	eventCodeBone: 'abcdefghijklmnopqrstuvwxyz0123456789',
	eventCodeStart: 'aaa',

	eventCreateRules: {
		name: ['required', 'min:10', 'max:100', 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g'],
		description: ['required', 'min:10', 'max:1000', 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g'],
		start_at: 'date|required',
		end_at: 'date|required|after_or_equal:start_at',
		allow_search: 'boolean',
		require_auth: 'boolean',
	},
	eventUpdateRules: {
		name: ['required', 'min:10', 'max:100', 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g'],
		description: ['required', 'min:10', 'max:1000', 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g'],
		start_at: 'date|required',
		end_at: 'date|required|after_or_equal:start_at',
		allow_search: 'boolean',
		require_auth: 'boolean',
	},
	findEventRules: {
		code: 'alpha_num|min:3',
	},

	// ========== POLL MODEL
	pollCreateRules: {
		content: ['required', 'min:10', 'max:100', 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g'],
	},
	pollUpdateRules: {
		content: ['required', 'min:10', 'max:100', 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g'],
	},

	// ========== POLL OPTION MODEL
	pollOptionCreateRule: {
		content: ['required', 'max:50', 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g'],
	},
	pollOptionUpdateRule: {
		content: ['required', 'max:50', 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g'],
	},

	// ========== QUESTION MODEL
	questionCreateRules: {
		content: ['min:10', 'max:200', 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g'],
	},
	questionUpdateRules: {
		content: ['min:10', 'max:200', 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g'],
	},

	// ========== QUESTION REPLY MODEL
	questionReplyCreateRules: {
		content: ['max:200', 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g'],
	},
	questionReplyUpdateRules: {
		content: ['max:200', 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g'],
	},

	socket: {
		path: process.env.VUE_APP_SOCKET_IO_PATH || '/sio',
	},
};
