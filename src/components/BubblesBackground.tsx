import { useEffect, useRef } from 'react';

const BubblesBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = [
      'hsla(142, 70%, 45%, 0.3)',  // green
      'hsla(32, 95%, 55%, 0.3)',   // orange
      'hsla(45, 100%, 50%, 0.3)',  // yellow
      'hsla(200, 80%, 50%, 0.3)',  // blue
      'hsla(340, 75%, 55%, 0.3)',  // pink
      'hsla(85, 70%, 50%, 0.3)',   // lime
    ];

    const createBubble = () => {
      const bubble = document.createElement('div');
      const size = Math.random() * 60 + 20;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      bubble.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        bottom: -${size}px;
        pointer-events: none;
        animation: bubbleRise ${Math.random() * 4 + 6}s ease-in forwards;
        opacity: 0;
      `;
      
      container.appendChild(bubble);
      
      bubble.addEventListener('animationend', () => {
        bubble.remove();
      });
    };

    const interval = setInterval(createBubble, 300);
    
    // Create initial bubbles
    for (let i = 0; i < 15; i++) {
      setTimeout(createBubble, i * 200);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        background: 'linear-gradient(135deg, hsl(142 70% 45% / 0.1) 0%, hsl(32 95% 55% / 0.1) 50%, hsl(45 100% 50% / 0.1) 100%)'
      }}
    />
  );
};

export default BubblesBackground;
