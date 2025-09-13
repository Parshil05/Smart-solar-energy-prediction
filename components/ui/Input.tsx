
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, id, error, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-solar-gray mb-1">{label}</label>
      <input
        id={id}
        className={`w-full bg-solar-blue-dark border ${error ? 'border-red-500' : 'border-solar-blue-muted'} rounded-md p-2 focus:ring-solar-yellow focus:border-solar-yellow transition`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default Input;
