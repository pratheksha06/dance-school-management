import mongoose from 'mongoose'; 
import Class from '../Models/ClassModel.js';
import User from '../Models/UserModel.js'; 

// @desc    Get all dance classes with optional filters (style or instructor)
// @route   GET /api/classes
export const getClasses = async (req, res) => {
  try {
    const { style, instructorId } = req.query;
    let query = {};

    if (style) query.danceStyle = new RegExp(style, 'i'); 
    if (instructorId) query.instructor = instructorId;

    // Use native Mongoose population. It handles ObjectIds automatically without crashing.
    const classes = await Class.find(query)
      .populate({
        path: 'instructor',
        select: 'name email phone bio imageUrl accomplishments',
        model: 'User' 
      })
      .populate('enrolledStudents', 'name email');

    // Format the response safely so your frontend always receives a valid object structure
    const formattedClasses = classes.map(cls => {
      const doc = cls.toObject();
      
      // If no instructor profile was found or attached, fall back to a safe placeholder object
      if (!doc.instructor || typeof doc.instructor === 'string') {
        doc.instructor = { name: doc.instructor || 'Assigned Expert' };
      }
      
      return doc;
    });
      
    res.status(200).json(formattedClasses);
  } catch (error) {
    console.error("Critical Backend Fetch Error:", error);
    res.status(500).json({ message: error.message });
  }
};
// @desc    Create/Schedule a new dance class
// @route   POST /api/classes
export const createClass = async (req, res) => {
  // FIXED: Destructured the new fields directly from the frontend request body
  const { 
    className, 
    instructor, 
    schedule, 
    danceStyle, 
    capacity, 
    fee,
    description,          // Added
    programImageUrl,      // Added
    instructorExperience  // Added
  } = req.body;

  try {
    const newClass = await Class.create({
      className,
      instructor: instructor || null, 
      schedule,
      danceStyle,
      capacity: Number(capacity),
      fee: fee || 0,
      description: description || '',                    // Saved to MongoDB
      programImageUrl: programImageUrl || '',            // Saved to MongoDB
      instructorExperience: instructorExperience || ''   // Saved to MongoDB
    });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Enroll a student into a dance class
// @route   POST /api/classes/enroll
export const enrollInClass = async (req, res) => {
  const { classId, studentId, userId } = req.body;
  const targetStudentId = studentId || userId; 

  try {
    if (!classId || !targetStudentId) {
      return res.status(400).json({ message: 'Missing classId or student identification context.' });
    }

    const danceClass = await Class.findById(classId);
    const student = await User.findById(targetStudentId);

    if (!danceClass || !student) {
      return res.status(404).json({ message: 'Class or Student records not found in database cluster.' });
    }

    // Check if student is already enrolled
    if (danceClass.enrolledStudents.includes(targetStudentId)) {
      return res.status(400).json({ message: 'Already enrolled in this class' });
    }

    // Check capacity limits
    if (danceClass.enrolledStudents.length >= danceClass.capacity) {
      return res.status(400).json({ message: 'Class is completely full' });
    }

    // Add student to class list
    danceClass.enrolledStudents.push(targetStudentId);
    await danceClass.save();

    if (!student.enrolledClasses) {
      student.enrolledClasses = [];
    }
    student.enrolledClasses.push(classId);
    await student.save();

    res.status(200).json({ message: 'Successfully enrolled in class!', danceClass });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};