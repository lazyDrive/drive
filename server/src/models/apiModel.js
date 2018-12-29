const mongoose = require('mongoose');

const Schemas = mongoose.Schema;

// Create recents Schema & model

const RecentSchema = new Schemas({
  recentId: {
    type: String,
    required: [true, 'Recent filed is required.'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const recents = mongoose.model('recents', RecentSchema);

module.exports = recents;
