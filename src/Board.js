import React from 'react';
import LetterBox from './LetterBox';

function Board({ guesses, currentGuess, targetWord }) {
  const rows = Array.from({ length: 6 }, (_, rowIndex) => guesses[rowIndex] || currentGuess || '');

  return (
    <div className="board">
      {rows.map((guess, rowIndex) => (
        <div key={rowIndex} className="word-row">
          {Array.from({ length: 5 }).map((_, colIndex) => {
            const letter = guess[colIndex] || '';
            let status = '';

            if (guesses[rowIndex]) {
              if (letter === targetWord[colIndex]) status = 'correct';
              else if (targetWord.includes(letter)) status = 'present';
              else status = 'absent';
            }

            return (
              <LetterBox
                key={colIndex}
                letter={letter}
                status={status}
                isFlipped={!!guesses[rowIndex]}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;
