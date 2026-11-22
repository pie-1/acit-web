const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true }, 
  imageUrl: { type: String, required: true },
  socials: {
    instagram: String,
    facebook: String,
    linkedin: String,
    tiktok: String
  },
  type: { 
    type: String, 
    enum: ['current', 'legacy'], 
    default: 'current' 
  }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);