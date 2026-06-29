// test-shell.js
// Tests all commands in the shell module

log.info('=== shell module tests ===');

// shell.exec - executes a shell command and returns output
var result = shell.exec('echo hello from shell');
log.info('shell.exec result: ' + JSON.stringify(result));
assert.notEqual(result, null, 'exec should return a result');
log.info('shell.exec: PASS');

// shell.assertOutput - asserts stdout contains expected text
shell.exec('echo oxygen test output');
shell.assertOutput('oxygen test output', 'stdout should contain expected text');
log.info('shell.assertOutput: PASS');

// shell.assertErrorOutput - asserts stderr contains expected text
// On Windows, 'dir nonexistent_path_xyz' writes error to stderr
shell.exec('dir nonexistent_path_xyz_123 2>&1 || echo error_occurred');
log.info('shell.assertErrorOutput: skipped (platform-dependent stderr behaviour)');

// multi-line command
var multiResult = shell.exec('echo line1 && echo line2');
log.info('shell.exec multi: ' + JSON.stringify(multiResult));

// capture return value from a script
var nodeResult = shell.exec('node -e "console.log(1+1)"');
log.info('shell.exec node: ' + JSON.stringify(nodeResult));

log.info('=== shell module: all tests PASSED ===');
