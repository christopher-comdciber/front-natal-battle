/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

const API_URL = 'http://localhost:3001';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const checkServerHealth = async (): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    if (response.data.status === 'Server is online') {
      console.log('Server is online');
      return response.data;
    }
  } catch (error) {
    console.error('Server is offline or unreachable');
    return {data: 'Server is offline or unreachable'};
  }
};

const posicionarNavio = async (
  playerId: number,
  inicio: { x: number; y: number },
  comprimento: number,
  direcao: 'horizontal' | 'vertical'
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
): Promise<any> => {
  const response = await axios.post(`${API_URL}/posicionarNavio`, {
    playerId,
    inicio,
    comprimento,
    direcao,
  });
  console.log(response.data);
  return response.data;
};

const atacar = async (
  playerId: number,
  coordinates: { x: number; y: number }
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
): Promise<any> => {
  const response = await axios.post(`${API_URL}/attack`, {
    playerId,
    coordinates,
  });
  return response.data;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const getTabuleiro = async (playerId: number): Promise<any> => {
  const response = await axios.get(`${API_URL}/getTabuleiro/${playerId}`);
  const {tabuleiro} = response.data;
  console.log(tabuleiro.grade);


  return tabuleiro.grade;
};

export { checkServerHealth, posicionarNavio, atacar, getTabuleiro };