const TestModule = require('../test-module');
const TestFunction = require('../test-function');
const _cm = require('../../modules/common');

const testModule = new TestModule('common.js');

const tests = {
	varToText() {
		const test = new TestFunction('varToText');

		const inputs = [
			'nodeVar',
			'username',
			'email_address',
			'  listUsers',
		];

		const outputs = [
			'Node Var',
			'Username',
			'Email address',
			'List Users',
		];

		const len = inputs.length;
		for (let i = 0; i < len; i++) {
			const actual = _cm.varToText(inputs[i]);
			test.equals(inputs[i], outputs[i], actual);
		}

		return test.result();
	},
	replaceVars() {
		const test = new TestFunction('replaceVars');

		const inputs = [
			['Welcome to {name}', { name: 'Sliding' }],
			['Welcome back <fullname>', { fullname: 'Charles' }, { s: '<', e: '>' }],
			['{object} {code} not found', { object: 'Event', code: 'K317' }, { rs: '#', re: '' }],
		];

		const outputs = [
			'Welcome to Sliding',
			'Welcome back Charles',
			'#Event #K317 not found',
		];

		const len = inputs.length;
		for (let i = 0; i < len; i++) {
			const actual = _cm.replaceVars(...inputs[i]);
			test.equals(inputs[i], outputs[i], actual);
		}

		return test.result();
	},
	nextStringOf() {
		const test = new TestFunction('nextStringOf');

		const inputs = [
			['aaa', 'abcdef'],
			['wxyz', 'srtvuwxyz'],
			['fff', 'abcdef'],
			['2546', 'abc012637'],
			['999', '0123456789'],
		];

		const outputs = [
			'aab',
			'wxzs',
			'aaaa',
			'2543',
			'0000',
		];

		const len = inputs.length;
		for (let i = 0; i < len; i++) {
			const actual = _cm.nextStringOf(...inputs[i]);
			test.equals(inputs[i], outputs[i], actual);
		}

		return test.result();
	},
	isEmail() {
		const test = new TestFunction('isEmail');

		const inputs = [
			'nadinh@gmail.com',
			'khudang@gmail.com',
			'bambaya',
			'nosuitcase@',
			'@nobody',
		];

		const outputs = [
			true,
			true,
			false,
			false,
			false,
		];

		const len = inputs.length;
		for (let i = 0; i < len; i++) {
			const actual = _cm.isEmail(inputs[i]);
			test.equals(inputs[i], outputs[i], actual);
		}

		return test.result();
	},
};

testModule.add(tests.varToText());
testModule.add(tests.replaceVars());
testModule.add(tests.nextStringOf());
testModule.add(tests.isEmail());

module.exports = testModule.result();
