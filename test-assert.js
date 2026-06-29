// test-assert.js
// Tests all commands in the assert module

log.info('=== assert module tests ===');

// assert.equal
assert.equal(2 + 2, 4, '2+2 should equal 4');
assert.equal('hello', 'hello', 'identical strings should be equal');
log.info('assert.equal: PASS');

// assert.notEqual
assert.notEqual(1, 2, '1 should not equal 2');
assert.notEqual('foo', 'bar', 'foo should not equal bar');
log.info('assert.notEqual: PASS');

// assert.contain
assert.contain('hello world', 'world', 'string should contain substring');
assert.contain([1, 2, 3], 2, 'array should contain element');
log.info('assert.contain: PASS');

// assert.pass - soft pass (marks step passed without stopping test)
assert.pass('explicit soft pass');
log.info('assert.pass: PASS');

// assert.fail - intentionally skip this one as it would stop the test
// assert.fail('this would stop the test')

log.info('=== assert module: all tests PASSED ===');
