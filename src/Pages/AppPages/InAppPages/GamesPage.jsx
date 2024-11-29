import React, { useEffect, useState } from "react";

const GamesPage = () => {
  const [quiz, setQuiz] = useState(null); // Holds the quiz data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks current question
  const [selectedAnswer, setSelectedAnswer] = useState(null); // User's selected answer
  const [timeLeft, setTimeLeft] = useState(60); // Timer state
  const [score, setScore] = useState(0); // Tracks the user's score
  const [submitted, setSubmitted] = useState(false); // Tracks if user has submitted answers

  useEffect(() => {
    // Fetch quiz on component mount
    fetch("http://localhost:8080/quiz")
      .then((response) => response.json())
      .then((data) => setQuiz(data))
      .catch((error) => console.error("Error fetching quiz:", error));
  }, []);

  useEffect(() => {
    // Timer countdown
    if (timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNext(); // Automatically move to the next question if time runs out
    }
  }, [timeLeft, submitted]);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      // Check if the answer is correct
      const correctAnswer = quiz.questions[currentQuestionIndex].correctIdx;
      if (selectedAnswer === correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
    }

    // Move to the next question or end the quiz
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null); // Reset selected answer
      setTimeLeft(60); // Reset timer
    } else {
      setSubmitted(true); // End the quiz
    }
  };

  const handleSubmit = () => {
    // Submit the quiz answers to the backend
    const submission = {
      user_id: "exampleUserId", // Replace with actual user ID
      quiz_id: quiz.quiz_id,
      user_answers: quiz.questions.map((q, idx) => ({
        question_id: q._id,
        selected_idx: idx === currentQuestionIndex ? selectedAnswer : null,
      })),
    };

    fetch("http://localhost:8080/submit-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Quiz submitted! Your score: ${data.score}`);
      })
      .catch((error) => console.error("Error submitting quiz:", error));
  };

  if (!quiz) return <p>Loading...</p>; // Show loading message while fetching data

  if (submitted) {
    return (
      <div>
        <h3>Quiz Completed!</h3>
        <p>
          Your Score: {score}/{quiz.questions.length}
        </p>
      </div>
    );
  }

  return (
    <div>
      <section>
        <h3>Bible Quiz</h3>
        <h4>Instructions</h4>
        <p>
          You have 1 minutes to answer each questions so as to be rewarded with
          your token.
        </p>
      </section>
      <section>
        {/* Display the current question */}
        <h4>Question {currentQuestionIndex + 1}:</h4>
        <p>{quiz.questions[currentQuestionIndex].text}</p>
        <div>
          {/* Display options */}
          {quiz.questions[currentQuestionIndex].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedAnswer(idx)}
              style={{
                backgroundColor: selectedAnswer === idx ? "#D3F8E2" : "#F5F5F5",
                border: "1px solid #ccc",
                margin: "5px",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </section>
      <section>
        {/* Timer */}
        <p>Time Left: {timeLeft}s</p>
        <button onClick={handleNext} disabled={selectedAnswer === null}>
          {currentQuestionIndex === quiz.questions.length - 1
            ? "Submit"
            : "Next"}
        </button>
      </section>
    </div>
  );
};

export default GamesPage;
