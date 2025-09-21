const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function sign(payload, options = {}) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecret, { expiresIn: '2d', ...options }, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
}

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}

module.exports = { sign, verify };

