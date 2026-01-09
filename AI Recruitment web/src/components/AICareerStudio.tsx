import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  TrendingUp,
  MessageSquare,
  Target,
  Award,
  Code,
  Mic,
  Video,
  Eye,
  Activity,
  BarChart3,
  Brain,
  Zap,
  CheckCircle,
  Star,
  Globe,
  Volume2,
  Clock,
  Calendar,
  Briefcase,
  GraduationCap,
  Trophy,
  Shield,
  DollarSign,
  MapPin,
  Home,
  Linkedin,
  Github,
  Play,
  Pause,
  Settings,
  Users,
  BookOpen,
  LineChart,
  PieChart,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  AlertCircle,
  ChevronRight,
  Upload,
  Download,
  Send,
  X,
  Maximize2,
  Minimize2,
  RefreshCw,
  Languages,
  Accessibility,
  Flame,
  Edit3,
  FileCheck,
  UserCheck,
  Sparkles,
  Bot,
  Palette,
  Package,
  GitBranch,
  Layers,
  Monitor,
  Smartphone,
  Radio
} from 'lucide-react';

interface AICareerStudioProps {
  user: any;
}

export function AICareerStudio({ user }: AICareerStudioProps) {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [showMockInterview, setShowMockInterview] = useState(false);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);
  const [atsScore, setAtsScore] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentStreak, setCurrentStreak] = useState(12);
  const [practiceMode, setPracticeMode] = useState(true);

  // Interview metrics
  const [speakingPace, setSpeakingPace] = useState(145); // WPM
  const [fillerWords, setFillerWords] = useState(8);
  const [confidenceLevel, setConfidenceLevel] = useState(78);
  const [eyeContact, setEyeContact] = useState(85);
  const [sentiment, setSentiment] = useState(65); // positive %

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

  // Simulate ATS score animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAtsScore((prev) => (prev < 87 ? prev + 1 : 87));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const careerTools = [
    { id: 'resume', title: 'AI Resume Builder', icon: FileText, score: 87, color: 'cyan', description: 'Build ATS-optimized resumes' },
    { id: 'cover', title: 'Cover Letter Generator', icon: Edit3, score: 92, color: 'purple', description: 'AI-powered personalization' },
    { id: 'portfolio', title: 'Portfolio Analyzer', icon: Palette, score: 85, color: 'pink', description: 'Showcase your best work' },
    { id: 'linkedin', title: 'LinkedIn Optimizer', icon: Linkedin, score: 78, color: 'blue', description: 'Profile optimization tips' },
    { id: 'skills', title: 'Skills Gap Detector', icon: Target, score: 91, color: 'green', description: 'Identify learning opportunities' },
    { id: 'roadmap', title: 'Career Roadmap', icon: TrendingUp, score: 88, color: 'orange', description: 'Plan your career path' },
  ];

  const achievements = [
    { id: 1, title: 'Resume Master', description: 'Created 5 ATS-optimized resumes', icon: FileCheck, date: '2025-01-05', color: 'cyan' },
    { id: 2, title: 'Interview Pro', description: 'Completed 10 mock interviews', icon: Video, date: '2025-01-03', color: 'purple' },
    { id: 3, title: 'Skill Builder', description: 'Closed 5 skill gaps', icon: Target, date: '2024-12-28', color: 'green' },
    { id: 4, title: '30-Day Streak', description: 'Practiced every day', icon: Flame, date: '2024-12-20', color: 'orange' },
  ];

  const certificates = [
    { name: 'AWS Certified Developer', issuer: 'Amazon', date: '2024', verified: true },
    { name: 'Google Cloud Professional', issuer: 'Google', date: '2024', verified: true },
    { name: 'React Advanced Patterns', issuer: 'Udemy', date: '2023', verified: true },
  ];

  const skillBadges = [
    { skill: 'React', level: 95, color: 'cyan' },
    { skill: 'TypeScript', level: 88, color: 'blue' },
    { skill: 'Node.js', level: 85, color: 'green' },
    { skill: 'Python', level: 82, color: 'yellow' },
    { skill: 'AWS', level: 78, color: 'orange' },
    { skill: 'Docker', level: 75, color: 'purple' },
  ];

  const internshipPathways = [
    { stage: 'Internship', company: 'TechCorp', duration: '3 months', status: 'completed', color: 'green' },
    { stage: 'Junior Dev', company: 'TechCorp', duration: '1 year', status: 'current', color: 'cyan' },
    { stage: 'Mid-level', company: 'Target Role', duration: 'Next', status: 'upcoming', color: 'purple' },
    { stage: 'Senior Dev', company: 'Dream Job', duration: 'Goal', status: 'goal', color: 'pink' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ultra-Premium 8K Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base photorealistic layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1765366417030-16d9765d920a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY3NjY0MDM1fDA&ixlib=rb-4.1.0&q=80&w=1080')`,
            filter: 'blur(50px) brightness(0.3)',
          }}
        />

        {/* Neural mesh overlay */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full">
            <defs>
              <pattern id="neural-mesh" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#00E5FF" opacity="0.5" />
                <circle cx="80" cy="40" r="2" fill="#B537F2" opacity="0.5" />
                <circle cx="50" cy="80" r="2" fill="#FF006E" opacity="0.5" />
                <line x1="20" y1="20" x2="80" y2="40" stroke="#00E5FF" strokeWidth="0.5" opacity="0.3" />
                <line x1="80" y1="40" x2="50" y2="80" stroke="#B537F2" strokeWidth="0.5" opacity="0.3" />
                <line x1="50" y1="80" x2="20" y2="20" stroke="#FF006E" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-mesh)" />
          </svg>
        </div>

        {/* Aurora gradient waves */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-96 blur-3xl opacity-20"
              style={{
                background: i === 0 
                  ? 'linear-gradient(90deg, rgba(0, 229, 255, 0.3) 0%, transparent 100%)'
                  : i === 1
                  ? 'linear-gradient(90deg, rgba(181, 55, 242, 0.3) 0%, transparent 100%)'
                  : 'linear-gradient(90deg, rgba(255, 0, 110, 0.3) 0%, transparent 100%)',
                top: `${20 + i * 30}%`,
              }}
              animate={{
                x: ['100%', '-100%'],
              }}
              transition={{
                duration: 20 + i * 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Volumetric light rays */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute"
            style={{
              left: `${i * 12.5}%`,
              top: '-50%',
              width: '2px',
              height: '200%',
              background: 'linear-gradient(180deg, transparent 0%, rgba(0, 229, 255, 0.2) 50%, transparent 100%)',
              filter: 'blur(1px)',
              transformOrigin: 'top',
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Particle glitter */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#00E5FF' : i % 3 === 1 ? '#B537F2' : '#FF006E',
              boxShadow: '0 0 10px currentColor',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -100],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Glass floor reflection effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-cyan-400/5 to-transparent" />

        {/* Soft fog */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-[#0A1628]/50" />
      </div>

      {/* 3D Laptop and Smartphone */}
      <div className="fixed bottom-8 left-8 z-0 opacity-30">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotateY: [0, 10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Monitor className="w-32 h-32 text-cyan-400" style={{ filter: 'drop-shadow(0 0 40px rgba(0, 229, 255, 0.5))' }} />
        </motion.div>
      </div>

      <div className="fixed bottom-8 right-8 z-0 opacity-30">
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotateZ: [0, -5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Smartphone className="w-24 h-24 text-purple-400" style={{ filter: 'drop-shadow(0 0 40px rgba(181, 55, 242, 0.5))' }} />
        </motion.div>
      </div>

      {/* Floating Drones with Data Cubes */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`drone-${i}`}
          className="fixed z-0"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotateZ: [0, 10, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
          }}
        >
          <div className="relative">
            <Package className="w-12 h-12 text-purple-400 opacity-20" style={{ filter: 'drop-shadow(0 0 20px rgba(181, 55, 242, 0.5))' }} />
            <Radio className="absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-6 text-cyan-400 opacity-20" />
          </div>
        </motion.div>
      ))}

      {/* Rotating Earth Globe with Network */}
      <div className="fixed top-20 right-20 z-0 opacity-25">
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="relative w-40 h-40">
            <Globe className="w-full h-full text-cyan-400" style={{ filter: 'drop-shadow(0 0 40px rgba(0, 229, 255, 0.5))' }} />
            {/* Network connections */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full"
                style={{
                  left: `${50 + Math.cos((i * Math.PI) / 6) * 40}%`,
                  top: `${50 + Math.sin((i * Math.PI) / 6) * 40}%`,
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-6xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #00E5FF 0%, #B537F2 50%, #FF006E 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 60px rgba(0, 229, 255, 0.5))',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
          >
            AI Career Studio
          </motion.h1>
          <p className="text-xl text-cyan-400">Your intelligent career companion - Build, Practice, Succeed</p>
          
          {/* Accessibility Icons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <AccessibilityBadge icon={Volume2} label="Text-to-Speech" />
            <AccessibilityBadge icon={Languages} label="Multi-language" />
            <AccessibilityBadge icon={Accessibility} label="WCAG AA" />
            <AccessibilityBadge icon={Eye} label="Visual Assist" />
          </div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="max-w-[2000px] mx-auto grid grid-cols-12 gap-6">
          
          {/* Career Tools Dashboard - Left Column */}
          <motion.div
            className="col-span-12 lg:col-span-4 space-y-6"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* ATS Score Meter */}
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  Resume ATS Score
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowResumeBuilder(true)}
                  className="px-3 py-1.5 bg-cyan-400/20 text-cyan-400 rounded-lg text-sm font-semibold border border-cyan-400/40"
                >
                  Build Resume
                </motion.button>
              </div>

              {/* Circular ATS meter */}
              <div className="relative w-48 h-48 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="80" stroke="rgba(255,255,255,0.1)" strokeWidth="16" fill="none" />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="url(#atsGradient)"
                    strokeWidth="16"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 502" }}
                    animate={{ strokeDasharray: `${(atsScore / 100) * 502} 502` }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    style={{ filter: 'drop-shadow(0 0 20px rgba(0, 229, 255, 0.8))' }}
                  />
                  <defs>
                    <linearGradient id="atsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00E5FF" />
                      <stop offset="50%" stopColor="#B537F2" />
                      <stop offset="100%" stopColor="#00FF94" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <motion.div 
                    className="text-5xl font-bold text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: 'spring' }}
                  >
                    {atsScore}
                  </motion.div>
                  <div className="text-gray-400 text-sm">ATS Score</div>
                  <div className="text-green-400 text-xs mt-1">Excellent</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center p-2 bg-white/5 rounded-lg">
                  <div className="text-cyan-400 font-bold">95%</div>
                  <div className="text-gray-400">Keywords</div>
                </div>
                <div className="text-center p-2 bg-white/5 rounded-lg">
                  <div className="text-purple-400 font-bold">18</div>
                  <div className="text-gray-400">Sections</div>
                </div>
                <div className="text-center p-2 bg-white/5 rounded-lg">
                  <div className="text-green-400 font-bold">A+</div>
                  <div className="text-gray-400">Format</div>
                </div>
              </div>
            </GlassCard>

            {/* Career Tools Grid */}
            <GlassCard>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Career Tools
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {careerTools.map((tool, i) => {
                  const Icon = tool.icon;
                  return (
                    <motion.button
                      key={tool.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/40 transition-all text-left"
                    >
                      <Icon className={`w-6 h-6 text-${tool.color}-400 mb-2`} />
                      <div className="text-sm font-semibold text-white mb-1">{tool.title}</div>
                      <div className="text-xs text-gray-400">{tool.description}</div>
                      <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${tool.score}%` }}
                          transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                          className={`h-full bg-gradient-to-r from-${tool.color}-400 to-${tool.color}-600`}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </GlassCard>

            {/* Skills Gap Detection */}
            <GlassCard>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-400" />
                Skills Gap Analysis
              </h3>
              <div className="space-y-3">
                {[
                  { skill: 'Kubernetes', current: 65, required: 85, gap: 20 },
                  { skill: 'GraphQL', current: 60, required: 80, gap: 20 },
                  { skill: 'System Design', current: 70, required: 90, gap: 20 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-white">{item.skill}</span>
                      <span className="text-xs text-red-400">Gap: {item.gap}%</span>
                    </div>
                    <div className="relative h-2 bg-white/10 rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.current}%` }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                      />
                      <div className="absolute top-0 h-full border-r-2 border-orange-400" style={{ left: `${item.required}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Career Roadmap */}
            <GlassCard>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Career Growth Roadmap
              </h3>
              <div className="space-y-3">
                {internshipPathways.map((stage, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`relative p-3 rounded-lg border ${
                      stage.status === 'current'
                        ? 'bg-cyan-400/10 border-cyan-400/40'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white text-sm">{stage.stage}</div>
                        <div className="text-xs text-gray-400">{stage.company}</div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-bold bg-${stage.color}-400/20 text-${stage.color}-400 border border-${stage.color}-400/40`}>
                        {stage.duration}
                      </div>
                    </div>
                    {i < internshipPathways.length - 1 && (
                      <div className="absolute left-1/2 bottom-0 transform translate-y-full -translate-x-1/2">
                        <ChevronRight className="w-4 h-4 text-cyan-400 transform rotate-90" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* AI Mock Interview Center - Center Column */}
          <motion.div
            className="col-span-12 lg:col-span-8 space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Mock Interview Room */}
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Video className="w-7 h-7 text-cyan-400" />
                    AI Mock Interview
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">Practice with AI interviewer - Get real-time feedback</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMockInterview(true)}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-bold flex items-center gap-2"
                  style={{ boxShadow: '0 10px 40px rgba(0, 229, 255, 0.5)' }}
                >
                  <Play className="w-5 h-5" />
                  Start AI Mock Interview
                </motion.button>
              </div>

              {/* 3D Interviewer Avatar */}
              <div className="relative h-96 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 rounded-xl border border-white/10 overflow-hidden mb-6">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                >
                  {/* Avatar effect */}
                  <div className="relative">
                    <motion.div
                      className="relative z-10"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    >
                      <Bot className="w-48 h-48 text-cyan-400" style={{ filter: 'drop-shadow(0 0 60px rgba(0, 229, 255, 0.8))' }} />
                    </motion.div>
                    
                    {/* Neon rings */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400/30"
                        style={{
                          width: `${200 + i * 60}px`,
                          height: `${200 + i * 60}px`,
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.2, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Scan lines */}
                <motion.div
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  animate={{
                    y: [0, 384, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Status indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-black/50 backdrop-blur-lg rounded-lg border border-green-400/40">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm font-semibold">AI Ready</span>
                </div>
              </div>

              {/* Real-time Feedback Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Speaking Pace', value: speakingPace, unit: 'WPM', icon: Activity, ideal: '140-160', color: speakingPace >= 140 && speakingPace <= 160 ? 'green' : 'yellow' },
                  { label: 'Confidence Level', value: confidenceLevel, unit: '%', icon: ThumbsUp, ideal: '70%+', color: confidenceLevel >= 70 ? 'green' : 'orange' },
                  { label: 'Eye Contact', value: eyeContact, unit: '%', icon: Eye, ideal: '80%+', color: eyeContact >= 80 ? 'green' : 'yellow' },
                ].map((metric, i) => {
                  const Icon = metric.icon;
                  return (
                    <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-5 h-5 text-${metric.color}-400`} />
                        <span className="text-xs text-gray-400">Ideal: {metric.ideal}</span>
                      </div>
                      <div className={`text-3xl font-bold text-${metric.color}-400 mb-1`}>
                        {metric.value}{metric.unit}
                      </div>
                      <div className="text-xs text-gray-400">{metric.label}</div>
                      <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(metric.value / (metric.unit === 'WPM' ? 200 : 100)) * 100}%` }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          className={`h-full bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            {/* Interview Analytics Dashboard */}
            <div className="grid grid-cols-2 gap-6">
              {/* Filler Word Detection */}
              <GlassCard>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  Filler Words Detected
                </h3>
                <div className="text-center mb-4">
                  <motion.div 
                    className="text-5xl font-bold text-yellow-400"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {fillerWords}
                  </motion.div>
                  <p className="text-sm text-gray-400 mt-1">Um, Ah, Like, You know</p>
                </div>
                <div className="space-y-2">
                  {[
                    { word: 'Um', count: 3 },
                    { word: 'Ah', count: 2 },
                    { word: 'Like', count: 2 },
                    { word: 'You know', count: 1 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-white">"{item.word}"</span>
                      <span className="text-yellow-400 font-bold">{item.count}x</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Sentiment Analysis */}
              <GlassCard>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Smile className="w-5 h-5 text-green-400" />
                  Sentiment Analysis
                </h3>
                <div className="space-y-4">
                  {[
                    { emotion: 'Positive', value: 65, icon: Smile, color: 'green' },
                    { emotion: 'Neutral', value: 25, icon: Meh, color: 'yellow' },
                    { emotion: 'Negative', value: 10, icon: Frown, color: 'red' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 text-${item.color}-400`} />
                            <span className="text-sm text-white">{item.emotion}</span>
                          </div>
                          <span className={`text-sm font-bold text-${item.color}-400`}>{item.value}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            className={`h-full bg-gradient-to-r from-${item.color}-400 to-${item.color}-600`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </div>

            {/* Voice Emotion Waveforms & Facial Analytics */}
            <GlassCard>
              <div className="grid grid-cols-2 gap-6">
                {/* Voice Waveform */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Mic className="w-5 h-5 text-purple-400" />
                    Voice Emotion Analysis
                  </h3>
                  <div className="h-32 flex items-end justify-around gap-1">
                    {[...Array(40)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-gradient-to-t from-purple-400 to-pink-400 rounded-full"
                        animate={{
                          height: `${Math.random() * 100}%`,
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 text-center">
                    <div className="text-purple-400 font-bold">Calm & Confident</div>
                    <div className="text-xs text-gray-400">Tone Analysis</div>
                  </div>
                </div>

                {/* Facial Expression */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Smile className="w-5 h-5 text-cyan-400" />
                    Facial Expression
                  </h3>
                  <div className="relative w-32 h-32 mx-auto mb-3">
                    <div className="absolute inset-0 rounded-full border-4 border-cyan-400/30" />
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-cyan-400"
                      style={{ clipPath: 'inset(0 50% 0 0)' }}
                      animate={{
                        clipPath: ['inset(0 50% 0 0)', 'inset(0 0% 0 0)', 'inset(0 50% 0 0)'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />
                    <Smile className="absolute inset-0 m-auto w-16 h-16 text-cyan-400" />
                  </div>
                  <div className="text-center">
                    <div className="text-cyan-400 font-bold">Engaged & Positive</div>
                    <div className="text-xs text-gray-400">Expression Score: 92%</div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Testing Environments */}
            <div className="grid grid-cols-3 gap-4">
              <TestingEnvironmentCard
                icon={Code}
                title="Coding Interview"
                description="Live code editor"
                color="cyan"
              />
              <TestingEnvironmentCard
                icon={BookOpen}
                title="Whiteboard"
                description="Problem solving"
                color="purple"
              />
              <TestingEnvironmentCard
                icon={CheckCircle}
                title="MCQ Test"
                description="Aptitude & skills"
                color="green"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Achievements & Support */}
        <div className="max-w-[2000px] mx-auto grid grid-cols-12 gap-6 mt-6">
          {/* Achievements & Badges */}
          <motion.div
            className="col-span-12 lg:col-span-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                Achievements & Certifications
              </h3>
              
              {/* Achievements Timeline */}
              <div className="mb-6 space-y-3">
                {achievements.map((achievement, i) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${achievement.color}-400 to-${achievement.color}-600 flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white">{achievement.title}</div>
                        <div className="text-sm text-gray-400">{achievement.description}</div>
                      </div>
                      <div className="text-xs text-gray-500">{achievement.date}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Skills Badges */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Skill Badges</h4>
                <div className="flex flex-wrap gap-2">
                  {skillBadges.map((badge, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.05 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`px-3 py-2 bg-${badge.color}-400/20 rounded-lg border border-${badge.color}-400/40 text-${badge.color}-400 text-sm font-semibold`}
                    >
                      {badge.skill} {badge.level}%
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Certificate Showcase */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-white mb-3">Certificates</h4>
                <div className="space-y-2">
                  {certificates.map((cert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <div>
                          <div className="text-sm font-semibold text-white">{cert.name}</div>
                          <div className="text-xs text-gray-400">{cert.issuer} • {cert.date}</div>
                        </div>
                      </div>
                      {cert.verified && (
                        <Shield className="w-5 h-5 text-green-400" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Support Tools & Benefits */}
          <motion.div
            className="col-span-12 lg:col-span-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassCard>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Bot className="w-6 h-6 text-cyan-400" />
                AI Career Coach & Support
              </h3>

              {/* AI Coach Avatar */}
              <div className="mb-6 p-4 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-lg border border-cyan-400/30">
                <div className="flex items-center gap-4 mb-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Bot className="w-12 h-12 text-cyan-400" />
                  </motion.div>
                  <div>
                    <div className="font-bold text-white">AI Career Coach</div>
                    <div className="text-sm text-gray-400">Here to help you succeed</div>
                  </div>
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  </div>
                </div>
                
                {/* Chat bubble tips */}
                <div className="space-y-2">
                  {[
                    '💡 Tip: Practice STAR method for behavioral questions',
                    '🎯 Your resume keywords match 95% with target job',
                    '⭐ Complete 3 more mock interviews to unlock Expert badge',
                  ].map((tip, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="p-2 bg-white/10 rounded-lg text-sm text-white"
                    >
                      {tip}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Practice/Exam Mode Toggle */}
              <div className="mb-6 flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <div className="font-semibold text-white">Practice Mode</div>
                  <div className="text-sm text-gray-400">Get hints and feedback</div>
                </div>
                <motion.button
                  onClick={() => setPracticeMode(!practiceMode)}
                  className={`relative w-16 h-8 rounded-full ${practiceMode ? 'bg-green-400' : 'bg-gray-600'}`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute top-1 w-6 h-6 bg-white rounded-full"
                    animate={{ left: practiceMode ? '36px' : '4px' }}
                  />
                </motion.button>
              </div>

              {/* Streak Calendar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-400" />
                    Current Streak: {currentStreak} days
                  </h4>
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {[...Array(28)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.01 }}
                      className={`aspect-square rounded ${
                        i < currentStreak
                          ? 'bg-green-400'
                          : i === currentStreak
                          ? 'bg-orange-400 animate-pulse'
                          : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Time Tracking */}
              <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  This Week's Preparation
                </h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">12h</div>
                    <div className="text-xs text-gray-400">Interview Prep</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">8h</div>
                    <div className="text-xs text-gray-400">Coding Practice</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">5h</div>
                    <div className="text-xs text-gray-400">Resume Building</div>
                  </div>
                </div>
              </div>

              {/* Real-world Benefits */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Real-world Benefits</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: FileCheck, label: 'Offer Letter Ready', color: 'green' },
                    { icon: DollarSign, label: 'Salary Negotiation', color: 'yellow' },
                    { icon: MapPin, label: 'Relocation Support', color: 'blue' },
                    { icon: Home, label: 'Remote Jobs', color: 'purple' },
                  ].map((benefit, i) => {
                    const Icon = benefit.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        className={`p-3 bg-${benefit.color}-400/10 rounded-lg border border-${benefit.color}-400/30 text-center`}
                      >
                        <Icon className={`w-6 h-6 text-${benefit.color}-400 mx-auto mb-1`} />
                        <div className="text-xs text-white">{benefit.label}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Quick Action Buttons */}
        <div className="max-w-[2000px] mx-auto mt-6 grid grid-cols-4 gap-4">
          <QuickActionButton icon={Upload} label="Upload Resume" gradient="from-cyan-500 to-blue-500" />
          <QuickActionButton icon={UserCheck} label="Create Job Profile" gradient="from-purple-500 to-pink-500" />
          <QuickActionButton icon={Play} label="Start AI Mock Interview" gradient="from-green-500 to-emerald-500" />
          <QuickActionButton icon={Globe} label="Continue with Google" gradient="from-orange-500 to-red-500" />
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showMockInterview && (
          <MockInterviewModal onClose={() => setShowMockInterview(false)} />
        )}
        {showResumeBuilder && (
          <ResumeBuilderModal onClose={() => setShowResumeBuilder(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Glass Card Component
function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
      <div 
        className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 group-hover:border-cyan-400/30 transition-all"
        style={{
          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.5),
            inset 0 0 60px rgba(255, 255, 255, 0.05),
            0 0 80px rgba(0, 229, 255, 0.1)
          `,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Accessibility Badge
function AccessibilityBadge({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -2 }}
      className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20"
    >
      <Icon className="w-4 h-4 text-cyan-400" />
      <span className="text-xs text-white">{label}</span>
    </motion.div>
  );
}

// Testing Environment Card
function TestingEnvironmentCard({ icon: Icon, title, description, color }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`p-4 bg-${color}-400/10 rounded-lg border border-${color}-400/30 text-center`}
    >
      <Icon className={`w-8 h-8 text-${color}-400 mx-auto mb-2`} />
      <div className="font-semibold text-white text-sm">{title}</div>
      <div className="text-xs text-gray-400">{description}</div>
    </motion.button>
  );
}

// Quick Action Button
function QuickActionButton({ icon: Icon, label, gradient }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`p-6 bg-gradient-to-r ${gradient} rounded-xl flex flex-col items-center gap-2 text-white font-bold`}
      style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)' }}
    >
      <Icon className="w-6 h-6" />
      {label}
    </motion.button>
  );
}

// Mock Interview Modal
function MockInterviewModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full"
      >
        <GlassCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">AI Mock Interview Room</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          
          <div className="h-96 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 rounded-xl border border-white/10 flex items-center justify-center mb-6">
            <div className="text-center">
              <Video className="w-24 h-24 text-cyan-400 mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 40px rgba(0, 229, 255, 0.8))' }} />
              <p className="text-white text-xl mb-2">Interview will start in 3 seconds...</p>
              <p className="text-gray-400">Make sure your camera and microphone are enabled</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button className="p-4 bg-green-500/20 rounded-lg border border-green-400/40 text-green-400 font-semibold">
              Start Interview
            </button>
            <button className="p-4 bg-white/5 rounded-lg border border-white/10 text-white font-semibold">
              Test Audio/Video
            </button>
            <button className="p-4 bg-white/5 rounded-lg border border-white/10 text-white font-semibold">
              Settings
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

// Resume Builder Modal
function ResumeBuilderModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full"
      >
        <GlassCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">AI Resume Builder</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="p-6 bg-white/5 rounded-lg border border-white/10 text-center">
              <FileText className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <p className="text-white text-lg mb-2">Upload your existing resume or start from scratch</p>
              <p className="text-gray-400 mb-4">AI will analyze and optimize for ATS systems</p>
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-bold">
                Upload Resume
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                <div className="text-cyan-400 font-bold text-2xl mb-1">95%</div>
                <div className="text-xs text-gray-400">ATS Optimization</div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                <div className="text-purple-400 font-bold text-2xl mb-1">12</div>
                <div className="text-xs text-gray-400">Templates</div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                <div className="text-green-400 font-bold text-2xl mb-1">AI</div>
                <div className="text-xs text-gray-400">Powered</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}