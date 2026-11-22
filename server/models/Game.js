const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    category: {
      type: String,
      enum: ['Party', 'Strategy', 'Coding', 'Quiz', 'Puzzle'],
      default: 'Party',
    },
    imageUrl: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Game', gameSchema);