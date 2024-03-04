const express = require('express');
const databaseService = require('./services/databaseService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// CRUD Operations ----

// Create (INSERT)
app.post('/items', (req, res) => {
  const { name } = req.body;
  databaseService.createItem(name, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Read (SELECT)
app.get('/items', (req, res) => {
  databaseService.getItems((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Update (UPDATE)
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  databaseService.updateItem(id, name, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Delete (DELETE)
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  databaseService.deleteItem(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
