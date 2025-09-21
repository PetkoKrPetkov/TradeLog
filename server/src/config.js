require('dotenv').config();

const config = {
  port: process.env.PORT || 3030,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tradelog',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_change_me',
  cors: {
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
      : ['http://localhost:5173', 'http://localhost:2112'],
    credentials: true,
  },
};

module.exports = config;
