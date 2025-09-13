
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', fullWidth = false, ...props }) => {
  const baseClasses = "font-bold py-2 px-4 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-solar-blue-dark";
  
  const variantClasses = {
    primary: "bg-solar-yellow text-solar-blue-dark hover:bg-yellow-300 focus:ring-solar-yellow disabled:bg-solar-gray disabled:cursor-not-allowed",
    secondary: "bg-solar-blue-muted text-solar-light hover:bg-solar-gray focus:ring-solar-gray disabled:bg-solar-blue-muted/50 disabled:cursor-not-allowed"
  };
  
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
