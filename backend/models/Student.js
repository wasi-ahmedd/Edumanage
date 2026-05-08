const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  usn:      { type: String, required: true, unique: true, trim: true, uppercase: true },
  branch:   { type: String, required: true, trim: true },
  semester: { type: Number, required: true, min: 1, max: 8 },
  email:    { type: String, required: true, trim: true, lowercase: true },
  phone:    { type: String, required: true, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
