import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Send,
  Minimize2,
  X,
  Settings,
  Mic,
  MicOff,
  Video,
  Paperclip,
  Smile,
  Search,
  BarChart3,
  FileText,
  Target,
  Calendar,
  Lightbulb,
  Zap,
  Coffee,
  TrendingUp,
  Users,
  Award,
  Camera,
  Volume2,
  VolumeX,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share,
  Flag,
  MoreHorizontal,
  ChevronDown,
  Globe,
  Moon,
  Sun
} from 'lucide-react';

interface SmartBotProps {
  userType: 'jobseeker' | 'recruiter';
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'card' | 'carousel' | 'form' | 'system';
  data?: any;
  reactions?: string[];
  rating?: number;
}

interface QuickAction {
  id: string;
  label: string;
  icon: any;
  action: string;
  description: string;
}

export function SmartBot({ userType }: SmartBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [chatTheme, setChatTheme] = useState('auto');
  const [language, setLanguage] = useState('en');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hiro's personality responses
  const hiroResponses = {
    greeting: [
      "Hi there! I'm Hiro, your AI career assistant. How can I help you today? 😊",
      "Hello! Ready to supercharge your career journey? I'm here to help! 🚀",
      "Hey! I'm Hiro, and I'm excited to help you achieve your career goals! ✨"
    ],
    encouragement: [
      "You're doing great! Every step forward counts! 💪",
      "I believe in you! Let's tackle this together! 🌟",
      "Amazing progress! Keep up the excellent work! 🎉"
    ],
    jobSeeker: {
      tips: [
        "💡 Pro tip: Tailor your resume for each application - it increases your chances by 40%!",
        "🎯 Focus on quantifiable achievements in your resume. Numbers speak louder than words!",
        "📈 Companies are 3x more likely to interview candidates who follow up within 48 hours!"
      ],
      motivation: [
        "Remember, every 'no' brings you closer to your perfect 'yes'! 💫",
        "Your dream job is out there waiting for you. Let's find it together! 🔍",
        "Job searching is tough, but you're tougher! I'm here to support you! 💪"
      ]
    },
    recruiter: {
      tips: [
        "🎯 Candidates who receive personalized messages are 50% more likely to respond!",
        "📊 The best time to reach out to candidates is Tuesday-Thursday, 10-11 AM!",
        "🤝 Building relationships first leads to better hiring outcomes!"
      ],
      insights: [
        "Top performers often have 2-3 competing offers. Move fast on great candidates! ⚡",
        "Passive candidates make up 70% of the workforce. Don't forget to nurture them! 🌱",
        "Candidate experience directly impacts your employer brand. Make every interaction count! ⭐"
      ]
    }
  };

  // Quick actions based on user type
  const quickActions: QuickAction[] = userType === 'jobseeker' ? [
    { id: 'search-jobs', label: 'Find Jobs', icon: Search, action: 'search_jobs', description: 'Search for relevant job opportunities' },
    { id: 'resume-tips', label: 'Resume Help', icon: FileText, action: 'resume_help', description: 'Get resume optimization tips' },
    { id: 'interview-prep', label: 'Interview Prep', icon: Video, action: 'interview_prep', description: 'Practice interview questions' },
    { id: 'salary-research', label: 'Salary Data', icon: TrendingUp, action: 'salary_research', description: 'Research salary ranges' },
    { id: 'career-goals', label: 'Set Goals', icon: Target, action: 'career_goals', description: 'Plan your career roadmap' },
    { id: 'networking', label: 'Network', icon: Users, action: 'networking', description: 'Build professional connections' }
  ] : [
    { id: 'post-job', label: 'Post Job', icon: FileText, action: 'post_job', description: 'Create a new job posting' },
    { id: 'find-candidates', label: 'Find Talent', icon: Search, action: 'find_candidates', description: 'Search candidate database' },
    { id: 'schedule-interview', label: 'Schedule', icon: Calendar, action: 'schedule_interview', description: 'Schedule candidate interviews' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, action: 'view_analytics', description: 'View hiring metrics' },
    { id: 'message-candidates', label: 'Message', icon: MessageSquare, action: 'message_candidates', description: 'Communicate with candidates' },
    { id: 'hiring-tips', label: 'Hiring Tips', icon: Lightbulb, action: 'hiring_tips', description: 'Get recruitment best practices' }
  ];

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: hiroResponses.greeting[Math.floor(Math.random() * hiroResponses.greeting.length)],
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate typing delay
  const simulateTyping = (duration: number = 1500) => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), duration);
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate bot response
    simulateTyping();
    
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  // Generate contextual bot responses
  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    let response = "";
    let type: 'text' | 'card' | 'carousel' = 'text';
    let data: any = null;

    // Context-aware responses
    if (input.includes('job') || input.includes('search') || input.includes('find work')) {
      if (userType === 'jobseeker') {
        response = "I'd love to help you find the perfect job! 🎯 Let me search our database for opportunities that match your profile. What type of role are you looking for?";
        type = 'card';
        data = {
          title: "Job Search Assistant",
          description: "Let's find your dream job together!",
          actions: [
            { label: "Search Jobs", action: "search_jobs" },
            { label: "Update Preferences", action: "update_preferences" },
            { label: "View Recommendations", action: "view_recommendations" }
          ]
        };
      } else {
        response = "Looking to post a new job? I can help you create an effective job posting that attracts top talent! 📝";
      }
    } else if (input.includes('resume') || input.includes('cv')) {
      response = "Great question about resumes! 📄 Here are some quick tips:\n\n• Use action verbs and quantify achievements\n• Tailor keywords for each application\n• Keep it to 1-2 pages max\n• Include relevant skills and certifications\n\nWould you like me to analyze your current resume?";
    } else if (input.includes('interview')) {
      response = "Interview prep is crucial! 🎤 I can help you practice common questions, improve your body language, and boost your confidence. Our AI-powered interview simulator is perfect for this!";
      type = 'card';
      data = {
        title: "Interview Preparation",
        description: "Get ready to ace your next interview!",
        actions: [
          { label: "Start Mock Interview", action: "mock_interview" },
          { label: "Common Questions", action: "interview_questions" },
          { label: "Body Language Tips", action: "body_language" }
        ]
      };
    } else if (input.includes('salary') || input.includes('pay') || input.includes('money')) {
      response = "Salary research is smart! 💰 Based on current market data, I can help you understand compensation ranges for your role and experience level. What position are you interested in?";
    } else if (input.includes('help') || input.includes('stuck') || input.includes('confused')) {
      response = "I'm here to help! 🤗 Don't worry, career challenges are normal. Let's break this down step by step. What specific area would you like assistance with?";
    } else if (input.includes('thank') || input.includes('thanks')) {
      response = "You're very welcome! 😊 I'm always happy to help. Remember, I'm here 24/7 whenever you need career guidance or just want to chat about your goals!";
    } else if (input.includes('motivation') || input.includes('discouraged') || input.includes('rejected')) {
      const motivationalResponse = userType === 'jobseeker' 
        ? hiroResponses.jobSeeker.motivation[Math.floor(Math.random() * hiroResponses.jobSeeker.motivation.length)]
        : "Every great recruiter faces challenges! What matters is how we learn and grow from them. You've got this! 💪";
      response = motivationalResponse;
    } else {
      // Default intelligent response
      response = "That's an interesting question! 🤔 I'm constantly learning to better assist with career-related topics. Could you tell me more about what you're trying to achieve? I'd love to help you succeed!";
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: 'bot',
      timestamp: new Date(),
      type,
      data
    };
  };

  // Handle quick actions
  const handleQuickAction = (action: string) => {
    const actionMessages = {
      search_jobs: "Let me help you find relevant job opportunities! 🔍",
      resume_help: "I'll analyze your resume and provide optimization tips! 📝",
      interview_prep: "Time to practice! Let's start with some common interview questions! 🎤",
      salary_research: "I'll gather the latest salary data for your role and location! 💰",
      career_goals: "Let's create a roadmap for your career success! 🎯",
      networking: "Building connections is key! Here are some networking strategies! 🤝",
      post_job: "I'll guide you through creating an effective job posting! 📋",
      find_candidates: "Let's search for the perfect candidates for your role! 👥",
      schedule_interview: "I'll help you coordinate interview schedules! 📅",
      view_analytics: "Here are your latest hiring metrics and insights! 📊",
      message_candidates: "I'll help you craft engaging candidate messages! 💬",
      hiring_tips: "Here are proven strategies to improve your hiring success! 💡"
    };

    const message = actionMessages[action as keyof typeof actionMessages] || "I'm working on that feature! 🚀";
    
    const botMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, botMessage]);
  };

  // Voice input handling
  const toggleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        setInputValue("How can I improve my resume?");
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  // File upload handling
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: `📎 Uploaded: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Great! I've received your ${file.type.includes('pdf') ? 'resume' : 'file'}. Let me analyze it and provide feedback! 🔍`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, userMessage, botResponse]);
    }
  };

  // Render message content
  const renderMessage = (message: Message) => {
    if (message.type === 'card' && message.data) {
      return (
        <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 mt-2">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{message.data.title}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{message.data.description}</p>
          <div className="flex flex-wrap gap-2">
            {message.data.actions?.map((action: any, idx: number) => (
              <button
                key={idx}
                onClick={() => handleQuickAction(action.action)}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="whitespace-pre-wrap">
        {message.content}
      </div>
    );
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white z-50 hover:shadow-xl transition-all"
      >
        <MessageSquare className="w-6 h-6" />
        {unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
            {unreadCount}
          </div>
        )}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className={`fixed bottom-6 right-6 z-50 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      } bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: isTyping ? 360 : 0 }}
            transition={{ duration: 2, repeat: isTyping ? Infinity : 0 }}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            🤖
          </motion.div>
          <div>
            <h3 className="font-semibold">Hiro</h3>
            <p className="text-xs opacity-90">
              {isTyping ? 'Typing...' : 'AI Career Assistant'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600 overflow-hidden"
              >
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Theme</span>
                    <select
                      value={chatTheme}
                      onChange={(e) => setChatTheme(e.target.value)}
                      className="text-xs bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded px-2 py-1"
                    >
                      <option value="auto">Auto</option>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Language</span>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="text-xs bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded px-2 py-1"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Notifications</span>
                    <button
                      onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        notificationsEnabled ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        notificationsEnabled ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions */}
          {showQuickActions && (
            <div className="p-3 border-b border-slate-200 dark:border-slate-700">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickActions.slice(0, 4).map((action) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={action.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickAction(action.action)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm whitespace-nowrap hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                      title={action.description}
                    >
                      <Icon className="w-4 h-4" />
                      {action.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                    }`}
                  >
                    {renderMessage(message)}
                  </div>
                  <div className={`text-xs text-slate-500 mt-1 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg mr-2 order-0">
                    🤖
                  </div>
                )}
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg">
                      🤖
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl px-4 py-2">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-end gap-2">
              {/* Attachment Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Attach file"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              
              {/* Text Input */}
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  disabled={isTyping}
                />
                
                {/* Voice Input Indicator */}
                {isListening && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"
                  />
                )}
              </div>

              {/* Voice Input Button */}
              <button
                onClick={toggleVoiceInput}
                className={`p-2 rounded-lg transition-colors ${
                  isListening
                    ? 'bg-red-500 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                title={isListening ? 'Stop listening' : 'Voice input'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* Emoji Button */}
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Add emoji"
              >
                <Smile className="w-5 h-5" />
              </button>
              
              {/* Send Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Send message"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.jpg,.png"
            onChange={handleFileUpload}
            className="hidden"
          />
        </>
      )}
    </motion.div>
  );
}