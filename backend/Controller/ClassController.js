import Class from '../Models/ClassModel.js';
import User from '../Models/UserModel.js'; // 1. FIXED: Imported User model to prevent server crashes

// @desc    Get all dance classes with optional filters (style or instructor)
// @route   GET /api/classes
export const getClasses = async (req, res) => {
  try {
    const { style, instructorId } = req.query;
    let query = {};

    if (style) query.danceStyle = new RegExp(style, 'i'); // Case-insensitive search
    if (instructorId) query.instructor = instructorId;

    const classes = await Class.find(query)
      .populate('instructor', 'name email phone')
      .populate('enrolledStudents', 'name email');
      
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create/Schedule a new dance class
// @route   POST /api/classes
export const createClass = async (req, res) => {
  // 2. FIXED: Destructured variables to accept frontend admin entries seamlessly
  const { className, instructor, schedule, danceStyle, capacity, fee } = req.body;
  try {
    const newClass = await Class.create({
      className,
      instructor: instructor || null, // Default to null if no instructor assigned yet
      schedule,
      danceStyle,
      capacity: Number(capacity),
      fee: fee || 0 // Default to free ($0) if not specified in admin entry panels
    });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Enroll a student into a dance class
// @route   POST /api/classes/enroll
export const enrollInClass = async (req, res) => {
  // 3. FIXED: Destructured both 'userId' and 'studentId' so it works perfectly 
  // with what your frontend Home.jsx file is sending over the network!
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

    // Add class reference to student's profile records
    // Checking to ensure your array exists on the user schema model before pushing
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