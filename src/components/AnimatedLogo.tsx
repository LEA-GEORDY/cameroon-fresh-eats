import { useEffect, useState } from 'react';
import logo from '@/assets/logo.png';

interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const AnimatedLogo = ({ className = '', size = 'md' }: AnimatedLogoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20',
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={logo} 
        alt="VitaDrinks" 
        className={`${sizeClasses[size]} w-auto transition-all duration-500 ${
          isHovered ? 'scale-125 drop-shadow-[0_0_25px_hsl(var(--primary)/0.7)]' : ''
        }`}
        style={{
          animation: 'logoFloat 3s ease-in-out infinite, logoPulse 1.5s ease-in-out infinite, logoRotate 8s linear infinite',
        }}
      />
      {isHovered && (
        <>
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-secondary/30 to-orange/30 rounded-full blur-2xl animate-pulse -z-10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full animate-ping opacity-30">
              <img src={logo} alt="" className={`${sizeClasses[size]} w-auto opacity-50`} />
            </div>
          </div>
          {/* Orbiting particles */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
              style={{
                animation: `orbit 2s linear infinite`,
                animationDelay: `${i * 0.6}s`,
                top: '50%',
                left: '50%',
              }}
            />
          ))}
        </>
      )}
      <style>{`
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 5px hsl(var(--primary) / 0.3)); }
          50% { filter: drop-shadow(0 0 20px hsl(var(--primary) / 0.6)); }
        }
        @keyframes logoRotate {
          0% { transform: rotateY(0deg); }
          25% { transform: rotateY(5deg); }
          50% { transform: rotateY(0deg); }
          75% { transform: rotateY(-5deg); }
          100% { transform: rotateY(0deg); }
        }
        @keyframes orbit {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(30px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(30px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;
