import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className={`
        relative w-14 h-7 rounded-full p-1 transition-all duration-300 ease-in-out
        ${isDark 
          ? 'bg-gradient-to-r from-slate-700 to-slate-600' 
          : 'bg-gradient-to-r from-blue-400 to-cyan-400'
        }
        hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 
        ${isDark ? 'focus:ring-slate-400' : 'focus:ring-blue-400'}
      `}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`
          w-5 h-5 rounded-full flex items-center justify-center
          ${isDark ? 'bg-slate-900' : 'bg-white'}
          shadow-md
        `}
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-slate-400" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
};