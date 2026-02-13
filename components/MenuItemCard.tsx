import React from 'react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  categoryId: number;
  itemId: number;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  return (
    <article className="group bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col justify-between transition-all hover:shadow-md hover:border-mangle-green/50 min-h-[160px]">
      <div>
        {item.imagen && (
          <div className="mb-4 rounded-lg overflow-hidden h-40 w-full relative">
            <img
              src={item.imagen}
              alt={item.nombre}
              className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'; // Hide if broken
              }}
            />
          </div>
        )}
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="font-oswald font-bold text-mangle-navy text-xl leading-snug">
            {item.nombre}
          </h3>
          <span className="font-oswald font-bold text-lg text-mangle-green whitespace-nowrap">
            S/ {item.precio?.toFixed(2)}
          </span>
        </div>

        {item.descripcion && (
          <p className="font-montserrat text-sm text-gray-600 leading-relaxed">
            {item.descripcion}
          </p>
        )}
      </div>

      {/* Decorative bottom line on hover */}
      <div className="h-1 w-0 bg-mangle-green mt-4 transition-all duration-300 group-hover:w-full opacity-50"></div>
    </article>
  );
};