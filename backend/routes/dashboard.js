const router = require('express').Router();
const Student = require('../models/Student');
const auth = require('../middleware/auth');

// GET /api/dashboard
router.get('/', auth, async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    // Group by branch
    const branchData = await Student.aggregate([
      { $group: { _id: '$branch', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const studentsByBranch = branchData.map(b => ({ branch: b._id, count: b.count }));

    res.json({ totalStudents, studentsByBranch });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
