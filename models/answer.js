const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const AnswerSchema = new Schema({
  content: {
    type: String,
    required: [true, "Content is required"]
  },
  date: {
    type: Date,
    default: Date.now
  },
  // creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Answer', AnswerSchema);
