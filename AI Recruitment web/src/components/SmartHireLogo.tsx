import { motion } from 'motion/react';
import { Sparkles, Zap, Brain, Bot } from 'lucide-react';

interface SmartHireLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  animated?: boolean;
}

export function SmartHireLogo({ size = 'medium', showText = true, animated = true }: SmartHireLogoProps) {
  const dimensions = {
    small: { icon: 24, text: 'text-lg', container: 'w-8 h-8' },
    medium: { icon: 32, text: 'text-2xl', container: 'w-12 h-12' },
    large: { icon: 48, text: 'text-4xl', container: 'w-16 h-16' },
  };

  const config = dimensions[size];

  return (
    <div className="flex items-center gap-3">
      {/* 3D Logo Icon */}
      <motion.div
        className="relative"
        animate={animated ? {
          rotateY: [0, 360],
        } : {}}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Outer glow ring */}
        <motion.div
          className={`absolute inset-0 ${config.container} rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 blur-xl`}
          animate={animated ? {
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        {/* Main logo container */}
        <div 
          className={`relative ${config.container} rounded-2xl bg-gradient-to-br from-[#0A1628] via-[#1a2744] to-[#0A1628] border-2 border-cyan-400/50 flex items-center justify-center overflow-hidden`}
          style={{
            boxShadow: `
              0 0 30px rgba(0, 229, 255, 0.5),
              0 0 60px rgba(181, 55, 242, 0.3),
              inset 0 0 30px rgba(0, 229, 255, 0.1)
            `,
          }}
        >
          {/* Animated scan line */}
          <motion.div
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={animated ? {
              y: ['-100%', '200%'],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Circuit board pattern background */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="logo-circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="1" fill="#00E5FF" />
                <circle cx="16" cy="16" r="1" fill="#B537F2" />
                <line x1="4" y1="4" x2="16" y2="4" stroke="#00E5FF" strokeWidth="0.5" />
                <line x1="16" y1="4" x2="16" y2="16" stroke="#B537F2" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#logo-circuit)" />
          </svg>

          {/* Main icon - Brain + AI hybrid */}
          <div className="relative z-10">
            <motion.div
              animate={animated ? {
                scale: [1, 1.1, 1],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <div className="relative">
                {/* Brain icon */}
                <Brain 
                  className="text-transparent"
                  style={{
                    width: config.icon,
                    height: config.icon,
                    stroke: 'url(#brain-gradient)',
                    strokeWidth: 2,
                    filter: 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.8))',
                  }}
                />
                
                {/* Sparkle overlay */}
                <motion.div
                  className="absolute top-0 right-0"
                  animate={animated ? {
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                </motion.div>

                {/* Lightning bolt accent */}
                <motion.div
                  className="absolute -bottom-1 -right-1"
                  animate={animated ? {
                    opacity: [0.5, 1, 0.5],
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <Zap className="w-3 h-3 text-purple-400" />
                </motion.div>
              </div>

              {/* SVG Gradient Definition */}
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="50%" stopColor="#B537F2" />
                    <stop offset="100%" stopColor="#FF006E" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-0.5 left-0.5 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-0.5 right-0.5 w-2 h-2 border-t-2 border-r-2 border-purple-400" />
          <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b-2 border-l-2 border-purple-400" />
          <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
        </div>

        {/* Orbiting particles */}
        {animated && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-cyan-400"
                style={{
                  boxShadow: '0 0 10px rgba(0, 229, 255, 0.8)',
                }}
                animate={{
                  x: [0, Math.cos((i * 120 * Math.PI) / 180) * 30],
                  y: [0, Math.sin((i * 120 * Math.PI) / 180) * 30],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* Logo Text */}
      {showText && (
        <div>
          <motion.h1 
            className={`${config.text} font-bold leading-none`}
            style={{
              background: 'linear-gradient(135deg, #00E5FF 0%, #B537F2 50%, #FF006E 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(0, 229, 255, 0.3))',
            }}
            animate={animated ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : {}}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
          >
            SmartHire
            <motion.span
              className="inline-block ml-1"
              animate={animated ? {
                opacity: [1, 0.5, 1],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              AI
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-[10px] text-cyan-400/70 tracking-wider font-semibold uppercase"
            animate={animated ? {
              opacity: [0.5, 1, 0.5],
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            Intelligent Hiring
          </motion.p>
        </div>
      )}
    </div>
  );
}

// Compact version for tight spaces
export function SmartHireLogoCompact() {
  return (
    <motion.div
      className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 p-[2px]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-full h-full bg-[#0A1628] rounded-xl flex items-center justify-center">
        <Brain className="w-5 h-5 text-cyan-400" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.8))' }} />
      </div>
    </motion.div>
  );
}

// Animated icon only version
export function SmartHireIcon({ size = 32 }: { size?: number }) {
  return (
    <motion.div
      className="relative"
      animate={{
        rotateY: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{ 
        transformStyle: 'preserve-3d',
        width: size,
        height: size,
      }}
    >
      <div 
        className="relative w-full h-full rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 p-[2px]"
        style={{
          boxShadow: '0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(181, 55, 242, 0.3)',
        }}
      >
        <div className="w-full h-full bg-[#0A1628] rounded-xl flex items-center justify-center overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Brain 
              className="text-transparent"
              style={{
                width: size * 0.6,
                height: size * 0.6,
                stroke: 'url(#icon-gradient)',
                strokeWidth: 2,
                filter: 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.8))',
              }}
            />
          </motion.div>

          {/* Particle effects */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos((i * 45 * Math.PI) / 180) * (size * 0.4)],
                y: [0, Math.sin((i * 45 * Math.PI) / 180) * (size * 0.4)],
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25,
              }}
            />
          ))}
        </div>
      </div>

      <svg width="0" height="0">
        <defs>
          <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="50%" stopColor="#B537F2" />
            <stop offset="100%" stopColor="#FF006E" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
