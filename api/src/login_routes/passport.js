// passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcryptjs');
const { User } = require('@src/lib/db');

// Local Strategy
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      console.log('hi')
      //would hash password here in production with bcrypt
      const user = await User.findOne({ where: { username: username, password: password } });
      if (!user) return done(null, false, { message: 'Incorrect username or password.' });

      let userx = {"id": user.id, "username": user.username}
      return done(null, userx);
    } catch (err) {
      return done(err);
    }
  }
));

module.exports = passport