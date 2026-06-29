// test-mongo.js
// Tests all commands in the mongo module
// PLACEHOLDER - requires a running MongoDB instance

log.info('=== mongo module tests ===');

// mongo.init - connect to MongoDB
mongo.init(
    'localhost',     // host or full URI e.g. 'mongodb://user:pass@host:27017'
    'testdb',        // database name
    null,            // username (null if no auth)
    null,            // password
    'admin',         // authSource
    27017            // port
);
log.info('mongo.init: PASS');

// mongo.setDatabase - switch to a different database
mongo.setDatabase('testdb');
log.info('mongo.setDatabase: PASS');

// mongo.setCollection - set the active collection
mongo.setCollection('test_collection');
log.info('mongo.setCollection: PASS');

// mongo.insertOne - insert a single document
log.info('--- insert ---');
mongo.insertOne({ name: 'Oxygen Test', value: 42, timestamp: new Date().toISOString() });
log.info('mongo.insertOne: PASS');

// mongo.insertMany - insert multiple documents
mongo.insertMany([
    { name: 'Item A', category: 'test' },
    { name: 'Item B', category: 'test' },
    { name: 'Item C', category: 'test' }
]);
log.info('mongo.insertMany: PASS');

// mongo.find - query documents
log.info('--- query ---');
var results = mongo.find({ category: 'test' });
log.info('mongo.find count: ' + results.length);
assert.equal(results.length >= 3, true, 'should find at least 3 test documents');
log.info('mongo.find: PASS');

// mongo.find with projection and options
var projected = mongo.find({ category: 'test' }, { name: 1, _id: 0 }, { limit: 2 });
log.info('mongo.find (projected, limit 2) count: ' + projected.length);
assert.equal(projected.length, 2, 'limit should return exactly 2 results');
log.info('mongo.find (projection + options): PASS');

// mongo.countDocuments
var count = mongo.countDocuments({ category: 'test' });
log.info('mongo.countDocuments: ' + count);
assert.equal(count >= 3, true, 'count should be at least 3');
log.info('mongo.countDocuments: PASS');

// mongo.updateOne
log.info('--- update ---');
mongo.updateOne({ name: 'Item A' }, { $set: { updated: true } });
var updated = mongo.find({ name: 'Item A' });
assert.equal(updated[0].updated, true, 'document should be updated');
log.info('mongo.updateOne: PASS');

// mongo.updateMany
mongo.updateMany({ category: 'test' }, { $set: { category: 'test_updated' } });
var updatedCount = mongo.countDocuments({ category: 'test_updated' });
assert.equal(updatedCount >= 3, true, 'all test documents should be updated');
log.info('mongo.updateMany: PASS');

// mongo.replaceOne
mongo.replaceOne({ name: 'Item B' }, { name: 'Item B', category: 'replaced', value: 99 });
var replaced = mongo.find({ name: 'Item B' });
assert.equal(replaced[0].value, 99, 'document should be replaced');
log.info('mongo.replaceOne: PASS');

// mongo.deleteOne
log.info('--- delete ---');
mongo.deleteOne({ name: 'Item C' });
var afterDelete = mongo.countDocuments({ name: 'Item C' });
assert.equal(afterDelete, 0, 'document should be deleted');
log.info('mongo.deleteOne: PASS');

// mongo.deleteMany - clean up test data
mongo.deleteMany({ category: 'test_updated' });
mongo.deleteMany({ name: 'Oxygen Test' });
log.info('mongo.deleteMany: PASS (cleaned up test data)');

log.info('=== mongo module: all tests PASSED ===');
