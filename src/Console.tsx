import React from 'react';

interface ConsoleProps {
  responses: string[];
}

const Console: React.FC<ConsoleProps> = ({ responses }) => {
  return (
    <div className="bg-gray-800 text-white p-4 mt-4 rounded-lg font-mono h-40 overflow-y-auto">
      {responses.map((response, index) => (
        <div key={index} className="mb-1 text-xs">
          {response}
        </div>
      ))}
    </div>
  );
};

export default Console