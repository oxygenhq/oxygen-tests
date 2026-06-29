// test-db.js
// Tests all commands in the db module (SQL via ODBC)
// PLACEHOLDER - requires an ODBC data source and the 'odbc' optional dependency
// Tested with SQL Server; adjust connection string for MySQL, PostgreSQL, etc.

log.info('=== db module tests ===');

var dbInfo = 'Driver={MySQL ODBC 9.7 UNICODE Driver};Server=IP;Database=DB; User=USER;Password=PASSWORD;'
db.setConnectionString(dbInfo)
var queryResults = db.executeQuery('select * from user;')
log.info(queryResults);
log.info(queryResults.username)
