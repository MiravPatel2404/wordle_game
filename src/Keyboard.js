import React from 'react';
import './App.css';

function Keyboard({ usedKeys, onKeyPress }) {
  const rows = [
    'QWERTYUIOP',
    'ASDFGHJKL',
    'ZXCVBNM',
  ];

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.split('').map((key) => (
            <button
              key={key}
              className={`key ${usedKeys[key] || ''}`}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="keyboard-row">
        <button className="key" onClick={() => onKeyPress('Backspace')}>⌫</button>
        <button className="key" onClick={() => onKeyPress('Enter')}>Enter</button>
      </div>
    </div>
  );
}

export default Keyboard;
