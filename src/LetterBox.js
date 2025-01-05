import React, { useEffect, useState } from 'react';
import './App.css';

function LetterBox({ letter, status, isFlipped }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isFlipped) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  }, [isFlipped]);

  return (
    <div
      className={`letter-box ${status || ''} ${isAnimating ? 'flip' : ''}`}
    >
      {letter}
    </div>
  );
}

export default LetterBox;
