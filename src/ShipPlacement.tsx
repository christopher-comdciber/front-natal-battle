import React, { useState } from 'react';

const ShipPlacement: React.FC = () => {
  const [orientation, setOrientation] = useState('horizontal');
  const [selectedShip, setSelectedShip] = useState('Carrier');

  const ships = [
    { name: 'Porta-aviões', size: 5, image: '/src/assets/carrier.png' },
    { name: 'De batalha', size: 4, image: '/src/assets/battleship.png' },
    { name: 'Cruzador', size: 3, image: '/src/assets/cruiser.png' },
    { name: 'Submarino', size: 3, image: '/src/assets/submarine.png' },
    { name: 'Destruidor', size: 2, image: '/src/assets/destroyer.png' },
  ];

  return (
    <div className="bg-gray-800 text-white p-4 mt-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Posicionamento de Navios</h2>
      <div className="mb-4 p-3 border border-[#4B5563] rounded-lg">
        <label className="block mb-2">Orientação:</label>
        <div className="flex justify-center space-x-4">
          <div
            className={`px-5 py-3 bg-gray-700 rounded-lg cursor-pointer ${
              orientation === 'horizontal' ? 'border-2 border-blue-500' : ''
            }`}
            onClick={() => setOrientation('horizontal')}
          >
            <div className="text-lg font-bold">Horizontal</div>
          </div>
          <div
            className={`px-5 py-3 bg-gray-700 rounded-lg cursor-pointer ${
              orientation === 'vertical' ? 'border-2 border-blue-500' : ''
            }`}
            onClick={() => setOrientation('vertical')}
          >
            <div className="text-lg font-bold">Vertical</div>
          </div>
        </div>
      </div>
      <div className='p-3 border border-[#4B5563] rounded-lg'>
        <label className="block mb-2">Selecione o Navio:</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ships.map((ship) => (
            <div
              key={ship.name}
              className={`p-4 bg-gray-700 rounded-lg cursor-pointer ${
          selectedShip === ship.name ? 'border-2 border-blue-500' : ''
              } text-center`}
              onClick={() => setSelectedShip(ship.name)}
            >
              <img src={ship.image} alt={ship.name} className="w-full h-16 object-contain mb-2" />
              <div className="text-lg font-bold">{ship.name}</div>
              <div className="text-sm">Tamanho: {ship.size}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShipPlacement;