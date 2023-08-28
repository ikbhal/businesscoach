const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/db.sqlite');

db.serialize(() => {
  // Create your database tables here
});

db.close();
