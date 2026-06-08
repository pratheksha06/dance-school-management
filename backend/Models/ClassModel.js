import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  className: { type: String, required: true }, // e.g., "Salsa Beginners"
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Links to an Instructor User
  schedule: { type: String, required: true }, // e.g., "Mon/Wed 6:00 PM - 7:30 PM"
  danceStyle: { type: String, required: true }, // e.g., "Salsa", "Hip Hop", "Ballet"
  capacity: { type: Number, required: true, default: 20 },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of student IDs
  fee: { type: Number, required: false, default: 0 } // Changed to false with a safe default of 0
}, { timestamps: true });

const Class = mongoose.model('Class', classSchema);
export default Class;