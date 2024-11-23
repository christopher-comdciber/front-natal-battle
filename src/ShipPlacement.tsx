import { useState } from 'react';

interface ShipPlacementProps {
  onShipSelected: (ship: { name: string; size: number }, orientation: 'horizontal' | 'vertical') => void;
}


const ShipPlacement: React.FC<ShipPlacementProps> = ({ onShipSelected }) => {
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [selectedShip, setSelectedShip] = useState<{ name: string; size: number }>({ name: 'Carrier', size: 5 });


  const ships = [
    { name: 'Porta-aviões', size: 5, image: '/src/assets/carrier.png' },
    { name: 'De batalha', size: 4, image: '/src/assets/battleship.png' },
    { name: 'Cruzador', size: 3, image: '/src/assets/cruiser.png' },
    { name: 'Submarino', size: 3, image: '/src/assets/submarine.png' },
    { name: 'Destruidor', size: 2, image: '/src/assets/destroyer.png' },
  ];

  const handleShipSelection = (ship: { name: string; size: number }) => {
    setSelectedShip(ship);
    onShipSelected(ship, orientation);
  };

  return (
    <div className="bg-gray-800 text-white p-4 mt-4 rounded-lg"
      style={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', backdropFilter: 'blur(10px)' }}>
      <h2 className="text-xl font-bold mb-2">Posicionamento de Navios</h2>
      <div className="mb-4 p-3 border border-[#4B5563] rounded-lg">
        <label className="block mb-2">Orientação:</label>
        <div className="flex justify-center space-x-4">
          <div
            className={`px-5 py-3 bg-gray-700 rounded-lg cursor-pointer ${
              orientation === 'horizontal' ? 'border-2 border-blue-500' : ''
            }`}
            onClick={() => {
              setOrientation('horizontal');
              onShipSelected(selectedShip, 'horizontal');
            }}
          >
            <div className="text-lg font-bold">Horizontal</div>
          </div>
          <div
            className={`px-5 py-3 bg-gray-700 rounded-lg cursor-pointer ${
              orientation === 'vertical' ? 'border-2 border-blue-500' : ''
            }`}
            onClick={() => {
              setOrientation('vertical');
              onShipSelected(selectedShip, 'vertical');
            }}
          >
            <div className="text-lg font-bold">Vertical</div>
          </div>
        </div>
      </div>
      <div className='p-3 border border-[#4B5563] rounded-lg'>
        <label className="block mb-2">Selecione o Navio:</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ships.map((ship) => (
            <div
              key={ship.name}
              className={`p-2 bg-gray-700 rounded-lg cursor-pointer ${
                selectedShip.name === ship.name ? 'border-2 border-blue-500' : ''
              } text-center flex flex-col sm:flex-row items-center`}
              onClick={() => handleShipSelection(ship)}
            >
              <img src={ship.image} alt={ship.name} className="w-full sm:w-1/3 h-10 sm:h-16 object-contain mb-2 sm:mb-0" />
              <div className="sm:ml-4">
                <div className="text-lg font-bold">{ship.name}</div>
                <div className="text-sm">Tamanho: {ship.size}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShipPlacement;