import React from 'react';
import { MenuCategory } from '../types';
import { MenuItemCard } from './MenuItemCard';
import { Utensils } from 'lucide-react';

interface MenuSectionProps {
  category: MenuCategory;
  index: number;
  id: string;
  onAddToCart: (item: MenuCategory['items'][number], category: string, itemIndex: number) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ category, index, id, onAddToCart }) => {
  return (
    <section id={id} className="relative z-10 mb-14 scroll-mt-36 px-4">
      <div className="mb-5 flex items-center gap-2.5 sm:gap-3">
        <div className="rounded-xl bg-[#002855] p-2 shadow-lg shadow-blue-950/15 sm:p-2.5">
          <Utensils className="h-4 w-4 text-cyan-300 sm:h-5 sm:w-5" />
        </div>
        <h2 className="min-w-0 flex-grow border-b border-[#002855]/10 pb-2 font-oswald text-xl font-bold uppercase leading-tight tracking-wide text-[#002855] sm:text-2xl">
          {category.categoria}
        </h2>
        <span className="rounded-full bg-cyan-100 px-2.5 py-1 font-montserrat text-[9px] font-bold uppercase tracking-wider text-[#006a7a] sm:text-[10px]">
          {category.items.length} platos
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {category.items.map((item, idx) => (
          <MenuItemCard
            key={`${category.categoria}-${idx}`}
            item={item}
            categoryId={index}
            itemId={idx}
            onAdd={() => onAddToCart(item, category.categoria, idx)}
          />
        ))}
      </div>
    </section>
  );
};
