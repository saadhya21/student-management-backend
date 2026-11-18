const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// Routes mapped to /api/students
router.route('/')
  .post(createStudent)    // POST /api/students
  .get(getAllStudents);   // GET /api/students

// Routes mapped to /api/students/:id
router.route('/:id')
  .get(getStudentById)    // GET /api/students/:id
  .put(updateStudent)     // PUT /api/students/:id
  .delete(deleteStudent); // DELETE /api/students/:id

module.exports = router;
