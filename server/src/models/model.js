const mongoose = require('mongoose');

const Schemas = mongoose.Schema;

// Create ninja Schema & model

const NinjaSchema = new Schemas({
  name: {
    type: String,
    required: [true, 'Name field is required.'],
  },
  rank: {
    type: String,
  },
  avaliable: {
    type: Boolean,
    default: false,
  },
});

const ninja = mongoose.model('ninja', NinjaSchema);

module.exports = ninja;
