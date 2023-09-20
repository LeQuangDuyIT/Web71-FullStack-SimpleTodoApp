import { MongoClient } from 'mongodb';

const MONGO_URI =
  'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6';
const DATABASE = 'web71-simple-todo-app';

const db = {};

const connectToDatabase = async () => {
  try {
    const mongoClient = new MongoClient(MONGO_URI);
    await mongoClient.connect();

    console.log('Database connected successfully');
    const database = mongoClient.db(DATABASE);

    // Collections
    db.todos = database.collection('todos');
  } catch (error) {
    console.error('Connect to DB failed:', error);
    process.exit(1);
  }
};

export { connectToDatabase, db };
