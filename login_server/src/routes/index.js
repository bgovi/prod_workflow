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

app.get('/items', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM items');
  res.json(rows);
});

app.post('/items', async (req, res) => {
  const { name } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO items (name) VALUES ($1) RETURNING *',
    [name]
  );
  res.status(201).json(rows[0]);
});


// Example secured route
app.get('/secure', (req, res) => {
  const authHeader = req.headers['authorization'];

  if (authHeader === 'Bearer valid-token') {
    return res.json({ message: 'Access granted!' });
  }

  res.status(401).json({ message: 'Unauthorized' });
});




module.exports = router