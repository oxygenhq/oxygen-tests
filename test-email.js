// test-email.js
// Tests commands in the email module (IMAP + SMTP)
// For Gmail: use an App Password (Google Account > Security > 2FA > App Passwords)

log.info('=== email module tests ===');

// email.init with IMAP settings — used by getLastEmail
email.init(
    '[user]@gmail.com',
    'app password',
    'imap.gmail.com',
    993,
    true,
    30000
);
log.info('email.init (IMAP): PASS');

// email.getLastEmail - fetch most recent matching email
log.info('--- fetch email ---');
var mail = email.getLastEmail(
    60,
    'Security alert',
    30000
);
log.info('email.getLastEmail subject: ' + mail.subject);
log.info('email.getLastEmail from: ' + mail.from);
assert.notEqual(mail, null, 'should have found an email');
assert.notEqual(mail.subject, null, 'email should have a subject');
log.info('email.getLastEmail: PASS');

log.info('Body (first 100): ' + (mail.body || '').substring(0, 100));
log.info('HTML (first 100): ' + (mail.html || '').substring(0, 100));
log.info('Attachments count: ' + (mail.attachments ? mail.attachments.length : 0));

// email.init with SMTP settings — used by send
email.init(
    '[user]@gmail.com',
    'app password',
    'smtp.gmail.com',
    587,
    false
);
log.info('email.init (SMTP): PASS');

// email.send - send an email via SMTP
log.info('--- send email ---');
email.send(
    'test@cloudbeat.io',
    'Test email from Oxygen',
    'This is a plain text body sent by Oxygen test.',
    '<p>This is an <b>HTML body</b> sent by Oxygen test.</p>'
);
log.info('email.send: PASS');

// email.send to multiple recipients
email.send(
    ['test@cloudbeat.io'],
    'Test to multiple recipients',
    'Plain text body'
);
log.info('email.send (multiple recipients): PASS');

log.info('=== email module: all tests PASSED ===');
