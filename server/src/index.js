const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');

const app = express();

app.use(cors(config.cors));
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

// Routers (wired later)
app.use('/users', require('./routes/users'));
app.use('/data/trades', require('./routes/trades'));
app.use('/data/comments', require('./routes/comments'));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

async function start() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB connected');

    app.listen(config.port, () => {
      console.log(`API listening on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();

