const router = require('express').Router();
const Subject = require('../models/Subject');
const auth = require('../middleware/auth');

// GET /api/subjects
router.get('/', auth, async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ code: 1 });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/subjects
router.post('/', auth, async (req, res) => {
  try {
    const { name, code, credits } = req.body;
    if (!name || !code || !credits)
      return res.status(400).json({ message: 'All fields are required' });

    const exists = await Subject.findOne({ code: code.toUpperCase() });
    if (exists) return res.status(409).json({ message: 'Subject code already exists' });

    const subject = await Subject.create({ name, code, credits, createdBy: req.user.id });
    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/subjects/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.json({ message: 'Subject deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
