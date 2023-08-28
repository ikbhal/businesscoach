const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Assuming you have a module for database operations


// Add a new video
router.post('/add', (req, res) => {
    const { title, url } = req.body;
    
    // Assuming you have a function to add a new video to the database
    db.addVideo(title, url, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to add video' });
      }
      res.json({ success: true });
    });
  });

  
// Get the list of videos
router.get('/', (req, res) => {
  db.getAllVideos((err, videos) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch videos' });
    }
    res.json(videos);
  });
});

// Watch a video and update watch count
router.post('/watch', (req, res) => {
  const { videoId } = req.body;
  
  // Assuming you have a function to update the watch count in the database
  db.watchVideo(videoId, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update watch count' });
    }
    res.json({ success: true });
  });
});

module.exports = router;
