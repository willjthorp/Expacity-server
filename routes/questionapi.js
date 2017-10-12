const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Get all questions
router.get('/questions', (req, res, next) => {
  Question.find({}).sort({
    date: -1
  }).populate('creator').exec((err, questions) => {
    if (err) {
      return res.json(err).status(500);
    }
    return res.json(questions);
  });
});


// Get specific city questions
router.get('/cityquestions/:id', (req, res, next) => {
  Question.find({
    'city': req.params.id
  }).populate('creator').exec((err, questions) => {
    if (err) {
      return res.json(err).status(500);
    }
    return res.json(questions);
  });
});

// Get specific user questions
router.get('/userquestions/:id', (req, res, next) => {
  Question.find({
    'creator': req.params.id
  }).populate('creator').exec((err, questions) => {
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
    answers: [],
    stars: 0,
  });
  if (req.user) {
    newQuestion.creator = req.user._id;
  }
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


// Star a question
router.get('/:questionId/addQuestionStar', (req, res, next) => {
  const questionId = req.params.questionId;
  const questionUpdate = {
    $inc: {
      "stars": 1
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


// Add answer to question
router.post('/:questionId/addanswer', (req, res, next) => {
  const questionId = req.params.questionId;

  var questionUpdate = {
    $push: {
      "answers": {
        content: req.body.content,
        stars: 0
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


// Star an answer
router.get('/:questionId/addAnswerStar/:answerId', (req, res, next) => {
  const questionId = req.params.questionId + '';
  const answerId = req.params.answerId + '';

  Question.findOneAndUpdate({
      "_id": questionId,
      "answers._id": answerId
    }, {
      $inc: {
        "answers.$.stars": 1
      }
    }, {
      upsert: true
    },

    (err, question) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (question.errors) {
        return res.status(400).json(question);
      }
      return res.json(question);
    });
});

module.exports = router;
