// passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const OAuth2Strategy = require('passport-oauth2').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('./db');

// Local Strategy
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) return done(null, false, { message: 'Incorrect username.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));



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

module.exports = router;



// passport.use(
//     new JwtStrategy.Strategy(
//       {
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // I use bearer tokens so I need to specify it
//         secretOrKey: process.env.OUR_SECRET_JWT_FOR_SIGNING,
//         passReqToCallback: true,
//       },
//       async (request, payload, done) => {
//           // Payload should also have your user decoded data like UserID if you               have passed one there 
//           ....
//           // Check if token isn't in black list
//           ....
//           // Check if user with the ID that was in JWT exists in your db
//           ...
//           done(null, { _id: payload._id });
//           // now those data will be available in the req.user object 
//         } catch (error) {
//           done(error, false);
//           throw new Error(error);
//         }
//       }
//     )
//   );





// OAuth2 Strategy (Example for Google OAuth)
passport.use(new OAuth2Strategy(
  {
    authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
    tokenURL: 'https://oauth2.googleapis.com/token',
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { oauthId: profile.id } });

      if (!user) {
        user = await User.create({
          oauthId: profile.id,
          username: profile.displayName, // Can be customized based on OAuth provider
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));