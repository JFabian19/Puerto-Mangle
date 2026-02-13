
import React from 'react';
import { Share2 } from 'lucide-react';

export const ShareFAB: React.FC = () => {
    const handleShare = async () => {
        const shareData = {
            title: 'Puerto Mangle Cevicheria',
            text: '¡Abre nuestra carta digital Puerto Mangle y descubre lo exótico en un solo lugar! 🐟🍋',
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('¡Enlace copiado al portapapeles!');
            } catch (err) {
                console.error('Failed to copy specific link', err);
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 bg-mangle-green text-mangle-navy p-3 rounded-l-xl shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:pl-5 hover:bg-mangle-green/90 transition-all duration-300 flex flex-col items-center justify-center gap-1 group border-l-2 border-y-2 border-white/20"
            aria-label="Compartir carta digital"
            title="Compartir Carta Digital"
        >
            <Share2 className="w-6 h-6 drop-shadow-sm" />
            <span className="hidden md:block font-oswald font-bold text-[10px] uppercase tracking-wider text-mangle-navy/80">
                Compartir
            </span>
        </button>
    );
};
