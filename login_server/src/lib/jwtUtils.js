// jwtUtils.js
const jwt = require('jsonwebtoken');

const YOUR_SECRET_KEY = process.env.JWT_SECRET || 'jwtsecret';

const generateJWT = async (payload, expireTime = '1h') => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, YOUR_SECRET_KEY, { expiresIn: expireTime }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

const verifyJWT = async(token) => {
  return new Promise((resolve, reject) => {
      jwt.verify(token, YOUR_SECRET_KEY, (err, decoded) => {
          if (err) reject(err);
          else resolve(decoded);
      });
  });
}

module.exports = { generateJWT, verifyJWT };