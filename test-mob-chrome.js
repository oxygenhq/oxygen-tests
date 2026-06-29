// test-mob-chrome.js
// Tests Chrome browser automation on Android using the mob module
// Requires Appium running with: appium --allow-insecure uiautomator2:chromedriver_autodownload

log.info('=== mob Chrome browser tests ===');

mob.init({
    platformName: 'Android',
    'appium:udid': 'QV7125A224',
    'appium:automationName': 'UiAutomator2',
    browserName: 'Chrome',
    'appium:chromedriverAutodownload': true,
    'appium:newCommandTimeout': 60
});
log.info('mob.init (Chrome): PASS');

// --- navigate to Wikipedia ---

mob.open('https://www.wikipedia.org');
mob.pause(2000);
log.info('mob.open Wikipedia: PASS');

// --- get page title ---

var pageTitle = mob.getTitle();
log.info('Page title: ' + pageTitle);
assert.contain(pageTitle, 'Wikipedia', 'should be on Wikipedia');
log.info('mob.getTitle: PASS');

// --- get current URL ---

var url = mob.getUrl();
log.info('Current URL: ' + url);
assert.contain(url, 'wikipedia.org', 'URL should contain wikipedia.org');
log.info('mob.getUrl: PASS');

// --- search ---

mob.waitForVisible('id=searchInput', 10000);
mob.type('id=searchInput', 'Appium');
log.info('mob.type search: PASS');

mob.click('/html/body/main/div[2]/form/fieldset/button');
mob.pause(3000);
log.info('mob.click search button: PASS');

// --- verify search results ---

mob.waitForVisible('//h1', 10000);
var heading = mob.getText('//h1');
log.info('Result heading: ' + heading);
assert.contain(heading, 'Appium', 'heading should contain Appium');
log.info('Search and navigate: PASS');

// --- get source ---

var src = mob.getSource();
assert.contain(src, 'Appium', 'page source should contain Appium');
log.info('mob.getSource: PASS');

// --- screenshot ---

var screenshot = mob.takeScreenshot();
assert.notEqual(screenshot, null, 'screenshot should not be null');
log.info('mob.takeScreenshot: PASS');

// --- navigate back ---

mob.back();
mob.pause(2000);
log.info('mob.back: PASS');

var backUrl = mob.getUrl();
log.info('URL after back: ' + backUrl);
assert.contain(backUrl, 'wikipedia', 'should be back on wikipedia');

log.info('=== mob Chrome browser: all tests PASSED ===');
