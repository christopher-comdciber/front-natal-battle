/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const Board: React.FC = () => {
  const board = Array(10).fill(Array(10).fill(null));

  return (
    <div className="grid grid-cols-10 gap-1 bg-gray-800 p-4 rounded-lg">
      {board.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((cell: any, cellIndex: React.Key | null | undefined) => (
            <div
              key={cellIndex}
              id={cell}
              className="w-10 h-10 bg-gray-600 border border-gray-700 rounded-md hover:bg-gray-500"
            ></div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Board;