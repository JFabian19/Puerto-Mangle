import React, { useState } from 'react';
import { RESTAURANT_DATA } from '../constants';
import { CreditCard, Smartphone, CheckCheck, Copy } from 'lucide-react';

export const Footer: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const phoneNumber = "938423014";

    const handleCopy = () => {
        navigator.clipboard.writeText(phoneNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <footer className="relative z-10 bg-mangle-navy text-white pt-12 pb-8 px-6 text-center mt-12 border-t-8 border-mangle-green">

            {/* Payment Methods Section */}
            <div className="mb-10 max-w-sm mx-auto">
                <h3 className="font-oswald text-lg font-medium mb-4 text-white/90 uppercase tracking-widest border-b border-white/10 pb-2 inline-block">Medios de Pago</h3>

                {/* Grid Layout */}
                <div className="grid grid-cols-2 gap-4 auto-rows-fr">
                    {/* Cards */}
                    <div className="bg-white/5 rounded-lg p-3 flex flex-col items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
                        <CreditCard className="w-6 h-6 mb-1 text-blue-400" />
                        <span className="font-oswald text-sm font-bold tracking-wider">VISA</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 flex flex-col items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
                        <CreditCard className="w-6 h-6 mb-1 text-red-400" />
                        <span className="font-oswald text-sm font-bold tracking-wider">MASTERCARD</span>
                    </div>
                    {/* Wallets */}
                    <div className="bg-purple-900/30 rounded-lg p-3 flex flex-col items-center justify-center border border-purple-500/30 hover:bg-purple-900/40 transition-colors">
                        <Smartphone className="w-6 h-6 mb-1 text-purple-400" />
                        <span className="font-oswald text-sm font-bold tracking-wider text-purple-200">YAPE</span>
                    </div>
                    <div className="bg-cyan-900/30 rounded-lg p-3 flex flex-col items-center justify-center border border-cyan-500/30 hover:bg-cyan-900/40 transition-colors">
                        <Smartphone className="w-6 h-6 mb-1 text-cyan-400" />
                        <span className="font-oswald text-sm font-bold tracking-wider text-cyan-200">PLIN</span>
                    </div>
                </div>

                {/* Copy Number Section */}
                <div className="mt-6">
                    <p className="font-montserrat text-xs text-white/60 mb-2">Pagar a este número:</p>
                    <button
                        onClick={handleCopy}
                        className="group flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white py-3 px-6 rounded-lg w-full transition-all border border-dashed border-white/30 hover:border-white/60"
                        title="Haz click para copiar"
                    >
                        <span className="font-oswald text-xl font-bold tracking-widest">{phoneNumber}</span>
                        {copied ? (
                            <CheckCheck className="w-5 h-5 text-green-400 animate-bounce" />
                        ) : (
                            <Copy className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                        )}
                    </button>
                    <p className={`text-xs mt-2 transition-opacity duration-300 ${copied ? 'opacity-100 text-green-400' : 'opacity-0'}`}>
                        ¡Número copiado!
                    </p>
                </div>
            </div>

            <div className="w-full h-px bg-white/10 mb-8 max-w-xs mx-auto"></div>

            <h2 className="font-oswald text-2xl font-bold mb-2">{RESTAURANT_DATA.restaurante}</h2>
            <p className="font-montserrat text-mangle-green text-sm mb-6">{RESTAURANT_DATA.eslogan}</p>

            <p className="font-montserrat text-xs text-white/30">
                © {new Date().getFullYear()} Puerto Mangle. Todos los derechos reservados.
            </p>
        </footer>
    );
};