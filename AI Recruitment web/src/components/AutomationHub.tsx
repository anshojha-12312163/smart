import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  CheckCircle,
  ArrowRight,
  Bell,
  MessageSquare,
  Send,
  Bot,
  Sparkles,
  FileText,
  Users,
  Target,
  Clock,
  TrendingUp,
  Award,
  Briefcase,
  Globe,
  Volume2,
  Mic,
  Accessibility,
  Languages,
  X,
  ChevronRight,
  Play,
  Pause,
  Settings,
  UserCheck,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';

interface AutomationHubProps {
  user: any;
}

export function AutomationHub({ user }: AutomationHubProps) {
  const [showChatbot, setShowChatbot] = useState(false);
  const [automationActive, setAutomationActive] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'shortlist', message: '5 candidates auto-shortlisted for Senior Developer role', time: '2 min ago', read: false },
    { id: 2, type: 'match', message: 'AI found 3 perfect matches for Frontend position', time: '15 min ago', read: false },
    { id: 3, type: 'interview', message: 'Interview scheduled automatically with Sarah Chen', time: '1 hour ago', read: true },
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);

  // Robotic arm animation states
  const [resumePosition, setResumePosition] = useState(0);
  const [currentRole, setCurrentRole] = useState(0);

  const jobRoles = [
    { title: 'Senior Developer', color: 'cyan', count: 12 },
    { title: 'Product Manager', color: 'purple', count: 8 },
    { title: 'UI/UX Designer', color: 'pink', count: 15 },
    { title: 'Data Scientist', color: 'green', count: 6 },
  ];

  const workflowSteps = [
    { id: 1, title: 'Resume Received', icon: FileText, status: 'complete' },
    { id: 2, title: 'AI Parsing', icon: Bot, status: 'complete' },
    { id: 3, title: 'Auto-Shortlist', icon: Target, status: 'active' },
    { id: 4, title: 'Schedule Interview', icon: Clock, status: 'pending' },
    { id: 5, title: 'One-Click Hire', icon: UserCheck, status: 'pending' },
  ];

  const chatMessages = [
    { sender: 'bot', message: 'Hello! I\'m your AI Recruiter Assistant. How can I help you today?', time: '10:30 AM' },
    { sender: 'user', message: 'Show me the best candidates for the Senior Developer role', time: '10:31 AM' },
    { sender: 'bot', message: 'I\'ve analyzed 247 applications and shortlisted the top 5 candidates based on skills, experience, and cultural fit. Would you like to see their profiles?', time: '10:31 AM' },
    { sender: 'user', message: 'Yes, please', time: '10:32 AM' },
    { sender: 'bot', message: 'Here are the top candidates: 1) Alex Johnson (94% match) 2) Sarah Chen (92% match) 3) Mike Davis (89% match). I can schedule interviews automatically if you\'d like.', time: '10:32 AM' },
  ];

  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic', 'Hindi'];

  const candidateSilhouettes = [
    { id: 1, color: 'from-cyan-400 to-blue-500', region: 'Asia' },
    { id: 2, color: 'from-purple-400 to-pink-500', region: 'Europe' },
    { id: 3, color: 'from-orange-400 to-red-500', region: 'Africa' },
    { id: 4, color: 'from-green-400 to-emerald-500', region: 'Americas' },
    { id: 5, color: 'from-yellow-400 to-orange-500', region: 'Middle East' },
    { id: 6, color: 'from-pink-400 to-purple-500', region: 'Oceania' },
  ];

  useEffect(() => {
    if (automationActive) {
      const interval = setInterval(() => {
        setResumePosition((prev) => (prev + 1) % 100);
        if (resumePosition % 25 === 0) {
          setCurrentRole((prev) => (prev + 1) % jobRoles.length);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [automationActive, resumePosition]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1419]" />
        
        {/* Circuit board pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="#00E5FF" />
              <circle cx="90" cy="90" r="2" fill="#B537F2" />
              <line x1="10" y1="10" x2="90" y2="10" stroke="#00E5FF" strokeWidth="1" />
              <line x1="90" y1="10" x2="90" y2="90" stroke="#B537F2" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>

        {/* Glowing orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: '300px',
              height: '300px',
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(0, 229, 255, 0.2) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(181, 55, 242, 0.2) 0%, transparent 70%)',
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #00E5FF 0%, #B537F2 50%, #FF006E 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AI Automation & Accessibility Hub
          </h1>
          <p className="text-cyan-400 text-lg">Intelligent recruitment automation for everyone, everywhere</p>
        </motion.div>

        <div className="max-w-[1800px] mx-auto grid grid-cols-12 gap-6">
          
          {/* Robotic Arm & Resume Sorting - Large Feature */}
          <motion.div
            className="col-span-12 lg:col-span-8 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-2xl font-bold text-white">AI-Powered Resume Sorting</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAutomationActive(!automationActive)}
                  className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
                    automationActive 
                      ? 'bg-green-500/20 text-green-400 border border-green-400/40'
                      : 'bg-red-500/20 text-red-400 border border-red-400/40'
                  }`}
                >
                  {automationActive ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  {automationActive ? 'Active' : 'Paused'}
                </motion.button>
              </div>

              <div className="relative h-96 bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                {/* Robotic Arm */}
                <div className="absolute top-0 left-20 w-64 h-full">
                  <svg className="w-full h-full" viewBox="0 0 200 400">
                    {/* Base */}
                    <rect x="80" y="350" width="40" height="50" fill="url(#metalGradient)" rx="5" />
                    
                    {/* Lower arm */}
                    <motion.g
                      animate={{
                        rotate: automationActive ? [0, -30, 0] : 0,
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ transformOrigin: '100px 350px' }}
                    >
                      <rect x="85" y="250" width="30" height="100" fill="url(#metalGradient)" rx="3" />
                      <circle cx="100" cy="250" r="15" fill="#00E5FF" opacity="0.5" />
                      
                      {/* Upper arm */}
                      <motion.g
                        animate={{
                          rotate: automationActive ? [0, 45, 0] : 0,
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ transformOrigin: '100px 250px' }}
                      >
                        <rect x="85" y="150" width="30" height="100" fill="url(#metalGradient)" rx="3" />
                        <circle cx="100" cy="150" r="12" fill="#B537F2" opacity="0.5" />
                        
                        {/* Gripper */}
                        <motion.g
                          animate={{
                            y: automationActive ? [0, 20, 0] : 0,
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <rect x="75" y="140" width="10" height="30" fill="#00E5FF" rx="2" />
                          <rect x="115" y="140" width="10" height="30" fill="#00E5FF" rx="2" />
                          
                          {/* Resume in gripper */}
                          {automationActive && (
                            <motion.rect
                              x="80"
                              y="150"
                              width="40"
                              height="30"
                              fill="white"
                              opacity="0.9"
                              rx="2"
                              animate={{
                                opacity: [0.9, 0.5, 0.9],
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          )}
                        </motion.g>
                      </motion.g>
                    </motion.g>

                    <defs>
                      <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="100%" stopColor="#764ba2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Job Role Buckets */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 flex flex-col justify-center gap-4 p-8">
                  {jobRoles.map((role, i) => (
                    <motion.div
                      key={i}
                      className={`relative p-4 rounded-xl border-2 ${
                        currentRole === i && automationActive
                          ? `border-${role.color}-400 bg-${role.color}-400/20`
                          : 'border-white/20 bg-white/5'
                      }`}
                      animate={{
                        scale: currentRole === i && automationActive ? [1, 1.05, 1] : 1,
                        boxShadow: currentRole === i && automationActive 
                          ? ['0 0 0px rgba(0, 229, 255, 0)', '0 0 30px rgba(0, 229, 255, 0.5)', '0 0 0px rgba(0, 229, 255, 0)']
                          : '0 0 0px rgba(0, 229, 255, 0)',
                      }}
                      transition={{ duration: 1, repeat: currentRole === i ? Infinity : 0 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-white">{role.title}</h3>
                          <p className="text-sm text-gray-400">{role.count} resumes</p>
                        </div>
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${role.color}-400 to-${role.color}-600 flex items-center justify-center`}>
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r from-${role.color}-400 to-${role.color}-600`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(role.count / 15) * 100}%` }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                        />
                      </div>

                      {/* Floating resume icons */}
                      <AnimatePresence>
                        {currentRole === i && automationActive && (
                          <motion.div
                            initial={{ x: -100, opacity: 0, scale: 0 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            exit={{ x: 50, opacity: 0, scale: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute -left-12 top-1/2 -translate-y-1/2"
                          >
                            <FileText className="w-8 h-8 text-cyan-400" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* AI processing particles */}
                {automationActive && (
                  <>
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                        style={{
                          left: '30%',
                          top: '50%',
                        }}
                        animate={{
                          x: [0, 200, 400],
                          y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                {[
                  { label: 'Processed Today', value: '247', icon: FileText },
                  { label: 'Auto-Sorted', value: '182', icon: Target },
                  { label: 'Time Saved', value: '18h', icon: Clock },
                  { label: 'Accuracy', value: '96%', icon: Award },
                ].map((stat, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <stat.icon className="w-5 h-5 text-cyan-400 mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Smart Notifications */}
          <motion.div
            className="col-span-12 lg:col-span-4 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard>
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Smart Notifications</h3>
                <div className="ml-auto w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {notifications.filter(n => !n.read).length}
                </div>
              </div>

              <div className="space-y-3">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className={`p-4 rounded-lg border cursor-pointer ${
                      notification.read
                        ? 'bg-white/5 border-white/10'
                        : 'bg-cyan-400/10 border-cyan-400/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg ${
                        notification.type === 'shortlist'
                          ? 'bg-purple-500/20 border border-purple-400/40'
                          : notification.type === 'match'
                          ? 'bg-cyan-500/20 border border-cyan-400/40'
                          : 'bg-green-500/20 border border-green-400/40'
                      } flex items-center justify-center`}>
                        {notification.type === 'shortlist' && <Target className="w-5 h-5 text-purple-400" />}
                        {notification.type === 'match' && <Users className="w-5 h-5 text-cyan-400" />}
                        {notification.type === 'interview' && <Clock className="w-5 h-5 text-green-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium mb-1">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold"
              >
                View All Notifications
              </motion.button>
            </GlassCard>
          </motion.div>

          {/* Workflow Automation */}
          <motion.div
            className="col-span-12 lg:col-span-7 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard>
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Automated Workflow Pipeline</h3>
              </div>

              <div className="relative">
                {/* Workflow steps */}
                <div className="flex items-center justify-between">
                  {workflowSteps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.id} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <motion.div
                            className={`w-16 h-16 rounded-xl flex items-center justify-center mb-2 ${
                              step.status === 'complete'
                                ? 'bg-green-500/20 border-2 border-green-400'
                                : step.status === 'active'
                                ? 'bg-cyan-500/20 border-2 border-cyan-400'
                                : 'bg-white/5 border-2 border-white/20'
                            }`}
                            animate={
                              step.status === 'active'
                                ? {
                                    scale: [1, 1.1, 1],
                                    boxShadow: [
                                      '0 0 0px rgba(0, 229, 255, 0)',
                                      '0 0 30px rgba(0, 229, 255, 0.8)',
                                      '0 0 0px rgba(0, 229, 255, 0)',
                                    ],
                                  }
                                : {}
                            }
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Icon
                              className={`w-8 h-8 ${
                                step.status === 'complete'
                                  ? 'text-green-400'
                                  : step.status === 'active'
                                  ? 'text-cyan-400'
                                  : 'text-gray-500'
                              }`}
                            />
                          </motion.div>
                          <p className="text-xs text-white text-center max-w-[80px]">{step.title}</p>
                          {step.status === 'complete' && (
                            <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                          )}
                        </div>
                        
                        {/* Arrow between steps */}
                        {i < workflowSteps.length - 1 && (
                          <div className="mx-2 mb-12">
                            <motion.div
                              animate={{
                                x: [0, 10, 0],
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight
                                className={`w-6 h-6 ${
                                  step.status === 'complete'
                                    ? 'text-green-400'
                                    : 'text-gray-600'
                                }`}
                              />
                            </motion.div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Progress line */}
                <div className="absolute top-8 left-8 right-8 h-1 bg-white/10 -z-10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400"
                    initial={{ width: '0%' }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </div>

              {/* One-Click Hire Button */}
              <div className="mt-8 p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Ready to Hire?</h4>
                    <p className="text-sm text-gray-400">Alex Johnson - Senior Developer (94% match)</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white font-bold text-lg shadow-2xl flex items-center gap-2"
                    style={{
                      boxShadow: '0 10px 40px rgba(34, 197, 94, 0.5), 0 0 80px rgba(34, 197, 94, 0.3)',
                    }}
                  >
                    <UserCheck className="w-6 h-6" />
                    One-Click Hire
                  </motion.button>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Accessibility Features */}
          <motion.div
            className="col-span-12 lg:col-span-5 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard>
              <div className="flex items-center gap-2 mb-6">
                <Accessibility className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Accessibility & Inclusivity</h3>
              </div>

              <div className="space-y-4">
                {/* Language Selector */}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    <h4 className="font-semibold text-white">Global Language</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {languages.slice(0, 8).map((lang) => (
                      <motion.button
                        key={lang}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                          selectedLanguage === lang
                            ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/40'
                            : 'bg-white/5 text-gray-400 border border-white/10'
                        }`}
                      >
                        {lang.slice(0, 3)}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Voice & Audio Features */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTtsEnabled(!ttsEnabled)}
                    className={`p-4 rounded-lg border ${
                      ttsEnabled
                        ? 'bg-purple-400/20 border-purple-400/40'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <Volume2 className={`w-6 h-6 mb-2 ${ttsEnabled ? 'text-purple-400' : 'text-gray-400'}`} />
                    <p className="text-sm font-semibold text-white">Text-to-Speech</p>
                    <p className="text-xs text-gray-400 mt-1">{ttsEnabled ? 'Enabled' : 'Disabled'}</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`p-4 rounded-lg border ${
                      voiceEnabled
                        ? 'bg-cyan-400/20 border-cyan-400/40'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <Mic className={`w-6 h-6 mb-2 ${voiceEnabled ? 'text-cyan-400' : 'text-gray-400'}`} />
                    <p className="text-sm font-semibold text-white">Voice Assistant</p>
                    <p className="text-xs text-gray-400 mt-1">{voiceEnabled ? 'Active' : 'Inactive'}</p>
                  </motion.button>
                </div>

                {/* Wheelchair Accessibility */}
                <div className="p-4 bg-green-400/10 rounded-lg border border-green-400/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center border border-green-400/40">
                      <Accessibility className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">WCAG 2.1 AA Compliant</h4>
                      <p className="text-xs text-gray-400">Fully accessible for all users</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                </div>

                {/* Multicultural Candidates */}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    Global Talent Pool
                  </h4>
                  <div className="flex items-center justify-between">
                    {candidateSilhouettes.map((candidate) => (
                      <motion.div
                        key={candidate.id}
                        className="flex flex-col items-center"
                        whileHover={{ scale: 1.2, y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: candidate.id * 0.1 }}
                      >
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${candidate.color} flex items-center justify-center mb-1`}>
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-[8px] text-gray-400">{candidate.region}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* AI Auto-Shortlist Engine */}
          <motion.div
            className="col-span-12 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Bot className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-white">AI Auto-Shortlist Engine</h3>
                </div>
                <div className="px-4 py-2 bg-green-400/20 text-green-400 rounded-full text-sm font-bold border border-green-400/40 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Processing 247 resumes
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4">
                {[
                  { label: 'Total Applications', value: '247', change: '+23', icon: FileText, color: 'blue' },
                  { label: 'AI Analyzed', value: '247', change: '100%', icon: Bot, color: 'cyan' },
                  { label: 'Auto-Shortlisted', value: '42', change: '+12', icon: Target, color: 'purple' },
                  { label: 'Perfect Matches', value: '8', change: '+3', icon: Award, color: 'green' },
                  { label: 'Processing Time', value: '2.3s', change: '-40%', icon: Zap, color: 'yellow' },
                ].map((metric, i) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <Icon className={`w-5 h-5 text-${metric.color}-400 mb-2`} />
                      <div className="text-2xl font-bold text-white">{metric.value}</div>
                      <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
                      <div className="text-xs text-green-400 font-semibold">{metric.change}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Live processing animation */}
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-cyan-400/30">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <p className="text-sm text-white">AI is currently analyzing resumes...</p>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Sarah Chen', status: 'Shortlisted', match: 92 },
                    { name: 'Mike Davis', status: 'Analyzing', match: 89 },
                    { name: 'Emma Wilson', status: 'Pending', match: 0 },
                  ].map((candidate, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-sm font-bold text-white">
                          {candidate.name.charAt(0)}
                        </div>
                        <span className="text-sm text-white">{candidate.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {candidate.match > 0 && (
                          <span className="text-sm text-cyan-400 font-semibold">{candidate.match}%</span>
                        )}
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          candidate.status === 'Shortlisted'
                            ? 'bg-green-400/20 text-green-400 border border-green-400/40'
                            : candidate.status === 'Analyzing'
                            ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/40'
                            : 'bg-gray-400/20 text-gray-400 border border-gray-400/40'
                        }`}>
                          {candidate.status}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Floating Chatbot Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowChatbot(!showChatbot)}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            boxShadow: '0 10px 40px rgba(181, 55, 242, 0.5), 0 0 80px rgba(255, 0, 110, 0.3)',
          }}
        >
          <MessageSquare className="w-8 h-8 text-white" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
            3
          </div>
        </motion.button>

        {/* AI Chatbot Window */}
        <AnimatePresence>
          {showChatbot && (
            <ChatbotWindow onClose={() => setShowChatbot(false)} messages={chatMessages} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Glass Card Component
function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full group">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
      <div 
        className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 group-hover:border-cyan-400/50 transition-all"
        style={{
          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.5),
            inset 0 0 60px rgba(255, 255, 255, 0.05),
            0 0 80px rgba(0, 229, 255, 0.2)
          `,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Chatbot Window Component
function ChatbotWindow({ onClose, messages }: { onClose: () => void; messages: any[] }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="fixed bottom-28 right-8 z-50 w-96 h-[600px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl border border-white/20 overflow-hidden"
      style={{
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(181, 55, 242, 0.3)',
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">AI Recruiter Assistant</h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-[440px] overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'bg-white/10 text-white border border-white/20'
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs opacity-70 mt-1">{msg.time}</p>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-start"
        >
          <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-white/5">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg"
          >
            <Send className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}