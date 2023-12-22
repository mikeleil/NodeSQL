import express, { Request, Response } from 'express';
import databaseService from './services/databaseService';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Create (INSERT)
app.post('/items', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const result = await databaseService.createItem(name);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Read (SELECT)
app.get('/items', async (req: Request, res: Response) => {
  try {
    const items = await databaseService.getItems();
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update (UPDATE)
app.put('/items/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await databaseService.updateItem(id, name);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Delete (DELETE)
app.delete('/items/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await databaseService.deleteItem(id);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
