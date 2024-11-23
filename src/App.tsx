/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import './App.css';
import Board from './Board';
import Console from './Console';
import ShipPlacement from './ShipPlacement';
import { posicionarNavio, checkServerHealth, getTabuleiro, verificarPosicionamentoNavioJogador, getFase, atacar } from './services/navalBattle';
import PlayerIdModal from './PlayerId';
import Alert from './Alert';

function App() {
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [fase, setFase] = useState('posicionamento'); // 'posicionamento' ou 'ataque'
  const [matrix, setMatrix] = useState<string[][]>(Array.from({ length: 10 }, () => Array(10).fill(null)));
  const [selectedShip, setSelectedShip] = useState<{ name: string; size: number } | null>(null);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [responses, setResponses] = useState<any[]>([]);
  const [naviosPosicionados, setNaviosPosicionados] = useState(false);
  const [title, setTitle] = useState('Fase de posicionamento');
  const [message, setMessage] = useState('');
  // const [matrix, setMatrix] = useState(initialMatrix);
  

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

  const handleCellClick = async (rowIndex: number, cellIndex: number) => {

    console.log('Célula clicada:', rowIndex, cellIndex);
    if (fase === 'posicionamento') {
      console.log('Fase de posicionamento');
      handleShipPlacement(rowIndex, cellIndex);
    } else if (fase === 'ataque') {
      console.log('Fase de ataque');
      const response = await handleAttack(rowIndex, cellIndex);
      const { sucesso, coordenada, tabuleiro, mensagem } = response;
      console.log('Resposta do ataque:', { sucesso, coordenada, tabuleiro, mensagem });
          console.log('Resposta do ataque:', response);

      setMatrix(tabuleiro);

      setMessage(sucesso ? `Navio atingido em {x: ${coordenada.x}, y: ${coordenada.y} }. Jogue novamente.` : `Água em {x: ${coordenada.x}, y: ${coordenada.y} }.`);
      
    }
  };

  
  const handleShipPlacement = async (rowIndex: number, cellIndex: number) => {
    if (selectedShip) {
      const position = { x: cellIndex, y: rowIndex };

      const  {todosNavisPosicionados } = await verificarPosicionamentoNavioJogador(playerId!);

      if (todosNavisPosicionados) {
        console.log('Todos os seus navios já foram posicionados.');
        setMessage('Todos os seus navios já foram posicionados.');
      }    

      posicionarNavio(playerId!, position, selectedShip.size, orientation)
        .then(async (response) => {
          setResponses((prevResponses) => [...prevResponses, { type: 'posicionarNavio', data: response }]);
          const { sucesso, coordenadas, tabuleiro, mensagem } = response;

          if (mensagem === 'Navio posicionado com sucesso!') {
            setMessage(`Navio ${selectedShip.name} posicionado com sucesso em {x: ${position.x}, y: ${position.y} }.`);
          }

          
            if (sucesso) {
            setMatrix((prevMatrix) => {
              const newMatrix = [...prevMatrix];
              coordenadas.forEach(({ x, y }: { x: number; y: number }) => {
              newMatrix[y][x] = tabuleiro[y][x];
              });
              return newMatrix;
            });
            }

            const faseResponse = await getFase();
            console.log('Fase:', faseResponse);
            if (faseResponse.fase === 'Ataque') {
              setFase('ataque');
              setTitle('Fase de ataque');
              setMessage('Todos os navios foram posicionados. A fase de ataque começou!');
            }
          })
          .catch((error) => {
          console.error('Erro ao posicionar navio:', error);
          setMessage('Erro ao posicionar navio.');
          setResponses((prevResponses) => [...prevResponses, { type: 'error', data: "Erro ao posicionar navio." }]);
        });
    } else {
      console.log('Nenhum navio selecionado.');
      setMessage('Você precisa selecionar um navio.');
    }
  };

  const updateMatrix = (matrix: string[][]) => {
    setMatrix(matrix);
  };

  const handleAttack = async (rowIndex: number, cellIndex: number) => {
    console.log('Atacando célula:', rowIndex, cellIndex);
    try {
      const response = await atacar(playerId!, { x: cellIndex, y: rowIndex });
      console.log('Resposta do ataque:', response);
      setResponses((prevResponses) => [...prevResponses, { type: 'atacar', data: response }]);
      setMessage(`Ataque realizado na célula {x: ${cellIndex}, y: ${rowIndex}}.`);
      return response;
    } catch (error) {
      console.error('Erro ao realizar ataque:', error);
      setMessage('Erro ao realizar ataque.');
      setResponses((prevResponses) => [...prevResponses, { type: 'error', data: "Erro ao realizar ataque." }]);
    }
  };

  const todosNaviosPosicionados = async (): Promise<boolean> => {
    console.log('Verificando posicionamento dos navios...', playerId);
    try {
      const navios = await verificarPosicionamentoNavioJogador(playerId!);
      const { todosNavisPosicionados } = navios;
      console.log('Navios:', todosNavisPosicionados);
      return navios.length === 5;
    } catch (error) {
      console.error('Erro ao verificar posicionamento dos navios:', error);
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("oi")
        const health = await checkServerHealth();
        console.log('Server health:', health);

        const tabuleiro = await getTabuleiro(playerId!);
        console.log('Tabuleiro:', tabuleiro);

        updateMatrix(tabuleiro);
      } catch (error) {
        console.error('Erro ao conectar com o backend:', error);
        setResponses(() => [{ type: 'error', data: "Erro ao conectar com o backend." }]);
      }
      
    };

    if (playerId !== null) {
      fetchData();
    }
  }, [playerId]);

  useEffect(() => {
    console.log('Matrix atualizada:', matrix);
    setMatrix(matrix)
  }, [matrix]);

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
          <Alert title={title} message={message} />

          <Console responses={responses} />
        </>
      )}
    </div>
  );
}

export default App;