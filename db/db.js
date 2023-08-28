const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/db.sqlite');

// Function to fetch all videos
const getAllVideos = (callback) => {
  const query = 'SELECT id, title, url FROM videos';
  db.all(query, [], (err, rows) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, rows);
  });
};

// Function to update watch count
const watchVideo = (videoId, callback) => {
  const query = 'UPDATE videos SET watch_count = watch_count + 1 WHERE id = ?';
  db.run(query, [videoId], (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};

// ... Previous code ...

// Function to add a new video
const addVideo = (title, url, callback) => {
  const query = 'INSERT INTO videos (title, url, watch_count) VALUES (?, ?, 0)';
  db.run(query, [title, url], (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};

module.exports = {
  getAllVideos,
  watchVideo,
  addVideo
};

