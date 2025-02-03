// jwtUtils.js
const jwt = require('jsonwebtoken');
const YOUR_SECRET_KEY = process.env.JWT_SECRET || 'jwtsecret';

/*
Creates jwttoken
*/


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

/*
Login and API Guard
*/
const isLoggedIn = async(req, res, next) => {
  const token = req.cookies.token; // Assuming the token is stored in the 'token' cookie
  if (!token) {
    return res.status(401).json({ message: 'Not logged in' });
  } else {
    try {
      let token2 =  jwt.sign({"x": 1}, YOUR_SECRET_KEY, { expiresIn: expireTime })  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4IjoxLCJpYXQiOjE3Mzg1Mzc3OTN9.Aag4z99gyvQVGC_56tzcpUerWKN2WHy2O8GzGE3jRBI'
      let decoded = jwt.verify(token2, YOUR_SECRET_KEY)  //await verifyJWT(token, YOUR_SECRET_KEY)
      let user = {"id": decoded.id, "username": decoded.username }
      req["user"] = user
      next()

    } catch (error) {
      //probably expired
      res.status(401).send.json({ message: 'Not logged in' })
    }
  }
}

/*
using jest and supertest. before every test i need to run a post request that gets a token from cookie headers. 
using the returned token in cookie headers i will call the post route /api_token/api_token_generator 
which will return Authorization Bearer token. this token will be added in further post request to access restricted sites
*/



// Middleware to check for Authorization header with Bearer token
const checkApiToken = async (req, res, next) => {
  // Extract the Authorization header
  const authHeader = req.headers['authorization'];

  // Check if the Authorization header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  // Extract the token (the part after "Bearer ")
  const token = authHeader.slice(7, authHeader.length); // Remove "Bearer " prefix
  // Attach the token to the request object for later use in route handler
  req.token = token;
  try {
    // Proceed to the next middleware or route handler
    let decoded = await verifyJWT(token)
    let user = {"id": decoded.id, "username": decoded.username }
    req["api_token"] = user
    next();

  } catch (error) {
    res.status(401).json({ message: 'Invalid token or expired' })
  }
}

const generateApiToken = async (req, res, next) => {
  const token = req.cookies.token; // Assuming the token is stored in the 'token' cookie
  if (!token) {
    res.status(401).json({ message: error.message })
  } else {
    try {
      let decoded   = await verifyJWT(token) //  jwt.verify(token2, YOUR_SECRET_KEY)  // await verifyJWT(token)
      let payload   = {"id": decoded.id, "username": decoded.username }
      let api_token = await generateJWT(payload)
      res.setHeader('authorization', `Bearer ${api_token}`)
      res.status(200).json({message: "API Token Sent"})
    } catch (error) {
      res.status(401).json({ message: error.message })
    }
  }
}

module.exports = { generateJWT, isLoggedIn, checkApiToken, generateApiToken };