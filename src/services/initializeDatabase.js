const { Client } = require('pg');

async function initializeDatabase() {
  const client = new Client({
    user: 'michael',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432,
  });

  try {
    await client.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name TEXT
      )
    `);
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
}

module.exports = initializeDatabase;
