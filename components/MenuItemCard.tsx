import React from 'react';
import { MenuItem } from '../types';
import { Plus, ShoppingBag } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  categoryId: number;
  itemId: number;
  onAdd: () => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAdd }) => {
  return (
    <article className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-2.5 shadow-[0_10px_30px_rgba(0,40,85,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_20px_45px_rgba(0,107,145,0.16)] sm:p-5">
      <div>
        <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#e9f9fb] sm:mb-4 sm:aspect-[16/9]">
          <span className="absolute left-2 top-2 z-10 whitespace-nowrap rounded-full bg-[#002855]/95 px-2.5 py-1 font-oswald text-sm font-bold text-cyan-200 shadow-lg backdrop-blur sm:left-3 sm:top-3 sm:px-3 sm:text-base">
            S/ {item.precio?.toFixed(2)}
          </span>
          {item.imagen ? (
            <img
              src={item.imagen}
              alt={item.nombre}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
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
              <span className="px-2 text-center font-oswald text-[10px] uppercase tracking-wider text-gray-400 sm:text-sm">Acá va imagen</span>
            </div>
          )}
        </div>

        <div className="mb-1.5">
          <h3 className="font-oswald text-base font-bold leading-tight text-[#002855] sm:text-xl sm:leading-snug">
            {item.nombre}
          </h3>
        </div>

        {item.descripcion && (
          <p className="line-clamp-3 font-montserrat text-[10px] leading-relaxed text-slate-500 sm:text-sm">
            {item.descripcion}
          </p>
        )}
      </div>

      <button onClick={onAdd} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#002855]/10 bg-[#eefbfc] px-2 py-2.5 font-oswald text-xs font-bold uppercase tracking-wide text-[#002855] transition hover:bg-[#002855] hover:text-white active:scale-[0.98] sm:mt-5 sm:gap-2 sm:px-4 sm:py-3 sm:text-sm sm:tracking-wider" aria-label={`Agregar ${item.nombre} al carrito`}>
        <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" /><ShoppingBag className="hidden h-4 w-4 sm:block" />
        <span className="sm:hidden">Agregar</span><span className="hidden sm:inline">Agregar al pedido</span>
      </button>
    </article>
  );
};
