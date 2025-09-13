
import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const Slider: React.FC<SliderProps> = ({ label, id, value, error, className, ...props }) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id} className="block text-sm font-medium text-solar-gray">{label}</label>
        <span className="text-sm font-bold bg-solar-blue-dark px-2 py-1 rounded-md text-solar-light">{value}</span>
      </div>
      <input
        id={id}
        type="range"
        value={value}
        className="w-full h-2 bg-solar-blue-muted rounded-lg appearance-none cursor-pointer"
        style={{
             background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${((Number(value) - Number(props.min || 0)) / ((Number(props.max || 100)) - (Number(props.min || 0)))) * 100}%, #415A77 ${((Number(value) - Number(props.min || 0)) / ((Number(props.max || 100)) - (Number(props.min || 0)))) * 100}%, #415A77 100%)`
        }}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default Slider;
