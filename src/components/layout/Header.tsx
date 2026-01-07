import React from 'react';
import type { HeaderProps } from "../../types/header.props";

const Header: React.FC<HeaderProps> = ({ title, subtitle, date }) => {
  const today = new Date();
  const formattedDate = date || new Intl.DateTimeFormat('mg-MG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(today);

  return (
    <div className="mb-8 p-6 md:p-10 bg-slate-50 border-2 border-slate-200 rounded-[35px] relative overflow-hidden">
      <i className="fa-solid fa-seedling absolute -right-4 -top-4 text-9xl text-slate-100 -rotate-12"></i>
      
      <div className="relative z-10">
        <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight flex items-center gap-3">
          <i className="fa-solid fa-leaf text-tantsaha-green drop-shadow-[0_3px_0_#46a302]"></i>
          {title}
        </h1>
        <p className="text-slate-500 font-bold text-lg mt-1">
          {subtitle}
        </p>
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 rounded-2xl font-black text-slate-400 text-[10px] md:text-xs uppercase tracking-widest shadow-sm">
          <i className="fa-solid fa-calendar-day text-tantsaha-green mr-1"></i>
          {formattedDate}
        </div>
      </div>
    </div>
  );
};

export default Header;