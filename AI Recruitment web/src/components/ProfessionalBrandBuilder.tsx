import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Camera,
  Edit,
  Eye,
  Share,
  Download,
  Star,
  TrendingUp,
  Users,
  MessageSquare,
  Calendar,
  Award,
  Lightbulb,
  Target,
  BarChart3,
  Zap,
  CheckCircle,
  AlertCircle,
  Plus,
  Settings,
  Palette,
  Type,
  Layout,
  Image,
  Video,
  Mic,
  FileText,
  Send,
  Search,
  Filter,
  Clock,
  ExternalLink,
  X,
  Save,
  Copy,
  Monitor,
  Smartphone,
  Tablet,
  Code,
  Brush,
  Link,
  Mail,
  Phone,
  MapPin,
  Upload,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Briefcase
} from 'lucide-react';

interface ProfessionalBrandBuilderProps {
  user: any;
}

interface BrandMetric {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
}

interface ContentIdea {
  id: string;
  title: string;
  type: 'post' | 'article' | 'video' | 'carousel';
  platform: string[];
  engagement: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timeToCreate: string;
  trending: boolean;
}

interface MentorProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  expertise: string[];
  rating: number;
  sessions: number;
  responseTime: string;
  price: string;
  available: boolean;
}

export function ProfessionalBrandBuilder({ user }: ProfessionalBrandBuilderProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState('tech');
  const [showWebsiteBuilder, setShowWebsiteBuilder] = useState(false);
  const [showContentCreator, setShowContentCreator] = useState(false);
  const [showLinkedInOptimizer, setShowLinkedInOptimizer] = useState(false);
  const [showSocialManager, setShowSocialManager] = useState(false);
  const [showReputationMonitor, setShowReputationMonitor] = useState(false);
  const [showVideoStudio, setShowVideoStudio] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [websiteData, setWebsiteData] = useState({
    name: user?.name || 'John Doe',
    title: 'Software Engineer',
    bio: 'Passionate about creating innovative solutions and building great products.',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    twitter: 'twitter.com/johndoe',
    template: 'tech',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#06B6D4',
      background: '#F8FAFC'
    },
    layout: 'modern',
    sections: ['hero', 'about', 'skills', 'projects', 'experience', 'contact'],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
    projects: [
      { 
        name: 'E-commerce Platform', 
        tech: 'React, Node.js, MongoDB', 
        description: 'Full-stack e-commerce solution with payment integration' 
      },
      { 
        name: 'Task Management App', 
        tech: 'React Native, Firebase', 
        description: 'Cross-platform mobile app for team collaboration' 
      }
    ]
  });
  const [contentDraft, setContentDraft] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['LinkedIn']);
  const [linkedinProfile, setLinkedinProfile] = useState({
    headline: 'Software Engineer | Building the Future',
    summary: 'Experienced software engineer with 5+ years in full-stack development...',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
    experience: [
      {
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        duration: '2021 - Present',
        description: 'Leading development of scalable web applications...'
      }
    ]
  });
  const [socialPosts, setSocialPosts] = useState<any[]>([]);
  const [reputationData, setReputationData] = useState({
    mentions: 45,
    sentiment: 'positive',
    reach: 12500,
    engagement: 8.5
  });

  // Timer for video recording
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedWebsiteData = localStorage.getItem('websiteData');
    const savedSocialPosts = localStorage.getItem('socialPosts');
    const savedLinkedInProfile = localStorage.getItem('linkedinProfile');
    
    if (savedWebsiteData) setWebsiteData(JSON.parse(savedWebsiteData));
    if (savedSocialPosts) setSocialPosts(JSON.parse(savedSocialPosts));
    if (savedLinkedInProfile) setLinkedinProfile(JSON.parse(savedLinkedInProfile));
  }, []);

  // Save data to localStorage
  const saveData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const tabs = [
    { id: 'dashboard', label: 'Brand Dashboard', icon: BarChart3 },
    { id: 'linkedin', label: 'LinkedIn Optimizer', icon: Linkedin },
    { id: 'website', label: 'Personal Website', icon: Globe },
    { id: 'content', label: 'Content Creator', icon: Edit },
    { id: 'social', label: 'Social Manager', icon: Share },
    { id: 'reputation', label: 'Reputation Monitor', icon: Eye },
    { id: 'thought-leadership', label: 'Thought Leadership', icon: Lightbulb },
    { id: 'video-branding', label: 'Video Branding', icon: Video }
  ];

  const brandMetrics: BrandMetric[] = [
    { label: 'Overall Brand Score', value: 78, maxValue: 100, color: 'blue', trend: 'up', change: '+12 this month' },
    { label: 'LinkedIn Profile Score', value: 85, maxValue: 100, color: 'green', trend: 'up', change: '+8 this week' },
    { label: 'Online Visibility', value: 65, maxValue: 100, color: 'yellow', trend: 'stable', change: 'No change' },
    { label: 'Content Engagement', value: 72, maxValue: 100, color: 'purple', trend: 'up', change: '+15% this month' },
    { label: 'Professional Network', value: 58, maxValue: 100, color: 'orange', trend: 'up', change: '+23 connections' },
    { label: 'Thought Leadership', value: 45, maxValue: 100, color: 'red', trend: 'down', change: '-3 this month' }
  ];

  const contentIdeas: ContentIdea[] = [
    {
      id: '1',
      title: 'Share your biggest career lesson learned this year',
      type: 'post',
      platform: ['LinkedIn', 'Twitter'],
      engagement: 85,
      difficulty: 'easy',
      timeToCreate: '10 minutes',
      trending: true
    },
    {
      id: '2',
      title: 'Create a "Day in the Life" video showing your work routine',
      type: 'video',
      platform: ['LinkedIn', 'Instagram', 'YouTube'],
      engagement: 92,
      difficulty: 'medium',
      timeToCreate: '2 hours',
      trending: true
    },
    {
      id: '3',
      title: 'Write about emerging trends in your industry',
      type: 'article',
      platform: ['LinkedIn', 'Medium'],
      engagement: 78,
      difficulty: 'hard',
      timeToCreate: '3 hours',
      trending: false
    },
    {
      id: '4',
      title: 'Share 5 tools that make you more productive',
      type: 'carousel',
      platform: ['LinkedIn', 'Instagram'],
      engagement: 88,
      difficulty: 'medium',
      timeToCreate: '45 minutes',
      trending: true
    }
  ];

  const mentors: MentorProfile[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'VP of Engineering',
      company: 'Google',
      avatar: '👩‍💼',
      expertise: ['Leadership', 'Personal Branding', 'Tech Career'],
      rating: 4.9,
      sessions: 127,
      responseTime: '< 2 hours',
      price: '$150/hour',
      available: true
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      title: 'Head of Marketing',
      company: 'HubSpot',
      avatar: '👨‍💻',
      expertise: ['Content Strategy', 'LinkedIn Growth', 'Thought Leadership'],
      rating: 4.8,
      sessions: 89,
      responseTime: '< 4 hours',
      price: '$120/hour',
      available: true
    },
    {
      id: '3',
      name: 'Emily Johnson',
      title: 'Design Director',
      company: 'Airbnb',
      avatar: '👩‍🎨',
      expertise: ['Personal Website', 'Visual Branding', 'Portfolio'],
      rating: 4.9,
      sessions: 156,
      responseTime: '< 1 hour',
      price: '$180/hour',
      available: false
    }
  ];

  const websiteTemplates = [
    {
      id: 'tech',
      name: 'Tech Professional',
      description: 'Perfect for developers, engineers, and tech leaders',
      preview: '💻',
      features: ['GitHub integration', 'Project showcase', 'Technical blog', 'Skills matrix'],
      colors: {
        primary: '#3B82F6',
        secondary: '#1E40AF',
        accent: '#06B6D4',
        background: '#F8FAFC'
      },
      layout: 'modern',
      sections: ['hero', 'about', 'skills', 'projects', 'experience', 'contact'],
      defaultContent: {
        name: user?.name || 'John Doe',
        title: 'Senior Software Engineer',
        bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies.',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'MongoDB'],
        projects: [
          { name: 'E-commerce Platform', tech: 'React, Node.js, MongoDB', description: 'Full-stack e-commerce solution with payment integration' },
          { name: 'Task Management App', tech: 'React Native, Firebase', description: 'Cross-platform mobile app for team collaboration' }
        ]
      }
    },
    {
      id: 'creative',
      name: 'Creative Portfolio',
      description: 'Ideal for designers, artists, and creative professionals',
      preview: '🎨',
      features: ['Visual portfolio', 'Case studies', 'Client testimonials', 'Creative process'],
      colors: {
        primary: '#EC4899',
        secondary: '#BE185D',
        accent: '#F59E0B',
        background: '#FDF2F8'
      },
      layout: 'artistic',
      sections: ['hero', 'portfolio', 'about', 'services', 'testimonials', 'contact'],
      defaultContent: {
        name: user?.name || 'Jane Smith',
        title: 'Creative Director & Designer',
        bio: 'Award-winning creative professional with 8+ years of experience in brand design, digital marketing, and visual storytelling.',
        skills: ['Brand Design', 'UI/UX', 'Photography', 'Video Editing', 'Adobe Creative Suite', 'Figma'],
        projects: [
          { name: 'Brand Identity for Tech Startup', tech: 'Illustrator, Photoshop', description: 'Complete brand identity including logo, colors, and guidelines' },
          { name: 'E-commerce Website Design', tech: 'Figma, Webflow', description: 'Modern e-commerce design with focus on user experience' }
        ]
      }
    },
    {
      id: 'executive',
      name: 'Executive Leader',
      description: 'For C-level executives and senior managers',
      preview: '👔',
      features: ['Leadership philosophy', 'Speaking engagements', 'Media coverage', 'Board positions'],
      colors: {
        primary: '#1F2937',
        secondary: '#374151',
        accent: '#D97706',
        background: '#F9FAFB'
      },
      layout: 'professional',
      sections: ['hero', 'about', 'leadership', 'achievements', 'speaking', 'contact'],
      defaultContent: {
        name: user?.name || 'Michael Johnson',
        title: 'Chief Technology Officer',
        bio: 'Visionary technology leader with 15+ years of experience scaling engineering teams and driving digital transformation initiatives.',
        skills: ['Strategic Planning', 'Team Leadership', 'Digital Transformation', 'Product Strategy', 'Agile Methodologies', 'Public Speaking'],
        projects: [
          { name: 'Digital Transformation Initiative', tech: 'Cloud Migration, DevOps', description: 'Led company-wide digital transformation resulting in 40% efficiency gain' },
          { name: 'Engineering Team Scale-up', tech: 'Leadership, Hiring', description: 'Scaled engineering team from 20 to 100+ engineers across 3 countries' }
        ]
      }
    },
    {
      id: 'consultant',
      name: 'Consultant & Coach',
      description: 'For consultants, coaches, and service providers',
      preview: '📊',
      features: ['Service offerings', 'Client results', 'Testimonials', 'Booking system'],
      colors: {
        primary: '#059669',
        secondary: '#047857',
        accent: '#F59E0B',
        background: '#F0FDF4'
      },
      layout: 'service-focused',
      sections: ['hero', 'services', 'about', 'results', 'testimonials', 'booking'],
      defaultContent: {
        name: user?.name || 'Sarah Wilson',
        title: 'Business Strategy Consultant',
        bio: 'Helping businesses achieve sustainable growth through strategic planning, process optimization, and leadership development.',
        skills: ['Business Strategy', 'Process Optimization', 'Leadership Coaching', 'Change Management', 'Data Analysis', 'Project Management'],
        projects: [
          { name: 'Revenue Growth Strategy', tech: 'Strategic Planning, Analytics', description: 'Developed growth strategy that increased client revenue by 150%' },
          { name: 'Operational Excellence Program', tech: 'Process Improvement, Training', description: 'Implemented operational improvements reducing costs by 30%' }
        ]
      }
    }
  ];

  // Initialize with proper template data
  useEffect(() => {
    // Ensure websiteData has all required properties
    if (!websiteData.template || !websiteData.colors) {
      const defaultTemplate = websiteTemplates.find(t => t.id === 'tech');
      if (defaultTemplate) {
        setWebsiteData(prev => ({
          ...prev,
          template: 'tech',
          colors: defaultTemplate.colors,
          layout: defaultTemplate.layout,
          sections: defaultTemplate.sections,
          skills: prev.skills || defaultTemplate.defaultContent.skills,
          projects: prev.projects || defaultTemplate.defaultContent.projects
        }));
      }
    }
  }, []);

  const applyTemplate = (templateId: string) => {
    const template = websiteTemplates.find(t => t.id === templateId);
    if (!template) return;

    // Apply template content to websiteData
    setWebsiteData(prev => ({
      ...prev,
      name: template.defaultContent.name,
      title: template.defaultContent.title,
      bio: template.defaultContent.bio,
      template: templateId,
      colors: template.colors,
      layout: template.layout,
      sections: template.sections,
      skills: template.defaultContent.skills || [],
      projects: template.defaultContent.projects || []
    }));

    // Show success message
    alert(`✅ ${template.name} template applied successfully!\n\n🎨 Template Features:\n${template.features.map(f => `• ${f}`).join('\n')}\n\n💡 You can now customize the content in the website builder.`);
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      hard: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    return colors[difficulty as keyof typeof colors] || colors.medium;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      post: MessageSquare,
      article: FileText,
      video: Video,
      carousel: Image
    };
    return icons[type as keyof typeof icons] || MessageSquare;
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Brand Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">{metric.label}</h3>
              <div className={`flex items-center gap-1 text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 
                metric.trend === 'down' ? 'text-red-600' : 'text-slate-500'
              }`}>
                <TrendingUp className={`w-4 h-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                {metric.change}
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{metric.value}</span>
                <span className="text-sm text-slate-500">/{metric.maxValue}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(metric.value / metric.maxValue) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className={`h-2 rounded-full bg-${metric.color}-500`}
                />
              </div>
            </div>
            
            {/* Improvement Button */}
            <button
              onClick={() => {
                const improvements = {
                  'Overall Brand Score': 'Focus on LinkedIn optimization and content creation to boost your overall brand presence.',
                  'LinkedIn Profile Score': 'Add more skills, get endorsements, and update your headline with industry keywords.',
                  'Online Visibility': 'Create more content, engage with industry posts, and optimize your website SEO.',
                  'Content Engagement': 'Post more frequently, use trending hashtags, and engage with your audience.',
                  'Professional Network': 'Connect with industry professionals, join relevant groups, and attend networking events.',
                  'Thought Leadership': 'Write industry articles, speak at events, and share expert insights regularly.'
                };
                alert(`💡 Improvement Tips for ${metric.label}:\n\n${improvements[metric.label as keyof typeof improvements]}`);
              }}
              className="w-full mt-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors text-sm font-medium"
            >
              Get Improvement Tips
            </button>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Optimize LinkedIn', icon: Linkedin, action: () => setActiveTab('linkedin'), color: 'blue' },
            { label: 'Create Content', icon: Edit, action: () => setActiveTab('content'), color: 'green' },
            { label: 'Build Website', icon: Globe, action: () => setActiveTab('website'), color: 'purple' },
            { label: 'Monitor Reputation', icon: Eye, action: () => setActiveTab('reputation'), color: 'orange' }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.action}
                className={`p-4 bg-${action.color}-50 dark:bg-${action.color}-900/20 rounded-xl hover:bg-${action.color}-100 dark:hover:bg-${action.color}-900/30 transition-colors`}
              >
                <Icon className={`w-8 h-8 text-${action.color}-600 dark:text-${action.color}-400 mx-auto mb-2`} />
                <p className={`text-sm font-medium text-${action.color}-700 dark:text-${action.color}-300`}>
                  {action.label}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Brand Activity</h3>
          <button
            onClick={() => {
              const activityReport = `📊 Brand Activity Report:\n\n• LinkedIn posts: 12 this month\n• Website visitors: 1,247 (+23%)\n• Brand mentions: 45 (+8%)\n• Content engagement: 8.2% (+15%)\n• Profile views: 234 (+12%)\n\n🎯 Next Actions:\n• Schedule 3 more posts this week\n• Update LinkedIn headline\n• Respond to brand mentions`;
              alert(activityReport);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            View Full Report
          </button>
        </div>
        <div className="space-y-4">
          {[
            { action: 'LinkedIn post published', time: '2 hours ago', impact: '+12 profile views', type: 'success' },
            { action: 'Personal website updated', time: '1 day ago', impact: '+5 new visitors', type: 'info' },
            { action: 'Mentioned in industry article', time: '3 days ago', impact: '+8 brand mentions', type: 'success' },
            { action: 'Speaking opportunity declined', time: '1 week ago', impact: 'Missed visibility', type: 'warning' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-white">{activity.action}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{activity.time} • {activity.impact}</p>
              </div>
              <button
                onClick={() => {
                  const details = {
                    'LinkedIn post published': 'Post: "5 Tips for Career Growth"\n• Reach: 1,234 people\n• Engagement: 89 likes, 12 comments\n• Click-through rate: 3.2%',
                    'Personal website updated': 'Updates:\n• Added new project showcase\n• Updated bio section\n• Optimized for mobile\n• Added contact form',
                    'Mentioned in industry article': 'Article: "Top Tech Leaders to Follow"\n• Publication: TechCrunch\n• Reach: 50K+ readers\n• Backlink value: High',
                    'Speaking opportunity declined': 'Event: Tech Conference 2024\n• Reason: Schedule conflict\n• Impact: Missed 500+ audience\n• Alternative: Recorded video message'
                  };
                  alert(`📋 Activity Details:\n\n${details[activity.action as keyof typeof details]}`);
                }}
                className="px-3 py-1 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded text-sm hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
              >
                Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Goals */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Brand Goals</h3>
          <button
            onClick={() => {
              const goal = prompt('Set a new brand goal:');
              if (goal) {
                const goals = JSON.parse(localStorage.getItem('brandGoals') || '[]');
                goals.push({
                  id: Date.now(),
                  goal,
                  createdAt: new Date().toLocaleDateString(),
                  completed: false
                });
                localStorage.setItem('brandGoals', JSON.stringify(goals));
                alert('Brand goal added successfully!');
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Goal
          </button>
        </div>
        <div className="space-y-3">
          {[
            { goal: 'Reach 5K LinkedIn followers', progress: 68, target: '5,000', current: '3,400' },
            { goal: 'Publish 20 articles this year', progress: 45, target: '20', current: '9' },
            { goal: 'Speak at 3 conferences', progress: 33, target: '3', current: '1' }
          ].map((item, index) => (
            <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-slate-900 dark:text-white">{item.goal}</p>
                <span className="text-sm text-slate-600 dark:text-slate-400">{item.current}/{item.target}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 mb-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 font-medium">{item.progress}% complete</span>
                <button
                  onClick={() => {
                    const tips = {
                      'Reach 5K LinkedIn followers': '• Post consistently (3-5 times/week)\n• Engage with others\' content\n• Share valuable insights\n• Use relevant hashtags\n• Connect with industry peers',
                      'Publish 20 articles this year': '• Set weekly writing schedule\n• Create content calendar\n• Repurpose existing content\n• Guest post on other platforms\n• Share personal experiences',
                      'Speak at 3 conferences': '• Apply to CFPs early\n• Build speaker portfolio\n• Network with event organizers\n• Start with local meetups\n• Create compelling talk proposals'
                    };
                    alert(`💡 Tips to achieve "${item.goal}":\n\n${tips[item.goal as keyof typeof tips]}`);
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Get Tips
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContentCreator = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Content Creation Assistant</h2>
          <p className="text-slate-600 dark:text-slate-400">AI-powered content ideas and creation tools</p>
        </div>
        <button 
          onClick={() => setShowContentCreator(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Content
        </button>
      </div>

      {/* Content Ideas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {contentIdeas.map((idea, index) => {
          const TypeIcon = getTypeIcon(idea.type);
          return (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <TypeIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{idea.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(idea.difficulty)}`}>
                        {idea.difficulty}
                      </span>
                      <span className="text-xs text-slate-500">{idea.timeToCreate}</span>
                    </div>
                  </div>
                </div>
                {idea.trending && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                    <Zap className="w-3 h-3" />
                    Trending
                  </div>
                )}
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Platforms:</span>
                  <div className="flex gap-1">
                    {idea.platform.map((platform) => (
                      <span key={platform} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-xs">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Expected Engagement:</span>
                  <div className="flex items-center gap-1">
                    <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${idea.engagement}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-green-600">{idea.engagement}%</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setContentDraft(idea.title);
                    setSelectedPlatforms(idea.platform);
                    setShowContentCreator(true);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Now
                </button>
                <button 
                  onClick={() => {
                    const savedIdeas = JSON.parse(localStorage.getItem('savedContentIdeas') || '[]');
                    savedIdeas.push(idea);
                    localStorage.setItem('savedContentIdeas', JSON.stringify(savedIdeas));
                    alert('Content idea saved for later!');
                  }}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Save for Later
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Posts */}
      {socialPosts.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Posts</h3>
          <div className="space-y-4">
            {socialPosts.slice(0, 3).map((post, index) => (
              <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {post.platforms.map((platform: string) => (
                      <span key={platform} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs">
                        {platform}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-slate-500">{post.createdAt}</span>
                </div>
                <p className="text-slate-900 dark:text-white">{post.content}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                  <span>👍 {post.likes || 0}</span>
                  <span>💬 {post.comments || 0}</span>
                  <span>🔄 {post.shares || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Calendar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Content Calendar</h3>
          <button 
            onClick={() => {
              const calendarData = {
                posts: socialPosts,
                scheduledPosts: 5,
                drafts: 3,
                ideas: contentIdeas.length
              };
              alert(`Content Calendar:\n• Published: ${socialPosts.length}\n• Scheduled: ${calendarData.scheduledPosts}\n• Drafts: ${calendarData.drafts}\n• Ideas: ${calendarData.ideas}`);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            View Full Calendar
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 text-center">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="p-2 text-sm font-medium text-slate-600 dark:text-slate-400">
              {day}
            </div>
          ))}
          {Array.from({ length: 14 }, (_, i) => (
            <div key={i} className="p-2 text-sm border border-slate-200 dark:border-slate-700 rounded">
              {i + 1}
              {i === 2 && <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1" />}
              {i === 5 && <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1" />}
              {i === 9 && <div className="w-2 h-2 bg-purple-500 rounded-full mx-auto mt-1" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWebsiteBuilder = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Personal Website Builder</h2>
          <p className="text-slate-600 dark:text-slate-400">Create a professional website in minutes</p>
        </div>
        <button 
          onClick={() => setShowWebsiteBuilder(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Start Building
        </button>
      </div>

      {/* Template Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Choose Your Template</h3>
            <p className="text-slate-600 dark:text-slate-400">Select a professional template that matches your industry and style</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                const comparison = `📊 Template Comparison Guide\n\n💻 Tech Professional:\n• Best for: Developers, Engineers, Tech Leaders\n• Features: GitHub integration, Project showcase, Technical blog\n• Style: Modern, Clean, Code-focused\n• Colors: Blue & Cyan gradient\n\n🎨 Creative Portfolio:\n• Best for: Designers, Artists, Creative Professionals\n• Features: Visual portfolio, Case studies, Creative process\n• Style: Artistic, Visual-heavy, Colorful\n• Colors: Pink & Orange gradient\n\n👔 Executive Leader:\n• Best for: C-level Executives, Senior Managers\n• Features: Leadership philosophy, Speaking engagements, Media coverage\n• Style: Professional, Authoritative, Corporate\n• Colors: Gray & Orange accent\n\n📊 Consultant & Coach:\n• Best for: Consultants, Coaches, Service Providers\n• Features: Service offerings, Client results, Booking system\n• Style: Service-focused, Results-driven, Trust-building\n• Colors: Green & Emerald gradient\n\n💡 Choose based on your industry and personal brand goals!`;
                alert(comparison);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Compare Templates
            </button>
            <button 
              onClick={() => {
                const debugInfo = `🔧 Template Debug Info\n\nCurrent Template: ${selectedTemplate}\nWebsite Data: ${JSON.stringify(websiteData, null, 2)}\n\nTemplates Available: ${websiteTemplates.length}\nTemplate Names: ${websiteTemplates.map(t => t.name).join(', ')}`;
                console.log('Debug Info:', debugInfo);
                alert('Debug info logged to console. Check browser developer tools.');
              }}
              className="flex items-center gap-2 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/30 transition-colors text-sm"
            >
              🔧 Debug
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {websiteTemplates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border-2 cursor-pointer transition-all ${
                selectedTemplate === template.id 
                  ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 shadow-xl' 
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">{template.preview}</div>
                <h3 className="font-bold text-slate-900 dark:text-white">{template.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{template.description}</p>
              </div>
              
              <div className="space-y-2 mb-4">
                {template.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Color scheme preview */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-slate-500">Colors:</span>
                <div className="flex gap-1">
                  <div 
                    className="w-4 h-4 rounded-full border border-slate-200" 
                    style={{ backgroundColor: template.colors.primary }}
                  ></div>
                  <div 
                    className="w-4 h-4 rounded-full border border-slate-200" 
                    style={{ backgroundColor: template.colors.secondary }}
                  ></div>
                  <div 
                    className="w-4 h-4 rounded-full border border-slate-200" 
                    style={{ backgroundColor: template.colors.accent }}
                  ></div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Show template demo
                    const demoContent = `🎨 ${template.name} Template Demo\n\n${template.description}\n\n🎯 Perfect for:\n${template.defaultContent.title}\n\n📋 Includes:\n${template.features.map(f => `• ${f}`).join('\n')}\n\n🎨 Color Scheme:\n• Primary: ${template.colors.primary}\n• Secondary: ${template.colors.secondary}\n• Accent: ${template.colors.accent}\n\n📄 Sections:\n${template.sections.map(s => `• ${s.charAt(0).toUpperCase() + s.slice(1)}`).join('\n')}\n\n💡 Sample Content:\n• Name: ${template.defaultContent.name}\n• Title: ${template.defaultContent.title}\n• Bio: ${template.defaultContent.bio.substring(0, 100)}...\n\n🚀 Ready to use this template?`;
                    alert(demoContent);
                  }}
                  className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm"
                >
                  👁️ Demo
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    try {
                      applyTemplate(template.id);
                    } catch (error) {
                      console.error('Error applying template:', error);
                      alert('Error applying template. Please try again.');
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Apply Template
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    try {
                      setSelectedTemplate(template.id);
                      applyTemplate(template.id);
                      setShowWebsiteBuilder(true);
                    } catch (error) {
                      console.error('Error using template:', error);
                      alert('Error using template. Please try again.');
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Use & Edit
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Website Preview */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Website Preview</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                const websiteUrl = `https://${websiteData.website}`;
                navigator.clipboard.writeText(websiteUrl);
                alert('Website URL copied to clipboard!');
              }}
              className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy URL
            </button>
            <button 
              onClick={() => {
                const analytics = `📊 Website Analytics:\n\n• Monthly Visitors: 1,247 (+23%)\n• Page Views: 3,891 (+15%)\n• Bounce Rate: 32% (-8%)\n• Avg. Session: 2:34 (+12%)\n• Contact Forms: 28 (+45%)\n• Top Pages:\n  - Home: 45%\n  - Portfolio: 28%\n  - About: 18%\n  - Contact: 9%\n\n🎯 Recommendations:\n• Add more portfolio items\n• Optimize contact form\n• Create blog section`;
                alert(analytics);
              }}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
            <button 
              onClick={() => {
                window.open(`https://${websiteData.website}`, '_blank');
              }}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Preview
            </button>
          </div>
        </div>
        
        <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 min-h-64">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                {websiteData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{websiteData.name}</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">{websiteData.title}</p>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{websiteData.bio}</p>
            </div>
            
            <div className="flex justify-center gap-4 mb-6">
              <button 
                onClick={() => {
                  const contactInfo = `📧 Contact Information:\n\nEmail: ${websiteData.email}\nPhone: ${websiteData.phone}\nLocation: ${websiteData.location}\nWebsite: ${websiteData.website}\nLinkedIn: ${websiteData.linkedin}`;
                  alert(contactInfo);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact
              </button>
              <button 
                onClick={() => {
                  const resumeData = `📄 Resume Download:\n\n• Format: PDF\n• Size: 2.3 MB\n• Last Updated: ${new Date().toLocaleDateString()}\n• Sections: Experience, Education, Skills, Projects\n• ATS Optimized: Yes\n\nResume would be downloaded in a real application.`;
                  alert(resumeData);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Resume
              </button>
              <button 
                onClick={() => {
                  const portfolio = `🎨 Portfolio Highlights:\n\n• Project 1: E-commerce Platform\n  - Tech: React, Node.js, MongoDB\n  - Impact: 40% increase in sales\n\n• Project 2: Mobile App\n  - Tech: React Native, Firebase\n  - Users: 10K+ downloads\n\n• Project 3: Data Dashboard\n  - Tech: Python, D3.js, PostgreSQL\n  - Efficiency: 60% time savings`;
                  alert(portfolio);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                Portfolio
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Experience</h3>
                <p className="text-slate-600 dark:text-slate-400">5+ Years</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Projects</h3>
                <p className="text-slate-600 dark:text-slate-400">50+ Completed</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Clients</h3>
                <p className="text-slate-600 dark:text-slate-400">25+ Happy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Website Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Monthly Visitors', value: '1,247', change: '+23%', icon: Users, details: 'Unique visitors this month with 23% growth from last month. Top traffic sources: Google (45%), LinkedIn (28%), Direct (27%)' },
          { label: 'Page Views', value: '3,891', change: '+15%', icon: Eye, details: 'Total page views with 15% increase. Most viewed pages: Home (45%), Portfolio (28%), About (18%), Contact (9%)' },
          { label: 'Contact Forms', value: '28', change: '+45%', icon: MessageSquare, details: 'Contact form submissions with 45% increase. Response rate: 89%. Average response time: 2.3 hours' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label} 
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
              onClick={() => alert(`📊 ${stat.label} Details:\n\n${stat.details}`)}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  const actions = {
                    'Monthly Visitors': 'SEO optimization, social media promotion, content marketing',
                    'Page Views': 'Internal linking, related content suggestions, page load optimization',
                    'Contact Forms': 'Form optimization, clear CTAs, trust signals'
                  };
                  alert(`💡 Ways to improve ${stat.label}:\n\n• ${actions[stat.label as keyof typeof actions]?.split(', ').join('\n• ')}`);
                }}
                className="w-full mt-3 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors text-sm"
              >
                Improve This Metric
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Professional Brand Builder
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Build and optimize your professional brand across all platforms
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'content' && renderContentCreator()}
          {activeTab === 'website' && renderWebsiteBuilder()}
          {activeTab === 'linkedin' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">LinkedIn Optimization</h2>
                  <p className="text-slate-600 dark:text-slate-400">Optimize your LinkedIn profile for maximum visibility</p>
                </div>
                <button 
                  onClick={() => setShowLinkedInOptimizer(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  Optimize Profile
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Profile Score</h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">85/100</div>
                    <p className="text-slate-600 dark:text-slate-400">Your profile is performing well!</p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        const suggestions = `🎯 LinkedIn Headline Optimization:\n\nCurrent: "${linkedinProfile.headline}"\n\n✅ Improvements:\n• Add specific years of experience\n• Include key technologies/skills\n• Mention your unique value proposition\n• Use industry keywords\n\n💡 Suggested Headlines:\n• "Senior Software Engineer | 5+ Years Building Scalable Web Apps | React, Node.js, AWS Expert"\n• "Full-Stack Developer | Transforming Ideas into Digital Solutions | JavaScript, Python, Cloud Architecture"\n• "Software Engineer | Building the Future of Tech | React • Node.js • AI/ML Enthusiast"`;
                        alert(suggestions);
                      }}
                      className="w-full px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors text-left"
                    >
                      Optimize Headline
                    </button>
                    <button 
                      onClick={() => {
                        const improvements = `📝 LinkedIn Summary Enhancement:\n\nCurrent length: ${linkedinProfile.summary.length} characters\n\n✅ Improvements needed:\n• Add quantifiable achievements\n• Include specific metrics/results\n• Add a clear call-to-action\n• Use industry keywords\n• Tell your story\n\n💡 Template:\n"I'm a [ROLE] with [X] years of experience in [INDUSTRY]. I've helped [TYPE OF COMPANIES] achieve [SPECIFIC RESULTS].\n\nKey achievements:\n• [Achievement 1 with metrics]\n• [Achievement 2 with metrics]\n• [Achievement 3 with metrics]\n\nI'm passionate about [YOUR INTERESTS] and always looking to [YOUR GOALS].\n\nLet's connect if you're interested in [CALL TO ACTION]."`;
                        alert(improvements);
                      }}
                      className="w-full px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors text-left"
                    >
                      Improve Summary
                    </button>
                    <button 
                      onClick={() => {
                        const skillsAdvice = `🎯 LinkedIn Skills Optimization:\n\nCurrent skills: ${linkedinProfile.skills.join(', ')}\n\n✅ Trending skills to add:\n• TypeScript (High demand)\n• Docker & Kubernetes\n• GraphQL\n• Microservices\n• CI/CD\n• Terraform\n• Next.js\n• PostgreSQL\n\n💡 Tips:\n• Get endorsements from colleagues\n• Take LinkedIn skill assessments\n• Add skills mentioned in job postings\n• Prioritize skills with high search volume\n• Remove outdated technologies\n\n🎖️ Skill Assessment Benefits:\n• Skill badge on profile\n• Higher search ranking\n• Increased credibility`;
                        alert(skillsAdvice);
                      }}
                      className="w-full px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors text-left"
                    >
                      Add Skills
                    </button>
                    <button 
                      onClick={() => {
                        const experienceAdvice = `💼 LinkedIn Experience Optimization:\n\nCurrent experience: ${linkedinProfile.experience.length} position(s)\n\n✅ Enhancement tips:\n• Use action verbs (Led, Developed, Implemented)\n• Include quantifiable results\n• Add relevant keywords\n• Mention technologies used\n• Highlight achievements, not just duties\n\n📊 Example format:\n"Led development of e-commerce platform using React and Node.js, resulting in 40% increase in user engagement and $2M additional revenue. Managed team of 5 developers and implemented CI/CD pipeline reducing deployment time by 60%."\n\n🎯 Keywords to include:\n• Programming languages\n• Frameworks & tools\n• Methodologies (Agile, Scrum)\n• Industry terms\n• Soft skills`;
                        alert(experienceAdvice);
                      }}
                      className="w-full px-4 py-2 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/30 transition-colors text-left"
                    >
                      Enhance Experience
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Social Media Manager</h2>
                  <p className="text-slate-600 dark:text-slate-400">Manage all your social media platforms in one place</p>
                </div>
                <button 
                  onClick={() => setShowSocialManager(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Share className="w-4 h-4" />
                  Manage Accounts
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { platform: 'LinkedIn', followers: '2.5K', engagement: '8.2%', posts: 24, color: 'blue' },
                  { platform: 'Twitter', followers: '1.8K', engagement: '5.7%', posts: 18, color: 'sky' },
                  { platform: 'Instagram', followers: '950', engagement: '12.1%', posts: 12, color: 'pink' }
                ].map((social) => (
                  <div key={social.platform} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-900 dark:text-white">{social.platform}</h3>
                      <div className={`w-3 h-3 rounded-full bg-${social.color}-500`} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Followers</span>
                        <span className="font-medium text-slate-900 dark:text-white">{social.followers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Engagement</span>
                        <span className="font-medium text-green-600">{social.engagement}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Posts</span>
                        <span className="font-medium text-slate-900 dark:text-white">{social.posts}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const managementFeatures = {
                          'LinkedIn': `🔵 LinkedIn Management:\n\n📊 Current Stats:\n• Followers: 2.5K (+23% this month)\n• Engagement Rate: 8.2%\n• Posts this month: 24\n• Profile views: 1,234\n\n🚀 Available Actions:\n• Schedule posts\n• Analyze post performance\n• Track profile views\n• Monitor mentions\n• Export analytics\n• Optimize posting times\n\n💡 Recommendations:\n• Post 3-5 times per week\n• Share industry insights\n• Engage with others' content\n• Use relevant hashtags`,
                          'Twitter': `🐦 Twitter Management:\n\n📊 Current Stats:\n• Followers: 1.8K (+15% this month)\n• Engagement Rate: 5.7%\n• Tweets this month: 18\n• Impressions: 45.2K\n\n🚀 Available Actions:\n• Schedule tweets\n• Track hashtag performance\n• Monitor mentions & replies\n• Analyze follower growth\n• Find trending topics\n• Engage with community\n\n💡 Recommendations:\n• Tweet daily\n• Use trending hashtags\n• Participate in Twitter chats\n• Share quick insights`,
                          'Instagram': `📸 Instagram Management:\n\n📊 Current Stats:\n• Followers: 950 (+12% this month)\n• Engagement Rate: 12.1%\n• Posts this month: 12\n• Story views: 2.3K avg\n\n🚀 Available Actions:\n• Schedule posts & stories\n• Track hashtag reach\n• Monitor story analytics\n• Analyze best posting times\n• Manage direct messages\n• Create content calendar\n\n💡 Recommendations:\n• Post 3-4 times per week\n• Use Instagram Stories daily\n• Share behind-the-scenes content\n• Use location tags`
                        };
                        alert(managementFeatures[social.platform as keyof typeof managementFeatures]);
                      }}
                      className="w-full mt-4 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      Manage
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'reputation' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Reputation Monitor</h2>
                  <p className="text-slate-600 dark:text-slate-400">Track your online reputation and brand mentions</p>
                </div>
                <button 
                  onClick={() => setShowReputationMonitor(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Monitor Reputation
                </button>
                <button 
                  onClick={() => {
                    const reputationReport = `📊 Reputation Monitoring Report:\n\n🔍 Brand Mentions: ${reputationData.mentions}\n• Positive: 78% (35 mentions)\n• Neutral: 18% (8 mentions)\n• Negative: 4% (2 mentions)\n\n📈 Sentiment Trend: ${reputationData.sentiment}\n• This week: +12% improvement\n• Top positive keywords: "expert", "innovative", "reliable"\n• Areas to address: "response time"\n\n🌐 Reach: ${(reputationData.reach / 1000).toFixed(1)}K people\n• LinkedIn: 45%\n• Twitter: 28%\n• Industry blogs: 18%\n• News articles: 9%\n\n💡 Action Items:\n• Respond to 2 pending mentions\n• Share positive testimonials\n• Address response time concerns`;
                    alert(reputationReport);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  Full Report
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { 
                    label: 'Brand Mentions', 
                    value: reputationData.mentions, 
                    icon: MessageSquare, 
                    color: 'blue',
                    details: `📢 Brand Mentions Breakdown:\n\n• Total mentions: ${reputationData.mentions}\n• This week: 12 (+20%)\n• Sources:\n  - LinkedIn: 18 mentions\n  - Twitter: 15 mentions\n  - Industry blogs: 8 mentions\n  - News articles: 4 mentions\n\n🔍 Recent mentions:\n• "Great insights on software architecture"\n• "Innovative approach to problem solving"\n• "Excellent presentation at tech conference"\n\n⚡ Action needed:\n• Respond to 3 mentions\n• Thank 5 positive mentions`
                  },
                  { 
                    label: 'Sentiment', 
                    value: reputationData.sentiment, 
                    icon: TrendingUp, 
                    color: 'green',
                    details: `😊 Sentiment Analysis:\n\n• Overall sentiment: ${reputationData.sentiment}\n• Positive: 78% (35 mentions)\n• Neutral: 18% (8 mentions)\n• Negative: 4% (2 mentions)\n\n📈 Trend: +12% improvement this month\n\n🎯 Positive keywords:\n• "Expert" (mentioned 15 times)\n• "Innovative" (mentioned 12 times)\n• "Reliable" (mentioned 8 times)\n\n⚠️ Areas to improve:\n• Response time (2 mentions)\n• Communication clarity (1 mention)`
                  },
                  { 
                    label: 'Reach', 
                    value: `${(reputationData.reach / 1000).toFixed(1)}K`, 
                    icon: Users, 
                    color: 'purple',
                    details: `🌐 Reach Analytics:\n\n• Total reach: ${reputationData.reach.toLocaleString()} people\n• Growth: +15% this month\n• Unique impressions: 8,750\n\n📊 Platform breakdown:\n• LinkedIn: 5,625 (45%)\n• Twitter: 3,500 (28%)\n• Industry blogs: 2,250 (18%)\n• News articles: 1,125 (9%)\n\n🎯 Top performing content:\n• LinkedIn article: 2.1K reach\n• Twitter thread: 1.8K reach\n• Conference talk: 1.5K reach`
                  },
                  { 
                    label: 'Engagement', 
                    value: `${reputationData.engagement}%`, 
                    icon: Star, 
                    color: 'orange',
                    details: `⭐ Engagement Metrics:\n\n• Engagement rate: ${reputationData.engagement}%\n• Industry average: 6.2%\n• Performance: +37% above average\n\n💬 Engagement breakdown:\n• Likes: 456 (+22%)\n• Comments: 89 (+35%)\n• Shares: 67 (+18%)\n• Saves: 34 (+45%)\n\n🏆 Best performing posts:\n• Career advice post: 12.4% engagement\n• Technical tutorial: 10.8% engagement\n• Industry insights: 9.6% engagement\n\n💡 Optimization tips:\n• Post during peak hours (9-11 AM)\n• Use more visual content\n• Ask engaging questions`
                  }
                ].map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div 
                      key={metric.label} 
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                      onClick={() => alert(metric.details)}
                    >
                      <Icon className={`w-8 h-8 text-${metric.color}-600 dark:text-${metric.color}-400 mb-3`} />
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{metric.value}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">{metric.label}</div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const actions = {
                            'Brand Mentions': 'Set up Google Alerts, monitor social media, respond to mentions promptly',
                            'Sentiment': 'Address negative feedback, amplify positive mentions, improve communication',
                            'Reach': 'Create shareable content, collaborate with influencers, optimize posting times',
                            'Engagement': 'Ask questions, respond to comments, create interactive content'
                          };
                          alert(`💡 Ways to improve ${metric.label}:\n\n• ${actions[metric.label as keyof typeof actions]?.split(', ').join('\n• ')}`);
                        }}
                        className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm"
                      >
                        Improve This
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
          {activeTab === 'thought-leadership' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Thought Leadership</h2>
                  <p className="text-slate-600 dark:text-slate-400">Build your authority and expertise in your field</p>
                </div>
                <button 
                  onClick={() => {
                    const opportunities = `🎤 Thought Leadership Opportunities:\n\n📅 Speaking Opportunities:\n• Tech Conference 2024 (March 15) - Applied\n• Industry Summit (April 22) - Invited\n• Webinar Series (May 10) - Confirmed\n• Local Meetup (Monthly) - Regular speaker\n\n✍️ Writing Opportunities:\n• Industry publications seeking guest authors\n• Company blog contributions\n• LinkedIn newsletter collaboration\n• Podcast guest appearances\n\n🏆 Authority Building:\n• Mentor junior developers\n• Judge hackathons\n• Contribute to open source\n• Host technical workshops\n\n💡 Next Steps:\n• Apply to 3 more conferences\n• Pitch article ideas to publications\n• Start a technical newsletter\n• Create video content series`;
                    alert(opportunities);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Lightbulb className="w-4 h-4" />
                  Find Opportunities
                </button>
                <button 
                  onClick={() => {
                    const authorityScore = `📊 Thought Leadership Score: 72/100\n\n🎯 Breakdown:\n• Speaking engagements: 15/20\n• Published articles: 12/20\n• Social media influence: 18/20\n• Industry recognition: 14/20\n• Mentoring activity: 13/20\n\n🚀 Improvement areas:\n• Increase speaking frequency\n• Write more technical articles\n• Engage more on social media\n• Seek industry awards/recognition\n\n💡 Quick wins:\n• Submit to 2 more conferences\n• Write 1 article per month\n• Comment on industry posts daily\n• Offer to mentor 2 people`;
                    alert(authorityScore);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Award className="w-4 h-4" />
                  Authority Score
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Speaking Opportunities</h3>
                  <div className="space-y-3">
                    {[
                      { event: 'Tech Conference 2024', date: 'March 15', status: 'Applied', topic: 'Microservices Architecture', audience: '500+' },
                      { event: 'Industry Summit', date: 'April 22', status: 'Invited', topic: 'AI in Software Development', audience: '1000+' },
                      { event: 'Webinar Series', date: 'May 10', status: 'Confirmed', topic: 'Career Growth in Tech', audience: '300+' }
                    ].map((opportunity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 dark:text-white">{opportunity.event}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{opportunity.date} • {opportunity.topic}</p>
                          <p className="text-xs text-slate-500">Expected audience: {opportunity.audience}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            opportunity.status === 'Confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            opportunity.status === 'Invited' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {opportunity.status}
                          </span>
                          <button
                            onClick={() => {
                              const details = {
                                'Tech Conference 2024': 'Application submitted on Jan 15. Topic: Microservices Architecture. Expected decision: Feb 20. Preparation needed: 45-min presentation + Q&A.',
                                'Industry Summit': 'Invited as keynote speaker. Topic: AI in Software Development. Confirmed attendance: 1000+ professionals. Honorarium: $5,000.',
                                'Webinar Series': 'Confirmed speaker for monthly series. Topic: Career Growth in Tech. Live Q&A session included. Recording will be shared.'
                              };
                              alert(`📋 ${opportunity.event} Details:\n\n${details[opportunity.event as keyof typeof details]}`);
                            }}
                            className="px-2 py-1 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Content Ideas</h3>
                  <div className="space-y-3">
                    {[
                      'Future of AI in Software Development',
                      'Building Scalable Systems at Scale',
                      'Leadership Lessons from Tech Industry'
                    ].map((idea, index) => (
                      <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <p className="font-medium text-slate-900 dark:text-white">{idea}</p>
                        <button 
                          onClick={() => {
                            setContentDraft(idea);
                            setShowContentCreator(true);
                          }}
                          className="text-sm text-blue-600 hover:underline mt-1"
                        >
                          Create Content
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'video-branding' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Video Branding Studio</h2>
                  <p className="text-slate-600 dark:text-slate-400">Create professional videos to enhance your personal brand</p>
                </div>
                <button 
                  onClick={() => setShowVideoStudio(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Video className="w-4 h-4" />
                  Start Recording
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Video Templates</h3>
                  <div className="space-y-3">
                    {[
                      { title: 'Professional Introduction', duration: '30s', difficulty: 'Easy', views: '2.1K', engagement: '8.5%' },
                      { title: 'Industry Insights', duration: '2-3min', difficulty: 'Medium', views: '1.8K', engagement: '12.3%' },
                      { title: 'Tutorial/How-to', duration: '5-10min', difficulty: 'Hard', views: '3.2K', engagement: '15.7%' }
                    ].map((template, index) => (
                      <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{template.title}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{template.duration}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty.toLowerCase())}`}>
                            {template.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mb-2 text-xs text-slate-600 dark:text-slate-400">
                          <span>👁️ {template.views}</span>
                          <span>📊 {template.engagement} engagement</span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setShowVideoStudio(true)}
                            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            Use Template
                          </button>
                          <button 
                            onClick={() => {
                              const templateDetails = {
                                'Professional Introduction': 'Perfect for LinkedIn profile videos and website headers. Script includes: Personal introduction, role & expertise, unique value proposition, call-to-action. Optimal length: 30 seconds.',
                                'Industry Insights': 'Share your expertise on current trends. Format: Hook (5s), main insight (90s), actionable tip (30s), engagement question (5s). Best for LinkedIn and Twitter.',
                                'Tutorial/How-to': 'Educational content that showcases expertise. Structure: Problem introduction, step-by-step solution, recap, resources. Great for YouTube and LinkedIn.'
                              };
                              alert(`🎬 ${template.title} Template:\n\n${templateDetails[template.title as keyof typeof templateDetails]}`);
                            }}
                            className="px-3 py-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors text-sm"
                          >
                            Preview
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Videos</h3>
                  <div className="space-y-3">
                    {[
                      { title: 'My Career Journey', views: '1.2K', likes: '89', comments: '23', shares: '12', platform: 'LinkedIn' },
                      { title: 'Tech Trends 2024', views: '856', likes: '67', comments: '18', shares: '8', platform: 'Twitter' },
                      { title: 'Day in My Life', views: '2.1K', likes: '156', comments: '34', shares: '28', platform: 'Instagram' }
                    ].map((video, index) => (
                      <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-slate-900 dark:text-white">{video.title}</p>
                          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">
                            {video.platform}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mb-2 text-sm text-slate-600 dark:text-slate-400">
                          <span>👁️ {video.views}</span>
                          <span>👍 {video.likes}</span>
                          <span>💬 {video.comments}</span>
                          <span>🔄 {video.shares}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const videoDetails = {
                                'My Career Journey': 'Published 3 days ago. 2:45 duration. Shared personal story from junior to senior developer. High engagement from career-focused audience.',
                                'Tech Trends 2024': 'Published 1 week ago. 1:30 duration. Covered AI, cloud computing, and remote work trends. Sparked good discussion in comments.',
                                'Day in My Life': 'Published 2 weeks ago. 3:20 duration. Behind-the-scenes look at daily routine. Most popular video this month.'
                              };
                              alert(`📹 ${video.title} Analytics:\n\n${videoDetails[video.title as keyof typeof videoDetails]}\n\n📊 Performance:\n• Views: ${video.views}\n• Engagement rate: ${((parseInt(video.likes) + parseInt(video.comments) + parseInt(video.shares)) / parseInt(video.views.replace('K', '00').replace('.', '')) * 100).toFixed(1)}%\n• Platform: ${video.platform}`);
                            }}
                            className="flex-1 px-3 py-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors text-sm"
                          >
                            View Analytics
                          </button>
                          <button
                            onClick={() => {
                              const shareText = `Check out my latest video: "${video.title}" - ${video.views} views and growing! 🚀`;
                              navigator.clipboard.writeText(shareText);
                              alert('Share text copied to clipboard!');
                            }}
                            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            Share
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Content Creator Modal */}
      <AnimatePresence>
        {showContentCreator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowContentCreator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create Content</h2>
                <button
                  onClick={() => setShowContentCreator(false)}
                  className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Content
                  </label>
                  <textarea
                    rows={6}
                    value={contentDraft}
                    onChange={(e) => setContentDraft(e.target.value)}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white resize-none"
                    placeholder="Write your content here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Platforms
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['LinkedIn', 'Twitter', 'Instagram', 'Facebook', 'Medium'].map((platform) => (
                      <button
                        key={platform}
                        onClick={() => {
                          if (selectedPlatforms.includes(platform)) {
                            setSelectedPlatforms(prev => prev.filter(p => p !== platform));
                          } else {
                            setSelectedPlatforms(prev => [...prev, platform]);
                          }
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedPlatforms.includes(platform)
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowContentCreator(false)}
                    className="flex-1 py-3 px-6 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const newPost = {
                        content: contentDraft,
                        platforms: selectedPlatforms,
                        createdAt: new Date().toLocaleDateString(),
                        likes: Math.floor(Math.random() * 100),
                        comments: Math.floor(Math.random() * 20),
                        shares: Math.floor(Math.random() * 10)
                      };
                      const updatedPosts = [...socialPosts, newPost];
                      setSocialPosts(updatedPosts);
                      saveData('socialPosts', updatedPosts);
                      setContentDraft('');
                      setShowContentCreator(false);
                      alert('Content published successfully!');
                    }}
                    disabled={!contentDraft.trim() || selectedPlatforms.length === 0}
                    className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Publish
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Website Builder Modal */}
      <AnimatePresence>
        {showWebsiteBuilder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowWebsiteBuilder(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Website Builder</h2>
                <button
                  onClick={() => setShowWebsiteBuilder(false)}
                  className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Website Content</h3>
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Template:</label>
                      <select
                        value={selectedTemplate}
                        onChange={(e) => {
                          try {
                            setSelectedTemplate(e.target.value);
                            applyTemplate(e.target.value);
                          } catch (error) {
                            console.error('Error applying template:', error);
                            alert('Error applying template. Please try again.');
                          }
                        }}
                        className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                      >
                        {websiteTemplates.map(template => (
                          <option key={template.id} value={template.id}>
                            {template.preview} {template.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                      <input
                        type="text"
                        value={websiteData.name}
                        onChange={(e) => setWebsiteData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                      <input
                        type="text"
                        value={websiteData.title}
                        onChange={(e) => setWebsiteData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bio</label>
                    <textarea
                      rows={3}
                      value={websiteData.bio}
                      onChange={(e) => setWebsiteData(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white resize-none"
                      placeholder="Tell your professional story..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Skills (comma-separated)</label>
                    <input
                      type="text"
                      value={websiteData.skills?.join(', ') || ''}
                      onChange={(e) => setWebsiteData(prev => ({ 
                        ...prev, 
                        skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                      }))}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      placeholder="React, Node.js, Python, AWS..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={websiteData.email}
                        onChange={(e) => setWebsiteData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={websiteData.phone}
                        onChange={(e) => setWebsiteData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Live Preview</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full">
                        {websiteTemplates.find(t => t.id === selectedTemplate)?.name || 'Template'}
                      </span>
                      <div className="flex gap-1">
                        <button className="p-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                          <Monitor className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                          <Tablet className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                          <Smartphone className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="bg-white dark:bg-slate-800 rounded-lg p-6 min-h-96 border-2 border-blue-500"
                    style={{ 
                      background: websiteData.colors?.background || '#FFFFFF'
                    }}
                  >
                    {/* Template-specific preview */}
                    {selectedTemplate === 'tech' && (
                      <div className="space-y-6">
                        <div className="text-center border-b pb-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                            {websiteData.name ? websiteData.name.split(' ').map(n => n[0]).join('') : 'JD'}
                          </div>
                          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{websiteData.name || 'John Doe'}</h1>
                          <p className="text-blue-600 font-medium mb-2">{websiteData.title || 'Software Engineer'}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{websiteData.bio || 'Professional bio goes here...'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-1">
                              {(websiteData.skills || []).slice(0, 4).map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Projects</h3>
                            <div className="space-y-1">
                              {(websiteData.projects || []).slice(0, 2).map((project, idx) => (
                                <div key={idx} className="text-xs">
                                  <p className="font-medium">{project.name}</p>
                                  <p className="text-slate-500">{project.tech}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedTemplate === 'creative' && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                            🎨
                          </div>
                          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{websiteData.name || 'Jane Smith'}</h1>
                          <p className="text-pink-600 font-medium mb-2">{websiteData.title || 'Creative Director'}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{websiteData.bio || 'Creative professional bio goes here...'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {(websiteData.projects || []).slice(0, 4).map((project, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 rounded-lg p-3">
                              <div className="w-full h-16 bg-gradient-to-br from-pink-200 to-orange-200 rounded mb-2"></div>
                              <p className="text-xs font-medium text-slate-900 dark:text-white">{project.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedTemplate === 'executive' && (
                      <div className="space-y-6">
                        <div className="text-center border-b pb-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                            {websiteData.name ? websiteData.name.split(' ').map(n => n[0]).join('') : 'MJ'}
                          </div>
                          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{websiteData.name || 'Michael Johnson'}</h1>
                          <p className="text-orange-600 font-medium mb-2">{websiteData.title || 'Chief Technology Officer'}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{websiteData.bio || 'Executive bio goes here...'}</p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-orange-600" />
                            <span className="text-sm font-medium">Leadership Excellence Award 2023</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-orange-600" />
                            <span className="text-sm font-medium">Led 100+ person engineering team</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 text-orange-600" />
                            <span className="text-sm font-medium">40% efficiency improvement</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedTemplate === 'consultant' && (
                      <div className="space-y-6">
                        <div className="text-center border-b pb-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                            {websiteData.name ? websiteData.name.split(' ').map(n => n[0]).join('') : 'SW'}
                          </div>
                          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{websiteData.name || 'Sarah Wilson'}</h1>
                          <p className="text-green-600 font-medium mb-2">{websiteData.title || 'Business Strategy Consultant'}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{websiteData.bio || 'Consultant bio goes here...'}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                            <h3 className="font-semibold text-green-800 dark:text-green-400 mb-1">Business Strategy</h3>
                            <p className="text-xs text-green-700 dark:text-green-300">Strategic planning & growth optimization</p>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                            <h3 className="font-semibold text-green-800 dark:text-green-400 mb-1">Leadership Coaching</h3>
                            <p className="text-xs text-green-700 dark:text-green-300">Executive coaching & team development</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Default preview for other templates */}
                    {!['tech', 'creative', 'executive', 'consultant'].includes(selectedTemplate) && (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-lg font-bold">
                          {websiteData.name ? websiteData.name.split(' ').map(n => n[0]).join('') : 'JD'}
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{websiteData.name || 'John Doe'}</h1>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">{websiteData.title || 'Professional'}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{websiteData.bio || 'Professional bio goes here...'}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowWebsiteBuilder(false)}
                  className="flex-1 py-3 px-6 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Generate website URL based on name
                    const urlName = websiteData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    const websiteUrl = `${urlName}.smarthire.pro`;
                    
                    const updatedData = {
                      ...websiteData,
                      website: websiteUrl,
                      lastUpdated: new Date().toISOString()
                    };
                    
                    setWebsiteData(updatedData);
                    saveData('websiteData', updatedData);
                    setShowWebsiteBuilder(false);
                    
                    alert(`🎉 Website Created Successfully!\n\n🌐 Your website is now live at:\nhttps://${websiteUrl}\n\n✅ Features included:\n${websiteTemplates.find(t => t.id === selectedTemplate)?.features.map(f => `• ${f}`).join('\n')}\n\n📊 Next steps:\n• Share your website URL\n• Monitor analytics\n• Update content regularly\n• Optimize for SEO`);
                  }}
                  className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  🚀 Publish Website
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Studio Modal */}
      <AnimatePresence>
        {showVideoStudio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowVideoStudio(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Video Studio</h2>
                <button
                  onClick={() => {
                    setShowVideoStudio(false);
                    setIsRecording(false);
                    setRecordingTime(0);
                  }}
                  className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">Camera preview will appear here</p>
                    {isRecording && (
                      <div className="mt-4">
                        <div className="flex items-center justify-center gap-2 text-red-600">
                          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                          <span className="font-mono text-lg">
                            {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setIsRecording(!isRecording);
                      if (!isRecording) {
                        setRecordingTime(0);
                      }
                    }}
                    className={`p-4 rounded-full transition-colors ${
                      isRecording 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isRecording ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  
                  <button
                    onClick={() => {
                      setIsRecording(false);
                      setRecordingTime(0);
                    }}
                    className="p-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowVideoStudio(false);
                      setIsRecording(false);
                      setRecordingTime(0);
                    }}
                    className="flex-1 py-3 px-6 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert('Video saved successfully! You can now share it on your social media platforms.');
                      setShowVideoStudio(false);
                      setIsRecording(false);
                      setRecordingTime(0);
                    }}
                    disabled={recordingTime === 0}
                    className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save Video
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}