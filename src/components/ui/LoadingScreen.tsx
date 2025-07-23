import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing Quantum Drive...');

  const loadingSteps = [
    'Initializing Quantum Drive...',
    'Calibrating Warp Core...',
    'Scanning Nebula Frequencies...',
    'Establishing Galactic Connection...',
    'Loading Portfolio Galaxy...',
    'Welcome to Space!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15 + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        
        // Update loading text based on progress
        const stepIndex = Math.floor((newProgress / 100) * (loadingSteps.length - 1));
        setLoadingText(loadingSteps[stepIndex]);
        
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 bg-space-deep flex items-center justify-center"
    >
      {/* Background stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-star-white rounded-full animate-star-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-md mx-auto px-4">
        {/* Logo/Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-8 rounded-full bg-gradient-cosmic shadow-glow-energy"
        />

        {/* Loading text */}
        <motion.h2
          key={loadingText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-8 text-foreground"
        >
          {loadingText}
        </motion.h2>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-cosmic shadow-glow-energy"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Progress percentage */}
        <motion.p
          className="text-muted-foreground text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {Math.round(progress)}% Complete
        </motion.p>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              animate={{
                x: [0, Math.random() * 400 - 200],
                y: [0, Math.random() * 400 - 200],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;