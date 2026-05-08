const router = require('express').Router();
const Student = require('../models/Student');
const auth = require('../middleware/auth');

// GET /api/students
router.get('/', auth, async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = { $or: [
        { name: new RegExp(search, 'i') },
        { usn:  new RegExp(search, 'i') },
      ]};
    }
    const students = await Student.find(query).sort({ name: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/students
router.post('/', auth, async (req, res) => {
  try {
    const { name, usn, branch, semester, email, phone } = req.body;

    if (!name || !usn || !branch || !semester || !email || !phone)
      return res.status(400).json({ message: 'All fields are required' });

    const exists = await Student.findOne({ usn: usn.toUpperCase() });
    if (exists) return res.status(409).json({ message: 'USN already exists' });

    const student = await Student.create({ name, usn, branch, semester, email, phone, createdBy: req.user.id });
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/students/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/students/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
