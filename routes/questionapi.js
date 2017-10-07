const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Get all questions
router.get('/questions', (req, res, next) => {
  Question.find({}, (err, questions) => {
    if (err) {
      return res.json(err).status(500);
    }
    return res.json(questions);
  });
});

// Post new question
router.post('/questions', (req, res, next) => {
  const newQuestion = new Question({
    content: req.body.content,
    city: req.body.city,
    answer: []
  });
  newQuestion.save((err) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (newQuestion.errors) {
      return res.status(400).json(newQuestion);
    }
    return res.json(newQuestion);
  });
});


// Add answer to question
router.post('/:questionId/addanswer', (req, res, next) => {
  const questionId = req.params.questionId;

  var questionUpdate = {
    $push: {
      "answers": {
        content: req.body.content
      }
    }
  };

  Question.findByIdAndUpdate(questionId, questionUpdate, (err, question) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (questionUpdate.errors) {
      return res.status(400).json(questionUpdate);
    }
    return res.json(questionUpdate);
  });
});

module.exports = router;
