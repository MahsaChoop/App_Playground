
import React from 'react';

interface PlanCardProps {
  title: string;
  description: string;
  onClick: () => void;
  isSelected: boolean;
}

export const PlanCard: React.FC<PlanCardProps> = ({ title, description, onClick, isSelected }) => {
  const baseClasses = "rounded-lg p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-lg";
  const selectedClasses = "bg-cyan-600 ring-4 ring-cyan-400";
  const unselectedClasses = "bg-gray-800 hover:bg-gray-700";

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
      <div className="text-right mt-4">
        <span className={`inline-block text-sm font-semibold ${isSelected ? 'text-white' : 'text-cyan-400'}`}>
          Get Info &rarr;
        </span>
      </div>
    </div>
  );
};
