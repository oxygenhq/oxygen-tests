// test-proxy.js
// Tests all commands in the proxy module (HTTP traffic interception via mitmproxy)
// Requires the mitmproxy binary to be available (bundled with @oxygenhq/mitmproxy-node)

log.info('=== proxy module tests ===');

// proxy.init - configure proxy options
proxy.init({
    port: 8888   // port to listen on; default is 8080
});
log.info('proxy.init: PASS');

// proxy.start - start the proxy server
proxy.transaction('start proxy');
proxy.start();
log.info('proxy.start: PASS');

// Use web module to route traffic through the proxy
web.init({
    browserName: 'chrome',
    proxy: {
        proxyType: 'manual',
        httpProxy: 'localhost:8888',
        sslProxy: 'localhost:8888'
    }
});

web.transaction('capture traffic');
web.open('https://www.wikipedia.org');
web.pause(2000);
log.info('navigated through proxy');

// proxy.getRequests - get all captured HTTP requests
var requests = proxy.getRequests();
log.info('proxy.getRequests count: ' + requests.length);
assert.equal(requests.length > 0, true, 'proxy should have captured at least one request');
log.info('proxy.getRequests: PASS');

// proxy.waitForUrl - wait until a specific URL is requested
proxy.transaction('wait for url');
web.open('https://en.wikipedia.org/wiki/Main_Page');
proxy.waitForUrl('en.wikipedia.org', 10000);
log.info('proxy.waitForUrl: PASS');

// proxy.waitFor - wait for a request matching a filter function
proxy.waitFor(function(req) {
    return req.url && req.url.includes('wikipedia');
}, 10000);
log.info('proxy.waitFor: PASS');

// proxy.assertUrl - assert that a URL was requested
proxy.assertUrl('wikipedia.org', 'wikipedia should have been requested');
log.info('proxy.assertUrl: PASS');

// proxy.assertStatusCode - assert that a URL returned a specific status code
proxy.assertStatusCode('wikipedia.org', 200, 'wikipedia should return 200');
log.info('proxy.assertStatusCode: PASS');

// proxy.stop - stop the proxy server
proxy.transaction('stop proxy');
proxy.stop();
log.info('proxy.stop: PASS');

log.info('=== proxy module: all tests PASSED ===');
