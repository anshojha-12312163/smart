import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './ThemeProvider';
import {
  Target,
  TrendingUp,
  Calendar,
  Award,
  BookOpen,
  Users,
  DollarSign,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Brain,
  Zap,
  Trophy,
  Lightbulb,
  Route
} from 'lucide-react';

interface CareerGrowthPlannerProps {
  user: any;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'skill' | 'certification' | 'promotion' | 'salary' | 'transition';
  timeframe: 'short' | 'medium' | 'long'; // 6mo-1yr, 1-3yr, 3-5yr
  priority: 'high' | 'medium' | 'low';
  progress: number; // 0-100
  milestones: Milestone[];
  prerequisites: string[];
  estimatedEffort: string;
  targetDate: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'paused';
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  description: string;
}

interface Skill {
  name: string;
  currentLevel: number; // 1-5
  targetLevel: number; // 1-5
  priority: 'high' | 'medium' | 'low';
  resources: LearningResource[];
  timeInvestment: string; // "2 hours/week"
  progress: number; // 0-100
}

interface LearningResource {
  title: string;
  type: 'course' | 'book' | 'video' | 'practice' | 'certification';
  provider: string;
  url: string;
  duration: string;
  rating: number;
  cost: string;
  completed: boolean;
}

export function CareerGrowthPlanner({ user }: CareerGrowthPlannerProps) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('roadmap');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [showAddGoal, setShowAddGoal] = useState(false);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Become Senior Software Engineer',
      description: 'Advance to senior level with leadership responsibilities',
      category: 'promotion',
      timeframe: 'medium',
      priority: 'high',
      progress: 65,
      targetDate: '2025-12-31',
      status: 'in-progress',
      estimatedEffort: '6-8 hours/week',
      prerequisites: ['Complete system design course', 'Lead 2 major projects'],
      milestones: [
        { id: 'm1', title: 'Complete System Design Course', completed: true, dueDate: '2024-03-01', description: 'Master distributed systems concepts' },
        { id: 'm2', title: 'Lead Backend Refactoring Project', completed: true, dueDate: '2024-06-01', description: 'Successfully lead team of 4 engineers' },
        { id: 'm3', title: 'Mentor 2 Junior Developers', completed: false, dueDate: '2024-09-01', description: 'Provide guidance and code reviews' },
        { id: 'm4', title: 'Present at Tech Conference', completed: false, dueDate: '2024-11-01', description: 'Share expertise with broader community' }
      ]
    },
    {
      id: '2',
      title: 'Master React & TypeScript',
      description: 'Become expert-level in modern frontend development',
      category: 'skill',
      timeframe: 'short',
      priority: 'high',
      progress: 80,
      targetDate: '2024-08-01',
      status: 'in-progress',
      estimatedEffort: '4 hours/week',
      prerequisites: ['Complete JavaScript fundamentals'],
      milestones: [
        { id: 'm5', title: 'Complete Advanced React Course', completed: true, dueDate: '2024-02-15', description: 'Hooks, Context, Performance' },
        { id: 'm6', title: 'Build 3 TypeScript Projects', completed: false, dueDate: '2024-07-01', description: 'Practical application of concepts' },
        { id: 'm7', title: 'Contribute to Open Source React Project', completed: false, dueDate: '2024-08-01', description: 'Give back to community' }
      ]
    },
    {
      id: '3',
      title: 'Increase Salary to $150K',
      description: 'Negotiate salary increase or find new role',
      category: 'salary',
      timeframe: 'short',
      priority: 'medium',
      progress: 30,
      targetDate: '2024-12-31',
      status: 'in-progress',
      estimatedEffort: '2 hours/week',
      prerequisites: ['Document achievements', 'Research market rates'],
      milestones: [
        { id: 'm8', title: 'Complete Salary Research', completed: true, dueDate: '2024-02-01', description: 'Gather market data for role' },
        { id: 'm9', title: 'Document Key Achievements', completed: false, dueDate: '2024-04-01', description: 'Quantify impact and value delivered' },
        { id: 'm10', title: 'Schedule Performance Review', completed: false, dueDate: '2024-06-01', description: 'Formal discussion with manager' }
      ]
    }
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    {
      name: 'React',
      currentLevel: 4,
      targetLevel: 5,
      priority: 'high',
      progress: 80,
      timeInvestment: '3 hours/week',
      resources: [
        { title: 'Advanced React Patterns', type: 'course', provider: 'Frontend Masters', url: '#', duration: '6 hours', rating: 4.8, cost: '$39/month', completed: true },
        { title: 'React Performance Optimization', type: 'course', provider: 'Udemy', url: '#', duration: '8 hours', rating: 4.6, cost: '$89', completed: false },
        { title: 'You Don\'t Know JS', type: 'book', provider: 'O\'Reilly', url: '#', duration: '20 hours', rating: 4.9, cost: '$45', completed: false }
      ]
    },
    {
      name: 'System Design',
      currentLevel: 2,
      targetLevel: 4,
      priority: 'high',
      progress: 35,
      timeInvestment: '4 hours/week',
      resources: [
        { title: 'System Design Interview', type: 'book', provider: 'Amazon', url: '#', duration: '15 hours', rating: 4.7, cost: '$35', completed: false },
        { title: 'Designing Data-Intensive Applications', type: 'book', provider: 'O\'Reilly', url: '#', duration: '25 hours', rating: 4.9, cost: '$55', completed: false },
        { title: 'System Design Primer', type: 'practice', provider: 'GitHub', url: '#', duration: 'Ongoing', rating: 4.8, cost: 'Free', completed: false }
      ]
    },
    {
      name: 'Leadership',
      currentLevel: 2,
      targetLevel: 4,
      priority: 'medium',
      progress: 25,
      timeInvestment: '2 hours/week',
      resources: [
        { title: 'The Manager\'s Path', type: 'book', provider: 'O\'Reilly', url: '#', duration: '12 hours', rating: 4.6, cost: '$40', completed: false },
        { title: 'Leadership in Tech', type: 'course', provider: 'Coursera', url: '#', duration: '20 hours', rating: 4.4, cost: '$49/month', completed: false }
      ]
    }
  ]);

  const tabs = [
    { id: 'roadmap', label: 'Career Roadmap', icon: Route },
    { id: 'skills', label: 'Skills Development', icon: Brain },
    { id: 'mentorship', label: 'Mentorship', icon: Users },
    { id: 'analytics', label: 'Progress Analytics', icon: BarChart3 }
  ];

  const timeframes = [
    { id: 'all', label: 'All Goals' },
    { id: 'short', label: 'Short-term (6mo-1yr)' },
    { id: 'medium', label: 'Medium-term (1-3yr)' },
    { id: 'long', label: 'Long-term (3-5yr)' }
  ];

  const getCategoryIcon = (category: string) => {
    const icons = {
      skill: Brain,
      certification: Award,
      promotion: TrendingUp,
      salary: DollarSign,
      transition: Route
    };
    return icons[category as keyof typeof icons] || Target;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      skill: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      certification: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      promotion: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      salary: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      transition: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'text-red-600 bg-red-100 dark:bg-red-900/20',
      medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      low: 'text-green-600 bg-green-100 dark:bg-green-900/20'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 4) return 'bg-green-500';
    if (level >= 3) return 'bg-yellow-500';
    if (level >= 2) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const filteredGoals = selectedTimeframe === 'all' 
    ? goals 
    : goals.filter(goal => goal.timeframe === selectedTimeframe);

  const renderRoadmapTab = () => (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Career Roadmap</h2>
          <p className="text-slate-600 dark:text-slate-400">Visual timeline of your career goals and milestones</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
          >
            {timeframes.map(tf => (
              <option key={tf.id} value={tf.id}>{tf.label}</option>
            ))}
          </select>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddGoal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Goal
          </motion.button>
        </div>
      </div>

      {/* Goals Timeline */}
      <div className="space-y-4">
        {filteredGoals.map((goal, index) => {
          const Icon = getCategoryIcon(goal.category);
          
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start gap-4">
                {/* Timeline Indicator */}
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    goal.status === 'completed' ? 'bg-green-500' : 
                    goal.status === 'in-progress' ? 'bg-blue-500' : 'bg-slate-300'
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {index < filteredGoals.length - 1 && (
                    <div className="w-0.5 h-16 bg-slate-200 dark:bg-slate-700 mt-2"></div>
                  )}
                </div>

                {/* Goal Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                        {goal.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">
                        {goal.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                          {goal.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                          {goal.priority} priority
                        </span>
                        <span className="text-xs text-slate-500">
                          Due: {new Date(goal.targetDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {goal.progress}%
                      </div>
                      <div className="text-xs text-slate-500">Complete</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900 dark:text-white">Milestones:</h4>
                    {goal.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          milestone.completed ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'
                        }`}>
                          {milestone.completed && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            milestone.completed ? 'text-green-700 dark:text-green-400 line-through' : 'text-slate-900 dark:text-white'
                          }`}>
                            {milestone.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            Due: {new Date(milestone.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Prerequisites & Effort */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-slate-900 dark:text-white">Effort: </span>
                      <span className="text-slate-600 dark:text-slate-400">{goal.estimatedEffort}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-900 dark:text-white">Prerequisites: </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {goal.prerequisites.length > 0 ? goal.prerequisites.join(', ') : 'None'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderSkillsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Skills Development</h2>
          <p className="text-slate-600 dark:text-slate-400">Track your skill progression and learning resources</p>
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{skill.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(skill.priority)}`}>
                {skill.priority}
              </span>
            </div>

            {/* Current vs Target Level */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Current Level</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">{skill.currentLevel}/5</span>
              </div>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-2 flex-1 rounded ${
                      level <= skill.currentLevel ? getSkillLevelColor(skill.currentLevel) : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Target Level</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">{skill.targetLevel}/5</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-2 flex-1 rounded ${
                      level <= skill.targetLevel ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Progress</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">{skill.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                />
              </div>
            </div>

            {/* Time Investment */}
            <div className="mb-4">
              <span className="text-sm text-slate-600 dark:text-slate-400">Time Investment: </span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{skill.timeInvestment}</span>
            </div>

            {/* Learning Resources */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Learning Resources:</h4>
              <div className="space-y-2">
                {skill.resources.slice(0, 2).map((resource, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${resource.completed ? 'bg-green-500' : 'bg-slate-400'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-900 dark:text-white truncate">{resource.title}</p>
                      <p className="text-xs text-slate-500">{resource.provider} • {resource.duration}</p>
                    </div>
                  </div>
                ))}
                {skill.resources.length > 2 && (
                  <p className="text-xs text-slate-500">+{skill.resources.length - 2} more resources</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderMentorshipTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mentorship & Guidance</h2>
        <p className="text-slate-600 dark:text-slate-400">Connect with industry mentors and join peer groups</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Find Mentors */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Find Mentors</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Connect with experienced professionals</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { name: 'Sarah Chen', role: 'Senior Engineering Manager', company: 'Google', match: '95%', avatar: '👩‍💼' },
              { name: 'Michael Rodriguez', role: 'Principal Engineer', company: 'Microsoft', match: '88%', avatar: '👨‍💻' },
              { name: 'Emily Johnson', role: 'Tech Lead', company: 'Netflix', match: '82%', avatar: '👩‍🔬' }
            ].map((mentor, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg">
                  {mentor.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">{mentor.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{mentor.role} at {mentor.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">{mentor.match} match</p>
                  <button className="text-xs text-blue-600 hover:text-blue-700">Connect</button>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Browse All Mentors
          </button>
        </div>

        {/* Peer Groups */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Peer Groups</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Join accountability circles</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { name: 'Frontend Developers Circle', members: 12, nextMeeting: 'Tomorrow 7PM', topic: 'React Performance' },
              { name: 'Career Changers Support', members: 8, nextMeeting: 'Friday 6PM', topic: 'Interview Prep' },
              { name: 'Senior Engineer Track', members: 15, nextMeeting: 'Monday 8PM', topic: 'System Design' }
            ].map((group, idx) => (
              <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-slate-900 dark:text-white">{group.name}</p>
                  <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full">
                    {group.members} members
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Next: {group.nextMeeting}</p>
                <p className="text-sm text-slate-500">Topic: {group.topic}</p>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Join a Group
          </button>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Progress Analytics</h2>
        <p className="text-slate-600 dark:text-slate-400">Track your career development metrics and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Goals Completed', value: '3', change: '+2 this month', icon: Target, color: 'green' },
          { label: 'Skills Improved', value: '7', change: '+3 this month', icon: Brain, color: 'blue' },
          { label: 'Learning Hours', value: '24', change: '+8 this week', icon: Clock, color: 'purple' },
          { label: 'Mentor Sessions', value: '2', change: 'Next: Tomorrow', icon: Users, color: 'orange' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">{stat.label}</div>
              <div className="text-xs text-green-600">{stat.change}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Goal Progress Over Time</h3>
          <div className="h-64 flex items-center justify-center text-slate-500">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-2 text-slate-400" />
              <p>Interactive chart coming soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Skills Development Heatmap</h3>
          <div className="h-64 flex items-center justify-center text-slate-500">
            <div className="text-center">
              <Zap className="w-16 h-16 mx-auto mb-2 text-slate-400" />
              <p>Skills heatmap coming soon</p>
            </div>
          </div>
        </div>
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Career Growth Planner
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Plan, track, and achieve your career goals with AI-powered insights
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

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'roadmap' && renderRoadmapTab()}
          {activeTab === 'skills' && renderSkillsTab()}
          {activeTab === 'mentorship' && renderMentorshipTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
        </motion.div>
      </div>
    </div>
  );
}