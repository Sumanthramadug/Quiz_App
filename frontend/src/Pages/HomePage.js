import React, { useContext } from 'react';
import Navbar from '../Components/Navbar'; // Adjust the path as needed
import '../Styles/homePage.css'; // Add your custom styles for the HomePage
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
const HomePage = () => {
  const {isLoggedIn} = useContext(AppContext);
  const navigate = useNavigate();
  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-card">
        <h2>Welcome to the Quiz</h2>
        <p>
          Get ready to test your knowledge with our fun and educational quiz! 
          Click the button below to start the quiz.
        </p>

        <button 
        className="start-quiz-btn"
         onClick={()=>isLoggedIn ? startQuiz() : navigate("/login")}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default HomePage;
