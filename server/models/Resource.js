const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['meeting_note', 'schedule', 'classroom_link'], 
    required: true 
  },
  content: { type: String }, 
  link: { type: String }, 
  date: { type: Date, required: true },
  isPublic: { type: Boolean, default: true } 
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
