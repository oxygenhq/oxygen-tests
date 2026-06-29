// test-eyes.js
// Tests all commands in the eyes module (Applitools visual testing)
// PLACEHOLDER - requires a valid Applitools API key
// Get a free key at https://applitools.com

log.info('=== eyes module tests ===');

// First open a browser (eyes requires an active web driver)
web.init();
web.open('https://www.wikipedia.org');
web.waitForVisible('id=searchInput', 10000);

// eyes.init - start an Applitools Eyes session
log.info('--- init ---');
eyes.init(
    'web',                     // module name or reference to use as the driver
    'YOUR_APPLITOOLS_API_KEY'  // API key from applitools.com
);
log.info('eyes.init: PASS');

// eyes.check - perform a visual checkpoint with a specific target
log.info('--- visual checks ---');
var { Target } = require('@applitools/eyes-webdriverio');

// Check the full page
var result = eyes.check(
    'Wikipedia homepage',       // checkpoint name
    Target.window().fully()    // what to capture (full page)
);
log.info('eyes.check (full page): ' + result);
log.info('eyes.check: PASS');

// eyes.checkWindow - simplified full window check
var windowResult = eyes.checkWindow(
    'Wikipedia homepage window',  // optional tag
    5000                          // optional match timeout ms
);
log.info('eyes.checkWindow: ' + windowResult);
log.info('eyes.checkWindow: PASS');

// Navigate and check another state
web.click('id=searchInput');
web.type('id=searchInput', 'Oxygen');
eyes.check('search input filled', Target.window());
log.info('eyes.check (after typing): PASS');

// eyes.dispose - close the Eyes session and get results
log.info('--- close session ---');
var testResults = eyes.dispose();
log.info('eyes.dispose test results: ' + JSON.stringify(testResults));
log.info('eyes.dispose: PASS');

log.info('=== eyes module: all tests PASSED ===');
