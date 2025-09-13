
import React from 'react';

interface HeaderProps {
    onLogoClick: () => void;
}

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);


const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="bg-solar-blue-light/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={onLogoClick}
          >
            <SunIcon className="w-8 h-8 text-solar-yellow" />
            <span className="text-2xl font-bold text-solar-light tracking-wider">
              SolarPredict AI
            </span>
          </div>
          <nav className="flex space-x-6 items-center">
             <a href="#about" className="text-solar-gray hover:text-solar-light transition-colors duration-300">About</a>
             <a href="#contact" className="text-solar-gray hover:text-solar-light transition-colors duration-300">Contact Us</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
