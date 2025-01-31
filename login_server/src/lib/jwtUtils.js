// jwtUtils.js
const jwt = require('jsonwebtoken');

const YOUR_SECRET_KEY = process.env.jwtSecret || 'defaultValue';

console.lgg('secret jwt')
console.log(YOUR_SECRET_KEY)


// const generateJWT = (user) => {
//   const payload = { id: user.id, username: user.username };
//   return jwt.sign(payload, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
// };

// const verifyJWT = (token) => {
//   return jwt.verify(token, 'YOUR_SECRET_KEY');
// };

const generateJWT = async (payload, expireTime = '1h') => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, YOUR_SECRET_KEY, { expiresIn: expireTime }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

function verifyJWT(token) {
  return new Promise((resolve, reject) => {
      jwt.verify(token, YOUR_SECRET_KEY, (err, decoded) => {
          if (err) reject(err);
          else resolve(decoded);
      });
  });
}



module.exports = { generateJWT, verifyJWT };