const sqlite3 = require('sqlite3').verbose();

class DatabaseService {
  constructor() {
    this.db = new sqlite3.Database('mydatabase.db');
    this.initializeDatabase();
  }

  initializeDatabase() {
    this.db.run('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
  }

  createItem(name, callback) {
    this.db.run('INSERT INTO items (name) VALUES (?)', [name], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID, name });
    });
  }

  getItems(callback) {
    this.db.all('SELECT * FROM items', (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, { items: rows });
    });
  }

  updateItem(id, name, callback) {
    this.db.run('UPDATE items SET name = ? WHERE id = ?', [name, id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.changes, name });
    });
  }

  deleteItem(id, callback) {
    this.db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.changes });
    });
  }
}

module.exports = new DatabaseService();
