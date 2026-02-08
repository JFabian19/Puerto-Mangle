import React from 'react';
import { Anchor, ChefHat } from 'lucide-react';
import { RESTAURANT_DATA } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="relative z-10 bg-white/80 backdrop-blur-md shadow-sm border-b-2 border-mangle-green/30 pt-8 pb-6 px-4 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-mangle-navy rounded-full flex items-center justify-center mb-3 shadow-lg ring-4 ring-mangle-green/20">
            <Anchor className="text-white w-8 h-8" />
        </div>
        <h1 className="font-oswald font-bold text-3xl uppercase tracking-tight text-mangle-navy mb-1">
          {RESTAURANT_DATA.restaurante}
        </h1>
        <p className="font-montserrat text-mangle-green font-medium text-sm tracking-widest uppercase mb-4">
          {RESTAURANT_DATA.eslogan}
        </p>
        
        <div className="flex items-center space-x-2 bg-mangle-bg px-4 py-1.5 rounded-full border border-mangle-navy/10">
            <ChefHat className="w-4 h-4 text-mangle-navy opacity-70" />
            <span className="font-montserrat text-xs font-semibold text-mangle-navy/70">
                Chef: {RESTAURANT_DATA.cheff}
            </span>
        </div>
      </div>
    </header>
  );
};