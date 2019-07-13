const config = require('./config');

const envConfig = {
	production: {
		log_date_format: config.pm2ProdLogDateFormat,
	},
	development: {
		watch: config.pm2Watch,
		ignore_watch: config.pm2IgnoreWatch,
		log_date_format: config.pm2DevLogDateFormat,
		out_file: config.pm2OutLogDir,
		error_file: config.pm2ErrorLogDir,
	},
};

module.exports = {
	apps: [{
		name: config.subName,
		script: config.pm2MainScript,
		...envConfig[config.nodeEnv],
		instances: config.pm2Instances,
		exec_mode: config.pm2ExecMode,
		autorestart: config.pm2AutoRestart,
		max_memory_restart: config.pm2MMR,
		merge_logs: config.pm2MergeLog,
	}],
};
