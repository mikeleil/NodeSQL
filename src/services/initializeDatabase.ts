import { Client } from 'pg';

async function initializeDatabase(): Promise<void> {
  const client = new Client({
    user: process.env.DB_USER || 'michael',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
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

export default initializeDatabase;

