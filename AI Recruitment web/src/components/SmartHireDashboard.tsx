import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRealTimeData } from '../hooks/useRealTimeData';
import { realTimeApiService } from '../services/realTimeApiService';
import {
  BarChart3,
  Calendar,
  Target,
  TrendingUp,
  Users,
  Award,
  Clock,
  DollarSign,
  FileText,
  Video,
  Network,
  Bell,
  ChevronRight,
  Star,
  Briefcase,
  MapPin,
  Eye,
  CheckCircle,
  AlertCircle,
  Upload,
  Search,
  Play,
  MessageSquare,
  X
} from 'lucide-react';

interface DashboardProps {
  user: any;
  userType?: 'jobseeker' | 'recruiter';
  onNavigate: (page: string) => void;
}

export function SmartHireDashboard({ user, userType = 'jobseeker', onNavigate }: DashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [realTimeStats, setRealTimeStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Real-time data integration
  const {
    isConnected,
    connectionStatus,
    data: realTimeData,
    unreadNotifications,
    unreadMessages,
    recentJobs,
    markNotificationRead,
    trackJobView
  } = useRealTimeData({
    autoConnect: true,
    enableNotifications: true
  });

  // Load real-time analytics data
  useEffect(() => {
    const loadRealTimeData = async () => {
      try {
        setLoading(true);
        const userId = user?.id || user?.googleId || 'demo-user';
        const analytics = await realTimeApiService.fetchAnalytics(userId);
        setRealTimeStats(analytics);
      } catch (error) {
        console.error('Failed to load real-time analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRealTimeData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadRealTimeData, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // Merge real-time notifications with static ones
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'interview', 
      title: 'Interview Reminder',
      message: 'Interview with Google in 2 hours', 
      time: '2 hours ago', 
      urgent: true,
      read: false,
      icon: Video
    },
    { 
      id: 2, 
      type: 'application', 
      title: 'Application Update',
      message: 'Application viewed by Microsoft', 
      time: '4 hours ago', 
      urgent: false,
      read: false,
      icon: FileText
    },
    { 
      id: 3, 
      type: 'recommendation', 
      title: 'New Job Matches',
      message: '3 new job matches found', 
      time: '6 hours ago', 
      urgent: false,
      read: false,
      icon: Target
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message',
      message: 'Recruiter from Apple sent you a message',
      time: '1 day ago',
      urgent: false,
      read: true,
      icon: MessageSquare
    },
    {
      id: 5,
      type: 'profile',
      title: 'Profile Views',
      message: 'Your profile was viewed by 8 recruiters today',
      time: '2 days ago',
      urgent: false,
      read: true,
      icon: Eye
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

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Use real-time stats or fallback to defaults
  const stats = realTimeStats ? [
    { 
      label: 'Total Applications', 
      value: realTimeStats.applicationsSent?.toString() || '0', 
      change: '+12%', 
      icon: FileText, 
      color: 'blue' 
    },
    { 
      label: 'Interviews Scheduled', 
      value: realTimeStats.interviewsScheduled?.toString() || '0', 
      change: '+3', 
      icon: Calendar, 
      color: 'green' 
    },
    { 
      label: 'Profile Views', 
      value: realTimeStats.profileViews?.toString() || '0', 
      change: '+15%', 
      icon: Eye, 
      color: 'purple' 
    },
    { 
      label: 'Response Rate', 
      value: `${Math.round((realTimeStats.responseRate || 0) * 100)}%`, 
      change: '+5%', 
      icon: Target, 
      color: 'orange' 
    },
  ] : [
    { label: 'Total Applications', value: '0', change: '+0%', icon: FileText, color: 'blue' },
    { label: 'Interviews Scheduled', value: '0', change: '+0', icon: Calendar, color: 'green' },
    { label: 'Profile Views', value: '0', change: '+0%', icon: Eye, color: 'purple' },
    { label: 'Response Rate', value: '0%', change: '+0%', icon: Target, color: 'orange' },
  ];

  const upcomingInterviews = [
    {
      company: 'Google',
      position: 'Senior Software Engineer',
      time: '2:00 PM Today',
      type: 'Technical Interview',
      avatar: '🔍',
      urgent: true
    },
    {
      company: 'Microsoft',
      position: 'Product Manager',
      time: '10:00 AM Tomorrow',
      type: 'Behavioral Interview',
      avatar: '🪟',
      urgent: false
    },
    {
      company: 'Apple',
      position: 'iOS Developer',
      time: 'Friday 3:00 PM',
      type: 'System Design',
      avatar: '🍎',
      urgent: false
    },
  ];

  const recentActivity = [
    { action: 'Applied to Netflix - Senior Engineer', time: '2 hours ago', status: 'pending' },
    { action: 'Interview completed with Spotify', time: '1 day ago', status: 'completed' },
    { action: 'Resume updated for Data Science roles', time: '2 days ago', status: 'completed' },
    { action: 'Practice interview session completed', time: '3 days ago', status: 'completed' },
  ];

  const jobRecommendations = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Stripe',
      location: 'San Francisco, CA',
      salary: '$180k - $220k',
      match: 95,
      logo: '💳'
    },
    {
      title: 'Lead Product Manager',
      company: 'Airbnb',
      location: 'Remote',
      salary: '$200k - $250k',
      match: 92,
      logo: '🏠'
    },
    {
      title: 'Senior Data Scientist',
      company: 'Uber',
      location: 'New York, NY',
      salary: '$170k - $210k',
      match: 88,
      logo: '🚗'
    },
  ];

  const achievements = [
    { name: 'Interview Streak', count: 5, icon: '🔥' },
    { name: 'Profile Views', count: 127, icon: '👁️' },
    { name: 'Network Growth', count: 23, icon: '🤝' },
    { name: 'Skill Badges', count: 8, icon: '🏆' },
  ];

  const quickActions = [
    { name: 'Upload Resume', icon: Upload, action: () => onNavigate('cv-builder'), color: 'blue' },
    { name: 'Search Jobs', icon: Search, action: () => onNavigate('job-search'), color: 'green' },
    { name: 'Practice Interview', icon: Video, action: () => onNavigate('interview-prep'), color: 'purple' },
    { name: 'Network', icon: Network, action: () => onNavigate('network-builder'), color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Welcome back, {user?.name || 'Professional'}! 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          {/* Notification Bell */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <Bell className="w-6 h-6 text-slate-600 dark:text-slate-400" />
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
                  className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-hidden rounded-2xl shadow-2xl z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  {/* Header */}
                  <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 dark:text-white">
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
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 text-slate-500" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-400" />
                        <p className="text-slate-500">No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map((notification) => {
                        const Icon = notification.icon;
                        return (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`p-4 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer group ${
                              !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                notification.type === 'interview' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' :
                                notification.type === 'application' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
                                notification.type === 'recommendation' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                                notification.type === 'message' ? 'bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400' :
                                'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-sm truncate text-slate-900 dark:text-white">
                                    {notification.title}
                                  </p>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                  )}
                                  {notification.urgent && (
                                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                  )}
                                </div>
                                <p className="text-xs mt-1 line-clamp-2 text-slate-600 dark:text-slate-400">
                                  {notification.message}
                                </p>
                                <p className="text-xs mt-2 opacity-60 text-slate-500">
                                  {notification.time}
                                </p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-500 rounded transition-colors opacity-0 group-hover:opacity-100"
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
                  <div className="p-3 border-t border-slate-200 dark:border-slate-700">
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
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
                    <p className={`text-sm font-medium mt-1 ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Interviews */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Upcoming Interviews
              </h2>
              <button 
                onClick={() => onNavigate('applications')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
              >
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {upcomingInterviews.map((interview, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border-2 ${
                    interview.urgent 
                      ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' 
                      : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{interview.avatar}</div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{interview.company}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{interview.position}</p>
                        <p className="text-slate-500 dark:text-slate-500 text-xs">{interview.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        interview.urgent ? 'text-red-600' : 'text-slate-600 dark:text-slate-400'
                      }`}>
                        {interview.time}
                      </p>
                      <button
                        onClick={() => onNavigate('interview-prep')}
                        className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Prepare
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.action}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors flex items-center gap-3"
                  >
                    <div className={`p-2 rounded-lg bg-${action.color}-100 dark:bg-${action.color}-900/20`}>
                      <Icon className={`w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`} />
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">{action.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Job Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-green-600" />
                Job Recommendations
              </h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {jobRecommendations.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-300 dark:hover:border-green-600 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{job.logo}</div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{job.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{job.company}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {job.salary}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-green-600">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold">{job.match}%</span>
                      </div>
                      <p className="text-xs text-slate-500">match</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              Recent Activity
            </h2>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-slate-900 dark:text-white text-sm font-medium">{activity.action}</p>
                    <p className="text-slate-500 text-xs">{activity.time}</p>
                  </div>
                  {activity.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            Achievements & Progress
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800"
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <p className="font-bold text-2xl text-slate-900 dark:text-white">{achievement.count}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{achievement.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}