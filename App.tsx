import React, { useState, useEffect, useRef } from 'react';
import { RESTAURANT_DATA } from './constants';
import { BackgroundPattern } from './components/BackgroundPattern';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { MenuSection } from './components/MenuSection';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(RESTAURANT_DATA.menu[0].categoria);
  const isScrollingRef = useRef(false);

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
      let currentSection = RESTAURANT_DATA.menu[0].categoria;
      
      for (const cat of RESTAURANT_DATA.menu) {
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
  }, [activeCategory]);

  return (
    <div className="relative min-h-screen pb-10">
      <BackgroundPattern />
      
      <Header />
      
      <CategoryNav 
        categories={RESTAURANT_DATA.menu} 
        activeCategory={activeCategory} 
        onSelectCategory={handleSelectCategory} 
      />

      <main className="max-w-5xl mx-auto pt-8">
        {RESTAURANT_DATA.menu.map((category, index) => (
          <MenuSection 
            key={index} 
            category={category} 
            index={index}
            id={category.categoria} 
          />
        ))}
      </main>

      <Footer />
      
    </div>
  );
};

export default App;