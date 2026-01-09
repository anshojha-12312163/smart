import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  Send,
  Video,
  Award,
  DollarSign,
  Calendar,
  Clock,
  Building2,
  MapPin,
  TrendingUp,
  CheckCircle,
  XCircle,
  Mail,
  Bell,
  FileText,
  BarChart3,
  Target,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  ArrowRight,
  Download,
  ExternalLink,
  AlertCircle,
  Users,
  Star,
  MessageSquare,
  ChevronRight,
  Zap,
  Globe,
  TrendingDown
} from 'lucide-react';

interface Application {
  id: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  appliedDate: Date;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'rejected';
  stage: string;
  nextAction?: string;
  nextActionDate?: Date;
  companyInfo?: {
    size: string;
    industry: string;
    rating: number;
    news: string[];
  };
  interviewDates?: Date[];
  notes: string;
  priority: 'high' | 'medium' | 'low';
}

export function ApplicationLifecycleManager() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      company: 'TechCorp Inc',
      position: 'Senior React Developer',
      location: 'San Francisco, CA',
      salary: '$140k - $180k',
      appliedDate: new Date(Date.now() - 5 * 86400000),
      status: 'interview',
      stage: 'Technical Interview',
      nextAction: 'Technical assessment',
      nextActionDate: new Date(Date.now() + 2 * 86400000),
      companyInfo: {
        size: '500-1000 employees',
        industry: 'Software',
        rating: 4.3,
        news: [
          'Series B funding raised $50M',
          'Expanding engineering team by 40%',
          'Named best place to work 2024',
        ],
      },
      interviewDates: [new Date(Date.now() + 2 * 86400000)],
      notes: 'Strong culture fit, great benefits package',
      priority: 'high',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Engineer',
      location: 'Remote',
      salary: '$120k - $150k',
      appliedDate: new Date(Date.now() - 3 * 86400000),
      status: 'screening',
      stage: 'Phone Screen',
      nextAction: 'HR phone call',
      nextActionDate: new Date(Date.now() + 1 * 86400000),
      companyInfo: {
        size: '50-100 employees',
        industry: 'FinTech',
        rating: 4.5,
        news: [
          'Product launch Q1 2024',
          'Fast-growing startup',
        ],
      },
      notes: 'Equity package looks promising',
      priority: 'high',
    },
    {
      id: '3',
      company: 'Digital Solutions',
      position: 'Frontend Architect',
      location: 'New York, NY',
      salary: '$160k - $200k',
      appliedDate: new Date(Date.now() - 7 * 86400000),
      status: 'applied',
      stage: 'Application Submitted',
      nextAction: 'Wait for response',
      companyInfo: {
        size: '1000+ employees',
        industry: 'Consulting',
        rating: 4.1,
        news: ['Opening new NYC office'],
      },
      notes: '',
      priority: 'medium',
    },
    {
      id: '4',
      company: 'InnovateLabs',
      position: 'Lead Developer',
      location: 'Austin, TX',
      salary: '$150k - $190k',
      appliedDate: new Date(Date.now() - 10 * 86400000),
      status: 'offer',
      stage: 'Offer Received',
      nextAction: 'Respond to offer',
      nextActionDate: new Date(Date.now() + 5 * 86400000),
      companyInfo: {
        size: '200-500 employees',
        industry: 'AI/ML',
        rating: 4.7,
        news: ['Best AI startup 2024', 'IPO plans for 2025'],
      },
      notes: 'Amazing team, cutting-edge tech stack',
      priority: 'high',
    },
    {
      id: '5',
      company: 'LegacyCorp',
      position: 'Web Developer',
      location: 'Chicago, IL',
      salary: '$100k - $130k',
      appliedDate: new Date(Date.now() - 14 * 86400000),
      status: 'rejected',
      stage: 'Application Rejected',
      notes: 'Position filled internally',
      priority: 'low',
    },
  ]);

  const statusColumns = [
    { id: 'applied', title: 'Applied', icon: Send, color: '#06b6d4' },
    { id: 'screening', title: 'Screening', icon: Eye, color: '#8b5cf6' },
    { id: 'interview', title: 'Interview', icon: Video, color: '#ec4899' },
    { id: 'offer', title: 'Offer', icon: Award, color: '#22c55e' },
  ];

  const getDaysSince = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / 86400000);
    return days;
  };

  const getSuccessRate = () => {
    const total = applications.length;
    const offers = applications.filter(app => app.status === 'offer').length;
    return total > 0 ? Math.round((offers / total) * 100) : 0;
  };

  const getAverageResponseTime = () => {
    const screened = applications.filter(app => 
      app.status !== 'applied' && app.status !== 'rejected'
    );
    if (screened.length === 0) return 0;
    
    const totalDays = screened.reduce((sum, app) => sum + getDaysSince(app.appliedDate), 0);
    return Math.round(totalDays / screened.length);
  };

  return (
    <div className="min-h-screen p-8" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
    }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)',
                  }}>
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                Application Lifecycle Manager
              </h1>
              <p className="text-gray-400">Track and manage your job applications from start to finish</p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center gap-2 p-1 rounded-lg backdrop-blur-sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}>
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    viewMode === 'kanban'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Kanban
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  List
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                  boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)',
                }}
              >
                <Plus className="w-5 h-5" />
                Add Application
              </motion.button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-xl backdrop-blur-xl border"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
                borderColor: 'rgba(6, 182, 212, 0.3)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Applications</p>
                  <p className="text-3xl font-bold text-white">{applications.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-cyan-500/20">
                  <Briefcase className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-xl backdrop-blur-xl border"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                borderColor: 'rgba(139, 92, 246, 0.3)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Active Interviews</p>
                  <p className="text-3xl font-bold text-white">
                    {applications.filter(app => app.status === 'interview').length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-500/20">
                  <Video className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-xl backdrop-blur-xl border"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                borderColor: 'rgba(34, 197, 94, 0.3)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Success Rate</p>
                  <p className="text-3xl font-bold text-white">{getSuccessRate()}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-500/20">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-xl backdrop-blur-xl border"
              style={{
                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
                borderColor: 'rgba(236, 72, 153, 0.3)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Avg Response Time</p>
                  <p className="text-3xl font-bold text-white">{getAverageResponseTime()}d</p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-pink-500/20">
                  <Clock className="w-6 h-6 text-pink-400" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies or positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 rounded-xl backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <option value="all">All Status</option>
              <option value="applied">Applied</option>
              <option value="screening">Screening</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </motion.div>

        {/* Kanban View */}
        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {statusColumns.map((column, columnIndex) => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: columnIndex * 0.1 }}
              >
                <div className="mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: `${column.color}20`,
                    }}>
                    <column.icon className="w-4 h-4" style={{ color: column.color }} />
                  </div>
                  <h3 className="font-bold text-white">{column.title}</h3>
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/10 text-gray-400">
                    {applications.filter(app => app.status === column.id).length}
                  </span>
                </div>

                <div className="space-y-3">
                  {applications
                    .filter(app => app.status === column.id)
                    .map((app, index) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -4 }}
                        onClick={() => setSelectedApp(app)}
                        className="p-4 rounded-xl backdrop-blur-sm border cursor-pointer"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 100%)',
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-white text-sm">{app.company}</h4>
                          {app.priority === 'high' && (
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mb-3">{app.position}</p>

                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <MapPin className="w-3 h-3" />
                          {app.location}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                          <DollarSign className="w-3 h-3" />
                          {app.salary}
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {getDaysSince(app.appliedDate)}d ago
                          </span>
                          {app.nextActionDate && (
                            <div className="flex items-center gap-1 text-xs text-cyan-400">
                              <Clock className="w-3 h-3" />
                              {Math.ceil((app.nextActionDate.getTime() - Date.now()) / 86400000)}d
                            </div>
                          )}
                        </div>

                        {app.nextAction && (
                          <div className="mt-2 px-2 py-1 rounded-lg text-xs font-semibold"
                            style={{
                              background: `${column.color}20`,
                              color: column.color,
                            }}>
                            {app.nextAction}
                          </div>
                        )}
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-3">
            {applications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedApp(app)}
                className="p-6 rounded-xl backdrop-blur-sm border cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyan-500 to-purple-500">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-white">{app.company}</h3>
                        {app.priority === 'high' && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
                            High Priority
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{app.position}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Location</p>
                      <p className="text-sm text-white">{app.location}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Salary</p>
                      <p className="text-sm text-white">{app.salary}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: `${statusColumns.find(col => col.id === app.status)?.color}20`,
                          color: statusColumns.find(col => col.id === app.status)?.color,
                        }}>
                        {app.stage}
                      </span>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Applied</p>
                      <p className="text-sm text-white">{getDaysSince(app.appliedDate)}d ago</p>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-xl border shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 58, 138, 0.98) 100%)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-500 to-purple-500">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{selectedApp.company}</h2>
                      <p className="text-gray-400 mb-2">{selectedApp.position}</p>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-sm text-gray-400">
                          <MapPin className="w-4 h-4" />
                          {selectedApp.location}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-400">
                          <DollarSign className="w-4 h-4" />
                          {selectedApp.salary}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedApp(null)}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Company Info */}
                {selectedApp.companyInfo && (
                  <div className="mb-6 p-6 rounded-xl backdrop-blur-sm"
                    style={{
                      background: 'rgba(6, 182, 212, 0.1)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                    }}>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-cyan-400" />
                      Company Intelligence
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Company Size</p>
                        <p className="text-white font-semibold">{selectedApp.companyInfo.size}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Industry</p>
                        <p className="text-white font-semibold">{selectedApp.companyInfo.industry}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Rating</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-white font-semibold">{selectedApp.companyInfo.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Recent News</p>
                      <ul className="space-y-1">
                        {selectedApp.companyInfo.news.map((news, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                            {news}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Timeline & Actions */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="p-6 rounded-xl backdrop-blur-sm"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}>
                    <h3 className="text-lg font-bold text-white mb-4">Timeline</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                          <Send className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Applied</p>
                          <p className="text-xs text-gray-500">{getDaysSince(selectedApp.appliedDate)} days ago</p>
                        </div>
                      </div>
                      {selectedApp.interviewDates?.map((date, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <Video className="w-4 h-4 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-white font-semibold text-sm">Interview Scheduled</p>
                            <p className="text-xs text-gray-500">{date.toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-xl backdrop-blur-sm"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}>
                    <h3 className="text-lg font-bold text-white mb-4">Next Actions</h3>
                    {selectedApp.nextAction && (
                      <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30">
                        <p className="text-white font-semibold mb-1">{selectedApp.nextAction}</p>
                        {selectedApp.nextActionDate && (
                          <p className="text-xs text-gray-400">
                            Due in {Math.ceil((selectedApp.nextActionDate.getTime() - Date.now()) / 86400000)} days
                          </p>
                        )}
                      </div>
                    )}
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white text-sm font-semibold flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Send Follow-Up Email
                      </button>
                      <button className="w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white text-sm font-semibold flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Schedule Interview
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                    }}
                  >
                    <FileText className="w-5 h-5" />
                    Interview Prep Checklist
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-2 transition-all"
                  >
                    <DollarSign className="w-5 h-5" />
                    Salary Calculator
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
