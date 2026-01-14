import { motion, AnimatePresence } from 'motion/react';
import { Home, BarChart3, FileText, Video, DollarSign, Building, Users, User, LogOut, Bell, Search, UserPlus, MessageSquare, Target, Star, X, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { SmartHireLogo } from './SmartHireLogo';
import { ThemeTogglePill } from './ThemeToggle';
import { useState } from 'react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  user: any;
  userType: 'jobseeker' | 'recruiter';
}

export function Navigation({ currentPage, onNavigate, onLogout, user, userType }: NavigationProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'job_match',
      title: 'New Job Match Found!',
      message: 'Senior React Developer at TechCorp matches your profile',
      time: '2 minutes ago',
      read: false,
      icon: Target
    },
    {
      id: 2,
      type: 'application',
      title: 'Application Update',
      message: 'Your application for Frontend Developer has been reviewed',
      time: '1 hour ago',
      read: false,
      icon: FileText
    },
    {
      id: 3,
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Interview with Google scheduled for tomorrow at 2 PM',
      time: '3 hours ago',
      read: false,
      icon: Video
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message',
      message: 'Recruiter from Microsoft sent you a message',
      time: '5 hours ago',
      read: true,
      icon: MessageSquare
    },
    {
      id: 5,
      type: 'profile',
      title: 'Profile Views',
      message: 'Your profile was viewed by 12 recruiters this week',
      time: '1 day ago',
      read: true,
      icon: User
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  // Job Seeker Menu Items
  const jobSeekerMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'job-search', label: 'Job Search', icon: Search, badge: 'LIVE', color: 'emerald' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: 'NEW', color: 'emerald' },
    { id: 'interview-prep', label: 'Interview Prep', icon: Video, badge: 'AI', color: 'cyan' },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'career-planner', label: 'Career Planner', icon: Target, badge: 'NEW', color: 'purple' },
    { id: 'brand-builder', label: 'Brand Builder', icon: Star, badge: 'HOT', color: 'orange' },
    { id: 'salary-toolkit', label: 'Salary Toolkit', icon: DollarSign, badge: 'PRO', color: 'blue' },
    { id: 'company-intelligence', label: 'Company Intel', icon: Building, badge: 'BETA', color: 'purple' },
    { id: 'network-builder', label: 'Network Builder', icon: Users, badge: 'SMART', color: 'violet' },
    { id: 'cv-builder', label: 'CV Builder', icon: User, badge: 'ML', color: 'pink' },
  ];

  // Recruiter Menu Items
  const recruiterMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'post-job', label: 'Post Job', icon: UserPlus, badge: 'QUICK', color: 'emerald' },
    { id: 'candidates', label: 'Candidates', icon: Users, badge: 'LIVE', color: 'cyan' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: 'NEW', color: 'emerald' },
    { id: 'messaging', label: 'Messages', icon: MessageSquare },
    { id: 'company-intelligence', label: 'Company Intel', icon: Building, badge: 'BETA', color: 'purple' },
  ];

  const menuItems = userType === 'recruiter' ? recruiterMenuItems : jobSeekerMenuItems;

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

        {/* User Profile - Temporarily Hidden */}
        <div className="p-4 border-b" style={{ borderColor: 'var(--glass-border)', display: 'none' }}>
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
              {user?.avatar || '👤'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                {user?.name || 'Professional'}
              </p>
              <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>
                {userType === 'recruiter' ? 'Recruiter' : 'Job Seeker'} • {user?.tier || 'Free'} Plan
              </p>
            </div>
            
            {/* Notification Bell */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Bell className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-hidden rounded-2xl shadow-2xl z-50"
                    style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* Header */}
                    <div className="p-4 border-b" style={{ borderColor: 'var(--glass-border)' }}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>
                          Notifications
                        </h3>
                        <div className="flex items-center gap-2">
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-xs text-blue-500 hover:text-blue-400 transition-colors"
                            >
                              Mark all read
                            </button>
                          )}
                          <button
                            onClick={() => setShowNotifications(false)}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: 'var(--text-muted)' }} />
                          <p style={{ color: 'var(--text-muted)' }}>No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map((notification) => {
                          const Icon = notification.icon;
                          return (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={`p-4 border-b hover:bg-white/5 transition-colors cursor-pointer ${
                                !notification.read ? 'bg-blue-500/5' : ''
                              }`}
                              style={{ borderColor: 'var(--glass-border)' }}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  notification.type === 'job_match' ? 'bg-green-500/20 text-green-400' :
                                  notification.type === 'application' ? 'bg-blue-500/20 text-blue-400' :
                                  notification.type === 'interview' ? 'bg-purple-500/20 text-purple-400' :
                                  notification.type === 'message' ? 'bg-cyan-500/20 text-cyan-400' :
                                  'bg-gray-500/20 text-gray-400'
                                }`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                                      {notification.title}
                                    </p>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                                    {notification.message}
                                  </p>
                                  <p className="text-xs mt-2 opacity-60" style={{ color: 'var(--text-muted)' }}>
                                    {notification.time}
                                  </p>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className="p-1 hover:bg-red-500/20 hover:text-red-400 rounded transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            </motion.div>
                          );
                        })
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t" style={{ borderColor: 'var(--glass-border)' }}>
                      <button
                        onClick={() => {
                          setShowNotifications(false);
                          onNavigate('notifications');
                        }}
                        className="w-full text-center text-sm text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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