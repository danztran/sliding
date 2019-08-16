class Test {
	constructor(name) {
		this._name = name;
		this._passes = 0;
		this._fails = 0;
		console.info('\t----------------');
		console.info(`\tRun Function Test: ${this._name}`);
	}

	equals(input, output, actual) {
		if (output === actual) {
			this.passes();
		}
		else {
			this.fails(...arguments);
		}
	}

	notEquals(input, output, actual) {
		if (output !== actual) {
			this.passes();
		}
		else {
			this.fails(...arguments, 'NOT equal with');
		}
	}

	passes() {
		this._passes += 1;
	}

	fails(input, output, actual, toBe = 'equal with') {
		console.error(`\t\tFail item: ${this._name}`);
		console.error(`\t\tInput: "${input.toString()}"`);
		console.error(`\t\tExpected Output to be ${toBe}: "${output.toString()}"`);
		console.error(`\t\tActual: "${actual.toString()}"\n`);
		this._fails += 1;
		return this;
	}

	result() {
		const result = {
			name: this._name,
			passes: this._passes,
			fails: this._fails,
			length: this._passes + this._fails,
		};
		console.info(`\tEnd Function Test: ${result.name}`);
		console.info(`\tPasses: ${result.passes}/${result.length}`);
		return result;
	}
}

module.exports = Test;
