
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-solar-blue-light mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-solar-gray">
        <p>&copy; {new Date().getFullYear()} SolarPredict AI. All rights reserved.</p>
        <div className="mt-2">
          <a href="#privacy" className="hover:text-solar-light transition-colors duration-300 mx-2">Privacy Policy</a>
          |
          <a href="#terms" className="hover:text-solar-light transition-colors duration-300 mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
