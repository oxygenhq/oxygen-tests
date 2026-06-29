// test-web.js
// Tests commands in the web module using Wikipedia

web.transaction('init');
web.init();
web.setTimeout(15 * 1000);
log.info('web.init: PASS');

// open
web.transaction('navigation');
web.open('https://www.wikipedia.org');
log.info('web.open: PASS');

// getTitle / assertTitle
var title = web.getTitle();
log.info('web.getTitle: ' + title);
assert.contain(title, 'Wikipedia', 'page title should contain Wikipedia');
web.assertTitle('Wikipedia');
log.info('web.getTitle / assertTitle: PASS');

// getUrl
var url = web.getUrl();
log.info('web.getUrl: ' + url);
assert.contain(url, 'wikipedia', 'URL should contain wikipedia');
log.info('web.getUrl: PASS');

// isVisible
var searchVisible = web.isVisible('id=searchInput');
assert.equal(searchVisible, true, 'search box should be visible');
log.info('web.isVisible: PASS');

// isExist
var exists = web.isExist('id=searchInput');
assert.equal(exists, true, 'search box should exist');
log.info('web.isExist: PASS');

// type + waitForText
web.transaction('search');
web.type('id=searchInput', 'Oxygen');
web.click('/html/body/main/div[2]/form/fieldset/button');
web.waitForText('//h1', 'Oxygen', 5000);
log.info('web.type / web.click / web.waitForText: PASS');

// getText
var heading = web.getText('//h1');
log.info('web.getText h1: ' + heading);
assert.contain(heading, 'Oxygen', 'heading should contain Oxygen');
log.info('web.getText: PASS');

// getUrl after navigation
var searchUrl = web.getUrl();
assert.contain(searchUrl, 'Oxygen', 'URL should reflect search');
log.info('post-search getUrl: PASS');

// back / forward
web.transaction('navigation history');
web.back();
web.waitForVisible('id=searchInput', 5000);
log.info('web.back: PASS');

// refresh
web.refresh();
web.waitForVisible('id=searchInput', 5000);
log.info('web.refresh: PASS');

// getSource
web.transaction('source');
var src = web.getSource();
assert.contain(src, '<html', 'page source should contain html tag');
assert.contain(src, 'Wikipedia', 'page source should contain Wikipedia');
log.info('web.getSource: PASS');

// execute - run JavaScript in the browser
web.transaction('javascript');
var jsResult = web.execute(function() {
    return document.title;
});
log.info('web.execute (document.title): ' + jsResult);
assert.contain(jsResult, 'Wikipedia', 'JS execution should return page title');
log.info('web.execute: PASS');

// findElement / findElements
web.transaction('find elements');
var searchEl = web.findElement('id=searchInput');
assert.notEqual(searchEl, null, 'findElement should find search input');
log.info('web.findElement: PASS');

// getAttribute
web.transaction('attributes');
var inputType = web.getAttribute('id=searchInput', 'type');
log.info('web.getAttribute type: ' + inputType);
assert.notEqual(inputType, null, 'type attribute should exist on input');
log.info('web.getAttribute: PASS');

// getCssValue
var display = web.getCssValue('id=searchInput', 'display');
log.info('web.getCssValue display: ' + display);
log.info('web.getCssValue: PASS');

// getElementCount
var linkCount = web.getElementCount('//a');
log.info('web.getElementCount links: ' + linkCount);
assert.equal(linkCount > 0, true, 'page should have at least one link');
log.info('web.getElementCount: PASS');

// waitForExist / waitForVisible
web.open('https://www.wikipedia.org');
web.waitForExist('id=searchInput', 5000);
web.waitForVisible('id=searchInput', 5000);
log.info('web.waitForExist / waitForVisible: PASS');

// waitForNotText (search for text that won't appear)
web.transaction('wait commands');
web.type('id=searchInput', 'Test');
web.waitForNotText('//input[@id="searchInput"]', 'xyz_nonexistent_text_xyz', 3000);
log.info('web.waitForNotText: PASS');

// pause
web.pause(500);
log.info('web.pause: PASS');

// takeScreenshot
web.transaction('screenshot');
var screenshot = web.takeScreenshot();
log.info('web.takeScreenshot length: ' + (screenshot ? screenshot.length : 'null'));
assert.notEqual(screenshot, null, 'screenshot should not be null');
assert.equal(screenshot.length > 0, true, 'screenshot should not be empty');
log.info('web.takeScreenshot: PASS');

// getWindowHandles / getWindowSize
web.transaction('window');
var handles = web.getWindowHandles();
log.info('web.getWindowHandles count: ' + handles.length);
assert.equal(handles.length >= 1, true, 'should have at least one window handle');
log.info('web.getWindowHandles: PASS');

var size = web.getWindowSize();
log.info('web.getWindowSize: ' + JSON.stringify(size));
assert.notEqual(size, null, 'window size should not be null');
log.info('web.getWindowSize: PASS');

// maximizeWindow / setWindowSize
web.maximizeWindow();
log.info('web.maximizeWindow: PASS');

web.setWindowSize(1280, 800);
log.info('web.setWindowSize: PASS');

// cookies
web.transaction('cookies');
var cookies = web.getCookies();
log.info('web.getCookies count: ' + (cookies ? cookies.length : 0));
log.info('web.getCookies: PASS');

web.deleteCookies();
log.info('web.deleteCookies: PASS');

// getCookies after delete
var cookiesAfter = web.getCookies();
log.info('getCookies after delete: ' + (cookiesAfter ? cookiesAfter.length : 0));

// getBrowserLogs
web.transaction('browser logs');
var browserLogs = web.getBrowserLogs();
log.info('web.getBrowserLogs count: ' + (browserLogs ? browserLogs.length : 0));
log.info('web.getBrowserLogs: PASS');

// assertText / assertTextPresent
web.transaction('assertions');
web.open('https://www.wikipedia.org');
web.waitForVisible('id=searchInput', 5000);
web.assertTextPresent('Wikipedia');
log.info('web.assertTextPresent: PASS');

// verifyTitle (non-fatal version of assertTitle)
web.verifyTitle('Wikipedia');
log.info('web.verifyTitle: PASS');

// verifyTextPresent (non-fatal)
web.verifyTextPresent('Wikipedia');
log.info('web.verifyTextPresent: PASS');

// isAlertPresent (no alert expected on Wikipedia)
var alertPresent = web.isAlertPresent();
assert.equal(alertPresent, false, 'no alert should be present on Wikipedia');
log.info('web.isAlertPresent: PASS');

// selectFrame (return to default if framed — Wikipedia has no frames, just tests the call)
web.selectFrame(null);
log.info('web.selectFrame(null): PASS');

log.info('=== web module: all tests PASSED ===');
