class TestMain {
	constructor() {
		this._passes = 0;
		this._fails = 0;
		this._functions = 0;
		this._modules = 0;
		console.info('\n======RUNNING==TEST========\n');
	}

	add({ passes, fails, length, functions }) {
		this._passes += passes;
		this._fails += fails;
		this._functions += functions;
		this._modules += 1;
	}

	result() {
		const result = {
			passes: this._passes,
			fails: this._fails,
			length: this._passes + this._fails,
			functions: this._functions,
			modules: this._modules,
		};
		console.info('\n======ENDING==TEST========');
		console.info(`Modules: ${result.modules}`);
		console.info(`Functions: ${result.functions}`);
		console.info(`Passes: ${result.passes}/${result.length}`);
		return result;
	}
}

module.exports = TestMain;
