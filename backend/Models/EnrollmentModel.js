import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  class:   { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  age:              { type: Number },
  experienceLevel:  { type: String },
  preferredFormat:  { type: String },
  preferredSchedule:{ type: String },
  studioLocation:   { type: String },
  parentGuardian:   { type: String },
  phone:            { type: String },
  mailingAddress:   { type: String },
  specialObjectives:{ type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;
