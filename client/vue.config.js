const devServerHost = process.env.SERVER_HOST_DOCKER || process.env.SERVER_HOST_LOCAL;
module.exports = {
	outputDir: '../server/vue-dist',
	devServer: {
		port: process.env.PORT || 8080,
		proxy: {
			'/api': {
				target: devServerHost,
			},
			'/sio': {
				target: devServerHost,
				ws: true,
			},

		},
	},
	chainWebpack: (config) => {
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => options);
	},
};
