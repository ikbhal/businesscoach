const sqlite3 = require('sqlite3').verbose();

class VideosDatabase {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath);
  }

  createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY,
        title TEXT,
        url TEXT,
        watch_count INTEGER DEFAULT 0
      )
    `;

    this.db.run(query);
  }

  addVideo(title, url, callback) {
    const query = 'INSERT INTO videos (title, url) VALUES (?, ?)';
    this.db.run(query, [title, url], (err) => {
      callback(err);
    });
  }

  getAllVideos(callback) {
    const query = 'SELECT id, title, url, watch_count FROM videos';
    this.db.all(query, [], (err, rows) => {
      callback(err, rows);
    });
  }

  watchVideo(videoId, callback) {
    const query = 'UPDATE videos SET watch_count = watch_count + 1 WHERE id = ?';
    this.db.run(query, [videoId], (err) => {
      callback(err);
    });
  }

  getVideoById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM videos WHERE id = ?', [id], (error, video) => {
        if (error) {
          reject(error);
        } else {
          resolve(video);
        }
      });
    });
  }
}

module.exports = VideosDatabase;
