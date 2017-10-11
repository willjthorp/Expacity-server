const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  content: {
    type: String,
    required: [true, "Content is required"]
  },
  city: String,
  date: {
    type: Date,
    default: Date.now
  },
  answers: [{
    content: String,
    date: {
      type: Date,
      default: Date.now
    },
    stars: Number
  }],
  stars: Number
  // creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Question', QuestionSchema);
