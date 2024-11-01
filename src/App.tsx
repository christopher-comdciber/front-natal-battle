/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import './App.css';
import Board from './Board';
import Console from './Console';
import ShipPlacement from './ShipPlacement';

function App() {
  const [responses, setResponses] = useState<string[]>([
    "> Resposta 1 do Servidor",
    "> Resposta 2 do Servidor",
    "> Resposta 3 do Servidor",
  ]);

  return (
    <div className="text-start bg-gray-900 text-white p-4 ">
      <div className="flex justify-center gap-1 items-center">
      <ShipPlacement />
      <Board />
      </div>
      <Console responses={responses} />
    </div>
  );
}

export default App;