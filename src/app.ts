import express, { Request, Response } from 'express';
import DatabaseService from './services/DatabaseService';
import initializeDatabase from './services/initializeDatabase';

const app = express();
const PORT = process.env.PORT || 3000;
const databaseService = new DatabaseService();

app.use(express.json());

// Initialize the database
initializeDatabase().then(() => {
  console.log('Database initialized');
}).catch(err => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});

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
    const result = await databaseService.updateItem(parseInt(id), name);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Delete (DELETE)
app.delete('/items/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await databaseService.deleteItem(parseInt(id));
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
