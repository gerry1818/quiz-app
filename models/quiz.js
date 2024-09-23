let quizzes = [];
let results = [];

const createQuiz = (quiz) => {
  quiz.id = `quiz${quizzes.length + 1}`;
  quizzes.push(quiz);
  return quiz;
};

const getQuizById = (id) => quizzes.find(quiz => quiz.id === id);

const submitAnswer = (quizId, questionId, selectedOption, userId) => {
  const quiz = getQuizById(quizId);
  const question = quiz.questions.find(q => q.id === questionId);
  const isCorrect = question.correct_option === selectedOption;
  
  const userResult = results.find(result => result.quiz_id === quizId && result.user_id === userId);
  
  if (!userResult) {
    const result = {
      quiz_id: quizId,
      user_id: userId,
      score: isCorrect ? 1 : 0,
      answers: [{ question_id: questionId, selected_option: selectedOption, is_correct: isCorrect }]
    };
    results.push(result);
  } else {
    userResult.answers.push({ question_id: questionId, selected_option: selectedOption, is_correct: isCorrect });
    if (isCorrect) userResult.score += 1;
  }

  return { is_correct: isCorrect, correct_option: question.correct_option };
};

const getResultByQuizAndUser = (quizId, userId) => results.find(result => result.quiz_id === quizId && result.user_id === userId);

module.exports = { createQuiz, getQuizById, submitAnswer, getResultByQuizAndUser };
