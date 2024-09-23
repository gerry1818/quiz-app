
# Quiz Management API

This project is a simple backend service for managing and executing quizzes using Node.js and Express. The application supports creating quizzes, fetching quizzes, submitting answers, and getting quiz results, all through RESTful APIs. The data is stored in-memory, making it ideal for testing and learning purposes.

## Features

- **Create Quiz**: Add a new quiz with multiple questions, each having 4 answer options and a correct answer.
- **Get Quiz**: Retrieve a quiz by ID, but without revealing the correct answers.
- **Submit Answer**: Submit an answer for a question and get immediate feedback on whether it was correct.
- **Get Results**: Fetch the user’s results for a specific quiz, including score and answer summary.

## Project Structure

```
quiz-app/
│
├── controllers/            # Request handling logic
│   └── quizController.js
├── models/                 # Data models (in-memory)
│   └── quiz.js
├── routes/                 # API routes
│   └── quizRoutes.js
├── app.js                  # Express server setup
└── README.md               # Project documentation
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/quiz-app.git
   cd quiz-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node app.js
   ```

The server will run on `http://localhost:3000`.

## API Endpoints

### 1. Create a Quiz

- **URL**: `/api/quizzes`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "title": "JavaScript Quiz",
    "questions": [
      {
        "text": "What is JavaScript?",
        "options": ["Programming Language", "Coffee", "Movie", "Framework"],
        "correct_option": 0
      }
    ]
  }
  ```

- **Response**: `201 Created`

    ```json
    {
        "message": "Quiz created successfully!",
        "quiz": {
            "id": "61efd463-03ed-41f2-907e-fc4ddb4a4f59",
            "title": "JavaScript Quiz",
            "questions": [
                {
                    "id": "0203d2fb-6de7-49be-8fb2-6985d1c35bd2",
                    "text": "What is JavaScript?",
                    "options": [
                        "Programming Language",
                        "Coffee",
                        "Movie",
                        "Framework"
                    ],
                    "correct_option": 1
                }
            ]
        }      
    }
    ```

### 2. Get a Quiz

- **URL**: `/api/quizzes/:quizId`
- **Method**: `GET`
- **Response**:

  ```json
  {
    "id": "uuid",
    "title": "JavaScript Quiz",
    "questions": [
      {
        "id": "uuid",
        "text": "What is JavaScript?",
        "options": ["Programming Language", "Coffee", "Movie", "Framework"]
      }
    ]
  }
  ```

### 3. Submit an Answer

- **URL**: `/api/quizzes/:quizId/questions/:questionId/answer?userId=user1`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "selected_option": 1
  }
  ```

- **Response**:

  ```json
  {
    "is_correct": false,
    "correct_option": 0
  }
  ```

### 4. Get Quiz Results

- **URL**: `/api/quizzes/:quizId/results/:userId`
- **Method**: `GET`
- **Response**:

  ```json
  {
    "quiz_id": "quiz1",
    "user_id": "user1",
    "score": 3,
    "answers": [
      {
        "question_id": "q1",
        "selected_option": 1,
        "is_correct": false,
        "correct_option":2,
      }
    ]
  }
  ```

## Project Design

- **In-Memory Data Storage**: The quizzes, answers, and results are stored in arrays and objects within the Node.js application.
- **RESTful API Design**: The application follows REST principles with appropriate HTTP methods and status codes.
- **Security**: Prevents users from changing answers post-submission by locking responses once submitted.

## Future Improvements

- Persist data using a database such as MongoDB or PostgreSQL.
- Add user authentication for better security.
- Implement pagination for retrieving multiple quizzes or results.

## Running Tests

To manually test the API, use Postman or `curl` to send requests to the provided endpoints.

## License

This project is licensed under the MIT License.