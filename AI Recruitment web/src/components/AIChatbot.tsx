import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  FileText,
  Briefcase,
  Calendar,
  HelpCircle,
  Video,
  TrendingUp,
  Globe,
  Minimize2,
  Maximize2,
  Trash2,
  Settings,
  Clock,
  CheckCircle,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  quickActions?: QuickAction[];
}

interface QuickAction {
  label: string;
  icon: any;
  action: string;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI Career Assistant 🚀 How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      quickActions: [
        { label: 'Interview Prep', icon: Video, action: 'interview' },
        { label: 'Resume Tips', icon: FileText, action: 'resume' },
        { label: 'Job Match', icon: Briefcase, action: 'jobs' },
        { label: 'Schedule', icon: Calendar, action: 'schedule' },
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguages, setShowLanguages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateResponse(inputText);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    // Interview preparation
    if (input.includes('interview') || input.includes('preparation')) {
      return {
        id: Date.now().toString(),
        text: "Great! I can help you prepare for interviews. Here's what I recommend:\n\n✨ Practice with our AI Interview Prep tool\n📊 Review common questions for your role\n🎯 Perfect your STAR method responses\n🎥 Practice with camera to improve body language\n\nWould you like to start a mock interview session?",
        sender: 'bot',
        timestamp: new Date(),
        quickActions: [
          { label: 'Start Mock Interview', icon: Video, action: 'start-interview' },
          { label: 'Common Questions', icon: HelpCircle, action: 'questions' },
        ]
      };
    }

    // Resume optimization
    if (input.includes('resume') || input.includes('cv')) {
      return {
        id: Date.now().toString(),
        text: "I'll help you optimize your resume! Here are key tips:\n\n📝 Use action verbs and quantify achievements\n🎯 Tailor content to each job application\n📊 Keep it concise (1-2 pages max)\n✨ Use our AI CV Analysis for detailed feedback\n🔍 Ensure ATS compatibility\n\nYour current resume has an 85% ATS score. Want to improve it?",
        sender: 'bot',
        timestamp: new Date(),
        quickActions: [
          { label: 'Analyze Resume', icon: FileText, action: 'analyze-cv' },
          { label: 'Improve Score', icon: TrendingUp, action: 'improve-cv' },
        ]
      };
    }

    // Job matching
    if (input.includes('job') || input.includes('position') || input.includes('career')) {
      return {
        id: Date.now().toString(),
        text: "I found 47 jobs matching your profile! Based on your skills:\n\n🎯 95% match: Senior React Developer at TechCorp\n💼 89% match: Full Stack Engineer at StartupXYZ\n🚀 87% match: Frontend Architect at Digital Solutions\n\nThese positions align perfectly with your React, TypeScript, and cloud experience. Want to see more details?",
        sender: 'bot',
        timestamp: new Date(),
        quickActions: [
          { label: 'View Jobs', icon: Briefcase, action: 'view-jobs' },
          { label: 'Save Jobs', icon: CheckCircle, action: 'save-jobs' },
        ]
      };
    }

    // Scheduling
    if (input.includes('schedule') || input.includes('calendar') || input.includes('meeting')) {
      return {
        id: Date.now().toString(),
        text: "I can help you schedule interviews and meetings! 📅\n\nYour upcoming schedule:\n• Tomorrow 2:00 PM - Interview with TechCorp\n• Friday 10:00 AM - Phone screen with StartupXYZ\n\nWould you like to:\n- Schedule a new interview\n- Send availability to recruiter\n- Set interview reminders",
        sender: 'bot',
        timestamp: new Date(),
        quickActions: [
          { label: 'Schedule Interview', icon: Calendar, action: 'schedule' },
          { label: 'View Calendar', icon: Clock, action: 'calendar' },
        ]
      };
    }

    // Salary information
    if (input.includes('salary') || input.includes('pay') || input.includes('compensation')) {
      return {
        id: Date.now().toString(),
        text: "Based on your profile analysis:\n\n💰 Predicted Salary Range: $120k - $160k\n📊 Market Average: $135k for Senior React roles\n📈 Top 10% earns: $180k+\n\nFactors influencing your range:\n• 5+ years experience\n• React & TypeScript expertise\n• Previous leadership roles\n• Location flexibility (Remote)\n\nWant to know how to negotiate for the higher end?",
        sender: 'bot',
        timestamp: new Date(),
        quickActions: [
          { label: 'Negotiation Tips', icon: Zap, action: 'negotiate' },
          { label: 'View Market Data', icon: TrendingUp, action: 'market-data' },
        ]
      };
    }

    // Help/FAQ
    if (input.includes('help') || input.includes('how') || input.includes('?')) {
      return {
        id: Date.now().toString(),
        text: "I'm here to help with all your career needs! Here's what I can do:\n\n🎤 Interview Preparation & Practice\n📄 Resume/CV Optimization\n💼 Job Matching & Recommendations\n📅 Interview Scheduling\n💰 Salary Insights\n📊 Career Analytics\n🎯 Skill Gap Analysis\n🌟 Career Growth Tips\n\nJust ask me anything or use the quick action buttons!",
        sender: 'bot',
        timestamp: new Date(),
        quickActions: [
          { label: 'Interview Prep', icon: Video, action: 'interview' },
          { label: 'Resume Tips', icon: FileText, action: 'resume' },
          { label: 'Find Jobs', icon: Briefcase, action: 'jobs' },
        ]
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      text: "I understand you're asking about: \"" + userInput + "\"\n\nI can help you with:\n• 🎯 Interview preparation and practice\n• 📝 Resume optimization tips\n• 💼 Job recommendations (47 matches found)\n• 📅 Scheduling and calendar management\n• 💡 Career advice and guidance\n\nWhat would you like to explore?",
      sender: 'bot',
      timestamp: new Date(),
      quickActions: [
        { label: 'Interview Prep', icon: Video, action: 'interview' },
        { label: 'Resume Tips', icon: FileText, action: 'resume' },
        { label: 'Job Match', icon: Briefcase, action: 'jobs' },
      ]
    };
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: { [key: string]: string } = {
      'interview': 'I want to prepare for interviews',
      'resume': 'Help me optimize my resume',
      'jobs': 'Show me job recommendations',
      'schedule': 'Help me schedule interviews',
      'start-interview': 'Start a mock interview',
      'questions': 'Show common interview questions',
      'analyze-cv': 'Analyze my CV',
      'improve-cv': 'How can I improve my resume score?',
      'view-jobs': 'Show me the job details',
      'save-jobs': 'Save these jobs for me',
      'calendar': 'Show my calendar',
      'negotiate': 'Give me salary negotiation tips',
      'market-data': 'Show market salary data',
    };

    const message = actionMessages[action] || action;
    setInputText(message);
    setTimeout(() => handleSendMessage(), 100);
  };

  const clearConversation = () => {
    setMessages([
      {
        id: '1',
        text: "Conversation cleared. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
        quickActions: [
          { label: 'Interview Prep', icon: Video, action: 'interview' },
          { label: 'Resume Tips', icon: FileText, action: 'resume' },
          { label: 'Job Match', icon: Briefcase, action: 'jobs' },
        ]
      }
    ]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl group"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
              boxShadow: '0 10px 40px rgba(6, 182, 212, 0.4), 0 0 60px rgba(139, 92, 246, 0.3)',
            }}
          >
            <MessageCircle className="w-8 h-8 text-white" />
            
            {/* Notification Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-slate-900 shadow-lg"
            >
              1
            </motion.div>

            {/* Pulse Animation */}
            <motion.div
              className="absolute inset-0 rounded-full -z-10"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            {/* Rotating Glow */}
            <motion.div
              className="absolute inset-0 rounded-full -z-20 blur-xl"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? 'auto' : '650px'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-8 right-8 z-50 w-[420px] rounded-2xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 58, 138, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(6, 182, 212, 0.15)',
            }}
          >
            {/* Header */}
            <div 
              className="relative p-5 border-b overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <motion.div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                      }}
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(6, 182, 212, 0.5)',
                          '0 0 30px rgba(139, 92, 246, 0.5)',
                          '0 0 20px rgba(6, 182, 212, 0.5)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Bot className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-slate-900 shadow-lg"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          '0 0 0 0 rgba(34, 197, 94, 0.7)',
                          '0 0 0 4px rgba(34, 197, 94, 0)',
                          '0 0 0 0 rgba(34, 197, 94, 0.7)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base tracking-tight">AI Career Assistant</h3>
                    <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                      <motion.span 
                        className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg"
                        animate={{
                          boxShadow: [
                            '0 0 5px rgba(34, 197, 94, 0.8)',
                            '0 0 10px rgba(34, 197, 94, 0.8)',
                            '0 0 5px rgba(34, 197, 94, 0.8)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      Always Online
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Language Selector */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowLanguages(!showLanguages)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      <Globe className="w-4 h-4 text-cyan-400" />
                    </motion.button>

                    <AnimatePresence>
                      {showLanguages && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          className="absolute top-full right-0 mt-2 rounded-xl p-2 min-w-[160px] shadow-2xl z-20 backdrop-blur-xl"
                          style={{
                            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 58, 138, 0.98) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                          }}
                        >
                          {languages.map((lang) => (
                            <motion.button
                              key={lang.code}
                              whileHover={{ x: 2 }}
                              onClick={() => {
                                setSelectedLanguage(lang.code);
                                setShowLanguages(false);
                              }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all font-medium ${
                                selectedLanguage === lang.code
                                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-400/30'
                                  : 'text-gray-300 hover:bg-white/10'
                              }`}
                            >
                              <span className="text-lg">{lang.flag}</span>
                              <span>{lang.name}</span>
                              {selectedLanguage === lang.code && (
                                <CheckCircle className="w-4 h-4 text-cyan-400 ml-auto" />
                              )}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Clear Chat */}
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.15)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearConversation}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 backdrop-blur-sm group"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                  </motion.button>

                  {/* Minimize/Maximize */}
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    {isMinimized ? (
                      <Maximize2 className="w-4 h-4 text-purple-400" />
                    ) : (
                      <Minimize2 className="w-4 h-4 text-purple-400" />
                    )}
                  </motion.button>

                  {/* Close */}
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 backdrop-blur-sm group"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <X className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth" style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(6, 182, 212, 0.5) rgba(255, 255, 255, 0.05)',
                }}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Avatar */}
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                            : 'bg-gradient-to-br from-cyan-500 to-blue-600'
                        }`}
                        style={{
                          boxShadow: message.sender === 'user' 
                            ? '0 4px 12px rgba(168, 85, 247, 0.4)' 
                            : '0 4px 12px rgba(6, 182, 212, 0.4)',
                        }}>
                          {message.sender === 'user' ? (
                            <User className="w-5 h-5 text-white" />
                          ) : (
                            <Bot className="w-5 h-5 text-white" />
                          )}
                        </div>

                        {/* Message Content */}
                        <div className="flex-1">
                          <div className={`rounded-2xl p-3.5 backdrop-blur-sm shadow-lg ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-br from-purple-500/90 to-pink-500/90 text-white'
                              : 'text-gray-100'
                          }`}
                          style={message.sender === 'bot' ? {
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          } : {}}>
                            <p className="text-sm leading-relaxed whitespace-pre-line font-medium">{message.text}</p>
                          </div>

                          {/* Quick Actions */}
                          {message.quickActions && message.quickActions.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {message.quickActions.map((action, idx) => (
                                <motion.button
                                  key={idx}
                                  whileHover={{ scale: 1.03, y: -1 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => handleQuickAction(action.action)}
                                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all backdrop-blur-sm shadow-lg"
                                  style={{
                                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                                    border: '1px solid rgba(6, 182, 212, 0.3)',
                                    color: '#06b6d4',
                                  }}
                                >
                                  <action.icon className="w-3.5 h-3.5" />
                                  {action.label}
                                </motion.button>
                              ))}
                            </div>
                          )}

                          {/* Timestamp */}
                          <p className={`text-[11px] text-gray-500 mt-1.5 font-medium ${
                            message.sender === 'user' ? 'text-right' : 'text-left'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg"
                        style={{
                          boxShadow: '0 4px 12px rgba(6, 182, 212, 0.4)',
                        }}>
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="rounded-2xl p-4 backdrop-blur-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 100%)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}>
                          <div className="flex gap-1.5">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 rounded-full"
                                style={{
                                  background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                                }}
                                animate={{
                                  y: [0, -8, 0],
                                }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.15,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div 
                  className="p-5 border-t backdrop-blur-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="flex gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all text-sm font-medium backdrop-blur-sm"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                      }}
                      onFocus={(e) => {
                        e.target.style.ringColor = 'rgba(6, 182, 212, 0.5)';
                        e.target.style.borderColor = 'rgba(6, 182, 212, 0.5)';
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSendMessage}
                      disabled={!inputText.trim()}
                      className="w-11 h-11 rounded-xl flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-lg transition-all"
                      style={{
                        background: inputText.trim() 
                          ? 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)'
                          : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: inputText.trim() 
                          ? '0 4px 15px rgba(6, 182, 212, 0.4)'
                          : 'none',
                      }}
                    >
                      <Send className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>

                  {/* Powered by AI */}
                  <motion.div 
                    className="flex items-center justify-center gap-1.5 mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    </motion.div>
                    <p className="text-xs text-gray-500 font-medium">
                      Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold">SmartHire AI</span>
                    </p>
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}