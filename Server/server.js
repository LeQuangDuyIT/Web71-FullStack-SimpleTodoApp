import express from 'express';
import cors from 'cors';
import appRouter from './routes/index.js';
import { connectToDatabase } from './config/database.js';

const app = express();
const PORT = 3001;

connectToDatabase();

app.use(express.json());
app.use(cors('*'));

app.use('/api/v1', appRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
