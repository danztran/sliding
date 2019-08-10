module.exports = {
	outputDir: '../server/vue-dist',
	devServer: {
		port: process.env.PORT || 8080,
		proxy: {
			'/': {
				target: process.env.DOCKER_SERVER_HOST || 'http://localhost:3000',
				changeOrigin: true,
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
