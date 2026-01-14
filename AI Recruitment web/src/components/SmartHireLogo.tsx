import { motion } from 'motion/react';
import { Briefcase, Users, Building, Brain } from 'lucide-react';

interface SmartHireLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  animated?: boolean;
}

export function SmartHireLogo({ size = 'medium', showText = true, animated = false }: SmartHireLogoProps) {
  const dimensions = {
    small: { icon: 16, text: 'text-base', container: 'w-8 h-8', textSize: 'text-lg' },
    medium: { icon: 20, text: 'text-xl', container: 'w-10 h-10', textSize: 'text-2xl' },
    large: { icon: 24, text: 'text-3xl', container: 'w-12 h-12', textSize: 'text-4xl' },
  };

  const config = dimensions[size];

  return (
    <div className="flex items-center gap-3">
      {/* Professional Logo Icon - LinkedIn/Indeed Style */}
      <motion.div
        className="relative"
        whileHover={animated ? { scale: 1.05 } : {}}
        transition={{ duration: 0.2 }}
      >
        {/* Simple, clean logo container */}
        <div 
          className={`${config.container} rounded-lg bg-blue-600 flex items-center justify-center shadow-sm`}
          style={{
            background: 'linear-gradient(135deg, #0066cc 0%, #004499 100%)',
          }}
        >
          {/* Simple briefcase icon like LinkedIn */}
          <Briefcase 
            className="text-white"
            style={{
              width: config.icon,
              height: config.icon,
              strokeWidth: 2.5,
            }}
          />
        </div>
      </motion.div>

      {/* Professional Logo Text */}
      {showText && (
        <div>
          <motion.h1 
            className={`${config.textSize} font-bold leading-none text-slate-800 dark:text-white`}
            whileHover={animated ? { scale: 1.02 } : {}}
            transition={{ duration: 0.2 }}
          >
            Smart
            <span className="text-blue-600 dark:text-blue-400">
              Hire
            </span>
          </motion.h1>
          <motion.p 
            className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider -mt-1"
          >
            Professional Network
          </motion.p>
        </div>
      )}
    </div>
  );
}

// Compact version for tight spaces (like LinkedIn's small logo)
export function SmartHireLogoCompact() {
  return (
    <motion.div
      className="relative w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: 'linear-gradient(135deg, #0066cc 0%, #004499 100%)',
      }}
    >
      <Briefcase className="w-4 h-4 text-white" strokeWidth={2.5} />
    </motion.div>
  );
}

// Icon only version (like Indeed's simple approach)
export function SmartHireIcon({ size = 32 }: { size?: number }) {
  return (
    <motion.div
      className="relative rounded-lg bg-blue-600 flex items-center justify-center shadow-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ 
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #0066cc 0%, #004499 100%)',
      }}
    >
      <Briefcase 
        className="text-white" 
        style={{
          width: size * 0.5,
          height: size * 0.5,
          strokeWidth: 2.5,
        }}
      />
    </motion.div>
  );
}


