import React, { useState, useEffect } from 'react';

interface BoardProps {
  matrix: string[][];
  onCellClick: (rowIndex: number, cellIndex: number) => void;
}

const Board: React.FC<BoardProps> = ({ matrix, onCellClick }) => {
  const [board, setBoard] = useState(Array.from({ length: 10 }, () => Array(10).fill(null)));

  useEffect(() => {
    const newBoard = matrix.map((row, rowIndex) =>
      row.map((cell, cellIndex) => {
        if (cell === 'N') {
          return 'green';
        } else if (cell === 'A') {
          return 'red';
        } else {
          return null;
        }
      })
    );
    setBoard(newBoard);
  }, [matrix]);

  const handleCellClickInternal = (rowIndex: number, cellIndex: number) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => row.map(() => null)); // Redefinir todas as células para null
      newBoard[rowIndex][cellIndex] = 'red'; // Pintar a célula clicada de vermelho
      return newBoard;
    });
    onCellClick(rowIndex, cellIndex); // Chamar a função de callback passada como prop
  };

  return (
    <div className="grid grid-cols-10 gap-1 bg-gray-800 p-4 rounded-lg"
      style={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', backdropFilter: 'blur(10px)' }}>
      {board.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className="w-6 h-6 sm:w-10 sm:h-10 border border-gray-700 rounded-md hover:bg-gray-500"
              style={{ backgroundColor: cell || 'bg-gray-600' }}
              onClick={() => handleCellClickInternal(rowIndex, cellIndex)}
            >
              {/* Conteúdo da célula, se necessário */}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Board;