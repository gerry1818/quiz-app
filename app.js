const express = require('express');
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
app.use(bodyParser.json());

// Use the quiz routes
app.use('/api/quizzes', quizRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
