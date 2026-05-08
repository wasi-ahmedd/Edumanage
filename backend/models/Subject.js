const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  code:    { type: String, required: true, unique: true, trim: true, uppercase: true },
  credits: { type: Number, required: true, min: 1, max: 6 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
