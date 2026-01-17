import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  TrendingUp,
  Globe,
  Zap,
  Shield,
  Sparkles,
  Brain,
  Rocket,
  Star,
  CheckCircle,
  Code,
  Briefcase,
  MessageSquare,
  Linkedin,
  Twitter,
  Github,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Cpu,
  Database,
  Cloud,
  Lock,
  Layers,
  LineChart,
  PieChart,
  BarChart3,
  Activity,
  Lightbulb,
  UserCheck,
  Trophy,
  ArrowRight,
  Clock
} from 'lucide-react';

interface AboutUsProps {
  user?: any;
}

export function AboutUs({ user }: AboutUsProps) {
  const [activeValue, setActiveValue] = useState(0);
  const [hoveredTeamMember, setHoveredTeamMember] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const companyValues = [
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We constantly push boundaries with cutting-edge AI technology to revolutionize recruitment.',
      color: 'cyan',
      gradient: 'from-cyan-400 to-blue-500',
      stats: '150+ AI Models Deployed'
    },
    {
      icon: Heart,
      title: 'Human-Centric',
      description: 'Technology serves people. We build AI that enhances human decision-making, not replaces it.',
      color: 'pink',
      gradient: 'from-pink-400 to-purple-500',
      stats: '98% User Satisfaction'
    },
    {
      icon: Shield,
      title: 'Trust & Privacy',
      description: 'Your data security is paramount. We maintain the highest standards of data protection.',
      color: 'green',
      gradient: 'from-green-400 to-emerald-500',
      stats: 'ISO 27001 Certified'
    },
    {
      icon: Globe,
      title: 'Inclusive Hiring',
      description: 'We champion diversity and eliminate bias to create equal opportunities for all candidates.',
      color: 'orange',
      gradient: 'from-orange-400 to-red-500',
      stats: '40% More Diverse Hires'
    },
  ];

  const teamMembers = [
    {
      name: 'Ansh Ojha',
      role: 'Founder & CEO',
      bio: 'Visionary entrepreneur with expertise in AI and recruitment technology',
      image: '👨‍💼',
      category: 'leadership',
      linkedin: '#',
      twitter: '#',
      expertise: ['AI Strategy', 'Product Vision', 'Leadership', 'Innovation'],
      color: 'cyan'
    },
    {
      name: 'Dr. Sarah Chen',
      role: 'CTO & Co-Founder',
      bio: 'Former Google AI Lead with 15 years in ML/AI',
      image: '👩‍💼',
      category: 'leadership',
      linkedin: '#',
      twitter: '#',
      expertise: ['AI Strategy', 'Product Vision', 'Leadership'],
      color: 'purple'
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'Ex-Amazon engineer, built recruiting systems at scale',
      image: '👨‍💻',
      category: 'leadership',
      linkedin: '#',
      twitter: '#',
      expertise: ['System Architecture', 'ML Engineering', 'Scalability'],
      color: 'purple'
    },
    {
      name: 'Dr. Aisha Patel',
      role: 'Chief AI Officer',
      bio: 'PhD in NLP from MIT, pioneered resume parsing tech',
      image: '👩‍🔬',
      category: 'ai',
      linkedin: '#',
      twitter: '#',
      expertise: ['NLP', 'Deep Learning', 'Research'],
      color: 'pink'
    },
    {
      name: 'James Thompson',
      role: 'VP of Engineering',
      bio: 'Led engineering at LinkedIn, expert in talent tech',
      image: '👨‍🔧',
      category: 'engineering',
      linkedin: '#',
      twitter: '#',
      expertise: ['Engineering Management', 'Cloud Infrastructure', 'DevOps'],
      color: 'blue'
    },
    {
      name: 'Emily Zhang',
      role: 'Head of Product',
      bio: 'Product leader from Microsoft, UX/UI specialist',
      image: '👩‍🎨',
      category: 'product',
      linkedin: '#',
      twitter: '#',
      expertise: ['Product Design', 'User Research', 'Innovation'],
      color: 'green'
    },
    {
      name: 'Marcus Johnson',
      role: 'Chief Data Scientist',
      bio: 'Built predictive models for Fortune 500 companies',
      image: '👨‍🏫',
      category: 'ai',
      linkedin: '#',
      twitter: '#',
      expertise: ['Data Science', 'Predictive Analytics', 'Statistics'],
      color: 'yellow'
    },
  ];

  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'SmartHire AI was born from a vision to transform recruitment', icon: Rocket },
    { year: '2021', title: '10K+ Users', description: 'Reached our first major milestone with rapid adoption', icon: Users },
    { year: '2022', title: 'Series A Funding', description: '$25M raised to accelerate AI development', icon: TrendingUp },
    { year: '2023', title: 'Global Expansion', description: 'Launched in 50+ countries across 6 continents', icon: Globe },
    { year: '2024', title: '1M+ Hires', description: 'Helped companies make over 1 million successful hires', icon: Award },
    { year: '2025', title: 'AI Revolution', description: 'Launched next-gen AI interview and assessment tools', icon: Brain },
  ];

  const achievements = [
    { metric: '500K+', label: 'Active Users', icon: Users, color: 'cyan' },
    { metric: '1M+', label: 'Successful Hires', icon: UserCheck, color: 'green' },
    { metric: '95%', label: 'Match Accuracy', icon: Target, color: 'purple' },
    { metric: '10B+', label: 'Data Points Analyzed', icon: Database, color: 'orange' },
    { metric: '50+', label: 'Countries', icon: Globe, color: 'blue' },
    { metric: '24/7', label: 'AI Availability', icon: Clock, color: 'pink' },
  ];

  const techStack = [
    { name: 'Advanced NLP', icon: Brain, description: 'Natural Language Processing for resume analysis', color: 'cyan' },
    { name: 'Machine Learning', icon: Cpu, description: 'Predictive models for candidate matching', color: 'purple' },
    { name: 'Cloud Infrastructure', icon: Cloud, description: 'Scalable AWS/Azure architecture', color: 'blue' },
    { name: 'Data Security', icon: Lock, description: 'Enterprise-grade encryption & compliance', color: 'green' },
    { name: 'Real-time Analytics', icon: Activity, description: 'Live insights and performance tracking', color: 'orange' },
    { name: 'API Integration', icon: Layers, description: 'Seamless ATS and HRIS connections', color: 'pink' },
  ];

  const awards = [
    { title: 'Best AI Recruiting Platform 2024', org: 'Tech Innovation Awards', icon: Trophy, color: 'yellow' },
    { title: 'Top 50 AI Companies', org: 'Forbes', icon: Star, color: 'cyan' },
    { title: 'Excellence in HR Tech', org: 'HR Tech Conference', icon: Award, color: 'purple' },
    { title: 'Data Privacy Leader', org: 'Privacy Shield', icon: Shield, color: 'green' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % companyValues.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredTeam = selectedCategory === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.category === selectedCategory);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Background */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1763568258244-9d5aa9c3ce45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwZGlnaXRhbCUyMHRyYW5zZm9ybWF0aW9ufGVufDF8fHx8MTc2NzcyNzQ4OHww&ixlib=rb-4.1.0&q=80&w=1080')`,
            filter: 'blur(60px) brightness(0.4)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/95 via-[#1a2744]/90 to-[#0A1628]/95" />
        
        {/* Animated neural network */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="about-neural" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="3" fill="#00E5FF" />
              <circle cx="160" cy="80" r="3" fill="#B537F2" />
              <circle cx="100" cy="160" r="3" fill="#FF006E" />
              <line x1="40" y1="40" x2="160" y2="80" stroke="#00E5FF" strokeWidth="1" opacity="0.3" />
              <line x1="160" y1="80" x2="100" y2="160" stroke="#B537F2" strokeWidth="1" opacity="0.3" />
              <line x1="100" y1="160" x2="40" y2="40" stroke="#FF006E" strokeWidth="1" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-neural)" />
        </svg>

        {/* Floating orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: '400px',
              height: '400px',
              background: i % 3 === 0 
                ? 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)'
                : i % 3 === 1
                ? 'radial-gradient(circle, rgba(181, 55, 242, 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(255, 0, 110, 0.15) 0%, transparent 70%)',
              left: `${(i * 15) % 100}%`,
              top: `${(i * 20) % 100}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -80, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block mb-6"
          >
            <div className="px-6 py-2 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full border border-cyan-400/40">
              <span className="text-cyan-400 font-semibold">About SmartHire AI</span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6"
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
            Transforming Recruitment<br />with AI Intelligence
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We're on a mission to make hiring faster, fairer, and more effective by combining cutting-edge artificial intelligence with deep human insight.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {achievements.slice(0, 3).map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`p-4 bg-${stat.color}-400/10 rounded-xl border border-${stat.color}-400/30`}
                >
                  <Icon className={`w-8 h-8 text-${stat.color}-400 mx-auto mb-2`} />
                  <div className={`text-3xl font-bold text-${stat.color}-400 mb-1`}>{stat.metric}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Our Story */}
        <div className="max-w-6xl mx-auto mb-20">
          <GlassCard>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-white mb-4">Our Story</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Founded in 2020 by Ansh Ojha and a team of AI researchers and HR technology veterans, SmartHire AI was born from a simple observation: traditional recruiting was broken.
                  </p>
                  <p>
                    We watched talented candidates get overlooked because of keyword-matching algorithms, and saw hiring managers drowning in hundreds of unqualified applications. We knew there had to be a better way.
                  </p>
                  <p>
                    Today, we're proud to have built the world's most advanced AI-powered recruitment platform, helping over 500,000 recruiters and hiring managers find the perfect candidates in a fraction of the time.
                  </p>
                  <p className="text-cyan-400 font-semibold">
                    Our technology has facilitated over 1 million successful hires across 50+ countries, and we're just getting started.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div 
                  className="relative h-96 rounded-2xl overflow-hidden border border-cyan-400/30"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjB0ZWFtJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NzcyNzQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />
                  
                  {/* Overlay effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </GlassCard>
        </div>

        {/* Mission, Vision, Values */}
        <div className="max-w-6xl mx-auto mb-20">
          <motion.h2 
            className="text-4xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            What Drives Us
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Target,
                title: 'Mission',
                description: 'To democratize access to talent by building AI that eliminates bias and connects the right people with the right opportunities.',
                color: 'cyan'
              },
              {
                icon: Eye,
                title: 'Vision',
                description: 'A world where every hiring decision is data-driven, fair, and leads to successful long-term placements.',
                color: 'purple'
              },
              {
                icon: Sparkles,
                title: 'Purpose',
                description: 'Empowering HR professionals with intelligent tools that amplify their expertise and save valuable time.',
                color: 'pink'
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <GlassCard>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${item.color}-400 to-${item.color}-600 flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-2 gap-6">
            {companyValues.map((value, i) => {
              const Icon = value.icon;
              const isActive = activeValue === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative"
                >
                  <GlassCard>
                    <div className="flex items-start gap-4">
                      <motion.div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center flex-shrink-0`}
                        animate={isActive ? {
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                        <p className="text-gray-300 text-sm mb-3">{value.description}</p>
                        <div className={`inline-block px-3 py-1 bg-${value.color}-400/20 rounded-lg border border-${value.color}-400/40`}>
                          <span className={`text-${value.color}-400 text-xs font-semibold`}>{value.stats}</span>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto mb-20">
          <motion.h2 
            className="text-4xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 transform -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => {
                const Icon = milestone.icon;
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                      <GlassCard>
                        <div className="text-cyan-400 text-sm font-bold mb-1">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                        <p className="text-gray-300 text-sm">{milestone.description}</p>
                      </GlassCard>
                    </div>

                    {/* Icon in center */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center flex-shrink-0"
                      style={{
                        boxShadow: '0 0 40px rgba(0, 229, 255, 0.5), 0 0 80px rgba(181, 55, 242, 0.3)',
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-300 text-lg mb-8">World-class experts in AI, engineering, and HR technology</p>

            {/* Category filters */}
            <div className="flex items-center justify-center gap-3">
              {[
                { id: 'all', label: 'All Team' },
                { id: 'leadership', label: 'Leadership' },
                { id: 'ai', label: 'AI & Data' },
                { id: 'engineering', label: 'Engineering' },
                { id: 'product', label: 'Product' },
              ].map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/40'
                      : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filteredTeam.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  onHoverStart={() => setHoveredTeamMember(i)}
                  onHoverEnd={() => setHoveredTeamMember(null)}
                >
                  <GlassCard>
                    <div className="text-center">
                      {/* Avatar */}
                      <motion.div
                        className={`w-32 h-32 rounded-full bg-gradient-to-br from-${member.color}-400 to-${member.color}-600 flex items-center justify-center text-6xl mx-auto mb-4`}
                        animate={hoveredTeamMember === i ? {
                          rotateY: [0, 360],
                        } : {}}
                        transition={{ duration: 1 }}
                        style={{
                          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.3), 0 0 80px rgba(0, 229, 255, 0.2)`,
                        }}
                      >
                        {member.image}
                      </motion.div>

                      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-cyan-400 text-sm font-semibold mb-3">{member.role}</p>
                      <p className="text-gray-400 text-sm mb-4">{member.bio}</p>

                      {/* Expertise tags */}
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {member.expertise.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Social links */}
                      <div className="flex items-center justify-center gap-3">
                        <motion.a
                          whileHover={{ scale: 1.2, y: -2 }}
                          href={member.linkedin}
                          className="p-2 bg-white/5 rounded-lg hover:bg-cyan-400/20 transition-colors"
                        >
                          <Linkedin className="w-4 h-4 text-cyan-400" />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.2, y: -2 }}
                          href={member.twitter}
                          className="p-2 bg-white/5 rounded-lg hover:bg-cyan-400/20 transition-colors"
                        >
                          <Twitter className="w-4 h-4 text-cyan-400" />
                        </motion.a>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="max-w-6xl mx-auto mb-20">
          <motion.h2 
            className="text-4xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Powered by Cutting-Edge Technology
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <GlassCard>
                    <Icon className={`w-12 h-12 text-${tech.color}-400 mb-4`} style={{ filter: `drop-shadow(0 0 20px rgba(0, 229, 255, 0.5))` }} />
                    <h3 className="text-lg font-bold text-white mb-2">{tech.name}</h3>
                    <p className="text-gray-300 text-sm">{tech.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="max-w-6xl mx-auto mb-20">
          <motion.h2 
            className="text-4xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Awards & Recognition
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {awards.map((award, i) => {
              const Icon = award.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <GlassCard>
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${award.color}-400 to-${award.color}-600 flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{award.title}</h3>
                        <p className="text-gray-400 text-sm">{award.org}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <GlassCard>
            <h2 className="text-3xl font-bold text-center text-white mb-8">By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {achievements.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="text-center"
                  >
                    <Icon className={`w-10 h-10 text-${stat.color}-400 mx-auto mb-3`} />
                    <div className={`text-3xl font-bold text-${stat.color}-400 mb-1`}>{stat.metric}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <GlassCard>
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring' }}
              >
                <Rocket className="w-20 h-20 text-cyan-400 mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 40px rgba(0, 229, 255, 0.8))' }} />
              </motion.div>
              
              <h2 className="text-4xl font-bold text-white mb-4">Join Us on Our Mission</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Whether you're a recruiter, job seeker, or passionate about AI and the future of work, we'd love to hear from you.
              </p>

              <div className="flex items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-bold flex items-center gap-2"
                  style={{ boxShadow: '0 10px 40px rgba(0, 229, 255, 0.5)' }}
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/5 border border-white/20 rounded-xl text-white font-bold"
                >
                  Contact Sales
                </motion.button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">anshojha420@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+91 9956126495</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
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