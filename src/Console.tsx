import React from 'react';

interface ConsoleProps {
  responses: Array<{
    type: string;
    data: any;
  }>;
}

const Console: React.FC<ConsoleProps> = ({ responses }) => {
  return (
    <div
      className="bg-gray-800 text-white p-4 mt-4 rounded-lg font-mono h-40 overflow-y-auto"
      style={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', backdropFilter: 'blur(10px)' }}
    >
      <h2 className="text-lg font-bold">Console</h2>
      {responses.map((response, index) => (
      <div key={index}>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {">"} {response.type}: {JSON.stringify(response.data, null, 2)}
        </pre>
      </div>
      ))}
    </div>
  );
};

export default Console;