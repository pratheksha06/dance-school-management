import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './Routers/UserRouter.js';
import classRouter from './Routers/ClassRouter.js';
import enrollmentRouter from './Routers/EnrollmentRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// 1. MIDDLEWARE FIRST
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());

// 2. ROUTES SECOND
app.use('/api/users', userRouter);
app.use('/api/classes', classRouter);
app.use('/api/enrollments', enrollmentRouter);

// Base Route
app.get('/', (req, res) => {
  res.send('Dance School Management API is running...');
});

// 3. DATABASE CONNECTION
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

// 4. START SERVER LAST (Once everything above is ready!)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running smoothly on port ${PORT}`);
});