const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Create SQLite database and table
const db = new sqlite3.Database('mydatabase.db');
db.run('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');

// Middleware for JSON parsing
app.use(express.json());

// CRUD Operations

// Create (INSERT)
app.post('/items', (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO items (name) VALUES (?)', [name], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, name });
  });
});

// Read (SELECT)
app.get('/items', (req, res) => {
  db.all('SELECT * FROM items', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ items: rows });
  });
});

// Update (UPDATE)
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.run('UPDATE items SET name = ? WHERE id = ?', [name, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.changes, name });
  });
});

// Delete (DELETE)
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.changes });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
