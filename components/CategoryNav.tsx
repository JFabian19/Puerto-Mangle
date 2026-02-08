import React from 'react';
import { MenuCategory } from '../types';

interface CategoryNavProps {
  categories: MenuCategory[];
  activeCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <nav className="sticky top-0 z-20 bg-white/95 backdrop-blur shadow-md border-b border-gray-100">
      <div className="flex overflow-x-auto py-3 px-2 no-scrollbar snap-x">
        {categories.map((cat, index) => {
            const isActive = activeCategory === cat.categoria;
            return (
                <button
                    key={index}
                    onClick={() => onSelectCategory(cat.categoria)}
                    className={`
                        flex-shrink-0 px-4 py-2 mx-1 text-sm font-oswald font-bold uppercase tracking-wide rounded-full transition-all duration-300 snap-center
                        ${isActive 
                            ? 'bg-mangle-navy text-mangle-green shadow-lg ring-2 ring-mangle-green/50 scale-105' 
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}
                    `}
                >
                    {cat.categoria}
                </button>
            );
        })}
      </div>
    </nav>
  );
};