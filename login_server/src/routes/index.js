// app.js
const express = require('express');
/*
route imports
*/
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'user test 1' });
});

userRouter.get('/a', (req, res) => {
  res.status(200).json({ message: 'user test a' });
});

const router = express.Router();

router.use('/test', userRouter)


router.get('/', (req, res) => {
  res.status(200).json({ message: 'hola' });
});



router.get('/cookies', (req, res) => {
  console.log(req.cookies)
  res.send('Hello cookies')
})

module.exports = router