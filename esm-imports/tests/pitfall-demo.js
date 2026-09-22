// Demonstrates scriptTransformer.js's handling of an Oxygen command sitting at a
// support file's own top level (pitfalls/topLevelReady.js), and the simpler
// alternative fix for the same situation (pitfalls/topLevelCallGood.js).

web.init();
web.open('https://the-internet.herokuapp.com/');

// require() here is inside this test script's own (async-wrapped) top level, so the
// transform automatically awaits topLevelReady.js's `__ready` promise before this
// line finishes - getPageTitle() below is guaranteed to already have its real value.
const ready = require('../pitfalls/topLevelReady.js');
const readyTitle = ready.getPageTitle();
log.info('topLevelReady.js resolved title: ' + readyTitle);
assert.contain(readyTitle, 'The Internet');

// the alternative: no top-level call at all, so no __ready involved either.
const good = require('../pitfalls/topLevelCallGood.js');
const goodTitle = good.getPageTitle();
log.info('topLevelCallGood.js returned title: ' + goodTitle);
assert.contain(goodTitle, 'The Internet');

web.dispose();
