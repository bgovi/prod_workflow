// app.js
const express = require('express');
const { Items } = require('@src/lib/db');

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

apiTokenRoutes.get('/items', async (req, res) => {
  const items = await Items.findAll();
  res.status(200).json(items);
});

module.exports = {loginTokenRoutes, apiTokenRoutes}