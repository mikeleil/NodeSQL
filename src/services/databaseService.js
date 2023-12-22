const sqlite3 = require('sqlite3').verbose();

class DatabaseService {
  constructor() {
    this.db = new sqlite3.Database('mydatabase.db');
    this.initializeDatabase();
  }

  initializeDatabase() {
    return new Promise((resolve, reject) => {
      this.db.run('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)', (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  createItem(name) {
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO items (name) VALUES (?)', [name], function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve({ id: this.lastID, name });
      });
    });
  }

  getItems() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM items', (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ items: rows });
      });
    });
  }

  updateItem(id, name) {
    return new Promise((resolve, reject) => {
      this.db.run('UPDATE items SET name = ? WHERE id = ?', [name, id], function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve({ id: this.changes, name });
      });
    });
  }

  deleteItem(id) {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM items WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve({ id: this.changes });
      });
    });
  }
}

module.exports = new DatabaseService();

