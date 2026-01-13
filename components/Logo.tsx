
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-10" }) => {
  return (
    <div className={`flex items-center gap-2 group cursor-pointer ${className}`}>
      <div className="relative flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl shadow-lg transition-transform group-hover:rotate-12">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-6 h-6 text-white"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight text-slate-800">
          SİDE<span className="text-blue-600">SİGORTA</span>
        </span>
        <span className="text-[10px] font-medium text-slate-400 tracking-[0.2em] uppercase">Güvenin Yanında</span>
      </div>
    </div>
  );
};

export default Logo;
