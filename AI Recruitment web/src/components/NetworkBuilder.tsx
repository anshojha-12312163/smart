import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { 
  Users, 
  Linkedin, 
  MessageSquare, 
  Calendar, 
  Award, 
  TrendingUp, 
  Network, 
  Coffee,
  Plus,
  Search,
  Star,
  CheckCircle,
  X,
  Send,
  ExternalLink,
  Target,
  Briefcase,
  MapPin,
  Clock,
  Eye,
  Download,
  Share,
  Filter
} from 'lucide-react';

interface NetworkBuilderProps {
  user: any;
}

interface Connection {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  mutualConnections: number;
  connectionStrength: 'strong' | 'medium' | 'weak';
  lastInteraction: string;
  skills: string[];
  location: string;
  isConnected: boolean;
  canMessage: boolean;
}

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  endorsements: number;
  verified: boolean;
  category: string;
  lastUsed: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  type: 'project' | 'article' | 'presentation' | 'certification';
  description: string;
  technologies: string[];
  date: string;
  views: number;
  likes: number;
  url?: string;
  featured: boolean;
}

export function NetworkBuilder({ user }: NetworkBuilderProps) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('network');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [connections, setConnections] = useState<Connection[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Intermediate', category: 'Technical' });

  const tabs = [
    { id: 'network', label: 'Network Builder', icon: Network },
    { id: 'skills', label: 'Skill Verification', icon: Award },
    { id: 'portfolio', label: 'Portfolio', icon: TrendingUp }
  ];

  // Mock data
  const mockConnections: Connection[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'Senior Software Engineer',
      company: 'Google',
      avatar: '👩‍💻',
      mutualConnections: 12,
      connectionStrength: 'strong',
      lastInteraction: '2 days ago',
      skills: ['React', 'Node.js', 'Python'],
      location: 'San Francisco, CA',
      isConnected: true,
      canMessage: true
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      title: 'Product Manager',
      company: 'Microsoft',
      avatar: '👨‍💼',
      mutualConnections: 8,
      connectionStrength: 'medium',
      lastInteraction: '1 week ago',
      skills: ['Product Strategy', 'Analytics', 'Leadership'],
      location: 'Seattle, WA',
      isConnected: true,
      canMessage: true
    },
    {
      id: '3',
      name: 'Emily Johnson',
      title: 'UX Designer',
      company: 'Apple',
      avatar: '👩‍🎨',
      mutualConnections: 5,
      connectionStrength: 'weak',
      lastInteraction: '3 weeks ago',
      skills: ['Figma', 'User Research', 'Prototyping'],
      location: 'Cupertino, CA',
      isConnected: false,
      canMessage: false
    },
    {
      id: '4',
      name: 'David Kim',
      title: 'Data Scientist',
      company: 'Netflix',
      avatar: '👨‍🔬',
      mutualConnections: 15,
      connectionStrength: 'strong',
      lastInteraction: '5 days ago',
      skills: ['Python', 'Machine Learning', 'SQL'],
      location: 'Los Gatos, CA',
      isConnected: true,
      canMessage: true
    },
    {
      id: '5',
      name: 'Priya Sharma',
      title: 'Full Stack Developer',
      company: 'Flipkart',
      avatar: '👩‍💻',
      mutualConnections: 7,
      connectionStrength: 'medium',
      lastInteraction: '1 day ago',
      skills: ['JavaScript', 'React', 'MongoDB'],
      location: 'Bangalore, India',
      isConnected: true,
      canMessage: true
    }
  ];

  const mockSkills: Skill[] = [
    {
      id: '1',
      name: 'JavaScript',
      level: 'Expert',
      endorsements: 45,
      verified: true,
      category: 'Programming',
      lastUsed: '2024-01-10'
    },
    {
      id: '2',
      name: 'React',
      level: 'Advanced',
      endorsements: 38,
      verified: true,
      category: 'Frontend',
      lastUsed: '2024-01-09'
    },
    {
      id: '3',
      name: 'Node.js',
      level: 'Advanced',
      endorsements: 32,
      verified: false,
      category: 'Backend',
      lastUsed: '2024-01-08'
    },
    {
      id: '4',
      name: 'Leadership',
      level: 'Intermediate',
      endorsements: 28,
      verified: false,
      category: 'Soft Skills',
      lastUsed: '2024-01-05'
    },
    {
      id: '5',
      name: 'AWS',
      level: 'Intermediate',
      endorsements: 22,
      verified: true,
      category: 'Cloud',
      lastUsed: '2024-01-07'
    }
  ];

  const mockPortfolio: PortfolioItem[] = [
    {
      id: '1',
      title: 'E-commerce Platform',
      type: 'project',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      date: '2024-01-01',
      views: 1250,
      likes: 89,
      url: 'https://github.com/user/ecommerce',
      featured: true
    },
    {
      id: '2',
      title: 'Building Scalable Web Applications',
      type: 'article',
      description: 'Technical article about microservices architecture and best practices',
      technologies: ['Microservices', 'Docker', 'Kubernetes'],
      date: '2023-12-15',
      views: 2100,
      likes: 156,
      url: 'https://medium.com/@user/scalable-apps',
      featured: true
    },
    {
      id: '3',
      title: 'Modern Frontend Development',
      type: 'presentation',
      description: 'Conference talk about React best practices and performance optimization',
      technologies: ['React', 'Performance', 'Optimization'],
      date: '2023-11-20',
      views: 850,
      likes: 67,
      featured: false
    },
    {
      id: '4',
      title: 'AWS Solutions Architect',
      type: 'certification',
      description: 'AWS Certified Solutions Architect - Professional certification',
      technologies: ['AWS', 'Cloud Architecture', 'DevOps'],
      date: '2023-10-10',
      views: 450,
      likes: 34,
      featured: false
    }
  ];

  useEffect(() => {
    setConnections(mockConnections);
    setSkills(mockSkills);
    setPortfolio(mockPortfolio);
  }, []);

  const getConnectionStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'weak': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'Advanced': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'Intermediate': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Beginner': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const sendMessage = () => {
    if (selectedConnection && messageText.trim()) {
      alert(`Message sent to ${selectedConnection.name}:\n\n"${messageText}"\n\nThey will receive your message and can respond directly.`);
      setShowMessageModal(false);
      setMessageText('');
      setSelectedConnection(null);
    }
  };

  const connectWithUser = (connection: Connection) => {
    const updatedConnections = connections.map(conn => 
      conn.id === connection.id 
        ? { ...conn, isConnected: true, canMessage: true }
        : conn
    );
    setConnections(updatedConnections);
    alert(`Connection request sent to ${connection.name}! They will be notified and can accept your request.`);
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.name,
        level: newSkill.level as any,
        endorsements: 0,
        verified: false,
        category: newSkill.category,
        lastUsed: new Date().toISOString().split('T')[0]
      };
      setSkills([...skills, skill]);
      setNewSkill({ name: '', level: 'Intermediate', category: 'Technical' });
      setShowAddSkillModal(false);
      alert(`Skill "${skill.name}" added successfully! Ask colleagues to endorse this skill.`);
    }
  };

  const renderNetworkTab = () => (
    <div className="space-y-6">
      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Connections', value: connections.length, icon: Users, color: 'blue' },
          { label: 'Strong Connections', value: connections.filter(c => c.connectionStrength === 'strong').length, icon: Star, color: 'green' },
          { label: 'Recent Interactions', value: connections.filter(c => c.lastInteraction.includes('day')).length, icon: MessageSquare, color: 'purple' },
          { label: 'Mutual Connections', value: Math.round(connections.reduce((sum, c) => sum + c.mutualConnections, 0) / connections.length), icon: Network, color: 'orange' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-8 h-8 text-${stat.color}-600`} />
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search connections by name, company, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
            />
          </div>
          <button
            onClick={() => {
              const suggestions = `🎯 Networking Suggestions:\n\n• Connect with colleagues from previous companies\n• Reach out to alumni from your school\n• Join industry-specific LinkedIn groups\n• Attend virtual networking events\n• Engage with posts from your target connections\n• Ask for introductions from mutual connections\n\n💡 Best Practices:\n• Personalize connection requests\n• Follow up after meeting someone\n• Share valuable content regularly\n• Offer help before asking for favors`;
              alert(suggestions);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Target className="w-4 h-4" />
            Get Suggestions
          </button>
        </div>
      </div>

      {/* Connections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections
          .filter(conn => 
            conn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conn.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conn.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
          )
          .map((connection, index) => (
            <motion.div
              key={connection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                  {connection.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white">{connection.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{connection.title}</p>
                  <p className="text-sm text-slate-500">{connection.company}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Connection Strength</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConnectionStrengthColor(connection.connectionStrength)}`}>
                    {connection.connectionStrength}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Mutual Connections</span>
                  <span className="font-medium text-slate-900 dark:text-white">{connection.mutualConnections}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Last Interaction</span>
                  <span className="font-medium text-slate-900 dark:text-white">{connection.lastInteraction}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {connection.skills.slice(0, 3).map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded text-xs">
                    {skill}
                  </span>
                ))}
                {connection.skills.length > 3 && (
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-xs">
                    +{connection.skills.length - 3}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                {connection.isConnected ? (
                  <>
                    <button
                      onClick={() => {
                        setSelectedConnection(connection);
                        setShowMessageModal(true);
                      }}
                      disabled={!connection.canMessage}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </button>
                    <button
                      onClick={() => {
                        const profile = `👤 ${connection.name}\n📍 ${connection.location}\n🏢 ${connection.title} at ${connection.company}\n\n🎯 Skills: ${connection.skills.join(', ')}\n🤝 Mutual Connections: ${connection.mutualConnections}\n💪 Connection Strength: ${connection.connectionStrength}\n⏰ Last Interaction: ${connection.lastInteraction}\n\n💡 Networking Tips:\n• Schedule a coffee chat\n• Ask about their current projects\n• Share relevant opportunities\n• Offer your expertise`;
                        alert(profile);
                      }}
                      className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => connectWithUser(connection)}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Connect
                  </button>
                )}
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );

  const renderSkillsTab = () => (
    <div className="space-y-6">
      {/* Skills Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Skills', value: skills.length, icon: Award, color: 'blue' },
          { label: 'Verified Skills', value: skills.filter(s => s.verified).length, icon: CheckCircle, color: 'green' },
          { label: 'Total Endorsements', value: skills.reduce((sum, s) => sum + s.endorsements, 0), icon: Star, color: 'yellow' },
          { label: 'Expert Level', value: skills.filter(s => s.level === 'Expert').length, icon: TrendingUp, color: 'purple' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-8 h-8 text-${stat.color}-600`} />
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Add Skill Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your Skills</h3>
        <button
          onClick={() => setShowAddSkillModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-slate-900 dark:text-white">{skill.name}</h4>
              {skill.verified && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Level</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(skill.level)}`}>
                  {skill.level}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Endorsements</span>
                <span className="font-medium text-slate-900 dark:text-white">{skill.endorsements}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Category</span>
                <span className="font-medium text-slate-900 dark:text-white">{skill.category}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (!skill.verified) {
                    const updatedSkills = skills.map(s => 
                      s.id === skill.id ? { ...s, verified: true } : s
                    );
                    setSkills(updatedSkills);
                    alert(`Skill "${skill.name}" verification started! Complete the assessment to get verified.`);
                  } else {
                    alert(`"${skill.name}" is already verified! Share your verified badge on LinkedIn.`);
                  }
                }}
                className={`flex-1 px-3 py-2 rounded-lg transition-colors text-sm ${
                  skill.verified 
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {skill.verified ? 'Verified' : 'Verify'}
              </button>
              <button
                onClick={() => {
                  const endorsementRequest = `🎯 Skill Endorsement Request:\n\nSkill: ${skill.name}\nLevel: ${skill.level}\nCategory: ${skill.category}\n\nCurrent Endorsements: ${skill.endorsements}\n\n💡 How to get more endorsements:\n• Ask colleagues who've seen your work\n• Endorse others' skills first\n• Share examples of your work\n• Complete skill assessments\n• Post about your expertise`;
                  alert(endorsementRequest);
                }}
                className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                <Star className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderPortfolioTab = () => (
    <div className="space-y-6">
      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Items', value: portfolio.length, icon: Briefcase, color: 'blue' },
          { label: 'Featured Items', value: portfolio.filter(p => p.featured).length, icon: Star, color: 'yellow' },
          { label: 'Total Views', value: portfolio.reduce((sum, p) => sum + p.views, 0), icon: Eye, color: 'green' },
          { label: 'Total Likes', value: portfolio.reduce((sum, p) => sum + p.likes, 0), icon: TrendingUp, color: 'purple' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-8 h-8 text-${stat.color}-600`} />
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Portfolio Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolio.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  item.type === 'project' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                  item.type === 'article' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  item.type === 'presentation' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
                  'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                }`}>
                  {item.type}
                </span>
                {item.featured && (
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                )}
              </div>
              <span className="text-sm text-slate-500">{new Date(item.date).toLocaleDateString()}</span>
            </div>

            <h4 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{item.description}</p>

            <div className="flex flex-wrap gap-1 mb-4">
              {item.technologies.map((tech, idx) => (
                <span key={idx} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {item.views}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {item.likes}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              {item.url && (
                <button
                  onClick={() => window.open(item.url, '_blank')}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  View
                </button>
              )}
              <button
                onClick={() => {
                  const shareText = `Check out my ${item.type}: "${item.title}"\n\n${item.description}\n\nTechnologies: ${item.technologies.join(', ')}\n\n${item.url || 'Link coming soon!'}`;
                  navigator.clipboard.writeText(shareText);
                  alert('Portfolio item details copied to clipboard!');
                }}
                className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                <Share className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Professional Network Builder
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Build strategic connections and showcase your verified skills
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
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {activeTab === 'network' && renderNetworkTab()}
          {activeTab === 'skills' && renderSkillsTab()}
          {activeTab === 'portfolio' && renderPortfolioTab()}
        </motion.div>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessageModal && selectedConnection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowMessageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Message {selectedConnection.name}
                </h3>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="p-1 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <textarea
                rows={4}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Write your message..."
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white resize-none mb-4"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={sendMessage}
                  disabled={!messageText.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Skill Modal */}
      <AnimatePresence>
        {showAddSkillModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddSkillModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add New Skill</h3>
                <button
                  onClick={() => setShowAddSkillModal(false)}
                  className="p-1 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Python, Leadership, Design Thinking"
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Proficiency Level
                  </label>
                  <select
                    value={newSkill.level}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value }))}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Programming">Programming</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Soft Skills">Soft Skills</option>
                    <option value="Design">Design</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddSkillModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addSkill}
                  disabled={!newSkill.name.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Skill
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}