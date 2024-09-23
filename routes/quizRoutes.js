const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Create a quiz
router.post('/', quizController.createQuiz);

// Get a quiz by ID
router.get('/:quizId', quizController.getQuizById);

// Submit an answer for a question
router.post('/:quizId/questions/:questionId/answer', quizController.submitAnswer);

// Get quiz results for a user
router.get('/:quizId/results/:userId', quizController.getQuizResults);

module.exports = router;
