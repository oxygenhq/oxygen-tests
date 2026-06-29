// test-date.js
// Tests all commands in the date module

log.info('=== date module tests ===');

// date.now - returns current date/time as formatted string
var now = date.now('YYYY-MM-DD HH:mm:ss');
log.info('date.now: ' + now);
assert.contain(now, '-', 'formatted date should contain dashes');

var nowDefault = date.now();
log.info('date.now (default format): ' + nowDefault);
assert.equal(typeof nowDefault, 'string', 'date.now should return a string');

// date.fromNow - returns date offset from current time
var tomorrow = date.fromNow(1, 'days', 'YYYY-MM-DD');
log.info('date.fromNow +1 day: ' + tomorrow);
assert.notEqual(tomorrow, now.substring(0, 10), 'tomorrow should differ from today');

var lastHour = date.fromNow(-1, 'hours', 'YYYY-MM-DD HH:mm:ss');
log.info('date.fromNow -1 hour: ' + lastHour);
assert.equal(typeof lastHour, 'string', 'date.fromNow should return a string');

var nextWeek = date.fromNow(7, 'days', 'YYYY-MM-DD');
log.info('date.fromNow +7 days: ' + nextWeek);

log.info('=== date module: all tests PASSED ===');
