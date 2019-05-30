require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.VUE_DIST = process.env.VUE_DIST || 'vue-dist';
process.env.SUB_NAME = process.env.SUB_NAME || 'dev';
process.env.MAIN_JS = process.env.MAIN_JS || './bin/www';
process.env.PM2_INSTANCES = process.env.PM2_INSTANCES || 1;
process.env.PM2_MMR = process.env.PM2_MMR || undefined;

const envConfig = {
	production: {
		log_date_format: ''
	},
	development: {
		watch: true,
		ignore_watch: [
			'public',
			'storage',
			'.git',
			'logs',
			process.env.VUE_DIST
		],
		log_date_format: 'YYYY-MM-DD HH:mm Z',
		out_file: './logs/out.log',
		error_file: './logs/error.log'
	}
};

module.exports = {
	apps: [{
		name: process.env.SUB_NAME,
		script: process.env.MAIN_JS,
		...envConfig[process.env.NODE_ENV],
		instances: process.env.PM2_INSTANCES,
		exec_mode: 'cluster',
		autorestart: true,
		max_memory_restart: process.env.PM2_MMR,
		merge_logs: true
	}]
};
