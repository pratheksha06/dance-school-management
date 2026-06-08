import express from 'express';
// Add enrollInClass inside the curly braces here!
import { getClasses, createClass, enrollInClass } from '../Controller/ClassController.js';

const router = express.Router();

router.get('/', getClasses);
router.post('/', createClass);
router.post('/enroll', enrollInClass); 

export default router;