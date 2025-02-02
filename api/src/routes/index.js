// app.js
const express = require('express');
/*
route imports
*/
const loginTokenRoutes = express.Router();

loginTokenRoutes.get('/user_info', (req, res) => {
  let user = req.user

  res.status(200).json(user);
});

loginTokenRoutes.get('/user_info/:id', (req, res) => {
  let x = req.params.id
  let y = req.user.id
  let z = x+y
  res.status(200).json({ user_id: y, "id": y, total: z });
});


const apiTokenRoutes = express.Router();



apiTokenRoutes.get('/', (req, res) => {
  res.status(200).json({ message: 'hola' });
});



apiTokenRoutes.get('/cookies', (req, res) => {
  res.status(200).json({api_decrypted_token: req.cookies.token, auth_bearer_header: req.headers['authorization']})
})

apiTokenRoutes.get('/items', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM items');
  res.status(200).json(rows);
});

apiTokenRoutes.post('/items', async (req, res) => {
  const { name } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO items (name) VALUES ($1) RETURNING *',
    [name]
  );
  res.status(201).json(rows[0]);
});

module.exports = {loginTokenRoutes, apiTokenRoutes}