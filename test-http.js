// test-http.js
// Tests all commands in the http module
// Uses https://jsonplaceholder.typicode.com - a free public REST API

log.info('=== http module tests ===');

// http.get - simple GET request
http.transaction('GET request');
var getResult = http.get('https://jsonplaceholder.typicode.com/posts/1');
log.info('http.get status: ' + JSON.stringify(http.getResponse().statusCode));
http.assertStatus(200, 'GET should return 200');
http.assertStatusOk('status should be OK (2xx)');
log.info('http.get: PASS');

// http.getResponse - access full response object
var response = http.getResponse();
log.info('response type: ' + typeof response);
assert.notEqual(response, null, 'getResponse should not be null');
log.info('http.getResponse: PASS');

// http.getResponseBody - returns parsed JSON object or string
var body = http.getResponseBody();
var bodyStr = typeof body === 'object' ? JSON.stringify(body) : String(body);
log.info('body (first 100 chars): ' + bodyStr.substring(0, 100));
assert.contain(bodyStr, 'userId', 'GET body should contain userId field');
log.info('http.getResponseBody: PASS');

// http.getResponseHeaders - check headers
var headers = http.getResponseHeaders();
log.info('headers type: ' + typeof headers);
assert.notEqual(headers, null, 'headers should not be null');
log.info('http.getResponseHeaders: PASS');

// http.assertText - assert body contains text
http.assertText('userId', 'response should mention userId');
log.info('http.assertText: PASS');

// http.assertHeader - check content-type header
http.assertHeader('content-type', 'application/json', 'content-type should be JSON');
log.info('http.assertHeader: PASS');

// http.assertResponseTime - response should be under 5 seconds
http.assertResponseTime(5000);
log.info('http.assertResponseTime: PASS');

// http.post - POST with JSON body
http.transaction('POST request');
var postResult = http.post('https://jsonplaceholder.typicode.com/posts', {
    title: 'oxygen test post',
    body: 'test body content',
    userId: 1
});
http.assertStatus(201, 'POST should return 201 Created');
var postBody = http.getResponseBody();
var postBodyStr = typeof postBody === 'object' ? JSON.stringify(postBody) : String(postBody);
assert.contain(postBodyStr, 'oxygen test post', 'POST response should echo back the title');
log.info('http.post: PASS');

// http.put - PUT to update a resource
http.transaction('PUT request');
http.put('https://jsonplaceholder.typicode.com/posts/1', {
    id: 1,
    title: 'updated title',
    body: 'updated body',
    userId: 1
});
http.assertStatus(200, 'PUT should return 200');
log.info('http.put: PASS');

// http.patch - PATCH to partially update
http.transaction('PATCH request');
http.patch('https://jsonplaceholder.typicode.com/posts/1', {
    title: 'patched title'
});
http.assertStatus(200, 'PATCH should return 200');
log.info('http.patch: PASS');

// http.delete - DELETE a resource
http.transaction('DELETE request');
http.delete('https://jsonplaceholder.typicode.com/posts/1');
http.assertStatus(200, 'DELETE should return 200');
log.info('http.delete: PASS');

// http.getResponseUrl - get the final URL after redirects
http.transaction('URL check');
http.get('https://jsonplaceholder.typicode.com/posts/1');
var url = http.getResponseUrl();
log.info('response url: ' + url);
assert.notEqual(url, null, 'response URL should not be null');
log.info('http.getResponseUrl: PASS');

// http.setOptions - configure default options for subsequent requests
// got v14 requires timeout as an object with named fields, not a plain number
http.setOptions({ timeout: { request: 10000 } });
http.get('https://jsonplaceholder.typicode.com/posts/1');
http.assertStatus(200, 'request with custom options should succeed');
log.info('http.setOptions: PASS');

log.info('=== http module: all tests PASSED ===');
