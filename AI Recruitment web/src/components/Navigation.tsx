import { motion } from 'motion/react';
import { Home, BarChart3, FileText, Search, CheckSquare, User, MessageSquare, DollarSign, LogOut, Bell, Brain, Video, Sparkles, Info, LineChart, Users, Briefcase } from 'lucide-react';
import { SmartHireLogo } from './SmartHireLogo';
import { ThemeTogglePill } from './ThemeToggle';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  user: any;
}

export function Navigation({ currentPage, onNavigate, onLogout, user }: NavigationProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: 'NEW', color: 'emerald' },
    { id: 'candidate-database', label: 'Candidates', icon: Users, badge: 'PRO', color: 'blue' },
    { id: 'team-collaboration', label: 'Team', icon: MessageSquare, badge: '3', color: 'pink' },
    { id: 'career-studio', label: 'AI Career Studio', icon: Sparkles, badge: '8K', color: 'violet' },
    { id: 'enhanced-interview', label: 'Interview Analytics', icon: Video, badge: 'LIVE', color: 'cyan' },
    { id: 'application-manager', label: 'Application Tracker', icon: Briefcase, badge: 'SMART', color: 'purple' },
    { id: 'cv-analysis', label: 'CV Analysis', icon: FileText },
    { id: 'job-search', label: 'Job Search', icon: Search },
    { id: 'ml-jobs', label: 'AI Job Match', icon: Brain, badge: 'ML', color: 'purple' },
    { id: 'interview-prep', label: 'Interview Prep', icon: Video, badge: 'AI', color: 'cyan' },
    { id: 'applications', label: 'Applications', icon: Briefcase },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  const badgeColors = {
    violet: 'bg-violet-500/20 text-violet-400 border-violet-500/40',
    cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
    pink: 'bg-pink-500/20 text-pink-400 border-pink-500/40',
    emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
  };

  return (
    <motion.nav
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-64 backdrop-blur-2xl z-50 border-r"
      style={{
        background: 'var(--glass-bg)',
        borderColor: 'var(--glass-border)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: 'var(--glass-border)' }}>
          <SmartHireLogo size="small" showText={true} animated={true} />
        </div>

        {/* User Profile */}
        <div className="p-4 border-b" style={{ borderColor: 'var(--glass-border)' }}>
          <div 
            className="flex items-center gap-3 p-3 rounded-2xl backdrop-blur-xl transition-all hover:scale-[1.02]"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
              style={{
                background: 'linear-gradient(135deg, var(--cyan-glow) 0%, var(--violet-accent) 100%)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              }}
            >
              {user?.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                {user?.name}
              </p>
              <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>
                {user?.tier} Plan
              </p>
            </div>
            <Bell className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="px-4 py-3">
          <ThemeTogglePill />
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all relative group ${
                  isActive ? 'shadow-md' : ''
                }`}
                style={{
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)'
                    : 'transparent',
                  color: isActive ? 'var(--primary-blue)' : 'var(--text-secondary)',
                  border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 text-left font-medium">{item.label}</span>
                {item.badge && (
                  <span 
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                      badgeColors[item.color as keyof typeof badgeColors] || 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-2 w-2 h-2 rounded-full"
                    style={{ background: 'var(--primary-blue)' }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Logout */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--glass-border)' }}>
          <motion.button
            onClick={onLogout}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}