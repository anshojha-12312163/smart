import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function CinematicHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.1)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Base Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1762279389053-d5a30239ae45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neSUyMGFic3RyYWN0fGVufDF8fHx8MTc2NzY2MDgzNnww&ixlib=rb-4.1.0&q=80&w=1080')`,
            filter: 'blur(1px) brightness(0.7)',
          }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-blue-900/80" />
        
        {/* Depth of Field Effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(10, 22, 40, 0.4) 70%)',
          }}
        />
      </motion.div>

      {/* Middle Layer - Sharp Subject */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Neural Network Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1703113690885-8caf0c77a7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlciUyMG5ldHdvcmslMjBkaWdpdGFsfGVufDF8fHx8MTc2NzY2MjE0OHww&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        />
      </motion.div>

      {/* Foreground - Sharp Focus */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* AI Brain Visual */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMG5ldXJhbCUyMG5ldHdvcmt8ZW58MXx8fHwxNzY3Njk1MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080')`,
            filter: 'contrast(1.2) saturate(1.3)',
          }}
        />
      </motion.div>

      {/* Particle Grid System */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => {
          const row = Math.floor(i / 10);
          const col = i % 10;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${col * 10}%`,
                top: `${row * 10}%`,
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.8)',
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: (i * 0.05) % 3,
              }}
            />
          );
        })}
      </div>

      {/* Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${i * 20}%`,
              top: '-100%',
              width: '2px',
              height: '200%',
              background: 'linear-gradient(180deg, transparent 0%, rgba(0, 229, 255, 0.4) 50%, transparent 100%)',
              filter: 'blur(2px)',
            }}
            animate={{
              y: ['0%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 200px rgba(0, 0, 0, 0.8)',
        }}
      />

      {/* Chromatic Aberration on Edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0, 229, 255, 0.1) 100%)',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(181, 55, 242, 0.1) 100%)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* Lens Flare Effects */}
      {[
        { x: 20, y: 30, size: 150, opacity: 0.2 },
        { x: 80, y: 70, size: 100, opacity: 0.15 },
        { x: 50, y: 50, size: 200, opacity: 0.1 },
      ].map((flare, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${flare.x}%`,
            top: `${flare.y}%`,
            width: `${flare.size}px`,
            height: `${flare.size}px`,
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(20px)',
            opacity: flare.opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [flare.opacity, flare.opacity * 1.5, flare.opacity],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Scan Lines for Cinematic Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)',
        }}
      />

      {/* Film Grain Texture */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
        animate={{
          x: [0, 10, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
      />
    </div>
  );
}
