// test-win.js
// Tests commands in the win module (WinAppDriver / Windows desktop automation)
// PLACEHOLDER - requires WinAppDriver running on port 4723 and a Windows application
// Replace capability values with your actual app details

log.info('=== win module tests ===');

// win.init - start WinAppDriver session
// platformName is a standard W3C cap (no prefix); app/automationName use appium: prefix
win.init({
    platformName: 'Windows',
    'appium:app': 'Microsoft.WindowsCalculator_8wekyb3d8bbwe!App',
    'appium:automationName': 'Windows',
    'appium:deviceName': 'WindowsPC'
});
log.info('win.init: PASS');

log.info('--- basic interaction ---');

// win.click
win.click('//Button[@Name="Seven"]');
log.info('win.click: PASS');

// win.type
win.type('//Edit', '123');
log.info('win.type: PASS');

// win.getText
var displayText = win.getText('//Text[@AutomationId="CalculatorResults"]');
log.info('win.getText: ' + displayText);
log.info('win.getText: PASS');

// win.assertText
win.assertText('//Text[@AutomationId="CalculatorResults"]', '7');
log.info('win.assertText: PASS');

// win.isVisible
var visible = win.isVisible('//Button[@Name="Seven"]', 3000);
assert.equal(visible, true, 'button should be visible');
log.info('win.isVisible: PASS');

// win.isExist
var exists = win.isExist('//Button[@Name="Seven"]');
assert.equal(exists, true, 'button should exist');
log.info('win.isExist: PASS');

// win.waitForVisible
win.waitForVisible('//Button[@Name="Seven"]', 5000);
log.info('win.waitForVisible: PASS');

// win.waitForExist
win.waitForExist('//Button[@Name="Seven"]', 5000);
log.info('win.waitForExist: PASS');

// win.findElement
var btn = win.findElement('//Button[@Name="Seven"]');
assert.notEqual(btn, null, 'findElement should find the button');
log.info('win.findElement: PASS');

// win.findElements
var buttons = win.findElements('//Button');
assert.equal(buttons.length > 0, true, 'should find at least one button');
log.info('win.findElements: PASS');

// win.getSource
var src = win.getSource();
assert.notEqual(src, null, 'source should not be null');
log.info('win.getSource: PASS');

// win.takeScreenshot
var screenshot = win.takeScreenshot();
assert.notEqual(screenshot, null, 'screenshot should not be null');
log.info('win.takeScreenshot: PASS');

// win.pause
win.pause(500);
log.info('win.pause: PASS');

// win.back
win.back();
log.info('win.back: PASS');

// win.sendKeys
win.sendKeys('Hello');
log.info('win.sendKeys: PASS');

log.info('=== win module: all tests PASSED ===');
