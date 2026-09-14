import React, { useEffect, useRef } from 'react';
import { MenuCategory } from '../types';
import { Baby, ChefHat, CookingPot, Fish, Flame, GlassWater, Layers3, Snowflake, Soup, Sparkles, UtensilsCrossed } from 'lucide-react';

interface CategoryNavProps {
  categories: MenuCategory[];
  activeCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ categories, activeCategory, onSelectCategory }) => {
  const itemsRef = useRef<Map<string, HTMLButtonElement | null>>(new Map());
  const navScrollRef = useRef<HTMLDivElement | null>(null);

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
    const container = navScrollRef.current;
    if (node && container) {
      const targetLeft = node.offsetLeft - (container.clientWidth - node.offsetWidth) / 2;
      container.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
  }, [activeCategory]);

  const getCategoryIcon = (category: string) => {
    const name = category.toLowerCase();
    if (name.includes('ceviche') || name.includes('tiradito')) return Fish;
    if (name.includes('frío')) return Snowflake;
    if (name.includes('causa')) return Layers3;
    if (name.includes('chicharr') || name.includes('caliente')) return Flame;
    if (name.includes('sopa') || name.includes('filete')) return Soup;
    if (name.includes('arroz') || name.includes('pasta')) return CookingPot;
    if (name.includes('criollo') || name.includes('recomend')) return ChefHat;
    if (name.includes('kids')) return Baby;
    if (name.includes('bebida')) return GlassWater;
    return UtensilsCrossed;
  };

  return (
    <nav className="sticky top-0 z-20 border-b border-cyan-300/20 bg-[#002855]/95 shadow-[0_10px_35px_rgba(0,40,85,0.2)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 pt-3">
        <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
        <span className="font-montserrat text-[9px] font-bold uppercase tracking-[0.24em] text-cyan-100/70">Explora por categoría</span>
      </div>
      <div ref={navScrollRef} className="no-scrollbar mx-auto flex max-w-6xl snap-x gap-2 overflow-x-auto overscroll-x-contain px-4 pb-3 pt-2">
        {categories.map((cat, index) => {
          const isActive = activeCategory === cat.categoria;
          const Icon = getCategoryIcon(cat.categoria);
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
                        group flex min-w-[138px] flex-shrink-0 snap-center items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all duration-300
                        ${isActive
                  ? 'border-cyan-300 bg-gradient-to-br from-cyan-300 to-emerald-300 text-[#002855] shadow-[0_5px_18px_rgba(103,232,249,0.3)]'
                  : 'border-white/10 bg-white/[0.07] text-white hover:border-cyan-300/50 hover:bg-white/15'}
                    `}
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isActive ? 'bg-[#002855] text-cyan-300' : 'bg-white/10 text-cyan-200 group-hover:bg-white/20'}`}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block font-oswald text-[11px] font-bold uppercase leading-tight tracking-wide">{cat.categoria}</span>
                <span className={`mt-0.5 block font-montserrat text-[8px] font-semibold uppercase tracking-wider ${isActive ? 'text-[#002855]/60' : 'text-cyan-100/50'}`}>{cat.items.length} opciones</span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
