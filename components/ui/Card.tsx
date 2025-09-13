
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-solar-blue-light rounded-lg shadow-xl p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-solar-light border-b-2 border-solar-blue-muted pb-3 mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Card;
