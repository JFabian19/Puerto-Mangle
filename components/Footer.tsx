import React from 'react';
import { RESTAURANT_DATA } from '../constants';

export const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 bg-mangle-navy text-white py-12 px-6 text-center mt-12">
            <h2 className="font-oswald text-2xl font-bold mb-2">{RESTAURANT_DATA.restaurante}</h2>
            <p className="font-montserrat text-mangle-green text-sm mb-6">{RESTAURANT_DATA.eslogan}</p>
            <div className="w-12 h-1 bg-mangle-green mx-auto mb-6 rounded-full"></div>
            <p className="font-montserrat text-xs text-white/50">
                © {new Date().getFullYear()} Puerto Mangle. Todos los derechos reservados.
            </p>
        </footer>
    );
}