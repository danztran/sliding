// configure ip address to access server via LAN in development mode
const ip = require('ip');
if (process.env.NODE_ENV === 'development') {
	const serverHost = `http://${ip.address()}:3000`;
	process.env.VUE_APP_BASE_URL = serverHost;
	process.env.VUE_APP_BASE_URL_SOCKET = `${serverHost}/event`;
}

module.exports = {
	outputDir: '../server/vue-dist',
	devServer: {
		port: process.env.PORT || 8080
	},
	chainWebpack: (config) => {
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => options);
	}
};
