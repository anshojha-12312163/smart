import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-14 h-8 rounded-full p-1 transition-colors duration-300"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1F2937 0%, #374151 100%)'
          : 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
        boxShadow: isDark
          ? '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.2)'
          : '0 4px 12px rgba(59, 130, 246, 0.3), inset 0 2px 4px rgba(99, 102, 241, 0.2)',
      }}
    >
      <motion.div
        className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
        animate={{
          x: isDark ? 0 : 24,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
        style={{
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-indigo-600" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
}

// Compact pill-style toggle
export function ThemeTogglePill() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const setTheme = (newTheme: 'light' | 'dark') => {
    if (theme !== newTheme) {
      toggleTheme();
    }
  };

  return (
    <div className="flex items-center gap-2 p-1 rounded-full glass-card bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm">
      <motion.button
        onClick={() => setTheme('dark')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all ${
          isDark
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        <Moon className="w-4 h-4" />
        Dark
      </motion.button>
      
      <motion.button
        onClick={() => setTheme('light')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all ${
          !isDark
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
            : 'text-gray-400 dark:text-gray-500 hover:text-gray-300 dark:hover:text-gray-400'
        }`}
      >
        <Sun className="w-4 h-4" />
        Light
      </motion.button>
    </div>
  );
}