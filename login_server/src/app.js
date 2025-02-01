// app.js
const express = require('express');
// const passport = require('./login/passport');
const cookieParser = require('cookie-parser');
// const loginRoute   = require('./login_routes/index.js')
const Routes   = require('./routes/index.js')


// const { generateJWT, isLoggedIn, checkApiToken, generateApiToken } = require('../lib/jwtUtils')

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(passport.initialize());
//app.use()

// app.use('/', loginRoute)

//middle ware
// cookie http header
// cookie api

// Protected route
// router.get('/profile', (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: 'Not authenticated' });
//   }

//   try {
//     const decoded = verifyJWT(token);
//     res.status(200).json({ user: decoded });
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });


app.use('/api/', Routes)

module.exports = app