import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Product images for the slider
import berryBlast from "@/assets/products/berry-blast.jpg";
import greenDetox from "@/assets/products/green-detox.jpg";
import orangeMango from "@/assets/products/orange-mango.jpg";
import tropicalBlend from "@/assets/products/tropical-blend.jpg";

interface SlideImage {
  src: string;
  alt: string;
  title: string;
}

const images: SlideImage[] = [
  { src: berryBlast, alt: "Berry Blast", title: "Berry Blast" },
  { src: greenDetox, alt: "Green Detox", title: "Détox Vert" },
  { src: orangeMango, alt: "Orange Mango", title: "Orange Mangue" },
  { src: tropicalBlend, alt: "Tropical Blend", title: "Mélange Tropical" },
];

const HeroImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Calculate positions for circular arrangement
  const getImageStyle = (index: number) => {
    const totalImages = images.length;
    const angle = ((index - currentIndex) * (360 / totalImages)) * (Math.PI / 180);
    const radius = 120; // Radius of the circular arrangement
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const scale = (z + radius) / (2 * radius) * 0.5 + 0.5;
    const opacity = scale;
    const zIndex = Math.round(scale * 10);

    return {
      transform: `translateX(${x}px) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  return (
    <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center perspective-1000">
      {/* Main circular container */}
      <div className="relative w-80 h-80 lg:w-96 lg:h-96">
        {/* Decorative rings */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-spin" style={{ animationDuration: "20s" }} />
        <div className="absolute inset-4 rounded-full border-2 border-secondary/20 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
        <div className="absolute inset-8 rounded-full border border-orange/20 animate-pulse" />

        {/* Floating images */}
        <div className="absolute inset-0 flex items-center justify-center">
          {images.map((image, index) => {
            const style = getImageStyle(index);
            const isActive = index === currentIndex;

            return (
              <motion.div
                key={image.alt}
                className="absolute"
                initial={false}
                animate={{
                  x: style.transform.includes("translateX") 
                    ? parseFloat(style.transform.match(/translateX\(([-\d.]+)px\)/)?.[1] || "0")
                    : 0,
                  scale: parseFloat(style.transform.match(/scale\(([\d.]+)\)/)?.[1] || "1"),
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div 
                  className={`relative transition-all duration-500 ${
                    isActive ? "w-48 h-48 lg:w-64 lg:h-64" : "w-32 h-32 lg:w-40 lg:h-40"
                  }`}
                >
                  {/* Glow effect for active */}
                  {isActive && (
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-secondary/30 to-orange/30 rounded-full blur-xl animate-pulse" />
                  )}
                  
                  {/* Image container */}
                  <div className={`relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 ${
                    isActive ? "border-primary" : "border-card/50"
                  }`}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                  </div>

                  {/* Title for active image */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    >
                      <span className="px-4 py-1.5 bg-card/90 backdrop-blur-sm rounded-full text-sm font-medium text-foreground shadow-lg">
                        {image.title}
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Center decoration */}
        <div className="absolute inset-1/3 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary">{images.length}</div>
            <div className="text-xs text-muted-foreground">Saveurs</div>
          </div>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-8 h-2 bg-primary"
                : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary opacity-40"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default HeroImageSlider;
