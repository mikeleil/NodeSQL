const { Pool } = require('pg');

class DatabaseService {
  constructor() {
    this.pool = new Pool({
      user: 'michael',
      host: 'localhost',
      database: 'postgres',
      password: 'admin',
      port: 5432,
    });
  }

  async createItem(name) {
    try {
      const result = await this.pool.query(
        'INSERT INTO items (name) VALUES ($1) RETURNING id',
        [name]
      );
      return { id: result.rows[0].id, name };
    } catch (error) {
      throw error;
    }
  }

  async getItems() {
    try {
      const result = await this.pool.query('SELECT * FROM items');
      return { items: result.rows };
    } catch (error) {
      throw error;
    }
  }

  async updateItem(id, name) {
    try {
      const result = await this.pool.query(
        'UPDATE items SET name = $1 WHERE id = $2 RETURNING id',
        [name, id]
      );
      return { id: result.rows[0].id, name };
    } catch (error) {
      throw error;
    }
  }

  async deleteItem(id) {
    try {
      const result = await this.pool.query(
        'DELETE FROM items WHERE id = $1 RETURNING id',
        [id]
      );
      return { id: result.rows[0].id };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DatabaseService;
