// test-mob.js
// Tests commands in the mob module (Appium / mobile automation)
// PLACEHOLDER - requires a running Appium server and a connected device/emulator
// Replace capability values with your actual device details

log.info('=== mob module tests ===');

// mob.init - start Appium session
// NOTE: if the app uses WebView (hybrid app), Appium needs a matching ChromeDriver.
// Start Appium with: appium --allow-insecure chromedriver_autodownload
// to allow automatic download of the correct ChromeDriver version.
mob.init({
    platformName: 'Android',
    'appium:udid': 'QV7125A224',
    'appium:app': 'Z:\\app-debug.apk',
    'appium:automationName': 'UiAutomator2',
    'appium:chromedriverAutodownload': true,
    'appium:autoWebview': false,
    'appium:newCommandTimeout': 60,
    'appium:noReset': true
});
mob.pause(3000);
mob.setNativeContext();

// debug: log current context and screen source to understand app state
var ctx = mob.isWebViewContext();
log.info('is WebView context: ' + ctx);
var source = mob.getSource();
log.info('page source (first 500): ' + source.substring(0, 500));
log.info('mob.init: PASS');

log.info('--- app launch ---');

// mob.open - open a URL (for hybrid/web context)
// mob.open('https://www.wikipedia.org');

// mob.click - click an element by locator
mob.click('//android.widget.Button[@text="OK"]');
log.info('mob.click: PASS');

// mob.type - type text into an input
mob.type('//android.widget.EditText[1]', 'test input');
log.info('mob.type: PASS');

// mob.getText - get text from an element
var text = mob.getText('//android.widget.TextView[1]');
log.info('mob.getText: ' + text);
log.info('mob.getText: PASS');

// mob.isVisible - check element visibility
var visible = mob.isVisible('//android.widget.TextView[1]', 3000);
log.info('mob.isVisible: ' + visible);
log.info('mob.isVisible: PASS');

// mob.waitForVisible - wait for an element to appear
mob.waitForVisible('//android.widget.TextView[1]', 5000);
log.info('mob.waitForVisible: PASS');

// mob.waitForExist
mob.waitForExist('//android.widget.TextView[1]', 5000);
log.info('mob.waitForExist: PASS');

// mob.assertText - assert element text
mob.assertText('//android.widget.TextView[1]', 'expected text');
log.info('mob.assertText: PASS');

// mob.assertTitle
// mob.assertTitle('App Title');

// mob.pause
mob.pause(1000);
log.info('mob.pause: PASS');

// mob.swipe - swipe gesture
mob.swipe('//android.widget.ScrollView');
log.info('mob.swipe: PASS');

// mob.tap - tap at coordinates
mob.tap(200, 400);
log.info('mob.tap: PASS');

// mob.scroll
mob.scrollIntoView('//android.widget.TextView[@text="Settings"]');
log.info('mob.scrollIntoView: PASS');

// mob.hideKeyboard
mob.hideKeyboard();
log.info('mob.hideKeyboard: PASS');

// mob.getSource
var source = mob.getSource();
assert.contain(source, 'android', 'page source should contain android');
log.info('mob.getSource: PASS');

// mob.takeScreenshot
var screenshot = mob.takeScreenshot();
assert.notEqual(screenshot, null, 'screenshot should not be null');
log.info('mob.takeScreenshot: PASS');

// mob.getCurrentActivity
var activity = mob.getCurrentActivity();
log.info('mob.getCurrentActivity: ' + activity);
log.info('mob.getCurrentActivity: PASS');

// mob.getCurrentPackage
var pkg = mob.getCurrentPackage();
log.info('mob.getCurrentPackage: ' + pkg);
log.info('mob.getCurrentPackage: PASS');

// mob.isAppInstalled
var installed = mob.isAppInstalled('com.android.settings');
log.info('mob.isAppInstalled settings: ' + installed);
log.info('mob.isAppInstalled: PASS');

// mob.back
mob.back();
log.info('mob.back: PASS');

// mob.sendKeys - send key codes
mob.sendKeys(''); // Backspace
log.info('mob.sendKeys: PASS');

log.info('=== mob module: all tests PASSED ===');
