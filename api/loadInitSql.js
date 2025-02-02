const fs = require('fs');
const { Client } = require('pg');

// Define PostgreSQL connection parameters
const client = new Client({
  host: 'localhost',  // or your Docker service name if you're using GitHub Actions
  port: 5432,
  user: 'testuser',   // PostgreSQL user
  password: 'testpassword',  // PostgreSQL password
  database: 'testdb',  // PostgreSQL database name
});

async function loadInitSql() {
  try {
    // Connect to PostgreSQL
    await client.connect();
    console.log('Connected to PostgreSQL database.');

    // Read the SQL file (init.sql)
    const sql = fs.readFileSync('./node_server/init.sql', 'utf8');
    
    // Execute the SQL script to initialize the database
    await client.query(sql);
    console.log('Database initialized successfully.');

    // Close the connection
    await client.end();
  } catch (err) {
    console.error('Error executing SQL script:', err);
    await client.end();
  }
}

// Run the script to load init.sql
loadInitSql();
