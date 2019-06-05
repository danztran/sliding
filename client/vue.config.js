
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
