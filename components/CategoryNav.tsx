import React, { useEffect, useRef } from 'react';
import { MenuCategory } from '../types';

interface CategoryNavProps {
  categories: MenuCategory[];
  activeCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ categories, activeCategory, onSelectCategory }) => {
  const itemsRef = useRef<Map<string, HTMLButtonElement | null>>(new Map());

  // Function to capture refs
  const getMap = () => {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  };

  useEffect(() => {
    const map = getMap();
    const node = map.get(activeCategory);
    if (node) {
      node.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeCategory]);

  return (
    <nav className="sticky top-0 z-20 border-b border-cyan-950/10 bg-white/90 shadow-[0_8px_25px_rgba(0,40,85,0.08)] backdrop-blur-xl">
      <div className="no-scrollbar flex snap-x overflow-x-auto px-2 py-3">
        {categories.map((cat, index) => {
          const isActive = activeCategory === cat.categoria;
          return (
            <button
              key={index}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat.categoria, node);
                } else {
                  map.delete(cat.categoria);
                }
              }}
              onClick={() => onSelectCategory(cat.categoria)}
              className={`
                        flex-shrink-0 px-4 py-2 mx-1 text-sm font-oswald font-bold uppercase tracking-wide rounded-full transition-all duration-300 snap-center
                        ${isActive
                  ? 'scale-105 bg-[#002855] text-cyan-300 shadow-lg ring-2 ring-cyan-300/30'
                  : 'bg-slate-100 text-slate-500 hover:bg-cyan-50 hover:text-[#002855]'}
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
