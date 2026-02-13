import React, { useState, useEffect, useRef } from 'react';
import { RESTAURANT_DATA } from './constants';
import { BackgroundPattern } from './components/BackgroundPattern';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { MenuSection } from './components/MenuSection';
import { Footer } from './components/Footer';
import { ShareFAB } from './components/ShareFAB';

const App: React.FC = () => {
  const [restaurantData, setRestaurantData] = useState<typeof RESTAURANT_DATA>(RESTAURANT_DATA);
  const [activeCategory, setActiveCategory] = useState<string>(RESTAURANT_DATA.menu[0].categoria);
  const isScrollingRef = useRef(false);

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
    <div className="relative min-h-screen pb-10">
      <BackgroundPattern />

      <Header />

      <CategoryNav
        categories={restaurantData.menu}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      <main className="max-w-5xl mx-auto pt-8">
        {restaurantData.menu.map((category, index) => (
          <MenuSection
            key={index}
            category={category}
            index={index}
            id={category.categoria}
          />
        ))}
      </main>

      <Footer />

      <ShareFAB />
    </div>
  );
};

export default App;