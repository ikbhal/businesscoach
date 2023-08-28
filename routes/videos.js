const express = require('express');
const router = express.Router();
const db = require('../models/video'); // Assuming you have a module for database operations


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
router.get('/videos', (req, res) => {
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

router.get('/watch-page', async (req, res) => {
  const { id } = req.query;

  try {
    // Fetch video details from the database based on the provided ID
    const video = await db.getVideoById(id); // You'll need to implement this function

    if (video) {
      res.render('watch', { video });
    } else {
      res.status(404).send('Video not found');
    }
  } catch (error) {
    console.error('Error fetching video details:', error);
    res.status(500).send('Internal server error');
  }
});


module.exports = router;
