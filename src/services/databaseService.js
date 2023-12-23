const { Client } = require('pg');

class DatabaseService {
  constructor() {
    this.client = new Client({
      user: 'michael',
      host: 'localhost',
      database: 'postgres',//posttest
      password: 'admin',
      port: 5432,
    });
    this.initializeDatabase();
  }

  async initializeDatabase() {
    try {
      await this.client.connect();
      await this.client.query(`
        CREATE TABLE IF NOT EXISTS items (
          id SERIAL PRIMARY KEY,
          name TEXT
        )
      `);
    } catch (error) {
      throw error;
    }
  }

  async createItem(name) {
    try {
      const result = await this.client.query('INSERT INTO items (name) VALUES ($1) RETURNING id', [name]);
      return { id: result.rows[0].id, name };
    } catch (error) {
      throw error;
    }
  }

  async getItems() {
    try {
      const result = await this.client.query('SELECT * FROM items');
      return { items: result.rows };
    } catch (error) {
      throw error;
    }
  }

  async updateItem(id, name) {
    try {
      const result = await this.client.query('UPDATE items SET name = $1 WHERE id = $2 RETURNING id', [name, id]);
      return { id: result.rows[0].id, name };
    } catch (error) {
      throw error;
    }
  }

  async deleteItem(id) {
    try {
      const result = await this.client.query('DELETE FROM items WHERE id = $1 RETURNING id', [id]);
      return { id: result.rows[0].id };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new DatabaseService();
