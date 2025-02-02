const express = require('express')
const { generateJWT, generateApiToken } = require('@src/lib/jwtUtils') // require('../lib/jwtUtils')
const router = express.Router();
const passport = require('@src/login_routes/passport.js')

router.get('/logout', (req,res) => {
  res.clearCookie('token')
  res.send('logout')
})

// Local login route
router.post('/login', passport.authenticate('local', { session: false }), 
    async (req, res) => {
      let userx = {"id": req.user.id, "username": req.user.username}

      const token = await generateJWT(userx);

      console.log("LOGIN TOKEN")
      console.log(token)

      res.cookie('token', token, {
        httpOnly: true, // Helps to prevent XSS attacks
        secure: false, //process.env.NODE_ENV === 'production', // Cookie will be sent over HTTPS only
        sameSite: 'strict', // Mitigate CSRF attacks
      });
      res.status(200).json({ message: 'Logged in successfully' });
  }
);

router.post('/register', async (req, res) => {
    try {
      const { first_name, last_name, username, password } = req.body;
  
      // const hashedPassword = await bcrypt.hash(password, 10);
      const hashedPassword = password
      const user = await User.create({ username: username, first_name: first_name, last_name: last_name, password: hashedPassword });
      res.status(201).json({ message: 'User registered' });
    } catch (err) {
      res.status(500).json({ error: 'Error creating user' });
    }
});

//should use separate secrete key for jwt token creation
router.post('/api_token_generator', generateApiToken);


// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router