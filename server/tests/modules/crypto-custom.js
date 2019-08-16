const TestModule = require('../test-module');
const TestFunction = require('../test-function');
const crypto = require('../../modules/crypto-custom');

const testModule = new TestModule('crypto-custom.js');

const tests = {
	enc() {
		const test = new TestFunction('Encrypt');

		const inputs = [
			'abc',
			'123',
			'asdasd12 3123',
			'13 &23 4',
		];

		const len = inputs.length;
		for (let i = 0; i < len; i++) {
			const actual = crypto.enc(inputs[i]);
			test.notEquals(inputs[i], `Not ${inputs[i]}`, actual);
		}

		return test.result();
	},
	dec() {
		const test = new TestFunction('Decrypt');

		const inputs = [
			'khang',
			'an',
			'luan',
			'trinh',
		];

		const len = inputs.length;
		for (let i = 0; i < len; i++) {
			const encrypted = crypto.enc(inputs[i]);
			let decrypted = '';
			try {
				decrypted = crypto.dec(encrypted);
				test.equals(inputs[i], decrypted, decrypted);
			}
			catch (error) {
				test.fails(inputs[i], decrypted, '<error>');
			}
		}

		return test.result();
	},
};

testModule.add(tests.enc());
testModule.add(tests.dec());

module.exports = testModule.result();
