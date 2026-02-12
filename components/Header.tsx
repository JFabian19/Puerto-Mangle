import React from 'react';
import { ChefHat, Phone, MapPin } from 'lucide-react';
import { RESTAURANT_DATA } from '../constants';

// Social Icons as components for cleaner JSX
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    stroke="none"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.07 12.75 11.815 11.815 0 0 0 .339 24.32a11.815 11.815 0 0 0 6.442.923l-4.146 1.085 1.088-4.135a11.815 11.815 0 0 0 .918-6.438A11.815 11.815 0 0 0 12.07.25Z"></path>
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="relative z-10 bg-white/80 backdrop-blur-md shadow-sm border-b-2 border-mangle-green/30 pt-8 pb-6 px-4 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">

        {/* Logo and Title Group */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 mb-2 transition-transform hover:scale-105 duration-300">
            <img
              src="/logo.png"
              alt="Puerto Mangle Logo"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
          <h1 className="font-oswald font-bold text-4xl uppercase tracking-tight mb-0 heading-shadow">
            <span className="text-mangle-navy">Puerto</span> <span className="text-mangle-green">Mangle</span>
          </h1>
          <h2 className="font-oswald text-xl text-gray-600 tracking-[0.3em] uppercase mb-1 font-semibold">
            Cevicheria
          </h2>
          <p className="font-montserrat text-gray-400 font-medium text-xs tracking-[0.2em] uppercase">
            {RESTAURANT_DATA.eslogan}
          </p>
        </div>

        {/* Chef Info */}
        <div className="flex items-center space-x-2 bg-mangle-bg px-4 py-1.5 rounded-full border border-mangle-navy/10">
          <ChefHat className="w-4 h-4 text-mangle-navy opacity-70" />
          <span className="font-montserrat text-xs font-semibold text-mangle-navy/70">
            Chef: {RESTAURANT_DATA.cheff}
          </span>
        </div>

        {/* New Contact Section */}
        <div className="flex flex-col items-center gap-3 w-full max-w-md mt-2">

          {/* Social Buttons Row */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://www.facebook.com/puertomanglecevicheria/?locale=es_LA"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:scale-110 transition-all shadow-md active:scale-95"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/puerto_mangle/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white rounded-full hover:opacity-90 hover:scale-110 transition-all shadow-md active:scale-95"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/51945211547"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-green-500 text-white rounded-full hover:bg-green-600 hover:scale-110 transition-all shadow-md active:scale-95"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
            <a
              href="tel:945211547"
              className="p-2.5 bg-mangle-navy text-white rounded-full hover:bg-mangle-navy/90 hover:scale-110 transition-all shadow-md active:scale-95"
              aria-label="Llamar"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          {/* Address Link */}
          <a
            href="https://www.google.com/maps/place/puerto+mangle/@-12.1473722,-76.9910346,13z/data=!4m6!3m5!1s0x9105b70c2bed409d:0x25d6d2dd8c06813c!8m2!3d-12.1473722!4d-76.9910346!16s%2Fg%2F1v62jqkg?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-xs font-montserrat text-mangle-navy/80 hover:text-mangle-navy transition-colors text-center max-w-[280px] leading-tight mt-1"
          >
            <MapPin className="w-4 h-4 flex-shrink-0 text-mangle-green group-hover:scale-110 transition-transform" />
            <span className="underline decoration-dotted underline-offset-2">Jr. El sol 149 San Roque Surco</span>
          </a>

        </div>

      </div>
    </header>
  );
};