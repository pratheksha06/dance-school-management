import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true
  },
  danceStyle: {
    type: String,
    required: true
  },
  programImageUrl: {   // 👈 MAKE SURE THIS IS HERE
    type: String,
    default: ''
  },
  description: {       // 👈 MAKE SURE THIS IS HERE
    type: String,
    default: ''
  },
  instructorExperience: { // 👈 MAKE SURE THIS IS HERE
    type: String,
    default: ''
  },
  schedule: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  fee: {
    type: Number,
    default: 0
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

const Class = mongoose.model('Class', classSchema);
export default Class;