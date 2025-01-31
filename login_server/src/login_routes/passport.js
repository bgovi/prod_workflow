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


// for protected route
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



// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// passport.use('google-custom', new GoogleStrategy(
//     {
//       clientID: 'YOUR_GOOGLE_CLIENT_ID',
//       clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
//       callbackURL: 'http://localhost:3000/auth/google/callback',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await User.findOne({ where: { oauthId: profile.id } });
  
//         if (!user) {
//           user = await User.create({
//             oauthId: profile.id,
//             username: profile.displayName,
//           });
//         }
  
//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   ));

//   app.get('/auth/google', passport.authenticate('google-custom', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback',
//   passport.authenticate('google-custom', { failureRedirect: '/login' }),
//   (req, res) => {
//     res.redirect('/dashboard');
//   }
// );
