// src/app/page.js

'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import styles from './page.module.css';

export default function Home() {
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
        particleCount: 50,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#ff8000', '#ffff00'],
      });
    }, 250);
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
        particleCount: 20,
        startVelocity: 10,
        spread: 360,
        ticks: 60,
        gravity: -0.2,
        origin: { x: Math.random(), y: 1.2 },
        colors: ['#a0c4ff', '#cdb4db', '#bde0fe'],
      });
    }, 250);
  }

  // 4. Stars Animation
  function launchStars() {
    var duration = 2 * 1000;
    var animationEnd = Date.now() + duration;

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 30,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ffff66', '#ffff99', '#ffffff'],
      });
    }, 250);
  }

  // 5. Burst Animation
  function launchBurst() {
    confetti({
      particleCount: 100,
      startVelocity: 60,
      spread: 360,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#ff616f', '#ff85a1', '#ff3e55'],
      ticks: 50,
      zIndex: 0,
    });
  }

  // Array of animation functions
  const animations = [launchConfetti, launchFireworks, launchBubbles, launchStars, launchBurst];

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

  // Streak milestones for celebrations
  const streakMilestones = [3, 5, 7, 10];

  useEffect(() => {
    // Generate the initial question after component mounts
    generateQuestion();

    // Focus on the input field when the component mounts
    if (answerInputRef.current) {
      answerInputRef.current.focus();
    }
  }, []);

  function generateNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  function generateQuestion() {
    setNum1(generateNumber());
    setNum2(generateNumber());
    setUserAnswer('');
    setFeedback('');
    setFeedbackClass('');
    if (answerInputRef.current) {
      answerInputRef.current.focus();
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
    if (questionsAnswered + 1 >= totalQuestions) {
      setTimeout(() => {
        showFinalScore();
      }, 500);
    } else {
      setTimeout(() => {
        generateQuestion();
      }, 1500);
    }
  }

  function showFinalScore() {
    // Display final score (you can implement a modal or new component)
    alert(
      `Well Done!\nYour final score is ${score} out of ${totalQuestions}.\nYour highest streak was ${highestStreak} 🔥`
    );
    // Reset the game
    restartGame();
  }

  function restartGame() {
    setScore(0);
    setStreak(0);
    setHighestStreak(0);
    setQuestionsAnswered(0);
    generateQuestion();
  }

  return (
    <div className={styles.container}>
      <h1>🎉 Fun Multiplication Practice 🎉</h1>
      <div className={styles.score}>Score: {score}</div>
      <div className={styles.streak}>Streak: {streak} 🔥</div>
      <div className={styles.question}>
        {num1 !== null && num2 !== null ? `What is ${num1} × ${num2}?` : 'Loading question...'}
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
      <button onClick={checkAnswer} className={styles.btn} disabled={num1 === null || num2 === null}>
        Submit
      </button>
      <div className={`${styles.feedback} ${styles[feedbackClass]}`}>{feedback}</div>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${(questionsAnswered / totalQuestions) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}