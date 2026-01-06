import { useMemo } from 'react';

const BubblesBackground = () => {
  const bubbles = useMemo(() => {
    const colors = [
      'hsl(142 70% 45%)',      // primary green
      'hsl(32 95% 55%)',       // secondary orange
      'hsl(25 100% 50%)',      // orange
      'hsl(85 70% 50%)',       // lime
      'hsl(340 75% 55%)',      // berry
      'hsl(45 100% 50%)',      // accent yellow
      'hsl(200 80% 50%)',      // blue
      'hsl(280 70% 60%)',      // purple
      'hsl(170 70% 45%)',      // teal
    ];
    
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 150 + 80,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 12 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.3 + 0.7, // Higher opacity: 0.7 - 1.0
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            bottom: '-200px',
            background: `radial-gradient(circle at 30% 30%, ${bubble.color}, ${bubble.color}90 50%, transparent 70%)`,
            opacity: bubble.opacity,
            animation: `bubbleRise ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
            boxShadow: `0 0 40px ${bubble.color}70, inset 0 0 30px ${bubble.color}50`,
            filter: 'blur(1px)',
          }}
        />
      ))}
      <style>{`
        @keyframes bubbleRise {
          0% { 
            opacity: 0; 
            transform: translateY(0) scale(0.5) rotate(0deg); 
          }
          10% { 
            opacity: 1; 
          }
          50% {
            transform: translateY(-50vh) scale(1.2) rotate(180deg);
          }
          100% { 
            opacity: 0; 
            transform: translateY(-120vh) scale(1) rotate(360deg); 
          }
        }
      `}</style>
    </div>
  );
};

export default BubblesBackground;
