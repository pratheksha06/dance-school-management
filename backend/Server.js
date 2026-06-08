import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './Routers/UserRouter.js';
import classRouter from './Routers/ClassRouter.js';

dotenv.config();

const app = express();
// Make sure it looks exactly like this!
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running smoothly on port ${PORT}`);
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes Linking
app.use('/api/users', userRouter);
app.use('/api/classes', classRouter);

// Base Route
app.get('/', (req, res) => {
  res.send('Dance School Management API is running...');
});


// Connect to the Database in the background with better error logs
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is missing from your .env file!");
} else {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Database connected successfully to Atlas!'))
    .catch((err) => {
      console.error('❌ Database connection error details:');
      console.error(err.message);
    });
}