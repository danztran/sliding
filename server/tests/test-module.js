class TestModule {
	constructor(name) {
		this._name = name;
		this._passes = 0;
		this._fails = 0;
		this._functions = 0;
		console.info(`\n\tRun Module Test: ${this._name}`);
	}

	add({ passes, fails, length }) {
		this._passes += passes;
		this._fails += fails;
		this._functions += 1;
	}

	result() {
		const result = {
			name: this._name,
			passes: this._passes,
			fails: this._fails,
			length: this._passes + this._fails,
			functions: this._functions,
		};
		console.info('\t--------------');
		console.info(`\tEnd Module Test: ${result.name}`);
		console.info(`\tFunctions: ${result.functions}`);
		console.info(`\tPasses: ${result.passes}/${result.length}\n`);
		return result;
	}
}

module.exports = TestModule;
