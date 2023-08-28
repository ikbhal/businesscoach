const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Database connection error:', err.message);
      } else {
        console.log('Connected to the database');
      }
    });
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error('Database closing error:', err.message);
      } else {
        console.log('Closed the database connection');
      }
    });
  }

  createTables() {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      )
    `;

    const createVideosTable = `
      CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY,
        title TEXT,
        url TEXT,
        watch_count INTEGER DEFAULT 0
      )
    `;

    this.db.run(createUsersTable);
    this.db.run(createVideosTable);
  }

  addUser(username, password, email, callback) {
    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    this.db.run(query, [username, password, email], (err) => {
      callback(err);
    });
  }

  getUserByUsername(username, callback) {
    const query = 'SELECT * FROM users WHERE username = ?';
    this.db.get(query, [username], (err, row) => {
      callback(err, row);
    });
  }

  // You can add more methods for interacting with the database as needed

}

module.exports = Database;
