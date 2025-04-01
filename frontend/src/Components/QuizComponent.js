import React, { useState } from 'react';
import '../Styles/quizComponent.css';

const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris'
    },
    {
      question: 'Who is known as the father of computers?',
      options: ['Charles Babbage', 'Alan Turing', 'Bill Gates', 'Steve Jobs'],
      correctAnswer: 'Charles Babbage'
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars'
    }
  ];

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Quiz Time</h2>
        <p>Question {currentQuestion + 1} of {questions.length}</p>
      </div>

      {!quizCompleted ? (
        <>
          <div className="quiz-question">
            <h3>{questions[currentQuestion].question}</h3>
          </div>

          <div className="quiz-options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionChange(option)}
                className={`quiz-option ${selectedOption === option ? 'selected' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="quiz-footer">
            <button onClick={handleSubmit} className="quiz-submit">
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        </>
      ) : (
        <div className="quiz-results">
          <h3>Quiz Completed!</h3>
          <p>Your Score: {score} / {questions.length}</p>
          <button onClick={() => window.location.reload()} className="quiz-restart">
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
