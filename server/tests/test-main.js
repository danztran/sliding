class TestMain {
	constructor() {
		this._passes = 0;
		this._fails = 0;
		console.info('\n======RUNNING==TEST========\n');
	}

	add({ passes, fails, length }) {
		this._passes += passes;
		this._fails += fails;
	}

	result() {
		const result = {
			passes: this._passes,
			fails: this._fails,
			length: this._passes + this._fails
		};
		console.info('\n======ENDING==TEST========');
		console.info(`Passes: ${result.passes}/${result.length}`);
		return result;
	}
}

module.exports = TestMain;
