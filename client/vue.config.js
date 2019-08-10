module.exports = {
	outputDir: '../server/vue-dist',
	devServer: {
		port: process.env.PORT || 8080,
		proxy: process.env.DOCKER_SERVER_HOST || 'http://localhost:3000',
		// 	'/': {
		// 		target: ,
		// 		// changeOrigin: true,
		// 		// secure: false,
		// 	},
		// 	logLevel: 'silent',
		// },
	},
	chainWebpack: (config) => {
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => options);
	},
};
