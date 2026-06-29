// test-utils.js
// Tests all commands in the utils module

log.info('=== utils module tests ===');

// utils.transaction - marks a logical transaction boundary in results
utils.transaction('setup');

// utils.pause - waits for the specified number of milliseconds
log.info('Testing utils.pause (500ms)...');
utils.pause(500);
log.info('utils.pause: PASS');

// utils.encrypt / utils.decrypt - AES encryption round-trip
utils.transaction('encryption');
var plaintext = 'my secret value 123';
var encrypted = utils.encrypt(plaintext);
log.info('utils.encrypt: ' + encrypted);
assert.notEqual(encrypted, plaintext, 'encrypted value should differ from plaintext');

// utils.decrypt returns a special object — use getDecryptResult() for the plaintext value
var decrypted = utils.decrypt(encrypted);
log.info('utils.decrypt (object): ' + decrypted);           // prints ENCRYPTED (by design)
var decryptedValue = decrypted.getDecryptResult();
log.info('utils.decrypt value: ' + decryptedValue);
assert.equal(decryptedValue, plaintext, 'decrypted value should match original');
log.info('utils.encrypt / utils.decrypt: PASS');

// utils.dnsResolve - resolves hostname to IP
utils.transaction('dns');
// utils.dnsResolve returns an array of IPs for the given hostname
var ips = utils.dnsResolve('www.wikipedia.org');
log.info('utils.dnsResolve wikipedia: ' + ips);
assert.notEqual(ips, null, 'DNS should resolve to IPs');
assert.equal(ips.length > 0, true, 'should have at least one IP');
var firstIp = ips[0];
assert.equal(firstIp, 'regex:^\\d+\\.\\d+\\.\\d+\\.\\d+$', 'resolved IP should be a valid IPv4 address');
log.info('utils.dnsResolve: PASS');

// utils.xmlToJson - converts XML string to JSON object
utils.transaction('xml');
var xml = '<root><item id="1">hello</item><item id="2">world</item></root>';
var json = utils.xmlToJson(xml);
log.info('utils.xmlToJson: ' + JSON.stringify(json));
assert.notEqual(json, null, 'xmlToJson should return a non-null object');
log.info('utils.xmlToJson: PASS');

// utils.writeCsv / utils.readCsv - CSV round-trip
utils.transaction('csv');
var csvPath = 'C:\\Users\\rom\\Desktop\\test-utils-output.csv';
var csvData = [
    { name: 'Alice', age: '30', city: 'London' },
    { name: 'Bob',   age: '25', city: 'Paris'  }
];
utils.writeCsv(csvPath, csvData);
log.info('utils.writeCsv: written to ' + csvPath);

var readBack = utils.readCsv(csvPath);
log.info('utils.readCsv: ' + JSON.stringify(readBack));
assert.equal(readBack.length, 2, 'should read back 2 rows');
assert.equal(readBack[0].name, 'Alice', 'first row name should be Alice');
log.info('utils.writeCsv / utils.readCsv: PASS');

log.info('=== utils module: all tests PASSED ===');
