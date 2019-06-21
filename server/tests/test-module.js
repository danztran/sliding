class TestModule {
	constructor(name) {
		this._name = name;
		this._passes = 0;
		this._fails = 0;
		console.info(`\tRun Module Test: ${this._name}`);
	}

	add({ passes, fails, length }) {
		this._passes += passes;
		this._fails += fails;
	}

	result() {
		const result = {
			name: this._name,
			passes: this._passes,
			fails: this._fails,
			length: this._passes + this._fails
		};
		console.info('\t--------------');
		console.info(`\tEnd Module Test: ${result.name}`);
		console.info(`\tPasses: ${result.passes}/${result.length}`);
		return result;
	}
}

module.exports = TestModule;
