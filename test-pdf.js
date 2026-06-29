// test-pdf.js
// Tests all commands in the pdf module
// Requires a sample PDF file - adjust path as needed

var PDF_PATH = 'C:\\Users\\rom\\Desktop\\test-pdf.pdf';

log.info('=== pdf module tests ===');

// pdf.assert - asserts text exists in the PDF
pdf.assert(PDF_PATH, 'We want to sum up');
log.info('pdf.assert (text exists): PASS');

// pdf.assert with page number
pdf.assert(PDF_PATH, 'We want to sum up', 4);
log.info('pdf.assert (specific page): PASS');

// pdf.assertNot - asserts text does NOT exist
pdf.assertNot(PDF_PATH, 'THIS_TEXT_SHOULD_NOT_EXIST_IN_ANY_PDF_XYZ_123');
log.info('pdf.assertNot: PASS');

// pdf.count - counts occurrences of text in the PDF
var count = pdf.count(PDF_PATH, 'the');
log.info('pdf.count "the": ' + count);
assert.equal(count >= 0, true, 'count should be a non-negative number');
log.info('pdf.count: PASS');

log.info('=== pdf module: all tests PASSED ===');
