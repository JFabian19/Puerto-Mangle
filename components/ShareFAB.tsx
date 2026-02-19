import React from 'react';
import { Share2, MessageCircle } from 'lucide-react';

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

    const handleWhatsApp = () => {
        const phoneNumber = "51902897044";
        const message = encodeURIComponent("¡Hola! Quisiera hacer un pedido 🐟🍋");
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
            {/* Share Button */}
            <button
                onClick={handleShare}
                className="bg-mangle-green text-mangle-navy p-3 rounded-full shadow-lg hover:bg-mangle-green/90 transition-all duration-300 flex items-center justify-center group relative w-12 h-12 hover:w-auto hover:px-4 overflow-hidden"
                aria-label="Compartir carta digital"
                title="Compartir Carta Digital"
            >
                <Share2 className="w-6 h-6 shrink-0" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ml-0 group-hover:ml-2 whitespace-nowrap font-oswald font-bold text-sm uppercase">
                    Compartir
                </span>
            </button>

            {/* WhatsApp Button */}
            <button
                onClick={handleWhatsApp}
                className="w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center animate-bounce z-50 bg-transparent border-none p-0"
                aria-label="Contactar por WhatsApp"
                title="Contactar por WhatsApp"
            >
                <img
                    src="/whatsapp logo.png"
                    alt="WhatsApp"
                    className="w-full h-full object-contain drop-shadow-md"
                />
            </button>
        </div>
    );
};
