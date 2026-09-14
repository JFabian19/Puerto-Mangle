import React from 'react';
import { CartItem } from '../types';
import { Minus, Plus, ShoppingBag, Trash2, X, MessageCircle } from 'lucide-react';

interface CartDrawerProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (cartId: string, change: number) => void;
  onClear: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ items, isOpen, onClose, onUpdateQuantity, onClear }) => {
  const total = items.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  const sendOrder = () => {
    const order = items.map(item => `• ${item.quantity}x ${item.nombre} — S/ ${(item.precio * item.quantity).toFixed(2)}`).join('\n');
    const message = encodeURIComponent(`¡Hola, Puerto Mangle! 🐟🍋\n\nQuisiera realizar este pedido:\n${order}\n\n*Total: S/ ${total.toFixed(2)}*\n\n¿Me confirman disponibilidad y tiempo de entrega?`);
    window.open(`https://wa.me/51902897044?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div onClick={onClose} className={`fixed inset-0 z-[60] bg-[#001b3a]/70 backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />
      <aside className={`fixed right-0 top-0 z-[70] flex h-[100dvh] w-full max-w-md flex-col overscroll-contain border-l border-cyan-300/20 bg-[#031b36]/95 p-5 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'pointer-events-none translate-x-full'}`} aria-label="Carrito de compras" aria-hidden={!isOpen}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300">Tu selección</p>
            <h2 className="mt-1 font-oswald text-3xl font-bold uppercase tracking-wide">Mi pedido</h2>
          </div>
          <button onClick={onClose} className="rounded-full border border-white/15 bg-white/5 p-2 text-white transition hover:bg-white/15" aria-label="Cerrar carrito"><X className="h-5 w-5" /></button>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="mb-5 rounded-full border border-cyan-300/20 bg-cyan-300/10 p-5"><ShoppingBag className="h-9 w-9 text-cyan-300" /></div>
            <h3 className="font-oswald text-2xl uppercase">Tu carrito está vacío</h3>
            <p className="mt-2 max-w-xs font-montserrat text-sm leading-relaxed text-slate-300">Explora la carta y agrega los platos que se te antojen.</p>
          </div>
        ) : (
          <>
            <div className="-mr-2 flex-1 space-y-3 overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.cartId} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div><h3 className="font-oswald text-lg font-bold leading-tight">{item.nombre}</h3><p className="mt-1 font-montserrat text-xs text-cyan-200">S/ {item.precio.toFixed(2)} c/u</p></div>
                    <button onClick={() => onUpdateQuantity(item.cartId, -item.quantity)} className="text-slate-400 transition hover:text-red-300" aria-label={`Eliminar ${item.nombre}`}><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-white/10 bg-[#06162c] p-1">
                      <button onClick={() => onUpdateQuantity(item.cartId, -1)} className="rounded-full p-1.5 text-white hover:bg-white/10" aria-label="Reducir cantidad"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-8 text-center font-oswald text-lg font-bold">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.cartId, 1)} className="rounded-full bg-cyan-300 p-1.5 text-[#002855] hover:bg-cyan-200" aria-label="Aumentar cantidad"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <span className="font-oswald text-xl font-bold text-white">S/ {(item.precio * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-white/10 pt-5">
              <div className="mb-4 flex items-end justify-between"><span className="font-montserrat text-xs uppercase tracking-wider text-slate-300">Total estimado</span><strong className="font-oswald text-3xl text-cyan-300">S/ {total.toFixed(2)}</strong></div>
              <button onClick={sendOrder} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-4 font-oswald text-base font-bold uppercase tracking-wider text-white shadow-lg shadow-green-950/40 transition hover:-translate-y-0.5 hover:bg-[#1fc45b]"><MessageCircle className="h-5 w-5" />Enviar pedido por WhatsApp</button>
              <button onClick={onClear} className="mx-auto mt-3 block font-montserrat text-xs text-slate-400 underline-offset-4 hover:text-white hover:underline">Vaciar carrito</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};
