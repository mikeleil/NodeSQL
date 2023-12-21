import express, { Request, Response } from 'express';
import databaseService from './services/databaseService';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// CRUD Operations

// Create (INSERT)
app.post('/items', (req: Request, res: Response) => {
  const { name } = req.body;
  databaseService.createItem(name, (err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Read (SELECT)
app.get('/items', (req: Request, res: Response) => {
  databaseService.getItems((err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Update (UPDATE)
app.put('/items/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  databaseService.updateItem(id, name, (err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Delete (DELETE)
app.delete('/items/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  databaseService.deleteItem(id, (err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
