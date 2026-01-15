import { useMemo } from 'react';

const BubblesBackground = () => {
  const bubbles = useMemo(() => {
    // Warm golden/orange spheres like the reference image
    const colors = [
      'hsl(38 90% 55%)',       // golden
      'hsl(32 95% 60%)',       // orange
      'hsl(42 100% 65%)',      // light gold
      'hsl(28 90% 50%)',       // deep orange
      'hsl(45 100% 70%)',      // bright yellow
      'hsl(35 85% 58%)',       // amber
    ];
    
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 200 + 100, // Bigger bubbles: 100-300px
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.3 + 0.7,
      zIndex: Math.floor(Math.random() * 3),
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ background: 'linear-gradient(135deg, hsl(42 30% 75%) 0%, hsl(38 35% 70%) 50%, hsl(35 25% 65%) 100%)' }}>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            transform: 'translate(-50%, -50%)',
            background: `
              radial-gradient(circle at 30% 30%, 
                hsl(45 100% 90%) 0%, 
                ${bubble.color} 40%, 
                hsl(30 70% 35%) 100%)
            `,
            opacity: bubble.opacity,
            animation: `sphereFloat ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
            boxShadow: `
              inset -20px -20px 40px rgba(0,0,0,0.15),
              inset 20px 20px 40px rgba(255,255,255,0.5),
              0 30px 60px rgba(0,0,0,0.15)
            `,
            zIndex: bubble.zIndex,
          }}
        />
      ))}
      <style>{`
        @keyframes sphereFloat {
          0%, 100% { 
            transform: translate(-50%, -50%) translateY(0px) scale(1);
          }
          25% {
            transform: translate(-50%, -50%) translateY(-30px) scale(1.02);
          }
          50% { 
            transform: translate(-50%, -50%) translateY(-10px) scale(0.98);
          }
          75% {
            transform: translate(-50%, -50%) translateY(-40px) scale(1.01);
          }
        }
      `}</style>
    </div>
  );
};

export default BubblesBackground;
