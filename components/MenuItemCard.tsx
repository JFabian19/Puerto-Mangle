import React from 'react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  categoryId: number;
  itemId: number;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const imageUrl = "https://placehold.co/200x200?text=Imagen+acá";
  
  return (
    <article className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-row h-32 md:h-40 relative transition-transform hover:-translate-y-1 hover:shadow-md">
       {/* Image Section - simulates the "cutout" or focused food shot */}
       <div className="w-1/3 relative overflow-hidden bg-gray-100">
          <img 
            src={imageUrl} 
            alt={item.nombre}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mangle-navy/40 to-transparent mix-blend-multiply"></div>
       </div>

       {/* Content Section */}
       <div className="w-2/3 p-3 flex flex-col justify-between relative">
          
          <div>
            <h3 className="font-oswald font-bold text-mangle-navy text-lg leading-tight mb-1">
                {item.nombre}
            </h3>
            {item.descripcion && (
                <p className="font-montserrat text-xs text-gray-500 line-clamp-3 leading-relaxed">
                    {item.descripcion}
                </p>
            )}
          </div>

          <div className="flex items-center justify-end mt-2">
            <span className="font-oswald font-bold text-xl text-mangle-navy">
                S/ {item.precio.toFixed(2)}
            </span>
          </div>
       </div>
    </article>
  );
};