import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  // Step 1: Initial Account Credentials (Signup Page)
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
  
  // Step 2: Studio Placement Profile Parameters (Registration Page)
  age: { type: Number },
  experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Beginner' },
  bio: { type: String },
  danceStyle: { type: String },
  imageUrl: { type: String },
  preferredFormat: { type: String }, // e.g., "Select a discipline..."
  preferredSchedule: { type: String }, // e.g., "Select a slot..."
  studioLocation: { type: String }, // e.g., "Select studio hub..."
  parentGuardian: { type: String }, // If Under 18
  phone: { type: String },
  mailingAddress: { type: String },
  specialObjectives: { type: String }, // Medical conditions or dance goals

  // System Core Arrays
  enrolledClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
}, { timestamps: true });

// Pre-save middleware to hash the password safely without using next()
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw new Error('Password hashing failed: ' + error.message);
  }
});

const User = mongoose.model('User', userSchema);
export default User;