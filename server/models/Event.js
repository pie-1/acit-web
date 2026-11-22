const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    type: {
      type: String,
      enum: ['Workshop', 'Hackathon', 'Seminar', 'Meetup'],
      default: 'Workshop',
    },
    status: {
      type: String,
      enum: ['upcoming', 'past', 'live'],
      default: 'upcoming',
    },
    registrationLink: { type: String, default: '' },
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;