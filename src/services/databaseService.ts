import { Pool } from 'pg';

class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER || 'michael',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'postgres',
      password: process.env.DB_PASSWORD || 'admin',
      port: parseInt(process.env.DB_PORT || '5432', 10),
    });
  }

  async createItem(name: string): Promise<{ id: number; name: string }> {
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

  async getItems(): Promise<{ items: Array<{ id: number; name: string }> }> {
    try {
      const result = await this.pool.query('SELECT * FROM items');
      return { items: result.rows };
    } catch (error) {
      throw error;
    }
  }

  async updateItem(id: number, name: string): Promise<{ id: number; name: string }> {
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

  async deleteItem(id: number): Promise<{ id: number }> {
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

export default DatabaseService;

