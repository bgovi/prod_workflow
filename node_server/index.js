const express = require('express');
const { Pool } = require('pg');
const app = express();

app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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









module.exports = app;

