import { motion } from 'motion/react';
import { TrendingUp, Users, CheckCircle, Clock, Briefcase, DollarSign, MapPin, Star, Zap, Brain, Target, Award, Sparkles } from 'lucide-react';
import { SmartHireIcon } from './SmartHireLogo';
import { useState } from 'react';

interface DashboardProps {
  user: any;
  onNavigate: (page: string) => void;
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredJob, setHoveredJob] = useState<number | null>(null);

  const stats = [
    { label: 'Profile Score', value: '87', icon: Target, color: 'from-cyan-400 to-blue-500', change: '+5%' },
    { label: 'Match Score', value: '92', icon: Award, color: 'from-purple-400 to-pink-500', change: '+12%' },
    { label: 'Applications', value: '24', icon: CheckCircle, color: 'from-green-400 to-emerald-500', change: '+8' },
    { label: 'Interviews', value: '6', icon: Clock, color: 'from-orange-400 to-red-500', change: '+3' },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      salary: '$120k - $160k',
      match: 95,
      logo: '💼'
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      salary: '$100k - $140k',
      match: 89,
      logo: '🚀'
    },
    {
      id: 3,
      title: 'Frontend Architect',
      company: 'Digital Solutions',
      location: 'San Francisco, CA',
      salary: '$140k - $180k',
      match: 87,
      logo: '🎯'
    },
  ];

  const recentActivity = [
    { type: 'application', text: 'Applied to Senior React Developer at TechCorp', time: '2 hours ago', icon: CheckCircle },
    { type: 'interview', text: 'Interview scheduled with StartupXYZ', time: '5 hours ago', icon: Clock },
    { type: 'profile', text: 'Profile viewed by Digital Solutions', time: '1 day ago', icon: Users },
    { type: 'match', text: 'New match: Frontend Architect position', time: '2 days ago', icon: Zap },
  ];

  return (
    <div className="min-h-screen p-8 relative overflow-hidden" style={{ perspective: '1500px' }}>
      {/* Cinematic Background with Depth */}
      <div className="fixed inset-0 -z-10">
        {/* Base Layer - Blurred Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1762279389053-d5a30239ae45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neSUyMGFic3RyYWN0fGVufDF8fHx8MTc2NzY2MDgzNnww&ixlib=rb-4.1.0&q=80&w=1080')`,
            filter: 'blur(40px) brightness(0.5)',
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/95 via-[#0D1B3A]/90 to-[#0A1628]/95" />
        
        {/* Animated Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px rgba(0, 229, 255, 0.6)',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Light Beams */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`beam-${i}`}
            className="absolute"
            style={{
              left: `${i * 33}%`,
              top: 0,
              width: '200px',
              height: '100%',
              background: 'linear-gradient(180deg, transparent 0%, rgba(34, 211, 238, 0.1) 50%, transparent 100%)',
              filter: 'blur(40px)',
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Floating Action Button for Automation Hub */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onNavigate('automation')}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          boxShadow: '0 10px 40px rgba(234, 179, 8, 0.5), 0 0 80px rgba(249, 115, 22, 0.3)',
        }}
      >
        <Zap className="w-8 h-8 text-white" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header with 3D depth */}
        <motion.div
          initial={{ opacity: 0, z: -100 }}
          animate={{ opacity: 1, z: 0 }}
          transition={{ duration: 0.8 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <h1 className="text-4xl font-bold text-white mb-2" style={{ 
            textShadow: '0 10px 30px rgba(0, 229, 255, 0.5), 0 0 60px rgba(181, 55, 242, 0.3)',
            transform: 'translateZ(50px)'
          }}>
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-400" style={{ transform: 'translateZ(30px)' }}>
            Here's your career overview today
          </p>
        </motion.div>

        {/* 3D Stats Grid with isometric view */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ transformStyle: 'preserve-3d' }}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isHovered = hoveredStat === index;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                whileHover={{ 
                  y: -20, 
                  rotateX: 10,
                  rotateY: 5,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredStat(index)}
                onHoverEnd={() => setHoveredStat(null)}
                className="relative group cursor-pointer"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: isHovered ? 'translateZ(50px)' : 'translateZ(0px)'
                }}
              >
                {/* 3D Card with depth layers */}
                <div className="relative">
                  {/* Back layer for depth */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-30`}
                    style={{ transform: 'translateZ(-20px)' }}
                  />
                  
                  {/* Middle layer */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-20`}
                    style={{ transform: 'translateZ(-10px)' }}
                  />
                  
                  {/* Front layer */}
                  <div 
                    className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all"
                    style={{ 
                      transform: 'translateZ(0px)',
                      boxShadow: isHovered 
                        ? '0 30px 60px rgba(0, 0, 0, 0.5), 0 0 100px rgba(0, 229, 255, 0.3)'
                        : '0 10px 30px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <motion.div 
                        className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                        style={{ 
                          transform: isHovered ? 'translateZ(20px) rotateY(10deg)' : 'translateZ(10px)',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
                        }}
                        animate={{
                          rotateY: isHovered ? [0, 360] : 0
                        }}
                        transition={{ duration: 1 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <span className="text-green-400 text-sm font-semibold" style={{ transform: 'translateZ(5px)' }}>
                        {stat.change}
                      </span>
                    </div>
                    <h3 
                      className="text-3xl font-bold text-white mb-1"
                      style={{ 
                        transform: 'translateZ(15px)',
                        textShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {stat.value}
                    </h3>
                    <p className="text-gray-400 text-sm" style={{ transform: 'translateZ(10px)' }}>
                      {stat.label}
                    </p>
                    
                    {/* 3D Progress bar with depth */}
                    <div 
                      className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden"
                      style={{ 
                        transform: 'translateZ(8px)',
                        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                        className={`h-full bg-gradient-to-r ${stat.color}`}
                        style={{
                          boxShadow: `0 0 20px ${stat.color.includes('cyan') ? 'rgba(0, 229, 255, 0.5)' : 'rgba(181, 55, 242, 0.5)'}`
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Floating particles around card */}
                {isHovered && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                        initial={{ 
                          x: '50%', 
                          y: '50%',
                          opacity: 0,
                          scale: 0
                        }}
                        animate={{
                          x: `${50 + Math.cos(i * Math.PI / 3) * 100}%`,
                          y: `${50 + Math.sin(i * Math.PI / 3) * 100}%`,
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.1
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Main Content with 3D perspective */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ transformStyle: 'preserve-3d' }}>
          {/* AI Recommendations with 3D cards */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -100, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div 
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              style={{
                transform: 'translateZ(20px)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 0 60px rgba(255, 255, 255, 0.05)'
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1" style={{ textShadow: '0 5px 20px rgba(0, 229, 255, 0.4)' }}>
                    AI-Powered Recommendations
                  </h2>
                  <p className="text-gray-400">Top matches based on your profile</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotateZ: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onNavigate('job-search')}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold"
                  style={{
                    boxShadow: '0 10px 30px rgba(0, 229, 255, 0.3), 0 0 60px rgba(181, 55, 242, 0.2)'
                  }}
                >
                  View All
                </motion.button>
              </div>

              <div className="space-y-4" style={{ transformStyle: 'preserve-3d' }}>
                {recommendedJobs.map((job, index) => {
                  const isHovered = hoveredJob === index;
                  return (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: -50, rotateY: -10 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ delay: index * 0.15, type: 'spring' }}
                      whileHover={{ 
                        x: 10, 
                        rotateY: 5,
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      }}
                      onHoverStart={() => setHoveredJob(index)}
                      onHoverEnd={() => setHoveredJob(null)}
                      className="relative p-5 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all cursor-pointer group"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
                        boxShadow: isHovered 
                          ? '0 20px 50px rgba(0, 229, 255, 0.2), 0 0 80px rgba(181, 55, 242, 0.15)'
                          : '0 5px 20px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {/* Effect overlay */}
                      <div 
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(181, 55, 242, 0.1) 100%)',
                          transform: 'translateZ(5px)'
                        }}
                      />
                      
                      <div className="flex items-start gap-4 relative" style={{ transformStyle: 'preserve-3d' }}>
                        <motion.div 
                          className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ 
                            transform: isHovered ? 'translateZ(40px) rotateY(-10deg)' : 'translateZ(20px)',
                            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 229, 255, 0.3)'
                          }}
                          animate={{
                            rotateY: isHovered ? [0, 10, -10, 0] : 0
                          }}
                          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                        >
                          {job.logo}
                        </motion.div>
                        <div className="flex-1 min-w-0" style={{ transform: 'translateZ(15px)' }}>
                          <h3 className="font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                            {job.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-2">{job.company}</p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span 
                              className="px-2 py-1 bg-white/5 rounded-lg text-gray-300"
                              style={{ 
                                transform: 'translateZ(5px)',
                                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                              }}
                            >
                              {job.location}
                            </span>
                            <span 
                              className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg"
                              style={{ 
                                transform: 'translateZ(5px)',
                                boxShadow: '0 0 20px rgba(0, 255, 160, 0.2)'
                              }}
                            >
                              {job.salary}
                            </span>
                          </div>
                        </div>
                        <div className="text-right" style={{ transform: 'translateZ(20px)' }}>
                          <motion.div 
                            className="text-2xl font-bold text-cyan-400 mb-1"
                            style={{ 
                              textShadow: '0 0 30px rgba(0, 229, 255, 0.8), 0 5px 20px rgba(0, 0, 0, 0.5)'
                            }}
                            animate={{
                              scale: isHovered ? [1, 1.1, 1] : 1
                            }}
                            transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
                          >
                            {job.match}%
                          </motion.div>
                          <p className="text-xs text-gray-400">Match</p>
                          <div 
                            className="mt-2 w-16 h-2 bg-white/10 rounded-full overflow-hidden"
                            style={{ 
                              boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.3)'
                            }}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${job.match}%` }}
                              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                              style={{
                                boxShadow: '0 0 15px rgba(0, 229, 255, 0.6)'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions with 3D tiles */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Briefcase, title: 'Optimize CV', subtitle: 'AI-powered analysis', page: 'cv-analysis', color: 'from-cyan-500/20 to-purple-500/20', border: 'cyan-400/30' },
                { icon: TrendingUp, title: 'Find Jobs', subtitle: 'Browse opportunities', page: 'job-search', color: 'from-purple-500/20 to-pink-500/20', border: 'purple-400/30' }
              ].map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    rotateX: 10,
                    rotateY: index === 0 ? -5 : 5
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(action.page)}
                  className={`p-6 bg-gradient-to-br ${action.color} rounded-xl border border-${action.border} text-left`}
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 229, 255, 0.1)'
                  }}
                >
                  <action.icon 
                    className={`w-8 h-8 ${index === 0 ? 'text-cyan-400' : 'text-purple-400'} mb-3`}
                    style={{ 
                      filter: 'drop-shadow(0 0 20px currentColor)',
                      transform: 'translateZ(20px)'
                    }}
                  />
                  <h3 
                    className="font-semibold text-white mb-1"
                    style={{ transform: 'translateZ(10px)', textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
                  >
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-400" style={{ transform: 'translateZ(5px)' }}>
                    {action.subtitle}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Activity Timeline with depth */}
          <motion.div 
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, x: 100, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(20px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 0 60px rgba(255, 255, 255, 0.05)'
            }}
          >
            <h2 className="text-xl font-bold text-white mb-6" style={{ textShadow: '0 5px 20px rgba(181, 55, 242, 0.4)' }}>
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ 
                      x: -5,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="flex gap-3 cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0"
                      style={{
                        transform: 'translateZ(15px)',
                        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 229, 255, 0.2)'
                      }}
                    >
                      <Icon className="w-4 h-4 text-cyan-400" style={{ filter: 'drop-shadow(0 0 10px currentColor)' }} />
                    </div>
                    <div className="flex-1 min-w-0" style={{ transform: 'translateZ(10px)' }}>
                      <p className="text-sm text-white" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
                        {activity.text}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}