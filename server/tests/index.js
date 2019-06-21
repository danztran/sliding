const TestMain = require('./test-main');
const testMain = new TestMain();

const testCommon = require('./modules/common');

testMain.add(testCommon);

const result = testMain.result();

if (result.passes < result.length) {
	console.error('Failure !!!\n');
	process.exit(1);
}
else {
	console.info('Success: All tests passes\n');
	process.exit(0);
}
