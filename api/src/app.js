// app.js
require('module-alias/register')

console.log(require.resolve('@src/lib/jwtUtils.js'));
// console.log(require.resolve('./src/index.js'));

// console.log(require.resolve("/home/bgovi/Projects/Workspace/prod_workflow/api/src/lib/jwtUtils.js"))

// console.log('@src')

const express = require('express');
// const x = require("@src/lib/jwtUtils.js")

// const x = require("../src/lib/jwtUtils.js")

// const passport = require('./login_routes/passport');
// const { isLoggedIn, checkApiToken } = require('./lib/jwtUtils')

// const cookieParser = require('cookie-parser');
// const loginRoute   = require('./login_routes/index.js')
// const {loginTokenRoutes, apiTokenRoutes}   = require('./routes/index.js')



const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use(passport.initialize());

// app.use('/', loginRoute)
// app.use('/logged_in', isLoggedIn, loginTokenRoutes)
// app.use('/api_token', checkApiToken, apiTokenRoutes )

module.exports = app