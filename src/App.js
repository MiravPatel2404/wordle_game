import React, { useState, useEffect } from 'react';
import Board from './Board';
import Keyboard from './Keyboard';
import './App.css';

function App() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [usedKeys, setUsedKeys] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [targetWord, setTargetWord] = useState('');

  // Fetch a random 5-letter word from an API
  const fetchRandomWord = async () => {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word?length=5');
      const data = await response.json();
      setTargetWord(data[0].toUpperCase());
    } catch (error) {
      console.error('Error fetching random word:', error);
      // Fallback to a local word list
      const fallbackWords = ['APPLE', 'CRISP', 'PLANT', 'ROBOT', 'LEVEL'];
      setTargetWord(fallbackWords[Math.floor(Math.random() * fallbackWords.length)]);
    }
  };

  useEffect(() => {
    fetchRandomWord();
  }, []);

  const restartGame = () => {
    setGuesses([]);
    setCurrentGuess('');
    setUsedKeys({});
    setIsGameOver(false);
    setIsGameWon(false);
    fetchRandomWord(); // Fetch a new word for the new game
  };

  const handleKeyPress = (key) => {
    if (isGameOver || isGameWon) return; // Prevent input if game is over

    if (key === 'Enter' && currentGuess.length === 5) {
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      const updatedKeys = { ...usedKeys };
      let isCorrectGuess = true;

      currentGuess.split('').forEach((letter, index) => {
        if (targetWord[index] === letter) {
          updatedKeys[letter] = 'correct';
        } else if (targetWord.includes(letter)) {
          updatedKeys[letter] = 'present';
          isCorrectGuess = false;
        } else {
          updatedKeys[letter] = 'absent';
          isCorrectGuess = false;
        }
      });

      setUsedKeys(updatedKeys);

      if (currentGuess === targetWord) {
        setIsGameWon(true);
      } else if (newGuesses.length >= 6) {
        setIsGameOver(true);
      }
    } else if (key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key.toUpperCase());
    }
  };

  return (
    <div className="App">
      <h1>Wordle Clone</h1>
      {targetWord ? (
        <>
          <Board guesses={guesses} currentGuess={currentGuess} targetWord={targetWord} />
          <Keyboard usedKeys={usedKeys} onKeyPress={handleKeyPress} />
        </>
      ) : (
        <p>Loading...</p>
      )}
      {(isGameWon || isGameOver) && (
        <div className="game-over">
          {isGameWon ? <p>🎉 You guessed the word correctly!</p> : <p>❌ Game Over! The word was: {targetWord}</p>}
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
}

export default App;
