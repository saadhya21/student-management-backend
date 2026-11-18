const mongoose = require('mongoose');
const Student = require('../models/Student');

/**
 * @desc    Create a new student
 * @route   POST /api/students
 */
const createStudent = async (req, res) => {
  try {
    const { name, email, age, course } = req.body;

    // Create a new student instance
    const student = new Student({
      name,
      email,
      age,
      course,
    });

    // Save to database
    const savedStudent = await student.save();

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: savedStudent,
    });
  } catch (error) {
    // Handle duplicate email error (MongoDB duplicate key error code 11000)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A student with this email already exists',
      });
    }

    // Handle Mongoose validation errors (e.g. missing required field, age < 1)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }

    // Generic server error
    res.status(500).json({
      success: false,
      message: 'Server error while creating student',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all students
 * @route   GET /api/students
 */
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching students',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single student by ID
 * @route   GET /api/students/:id
 */
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format',
      });
    }

    const student = await Student.findById(id);

    // Check if student exists
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching student',
      error: error.message,
    });
  }
};

/**
 * @desc    Update student by ID
 * @route   PUT /api/students/:id
 */
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format',
      });
    }

    // Update with validators enabled (returns updated document)
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    // Check if student exists
    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent,
    });
  } catch (error) {
    // Handle duplicate email conflict
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A student with this email already exists',
      });
    }

    // Handle validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating student',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete student by ID
 * @route   DELETE /api/students/:id
 */
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format',
      });
    }

    const deletedStudent = await Student.findByIdAndDelete(id);

    // Check if student exists
    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: deletedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting student',
      error: error.message,
    });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
