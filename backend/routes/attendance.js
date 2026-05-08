const router = require('express').Router();
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const auth = require('../middleware/auth');

// GET /api/attendance?date=YYYY-MM-DD
router.get('/', auth, async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = date || new Date().toISOString().split('T')[0];

    const students = await Student.find().sort({ name: 1 });
    const records = await Attendance.find({ date: targetDate });

    const recordMap = {};
    records.forEach(r => { recordMap[r.studentId.toString()] = r.status; });

    const result = students.map(s => ({
      _id:      s._id,
      name:     s.name,
      usn:      s.usn,
      branch:   s.branch,
      semester: s.semester,
      status:   recordMap[s._id.toString()] || null,
    }));

    res.json({ date: targetDate, students: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/attendance  — mark/update one student
router.post('/', auth, async (req, res) => {
  try {
    const { studentId, date, status } = req.body;
    if (!studentId || !date || !status)
      return res.status(400).json({ message: 'studentId, date, and status are required' });

    const record = await Attendance.findOneAndUpdate(
      { studentId, date },
      { studentId, date, status, markedBy: req.user.id },
      { upsert: true, new: true }
    );
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
