import express from 'express';
import cors from 'cors';
import appRouter from './routes/index.js';
import { connectToDatabase } from './config/database.js';

const whitelist = ['http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'PUT,PATCH,GET,DELETE,UPDATE'
};

const app = express();
const PORT = 3001;

connectToDatabase();

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/v1', appRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
