const express = require('express')
const app = express()
const port = 3000
const jwt  = require('jsonwebtoken') 
const cookieParser = require('cookie-parser')

app.use(cookieParser())


const privateKey = 'abcdefg'

app.use(function (req, res, next) {
  console.log("Middleware called")
  next();
});

app.get('/login', async (req, res) => {
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

app.get('/logout', (req,res) => {
  res.clearCookie('token')
  res.clearCookie('test')
  res.send('logout')

})

app.get('/api', (req,res) => {
  res.send('from api')

})


app.get('/cookies', (req, res) => {
  console.log(req.cookies)
  res.send('Hello cookies')
})

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})