const express       = require('express');
const router        = express.Router();
const Question      = require('../models/question');

router.get('/questions', (req, res, next) => {
  Question.find({}, (err, questions) => {
    if (err) { return res.json(err).status(500); }

    return res.json(questions);
  });
});

router.get('/questions/:id', (req, res, next) => {
  Question.findById(req.params.id, (err, question) => {
    if (err)    { return res.json(err).status(500); }
    if (!entry) { return res.json(err).status(404); }

    return res.json(question);
  });
});

router.post('/questions', (req, res, next) => {
  const newQuestion = new Question({
    content: req.body.content,
    city: req.body.city
  });

  newQuestion.save( (err) => {
    if (err)             { return res.status(500).json(err); }
    if (newQuestion.errors) { return res.status(400).json(newQuestion); }
                           return res.json(newQuestion);
  });
});

module.exports = router;
