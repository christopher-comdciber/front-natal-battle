import { useEffect, useState } from 'react';
import './App.css';
import Board from './Board';
import Console from './Console';
import ShipPlacement from './ShipPlacement';
import { atacar, posicionarNavio, checkServerHealth, getTabuleiro } from './services/navalBattle';
import PlayerIdModal from './PlayerId';

function App() {
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [matrix, setMatrix] = useState<string[][]>(Array.from({ length: 10 }, () => Array(10).fill(null)));
  const [selectedShip, setSelectedShip] = useState<{ name: string; size: number } | null>(null);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');



  useEffect(() => {
    const storedPlayerId = localStorage.getItem('playerId');
    if (storedPlayerId) {
      setPlayerId(Number(storedPlayerId));
    }
  }, []);

  const handlePlayerIdSubmit = (id: number) => {
    setPlayerId(id);
    localStorage.setItem('playerId', id.toString());
  };

  const handleShipSelected = (ship: { name: string; size: number }, orientation: 'horizontal' | 'vertical') => {
    setSelectedShip(ship);
    setOrientation(orientation);
    console.log('Navio selecionado:', ship, orientation);
  };

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    console.log('Célula clicada:', rowIndex, cellIndex);
    // Adicione a lógica que você deseja executar ao clicar na célula
  };

  const updateMatrix = (matrix: string[][]) => {
    setMatrix(matrix);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("oi")
        const health = await checkServerHealth();
        console.log('Server health:', health);

        const tabuleiro = await getTabuleiro(0);
        console.log('Tabuleiro:', tabuleiro);

        updateMatrix(tabuleiro);


        const respostaPosicionar = await posicionarNavio(0, { x: 0, y: 0 }, 5, 'horizontal');
        const respostaPosicionar2 = await posicionarNavio(0, { x: 5, y: 5 }, 2, 'horizontal');

        setResponses((prevResponses) => [...prevResponses, { type: 'posicionarNavio', data: respostaPosicionar }]);
        console.log('Resposta posicionar navio:', respostaPosicionar);

        // const respostaAtaque = await atacar(0, { x: 1, y: 1 });
        // setResponses((prevResponses) => [...prevResponses, { type: 'atacar', data: respostaAtaque }]);
        // console.log('Resposta ataque:', respostaAtaque);
      } catch (error) {
        console.error('Erro ao conectar com o backend:', error);
        setResponses(() => [{ type: 'error', data: "Erro ao conectar com o backend." }]);
      }
      
    };

    if (playerId !== null) {
      fetchData();
    }
  }, [playerId]);

  return (
    <div
    className="text-start text-white p-4 flex flex-col"
    >
      {playerId === null ? (
        <PlayerIdModal onSubmit={handlePlayerIdSubmit} />
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-center gap-1 items-center">
          <ShipPlacement onShipSelected={handleShipSelected} />
          <Board matrix={matrix} onCellClick={handleCellClick} />
          </div>
          <Console responses={responses} />
        </>
      )}
    </div>
  );
}

export default App;