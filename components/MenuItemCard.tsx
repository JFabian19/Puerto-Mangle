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
    <article className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_12px_35px_rgba(0,40,85,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_20px_45px_rgba(0,107,145,0.16)]">
      <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-[4rem] bg-cyan-100/70 transition-all group-hover:bg-cyan-200/70" />
      <div>
        <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#e9f9fb]">
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
              <span className="text-gray-400 font-oswald text-sm uppercase tracking-wider">Acá va imagen</span>
            </div>
          )}
        </div>

        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-oswald text-xl font-bold leading-snug text-[#002855]">
            {item.nombre}
          </h3>
          <span className="relative whitespace-nowrap rounded-full bg-[#002855] px-3 py-1 font-oswald text-base font-bold text-cyan-200 shadow-sm">
            S/ {item.precio?.toFixed(2)}
          </span>
        </div>

        {item.descripcion && (
          <p className="font-montserrat text-sm leading-relaxed text-slate-500">
            {item.descripcion}
          </p>
        )}
      </div>

      <button onClick={onAdd} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#002855]/10 bg-[#eefbfc] px-4 py-3 font-oswald text-sm font-bold uppercase tracking-wider text-[#002855] transition hover:bg-[#002855] hover:text-white active:scale-[0.98]" aria-label={`Agregar ${item.nombre} al carrito`}>
        <Plus className="h-4 w-4" /><ShoppingBag className="h-4 w-4" /> Agregar al pedido
      </button>
    </article>
  );
};
