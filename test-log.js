// test-log.js
// Tests all commands in the log module

log.info('=== log module tests ===');

log.info('This is an INFO message');
log.debug('This is a DEBUG message');
log.warn('This is a WARN message - test will be marked Warning if it does not fail later');
log.error('This is an ERROR message (non-fatal when called directly)');

log.info('Logging with variables: ' + (1 + 1) + ' = 2');
log.info('Logging env: ' + JSON.stringify(env));
log.info('Logging params: ' + JSON.stringify(params));

log.info('=== log module: all tests PASSED ===');
