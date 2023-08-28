const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // For authentication
const sqlite3 = require('sqlite3'); // SQLite database

const app = express();
const port = process.env.PORT || 3065;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// SQLite database setup
const db = new sqlite3.Database('./db/db.sqlite');

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/videos', require('./routes/videos'));
app.use('/notes', require('./routes/notes'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
