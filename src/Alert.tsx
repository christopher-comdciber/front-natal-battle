import React from 'react';

interface AlertProps {
  title: string;
  message: string;
}

const Alert: React.FC<AlertProps> = ({ title, message }) => {
  return (
    <div
      className="bg-gray-800 text-white p-4 mt-4 rounded-lg font-mono"
      style={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', backdropFilter: 'blur(10px)' }}
    >
      <h2 className="text-lg font-bold">{title}</h2>
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {">"} {message}
      </pre>
    </div>
  );
};

export default Alert;
