// app.js
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { generateJWT, verifyJWT } = require('./jwtUtils');
const { sequelize, User } = require('./db');
require('./passport'); // Load passport configuration

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());


















// Local login route
app.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = generateJWT(req.user);
  res.cookie('token', token, { httpOnly: true, secure: false }); // Set secure to true in production with HTTPS
  res.status(200).json({ message: 'Logged in successfully' });
});

// Google OAuth route
app.get('/auth/google',
  passport.authenticate('oauth2')
);

// Google OAuth callback
app.get('/auth/google/callback',
  passport.authenticate('oauth2', { session: false }),
  (req, res) => {
    const token = generateJWT(req.user);
    res.cookie('token', token, { httpOnly: true, secure: false }); // Set secure to true in production with HTTPS
    res.redirect('/'); // Redirect to homepage or dashboard
  }
);

// Protected route
app.get('/profile', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = verifyJWT(token);
    res.status(200).json({ user: decoded });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Logout route
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
