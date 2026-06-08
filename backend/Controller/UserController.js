import User from '../Models/UserModel.js';
import bcrypt from 'bcrypt';

// @desc    Get all users
// @route   GET /api/users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new user (Student/Instructor/Admin) -> Maps to Signup.jsx
// @route   POST /api/users/register
export const registerUser = async (req, res) => {
  const { name, email, password, role, phone } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Password hashing is handled automatically by our pre-save hook in UserModel!
    const newUser = await User.create({ name, email, password, role, phone });
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user & log in -> Maps to Login.jsx
// @route   POST /api/users/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare entered password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Complete advanced student profile data -> Maps to Registration.jsx
// @route   PUT /api/users/update-profile/:id
export const updateStudentRegistration = async (req, res) => {
  try {
    const userId = req.params.id;
    const { 
      age, 
      experienceLevel, 
      preferredFormat, 
      preferredSchedule, 
      studioLocation, 
      parentGuardian, 
      phone, 
      mailingAddress, 
      specialObjectives 
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        age,
        experienceLevel,
        preferredFormat,
        preferredSchedule,
        studioLocation,
        parentGuardian,
        phone,
        mailingAddress,
        specialObjectives
      },
      { new: true, runValidators: true } // returns the freshly updated data structure from Mongo
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Dance student profile not found' });
    }

    res.status(200).json({ 
      message: '✅ Studio placement tracking configured successfully!', 
      updatedUser 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};