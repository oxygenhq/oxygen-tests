// test-mob-demo.js
// Sauce Labs My Demo App (com.saucelabs.mydemoapp.android)
// App opens on Products screen; login via hamburger menu → Log In

log.info('=== mob module demo tests ===');

mob.init({
    platformName: 'Android',
    'appium:udid': 'QV7125A224',
    'appium:app': 'Z:\\mda-2.2.0-25.apk',
    'appium:automationName': 'UiAutomator2',
    'appium:appWaitActivity': 'com.saucelabs.mydemoapp.android.view.activities.MainActivity',
    'appium:newCommandTimeout': 60,
    'appium:noReset': false
});
mob.pause(2000);
log.info('mob.init: PASS');

// --- verify products screen ---

mob.waitForVisible('~title', 10000);
var title = mob.getText('~title');
log.info('Screen title: ' + title);
assert.contain(title, 'Products', 'should be on Products screen');
log.info('Products screen: PASS');

// --- login via hamburger menu ---

mob.click('~View menu');
mob.pause(1000);
mob.waitForVisible('//android.widget.TextView[@text="Log In"]', 5000);
mob.click('//android.widget.TextView[@text="Log In"]');
mob.pause(1000);
log.info('Opened login screen');

// --- login form ---

mob.waitForVisible('id=com.saucelabs.mydemoapp.android:id/nameET', 5000);
mob.type('id=com.saucelabs.mydemoapp.android:id/nameET', 'standard_user');
mob.type('id=com.saucelabs.mydemoapp.android:id/passwordET', 'secret_sauce');
mob.click('id=com.saucelabs.mydemoapp.android:id/loginBtn');
mob.pause(2000);
log.info('Login: PASS');

// --- tap first product ---

mob.waitForVisible('~title', 10000);
mob.click('~Product Image');
mob.pause(1000);
log.info('mob.click first product: PASS');

// --- add to cart ---

mob.waitForVisible('~Add To Cart', 5000);
mob.click('~Add To Cart');
mob.pause(1000);
log.info('mob.click Add To Cart: PASS');

mob.back();
mob.pause(1000);

// --- verify cart badge ---

var cartBadge = mob.getText('id=com.saucelabs.mydemoapp.android:id/cartTV');
log.info('Cart badge: ' + cartBadge);
assert.equal(cartBadge, '1', 'cart should have 1 item');
log.info('Cart badge: PASS');

// --- open cart ---

mob.click('~View cart');
mob.pause(1000);
log.info('mob.click cart: PASS');

// --- screenshot ---

var screenshot = mob.takeScreenshot();
assert.notEqual(screenshot, null, 'screenshot not null');
log.info('mob.takeScreenshot: PASS');

log.info('=== mob module demo: all tests PASSED ===');
