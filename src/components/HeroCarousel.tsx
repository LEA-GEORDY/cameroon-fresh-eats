import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const juiceImages = [
  "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&h=600&fit=crop",
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % juiceImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Get indices for visible items (5 items in circular layout)
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      indices.push((currentIndex + i + juiceImages.length) % juiceImages.length);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
      {/* Circular background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-orange/30 blur-3xl animate-pulse" />
      </div>

      {/* Circular arrangement */}
      <div className="relative w-80 h-80 lg:w-96 lg:h-96">
        {visibleIndices.map((imageIndex, position) => {
          const angle = (position - 2) * 40; // -80, -40, 0, 40, 80 degrees
          const isCenter = position === 2;
          const scale = isCenter ? 1.3 : 0.7 - Math.abs(position - 2) * 0.1;
          const opacity = isCenter ? 1 : 0.6 - Math.abs(position - 2) * 0.15;
          const zIndex = isCenter ? 50 : 40 - Math.abs(position - 2) * 10;
          
          // Calculate position on arc
          const radius = 120;
          const x = Math.sin((angle * Math.PI) / 180) * radius;
          const y = Math.cos((angle * Math.PI) / 180) * 30 - (isCenter ? 0 : 20);

          return (
            <div
              key={`${imageIndex}-${position}`}
              className="absolute left-1/2 top-1/2 transition-all duration-700 ease-out"
              style={{
                transform: `translate(-50%, -50%) translateX(${x}px) translateY(${y}px) scale(${scale})`,
                opacity,
                zIndex,
              }}
            >
              <div 
                className={`relative overflow-hidden transition-all duration-500 ${
                  isCenter 
                    ? 'w-48 h-48 lg:w-64 lg:h-64 rounded-3xl shadow-2xl ring-4 ring-primary/30' 
                    : 'w-32 h-32 lg:w-40 lg:h-40 rounded-2xl shadow-lg'
                }`}
              >
                <img
                  src={juiceImages[imageIndex]}
                  alt={`Jus naturel ${imageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating bubbles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-primary/40 to-secondary/40"
          style={{
            width: 20 + Math.random() * 30,
            height: 20 + Math.random() * 30,
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {juiceImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-6 bg-primary' 
                : 'bg-primary/30 hover:bg-primary/50'
            }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;
