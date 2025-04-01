import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Instructions.css'; // Make sure you have your CSS for styling

const Instructions = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    // Navigate to the quiz page, assuming you've added a route for quiz
    navigate('/quiz');
  };

  return (
    <div className="instructions-container">
      <div className="instructions-card">
        <h2>Quiz Instructions</h2>
        <p>
          Welcome to the quiz! Here are the instructions you need to follow:
        </p>
        <ul>
          <li>You will be asked a series of questions.</li>
          <li>Choose the correct answer to each question.</li>
          <li>Your score will be displayed at the end of the quiz.</li>
          <li>Good luck!</li>
        </ul>
        <button onClick={startQuiz} className="start-quiz-btn">
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Instructions;
