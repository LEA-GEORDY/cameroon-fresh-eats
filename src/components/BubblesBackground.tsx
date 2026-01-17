import { useMemo } from 'react';

interface BubblesBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
}

const BubblesBackground = ({ intensity = 'medium' }: BubblesBackgroundProps) => {
  const bubbleCount = intensity === 'low' ? 15 : intensity === 'high' ? 40 : 25;
  
  const bubbles = useMemo(() => {
    // Rich multicolor palette
    const colors = [
      'hsl(38 90% 55%)',       // golden
      'hsl(32 95% 60%)',       // orange
      'hsl(42 100% 65%)',      // light gold
      'hsl(28 90% 50%)',       // deep orange
      'hsl(45 100% 70%)',      // bright yellow
      'hsl(35 85% 58%)',       // amber
      'hsl(15 85% 55%)',       // coral
      'hsl(50 100% 60%)',      // lemon
      'hsl(25 100% 50%)',      // tangerine
      'hsl(140 60% 50%)',      // green (mint)
      'hsl(170 70% 45%)',      // teal
      'hsl(320 70% 60%)',      // pink
    ];
    
    return Array.from({ length: bubbleCount }, (_, i) => ({
      id: i,
      size: Math.random() * 250 + 80, // 80-330px
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 10 + 15, // 15-25s
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.4 + 0.5, // 0.5-0.9
      zIndex: Math.floor(Math.random() * 3),
      rotateSpeed: Math.random() * 20 + 10,
      floatRange: Math.random() * 50 + 30,
    }));
  }, [bubbleCount]);

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0" 
      style={{ 
        background: 'linear-gradient(135deg, hsl(42 35% 80%) 0%, hsl(38 40% 75%) 30%, hsl(35 30% 70%) 60%, hsl(32 35% 65%) 100%)' 
      }}
    >
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, hsla(38, 100%, 70%, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsla(32, 100%, 60%, 0.3) 0%, transparent 50%)',
          animation: 'gradientShift 20s ease-in-out infinite',
        }}
      />

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
              radial-gradient(circle at 25% 25%, 
                hsla(45, 100%, 95%, 0.9) 0%, 
                hsla(45, 100%, 85%, 0.6) 15%,
                ${bubble.color} 50%, 
                hsl(30 70% 30%) 100%)
            `,
            opacity: bubble.opacity,
            animation: `
              sphereFloat${bubble.id % 3} ${bubble.duration}s ease-in-out ${bubble.delay}s infinite,
              sphereRotate ${bubble.rotateSpeed}s linear infinite
            `,
            boxShadow: `
              inset -${bubble.size * 0.1}px -${bubble.size * 0.1}px ${bubble.size * 0.2}px rgba(0,0,0,0.2),
              inset ${bubble.size * 0.1}px ${bubble.size * 0.1}px ${bubble.size * 0.2}px rgba(255,255,255,0.6),
              0 ${bubble.size * 0.15}px ${bubble.size * 0.3}px rgba(0,0,0,0.2),
              0 0 ${bubble.size * 0.5}px ${bubble.color.replace(')', ', 0.2)')}
            `,
            zIndex: bubble.zIndex,
            filter: 'saturate(1.2)',
          }}
        >
          {/* Inner shine */}
          <div 
            className="absolute rounded-full"
            style={{
              width: '30%',
              height: '30%',
              top: '15%',
              left: '20%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
            }}
          />
          {/* Secondary shine */}
          <div 
            className="absolute rounded-full"
            style={{
              width: '15%',
              height: '15%',
              top: '50%',
              left: '60%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)',
            }}
          />
        </div>
      ))}

      {/* Additional floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,200,100,0.6))',
            animation: `particleFloat ${Math.random() * 5 + 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: 0.7,
          }}
        />
      ))}

      <style>{`
        @keyframes sphereFloat0 {
          0%, 100% { 
            transform: translate(-50%, -50%) translateY(0px) translateX(0px) scale(1);
          }
          25% {
            transform: translate(-50%, -50%) translateY(-40px) translateX(15px) scale(1.03);
          }
          50% { 
            transform: translate(-50%, -50%) translateY(-15px) translateX(-10px) scale(0.97);
          }
          75% {
            transform: translate(-50%, -50%) translateY(-55px) translateX(5px) scale(1.02);
          }
        }
        
        @keyframes sphereFloat1 {
          0%, 100% { 
            transform: translate(-50%, -50%) translateY(0px) translateX(0px) scale(1);
          }
          33% {
            transform: translate(-50%, -50%) translateY(-30px) translateX(-20px) scale(1.04);
          }
          66% { 
            transform: translate(-50%, -50%) translateY(-50px) translateX(10px) scale(0.96);
          }
        }
        
        @keyframes sphereFloat2 {
          0%, 100% { 
            transform: translate(-50%, -50%) translateY(0px) translateX(0px) scale(1);
          }
          20% {
            transform: translate(-50%, -50%) translateY(-25px) translateX(20px) scale(1.02);
          }
          40% { 
            transform: translate(-50%, -50%) translateY(-45px) translateX(-15px) scale(0.98);
          }
          60% {
            transform: translate(-50%, -50%) translateY(-20px) translateX(10px) scale(1.01);
          }
          80% {
            transform: translate(-50%, -50%) translateY(-35px) translateX(-5px) scale(0.99);
          }
        }
        
        @keyframes sphereRotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.3;
          }
        }
        
        @keyframes gradientShift {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.1) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
};

export default BubblesBackground;
