// app.js
require('module-alias/register')
const express = require('express');
const passport = require('@src/login_routes/passport.js')
const { isLoggedIn, checkApiToken } = require('@src/lib/jwtUtils.js')
const cookieParser = require('cookie-parser');
const loginRoute   = require('@src/login_routes/index.js')
const {loginTokenRoutes, apiTokenRoutes}   = require('@src/routes/index.js')


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use('/', loginRoute)
app.use('/logged_in', isLoggedIn, loginTokenRoutes)
app.use('/api_token', checkApiToken, apiTokenRoutes )

module.exports = app