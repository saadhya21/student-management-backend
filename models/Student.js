const mongoose = require('mongoose');

// Define the Schema for a Student
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Student email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: [true, 'Student age is required'],
      min: [1, 'Age must be at least 1'],
    },
    course: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt timestamps
  }
);

// Compile schema into Model and export
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
