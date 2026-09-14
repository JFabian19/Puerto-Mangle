import React, { useState, useEffect, useRef } from 'react';
import { RESTAURANT_DATA } from './constants';
import { BackgroundPattern } from './components/BackgroundPattern';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { MenuSection } from './components/MenuSection';
import { Footer } from './components/Footer';
import { ShareFAB } from './components/ShareFAB';
import { CartDrawer } from './components/CartDrawer';
import { CartItem, MenuItem } from './types';
import { ShoppingBag } from 'lucide-react';

const App: React.FC = () => {
  const [restaurantData, setRestaurantData] = useState<typeof RESTAURANT_DATA>(RESTAURANT_DATA);
  const [activeCategory, setActiveCategory] = useState<string>(RESTAURANT_DATA.menu[0].categoria);
  const isScrollingRef = useRef(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: MenuItem, category: string, itemIndex: number) => {
    const cartId = `${category}-${itemIndex}`;
    setCart(current => {
      const found = current.find(entry => entry.cartId === cartId);
      return found ? current.map(entry => entry.cartId === cartId ? { ...entry, quantity: entry.quantity + 1 } : entry) : [...current, { ...item, cartId, quantity: 1 }];
    });
    setIsCartOpen(true);
  };
  const updateQuantity = (cartId: string, change: number) => setCart(current => current.flatMap(item => item.cartId === cartId ? (item.quantity + change <= 0 ? [] : [{ ...item, quantity: item.quantity + change }]) : [item]));
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    if (!isCartOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsCartOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isCartOpen]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { fetchRestaurantData } = await import('./utils/googleSheets');
        const data = await fetchRestaurantData();
        if (data && data.menu.length > 0) {
          setRestaurantData(data);

          // Check if current active category exists in new data
          const currentExists = data.menu.some(cat => cat.categoria === activeCategory);
          if (!currentExists) {
            setActiveCategory(data.menu[0].categoria);
          }
        }
      } catch (error) {
        console.error("Failed to load restaurant data", error);
      }
    };
    loadData();
  }, []);

  // Function to handle category selection from nav
  const handleSelectCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
    const element = document.getElementById(categoryName);
    if (element) {
      isScrollingRef.current = true;
      // Offset for the sticky header + nav
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });

      // Re-enable scroll spy after animation (approximate)
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  // Scroll Spy Effect
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPosition = window.scrollY + 160; // Offset to trigger detection earlier

      // Find the current section
      let currentSection = restaurantData.menu[0].categoria;

      for (const cat of restaurantData.menu) {
        const element = document.getElementById(cat.categoria);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = cat.categoria;
          }
        }
      }

      if (currentSection !== activeCategory) {
        setActiveCategory(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory, restaurantData]);

  return (
    <div className="relative min-h-screen overflow-x-hidden pb-10">
      <BackgroundPattern />

      <Header />

      <CategoryNav
        categories={restaurantData.menu}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      <main className="mx-auto max-w-6xl pt-10">
        <div className="mb-10 px-4 text-center">
          <span className="rounded-full border border-cyan-300/40 bg-cyan-100/60 px-4 py-2 font-montserrat text-[10px] font-bold uppercase tracking-[0.25em] text-[#007a8c]">Carta digital · el sabor del mar</span>
          <h2 className="mt-5 font-oswald text-4xl font-bold uppercase leading-none text-[#002855] sm:text-5xl">Elige, agrega y <span className="text-[#009eb5]">disfruta</span></h2>
          <p className="mx-auto mt-3 max-w-lg font-montserrat text-sm leading-relaxed text-slate-500">Arma tu pedido con tus favoritos y envíalo directamente a nuestro WhatsApp.</p>
        </div>
        {restaurantData.menu.map((category, index) => (
          <MenuSection
            key={index}
            category={category}
            index={index}
            id={category.categoria}
            onAddToCart={addToCart}
          />
        ))}
      </main>

      <Footer />

      <ShareFAB />
      <button onClick={() => setIsCartOpen(true)} className="fixed bottom-6 left-5 z-50 flex items-center gap-3 rounded-full bg-[#002855] py-3 pl-4 pr-5 text-white shadow-[0_10px_30px_rgba(0,40,85,0.3)] transition hover:-translate-y-1 hover:bg-[#004477]" aria-label="Ver carrito">
        <span className="relative"><ShoppingBag className="h-5 w-5 text-cyan-300" />{cartCount > 0 && <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#25D366] px-1 font-montserrat text-[9px] font-bold text-white">{cartCount}</span>}</span>
        <span className="font-oswald text-sm font-bold uppercase tracking-wider">Ver carrito</span>
      </button>
      <CartDrawer items={cart} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onUpdateQuantity={updateQuantity} onClear={() => setCart([])} />
    </div>
  );
};

export default App;
