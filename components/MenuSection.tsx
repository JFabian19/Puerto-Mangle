import React from 'react';
import { MenuCategory } from '../types';
import { MenuItemCard } from './MenuItemCard';
import { Utensils } from 'lucide-react';

interface MenuSectionProps {
  category: MenuCategory;
  index: number;
  id: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ category, index, id }) => {
  return (
    <section id={id} className="scroll-mt-36 mb-12 px-4 relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-mangle-green p-2 rounded-lg shadow-sm">
            <Utensils className="text-mangle-navy w-5 h-5" />
        </div>
        <h2 className="font-oswald font-bold text-2xl text-mangle-navy uppercase tracking-wide border-b-2 border-mangle-green/50 pb-1 flex-grow">
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
          />
        ))}
      </div>
    </section>
  );
};