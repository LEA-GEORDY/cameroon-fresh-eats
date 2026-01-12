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
          isHovered ? 'scale-110 drop-shadow-[0_0_15px_hsl(var(--primary)/0.5)]' : ''
        }`}
        style={{
          animation: 'logoFloat 4s ease-in-out infinite, logoPulse 2s ease-in-out infinite',
        }}
      />
      {isHovered && (
        <>
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-secondary/20 to-orange/20 rounded-full blur-xl animate-pulse -z-10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full animate-ping opacity-20">
              <img src={logo} alt="" className={`${sizeClasses[size]} w-auto opacity-50`} />
            </div>
          </div>
        </>
      )}
      <style>{`
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 0 transparent); }
          50% { filter: drop-shadow(0 0 10px hsl(var(--primary) / 0.3)); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;