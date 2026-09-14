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
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-[#002855] p-2.5 shadow-lg shadow-blue-950/15">
          <Utensils className="h-5 w-5 text-cyan-300" />
        </div>
        <h2 className="flex-grow border-b border-[#002855]/10 pb-2 font-oswald text-2xl font-bold uppercase tracking-wide text-[#002855]">
          {category.categoria}
        </h2>
      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
