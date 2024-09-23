const { v4: uuidv4 } = require('uuid');

let quizzes = {};  // In-memory storage for quizzes
let results = {};  // In-memory storage for user results

// Create a new quiz
exports.createQuiz = (req, res) => {
    const { title, questions } = req.body;
    const quizId = uuidv4();
    
    const formattedQuestions = questions.map((q) => ({
        id: uuidv4(),  // Assign a unique question ID
        text: q.text,
        options: q.options,
        correct_option: q.correct_option
    }));
    
    quizzes[quizId] = {
        id: quizId,
        title,
        questions: formattedQuestions
    };
    
    res.status(201).json({
        message: "Quiz created successfully!",
        quiz: quizzes[quizId]
    });
};

// Fetch a quiz by ID (without revealing correct answers)
exports.getQuizById = (req, res) => {
    const { quizId } = req.params;
    const quiz = quizzes[quizId];
    
    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }
    
    // Remove correct_option before returning
    const formattedQuestions = quiz.questions.map((q) => ({
        id: q.id,
        text: q.text,
        options: q.options
    }));
    
    res.json({
        id: quiz.id,
        title: quiz.title,
        questions: formattedQuestions
    });
};

// Submit an answer for a specific question
// Submit an answer for a specific question
exports.submitAnswer = (req, res) => {
    const { quizId, questionId } = req.params;
    const { userId } = req.query;
    const { selected_option } = req.body;

    const quiz = quizzes[quizId];
    
    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }
    
    const question = quiz.questions.find(q => q.id === questionId);
    
    if (!question) {
        return res.status(404).json({ message: "Question not found" });
    }

    // Check if the user has already submitted an answer for this question
    if (results[userId] && results[userId][quizId]) {
        const userAnswers = results[userId][quizId].answers;
        const alreadyAnswered = userAnswers.find(ans => ans.question_id === questionId);

        if (alreadyAnswered) {
            return res.status(400).json({ message: "You have already submitted an answer for this question" });
        }
    }

    const isCorrect = selected_option === question.correct_option;

    // Store result for the user
    if (!results[userId]) {
        results[userId] = {};
    }
    if (!results[userId][quizId]) {
        results[userId][quizId] = {
            score: 0,
            answers: []
        };
    }

    if (isCorrect) {
        results[userId][quizId].score += 1;
    }

    results[userId][quizId].answers.push({
        question_id: questionId,
        selected_option,
        is_correct: isCorrect,
        correct_option: question.correct_option
    });

    res.json({
        is_correct: isCorrect,
        correct_option: question.correct_option
    });
};

// Get user's quiz results
exports.getQuizResults = (req, res) => {
    const { quizId, userId } = req.params;

    if (!results[userId] || !results[userId][quizId]) {
        return res.status(404).json({ message: "Results not found" });
    }

    res.json({
        quiz_id: quizId,
        user_id: userId,
        score: results[userId][quizId].score,
        answers: results[userId][quizId].answers
    });
};
