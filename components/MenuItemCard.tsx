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
        <div className="mb-4 rounded-lg overflow-hidden w-full aspect-[3/2] relative bg-gray-100">
          {item.imagen ? (
            <img
              src={item.imagen}
              alt={item.nombre}
              className="object-contain w-full h-full transform transition-transform duration-500 hover:scale-110"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                const span = document.createElement('span');
                span.className = 'text-gray-400 font-oswald text-sm';
                span.innerText = 'Acá va imagen';
                e.currentTarget.parentElement?.appendChild(span);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300">
              <span className="text-gray-400 font-oswald text-sm uppercase tracking-wider">Acá va imagen</span>
            </div>
          )}
        </div>

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