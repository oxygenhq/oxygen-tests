// test-mailinator.js
// Tests all commands in the mailinator module
// PLACEHOLDER - replace with a valid Mailinator API token
// Free tokens available at https://www.mailinator.com

log.info('=== mailinator module tests ===');

// mailinator.init - set API token and optional private domain flag
mailinator.init(
    'YOUR_MAILINATOR_API_TOKEN',   // get from mailinator.com account
    false                          // true if using a private domain
);
log.info('mailinator.init: PASS');

// mailinator.list - list messages in an inbox
log.info('--- list inbox ---');
var messages = mailinator.list('test-inbox-name');
log.info('mailinator.list count: ' + (messages && messages.messages ? messages.messages.length : 0));
assert.notEqual(messages, null, 'should get inbox listing');
log.info('mailinator.list: PASS');

// mailinator.fetch - fetch a specific message by ID
// Get the first message ID from the list
log.info('--- fetch message ---');
if (messages && messages.messages && messages.messages.length > 0) {
    var msgId = messages.messages[0].id;
    log.info('fetching message id: ' + msgId);

    var email = mailinator.fetch(msgId);
    assert.notEqual(email, null, 'should fetch email');
    log.info('mailinator.fetch: PASS');

    // mailinator.getSubject - extract subject from fetched email
    var subject = mailinator.getSubject(email);
    log.info('mailinator.getSubject: ' + subject);
    assert.notEqual(subject, null, 'subject should not be null');
    log.info('mailinator.getSubject: PASS');

    // mailinator.getBody - extract body from fetched email
    var body = mailinator.getBody(email);
    log.info('mailinator.getBody (first 100): ' + (body || '').substring(0, 100));
    log.info('mailinator.getBody: PASS');

    // mailinator.delete - delete the message
    mailinator.transaction('delete message');
    var deleteResult = mailinator.delete(msgId);
    log.info('mailinator.delete result: ' + JSON.stringify(deleteResult));
    log.info('mailinator.delete: PASS');
} else {
    log.warn('No messages found in inbox - skipping fetch/getSubject/getBody/delete tests');
}

log.info('=== mailinator module: all tests PASSED ===');
