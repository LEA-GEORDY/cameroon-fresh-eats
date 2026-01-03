import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    
    const colors = [
      '#22c55e', // green
      '#f97316', // orange  
      '#eab308', // yellow
      '#3b82f6', // blue
      '#ec4899', // pink
    ];

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Left side
      confetti({
        particleCount: Math.floor(particleCount / 2),
        startVelocity: 30,
        spread: 60,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors,
        disableForReducedMotion: true,
      });

      // Right side
      confetti({
        particleCount: Math.floor(particleCount / 2),
        startVelocity: 30,
        spread: 60,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors,
        disableForReducedMotion: true,
      });
    }, 250);

    // Second wave after 5 seconds
    setTimeout(() => {
      const secondDuration = 5 * 1000;
      const secondAnimationEnd = Date.now() + secondDuration;

      const secondInterval = setInterval(() => {
        const timeLeft = secondAnimationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(secondInterval);
          return;
        }

        confetti({
          particleCount: 30,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 30,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });
      }, 300);
    }, 5000);
  };

  return { triggerConfetti };
};
