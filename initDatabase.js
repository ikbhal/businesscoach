const fs = require('fs');
const VideosDatabase = require('./models/video.js'); // Import the VideosDatabase class

// Path to your SQLite database file
const dbPath = './db/db.sqlite';

// Initialize the VideosDatabase
const videosDb = new VideosDatabase(dbPath);

// Create the videos table
videosDb.createTable();

// Read the initial videos data from init_videos.json
fs.readFile('./init_videos.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading init_videos.json:', err);
    return;
  }

  const initialVideos = JSON.parse(data);

  // Populate the videos table with initial data
  initialVideos.forEach((video) => {
    videosDb.addVideo(video.title, video.url, (err) => {
      if (err) {
        console.error('Error adding video:', err);
      } else {
        console.log(`Added video: ${video.title}`);
      }
    });
  });
});
