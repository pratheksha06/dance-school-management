import express from 'express';
import { createEnrollment, getEnrollments, updateEnrollmentStatus, deleteEnrollment } from '../Controller/EnrollmentController.js';

const router = express.Router();

router.get('/', getEnrollments);
router.post('/', createEnrollment);
router.put('/:id/status', updateEnrollmentStatus);
router.delete('/:id', deleteEnrollment);

export default router;
