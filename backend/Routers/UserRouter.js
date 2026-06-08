import express from 'express';
import { getUsers, registerUser, loginUser, updateStudentRegistration } from '../Controller/UserController.js';

const router = express.Router();

// Routes
router.get('/', getUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update-profile/:id', updateStudentRegistration);

export default router;