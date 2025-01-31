const express = require('express')

const router = express.Router();


const privateKey = 'abcdefg'


router.get('/login', async (req, res) => {
  let token = await new Promise( (resolve, reject) => {
    jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'HS256' }, 
      (err, token) => {
        if (err) {
          reject(err)
        } else { resolve(token) }
      }  
    )
  })

  res.cookie('token', token, {
    httpOnly: true, // Helps to prevent XSS attacks
    secure: false, //process.env.NODE_ENV === 'production', // Cookie will be sent over HTTPS only
    sameSite: 'strict', // Mitigate CSRF attacks
    maxAge: 3600000, // Cookie expiry set to match token expiry, 1 hour (in milliseconds)
  });

  res.send(token)
} )

router.get('/logout', (req,res) => {
  res.clearCookie('token')
  res.clearCookie('test')
  res.send('logout')

})


// Local login route
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = generateJWT(req.user);
  res.cookie('token', token, { httpOnly: true, secure: false }); // Set secure to true in production with HTTPS
  res.status(200).json({ message: 'Logged in successfully' });
});

router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword });
  
      res.status(201).json({ message: 'User registered' });
    } catch (err) {
      res.status(500).json({ error: 'Error creating user' });
    }
  });


// Google OAuth route
// router.get('/auth/google',
//   passport.authenticate('oauth2')
// );

// // Google OAuth callback
// router.get('/auth/google/callback',
//   passport.authenticate('oauth2', { session: false }),
//   (req, res) => {
//     const token = generateJWT(req.user);
//     res.cookie('token', token, { httpOnly: true, secure: false }); // Set secure to true in production with HTTPS
//     res.redirect('/'); // Redirect to homepage or dashboard
//   }
// );

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router