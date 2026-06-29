// test-twilio.js
// Tests all commands in the twilio module
// PLACEHOLDER - replace with real Twilio credentials from https://console.twilio.com

log.info('=== twilio module tests ===');

// twilio.init - authenticate with Twilio
twilio.init(
    'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',  // Account SID from Twilio console
    'your_auth_token'                      // Auth token from Twilio console
);
log.info('twilio.init: PASS');

// twilio.sendSms - send an SMS message
log.info('--- send SMS ---');
var sid = twilio.sendSms(
    '+1xxxxxxxxxx',    // from: your Twilio phone number
    '+1xxxxxxxxxx',    // to: destination phone number
    'Hello from Oxygen automated test!'
);
log.info('twilio.sendSms SID: ' + sid);
assert.notEqual(sid, null, 'sendSms should return a message SID');
log.info('twilio.sendSms: PASS');

// twilio.getLastSms - wait for and retrieve the most recent inbound SMS
// This waits up to 60 seconds for an SMS to arrive
log.info('--- receive SMS ---');
var sms = twilio.getLastSms(
    false,    // removeOnRead: whether to delete after reading
    60000,    // timeout: wait up to 60 seconds
    5 * 60 * 1000,   // notOlderThan: only messages from last 5 minutes
    '+1xxxxxxxxxx'   // optional: filter by sender number
);
log.info('twilio.getLastSms body: ' + sms);
assert.notEqual(sms, null, 'should receive an SMS');
log.info('twilio.getLastSms: PASS');

// twilio.getLastSentApiSms - retrieve the most recent outbound API SMS
log.info('--- verify sent SMS ---');
var sentSms = twilio.getLastSentApiSms(
    false,    // removeOnRead
    30000,    // timeout
    5 * 60 * 1000  // notOlderThan
);
log.info('twilio.getLastSentApiSms body: ' + sentSms);
assert.notEqual(sentSms, null, 'should retrieve sent SMS');
log.info('twilio.getLastSentApiSms: PASS');

log.info('=== twilio module: all tests PASSED ===');
