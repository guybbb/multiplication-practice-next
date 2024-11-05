// src/app/page.js

'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import styles from './page.module.css';

export default function Home() {
  // State variables
  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackClass, setFeedbackClass] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const totalQuestions = 10;
  const answerInputRef = useRef(null);

  // New state variables for tracking questions
  const [questionQueue, setQuestionQueue] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [failedQuestions, setFailedQuestions] = useState([]);

  // New state variable for game over
  const [gameOver, setGameOver] = useState(false);

  // Streak milestones for celebrations
  const streakMilestones = [3, 5, 7, 10];

  // Animation Functions

  // 1. Confetti Animation
  function launchConfetti() {
    var duration = 2 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  }

  // 2. Fireworks Animation
  function launchFireworks() {
    var duration = 2 * 1000;
    var animationEnd = Date.now() + duration;

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 100,        // More particles for a denser effect
        startVelocity: 50,        // Higher velocity for more explosive effect
        spread: 120,              // Narrower spread for a more focused burst
        ticks: 80,               // More ticks for longer-lasting particles
        origin: { x: Math.random(), y: 1 },  // Launch from bottom of screen
        colors: ['#FF0000', '#FFD700', '#FF8C00', '#FF69B4', '#FFB6C1'], // Bright firework colors
        gravity: 1.2,            // Higher gravity for more arc
        scalar: 0.8,             // Slightly smaller particles
        shapes: ['star']         // Star-shaped particles
      });
    }, 150)
  }

  // 3. Bubbles Animation
  function launchBubbles() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          // since particles fall down, skew start toward the top
          y: (Math.random() * skew) - 0.2
        },
        colors: ['#ffffff'],
        shapes: ['circle'],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4)       // Star-shaped particles
      });
    }, 150)
  }

  // 4. Stars Animation
  function launchStars() {
    var duration = 2 * 1000;
    var animationEnd = Date.now() + duration;

    var interval = setInterval( () => {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 2,
        angl: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      })},250);
  }


 // Array of animation functions
  const animations = [launchFireworks, launchConfetti, launchBubbles, launchStars];

  useEffect(() => {
    // Focus on the input field when the component mounts
    if (answerInputRef.current) {
      answerInputRef.current.focus();
    }
    // Initialize the game
    startGame();
  }, []);

  function generateNumber() {
    return Math.floor(Math.random() * 9) + 2;
  }

  function startGame() {
    // Build a new question queue
    const newQuestionQueue = [];

    // Add failed questions first
    if (failedQuestions.length > 0) {
      newQuestionQueue.push(...failedQuestions);
    }

    // Then, add random questions to fill up to totalQuestions
    const questionsNeeded = totalQuestions - newQuestionQueue.length;
    for (let i = 0; i < questionsNeeded; i++) {
      const num1 = generateNumber();
      const num2 = generateNumber();
      newQuestionQueue.push({ num1, num2 });
    }

    setQuestionQueue(newQuestionQueue);
    setCurrentQuestionIndex(0);
    setFailedQuestions([]); // Reset failed questions for the next round
    setScore(0);
    setStreak(0);
    setHighestStreak(0);
    setQuestionsAnswered(0);
    setGameOver(false); // Reset game over state

    // Set the first question
    if (newQuestionQueue.length > 0) {
      setNum1(newQuestionQueue[0].num1);
      setNum2(newQuestionQueue[0].num2);
    }
  }

  function checkAnswer() {
    const correctAnswer = num1 * num2;
    const parsedUserAnswer = parseInt(userAnswer, 10);

    if (isNaN(parsedUserAnswer)) {
      setFeedback('🚫 Please enter a valid number.');
      setFeedbackClass('incorrect');
    } else if (parsedUserAnswer === correctAnswer) {
      setStreak((prev) => prev + 1);
      setScore((prev) => prev + 1);
      setFeedback('🎉 Correct! Great job! 🎉');
      setFeedbackClass('correct');
      updateStreak();
      checkForCelebration();
      nextQuestion();
    } else {
      setFeedback(`❌ Oops! The correct answer is ${correctAnswer}.`);
      setFeedbackClass('incorrect');
      setStreak(0);
      updateStreak();

      // Add the failed question to failedQuestions
      setFailedQuestions((prevFailedQuestions) => [
        ...prevFailedQuestions,
        { num1, num2 },
      ]);

      nextQuestion();
    }
  }

  function updateStreak() {
    setStreak((prevStreak) => {
      if (prevStreak > highestStreak) {
        setHighestStreak(prevStreak);
      }
      return prevStreak;
    });
  }

  function checkForCelebration() {
    if (streakMilestones.includes(streak + 1)) {
      // Randomly select an animation
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      randomAnimation();
    }
  }

  function nextQuestion() {
    setQuestionsAnswered((prev) => prev + 1);
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questionQueue.length) {
      setCurrentQuestionIndex(nextIndex);
      setNum1(questionQueue[nextIndex].num1);
      setNum2(questionQueue[nextIndex].num2);
      setUserAnswer('');
      setFeedback('');
      setFeedbackClass('');
      if (answerInputRef.current) {
        answerInputRef.current.focus();
      }
    } else {
      // End of questions, show final score
      setTimeout(showFinalScore, 500);
    }
  }

  function showFinalScore() {
    // Set game over state to true
    setGameOver(true);
  }

  function restartGame() {
    startGame();
    setUserAnswer('');
    setFeedback('');
    setFeedbackClass('');
    if (answerInputRef.current) {
      answerInputRef.current.focus();
    }
  }

  return (
    <div className={styles.container}>
      <h1>🎉 Fun Multiplication Practice 🎉</h1>
      {!gameOver ? (
        <>
          <div className={styles.score}>Score: {score}</div>
          <div className={styles.streak}>Streak: {streak} 🔥</div>
          <div className={styles.question}>
            {num1 !== null && num2 !== null ? (
              `What is ${num1} × ${num2}?`
            ) : (
              'Loading question...'
            )}
          </div>
          <input
            type="number"
            className={styles.answer}
            placeholder="Your answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                checkAnswer();
              }
            }}
            ref={answerInputRef}
            disabled={num1 === null || num2 === null}
          />
          <button
            onClick={checkAnswer}
            className={styles.btn}
            disabled={num1 === null || num2 === null}
          >
            Submit
          </button>
          <div className={`${styles.feedback} ${styles[feedbackClass]}`}>
            {feedback}
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${(questionsAnswered / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </>
      ) : (
        <div className={styles.endGame}>
          <h2>Well Done!</h2>
          <p>Your final score is {score} out of {totalQuestions}.</p>
          <p>Your highest streak was {highestStreak} 🔥</p>
          {failedQuestions.length > 0 ? (
            <>
              <h3>Questions to Review:</h3>
              <ul className={styles.failedQuestionsList}>
                {failedQuestions.map((question, index) => (
                  <li key={index}>
                    {question.num1} × {question.num2} = {question.num1 * question.num2}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Great job! You got all the questions correct! 🎉</p>
          )}
          <button onClick={restartGame} className={styles.btn}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}