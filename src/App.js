import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Keyboard from './Keyboard';
import './App.css';

const WORDS = ['apple', 'grape', 'stone', 'plant'];

function App() {
  const [targetWord] = useState(WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [usedKeys, setUsedKeys] = useState({});

  const handleKeyPress = useCallback(
    (key) => {
      if (key === 'Enter' && currentGuess.length === 5) {
        if (guesses.length < 6) {
          const newUsedKeys = { ...usedKeys };
          currentGuess.split('').forEach((char, i) => {
            if (targetWord[i] === char) newUsedKeys[char] = 'correct';
            else if (targetWord.includes(char)) newUsedKeys[char] = 'present';
            else newUsedKeys[char] = 'absent';
          });

          setUsedKeys(newUsedKeys);
          setGuesses([...guesses, currentGuess]);
          setCurrentGuess('');
        }
      } else if (key === 'Backspace') {
        setCurrentGuess(currentGuess.slice(0, -1));
      } else if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess(currentGuess + key.toUpperCase());
      }
    },
    [currentGuess, guesses, targetWord, usedKeys]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      handleKeyPress(event.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress]);

  return (
    <div className="App">
      <h1>Wordle Clone</h1>
      <Board guesses={[...guesses, currentGuess]} targetWord={targetWord} />
      <Keyboard usedKeys={usedKeys} onKeyPress={handleKeyPress} />
    </div>
  );
}

export default App;
