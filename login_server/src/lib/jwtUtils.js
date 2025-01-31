// jwtUtils.js
const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
  const payload = { id: user.id, username: user.username };
  return jwt.sign(payload, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
};

const verifyJWT = (token) => {
  return jwt.verify(token, 'YOUR_SECRET_KEY');
};

module.exports = { generateJWT, verifyJWT };