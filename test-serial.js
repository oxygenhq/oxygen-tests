// test-serial.js
// Tests all commands in the serial module (RS-232 serial port communication)
// PLACEHOLDER - requires a physical or virtual serial port

log.info('=== serial module tests ===');

// serial.list - list all available serial ports (no hardware needed)
log.info('--- list ports ---');
var ports = serial.list();
log.info('serial.list: ' + JSON.stringify(ports));
assert.notEqual(ports, null, 'list should return an array');
log.info('serial.list: PASS');

// serial.open - open a serial port connection
// PLACEHOLDER - replace COM3 with your actual port, adjust baud rate etc.
log.info('--- open port ---');
serial.open(
    'COM3',     // port path: 'COM3' on Windows, '/dev/ttyUSB0' on Linux
    {
        baudRate: 9600,
        dataBits: 8,
        stopBits: 1,
        parity: 'none'
    },
    65536       // buffer size (optional, default 65536)
);
log.info('serial.open: PASS');

// serial.write - send data to the serial device
log.info('--- write ---');
serial.write('AT\r\n');    // AT command for modems; adjust for your device
log.info('serial.write: PASS');

// serial.waitForText - wait for specific text in the incoming data stream
log.info('--- wait for response ---');
serial.waitForText(
    'OK',      // expected text pattern (string or regex)
    5000       // timeout in ms
);
log.info('serial.waitForText: PASS');

// serial.getBuffer - get all data received since port was opened
var buffer = serial.getBuffer();
log.info('serial.getBuffer: ' + buffer);
assert.notEqual(buffer, null, 'buffer should not be null');
log.info('serial.getBuffer: PASS');

log.info('=== serial module: all tests PASSED ===');
