const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db.js'); // Assuming you have a module for database operations

const secretKey = 'your-secret-key'; // Replace with your own secret key for JWT

// Register a new user
router.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Password hashing error' });
    }

    // Save user to the database
    db.addUser(username, hash, email, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to register user' });
      }
      res.json({ success: true });
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Fetch user from the database
  db.getUserByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare passwords
    bcrypt.compare(password, user.password, (compareErr, result) => {
      if (compareErr) {
        return res.status(500).json({ error: 'Password comparison error' });
      }

      if (!result) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

module.exports = router;
