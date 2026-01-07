import React from 'react';
import type { ActionCardProps } from '../../types/action.props';

const ActionCard: React.FC<ActionCardProps> = ({ 
  title, 
  icon, 
  colorClass, 
  borderClass, 
  badge, 
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`${colorClass} ${borderClass} btn-3d rounded-[22px] flex flex-col items-center justify-center h-32 md:h-48 relative cursor-pointer active:scale-95 transition-transform`}
    >
      <i className={`fa-solid ${icon} text-3xl md:text-5xl text-white/90 drop-shadow-md`}></i>
      <p className="text-white font-black text-xs md:text-lg mt-2 uppercase">{title}</p> 
      {badge && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white font-black w-7 h-7 rounded-full flex items-center justify-center border-b-4 border-red-700 text-xs">
          {badge}
        </div>
      )}
    </div>
  );
};

export default ActionCard;