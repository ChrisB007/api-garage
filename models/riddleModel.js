const mongoose = require('mongoose');

const riddleSchema = new mongoose.Schema (
  {
    "userId": {
      type: "Number"
    },
    riddleId: {
      type: "Number"
    },
    riddle: {
      type: "String",
      required: true
    },
    answer: {
      type: "String",
      required: true
    }
  }
)

module.exports = mongoose.model('Riddle', riddleSchema);