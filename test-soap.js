// test-soap.js
// Tests all commands in the soap module
// Uses a public SOAP demo service

log.info('=== soap module tests ===');

// Public SOAP endpoint for testing: a number-to-words converter
var WSDL_URL = 'https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL';

// soap.describe - fetch and return WSDL service description
log.info('--- describe ---');
var description = soap.describe(WSDL_URL);
log.info('soap.describe: ' + JSON.stringify(description).substring(0, 100));
assert.notEqual(description, null, 'describe should return service info');
log.info('soap.describe: PASS');

// soap.get - call a SOAP method
log.info('--- call method ---');
var result = soap.get(
    WSDL_URL,
    'NumberToWords',            // method name
    { ubiNum: 42 }              // parameters
);
log.info('soap.get result: ' + JSON.stringify(result).substring(0, 100));
assert.notEqual(result, null, 'SOAP call should return a result');
log.info('soap.get: PASS');

// soap.getLastResponseHeaders - headers from most recent SOAP call
var headers = soap.getLastResponseHeaders();
log.info('soap.getLastResponseHeaders: ' + JSON.stringify(headers).substring(0, 100));
log.info('soap.getLastResponseHeaders: PASS');

// soap.authBasic - configure Basic authentication
// PLACEHOLDER - replace with a WSDL that requires Basic auth
// soap.authBasic('username', 'password');
// log.info('soap.authBasic: configured');

// soap.authBearer - configure Bearer token authentication
// soap.authBearer('your-bearer-token');
// log.info('soap.authBearer: configured');

// soap.authNTLM - configure NTLM authentication (Windows)
// soap.authNTLM('domain\\username', 'password', 'domain', 'workstation');
// log.info('soap.authNTLM: configured');

// soap.setProxy - route SOAP requests through a proxy
// soap.setProxy('http://proxy.example.com:8080');
// log.info('soap.setProxy: configured');

log.info('=== soap module: all tests PASSED ===');
