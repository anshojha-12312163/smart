import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  Users,
  Star,
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  Phone,
  Eye,
  MessageSquare,
  UserCheck,
  UserX,
  Download,
  Share,
  MoreHorizontal,
  Grid3X3,
  List,
  ChevronDown,
  Award,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  X,
  Plus,
  Send,
  Video,
  FileText,
  Linkedin,
  Github
} from 'lucide-react';

interface CandidatesPageProps {
  user: any;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  title: string;
  company: string;
  location: string;
  experience: number;
  education: string;
  skills: string[];
  appliedFor: string;
  appliedDate: string;
  status: 'new' | 'reviewing' | 'shortlisted' | 'interview' | 'offer' | 'hired' | 'rejected';
  matchScore: number;
  rating: number;
  salary: string;
  availability: string;
  source: string;
  resumeUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  notes: string[];
  tags: string[];
  interviews: any[];
}

export function CandidatesPage({ user }: CandidatesPageProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      avatar: '👩‍💼',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'San Francisco, CA',
      experience: 6,
      education: 'MS Computer Science, Stanford',
      skills: ['React', 'Node.js', 'Python', 'AWS', 'TypeScript'],
      appliedFor: 'Senior Full Stack Developer',
      appliedDate: '2024-01-15',
      status: 'interview',
      matchScore: 95,
      rating: 5,
      salary: '$150k - $180k',
      availability: 'Available in 2 weeks',
      source: 'LinkedIn',
      resumeUrl: '#',
      linkedinUrl: '#',
      githubUrl: '#',
      notes: ['Strong technical background', 'Great communication skills'],
      tags: ['Top Candidate', 'Technical'],
      interviews: [
        { type: 'Phone Screen', date: '2024-01-20', status: 'completed' },
        { type: 'Technical Interview', date: '2024-01-25', status: 'scheduled' }
      ]
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 987-6543',
      avatar: '👨‍💻',
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      experience: 4,
      education: 'MBA, Wharton',
      skills: ['Product Strategy', 'Analytics', 'Leadership', 'SQL'],
      appliedFor: 'Senior Product Manager',
      appliedDate: '2024-01-12',
      status: 'shortlisted',
      matchScore: 88,
      rating: 4,
      salary: '$130k - $160k',
      availability: 'Available immediately',
      source: 'SmartHire',
      resumeUrl: '#',
      linkedinUrl: '#',
      githubUrl: '#',
      notes: ['Strong product sense', 'Leadership experience'],
      tags: ['Product', 'Leadership'],
      interviews: []
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 456-7890',
      avatar: '👩‍🎨',
      title: 'UX Designer',
      company: 'Apple',
      location: 'Cupertino, CA',
      experience: 5,
      education: 'BFA Design, RISD',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      appliedFor: 'Senior UX Designer',
      appliedDate: '2024-01-10',
      status: 'reviewing',
      matchScore: 82,
      rating: 4,
      salary: '$120k - $150k',
      availability: 'Available in 1 month',
      source: 'Dribbble',
      resumeUrl: '#',
      linkedinUrl: '#',
      githubUrl: '#',
      notes: ['Excellent portfolio', 'Strong design thinking'],
      tags: ['Design', 'Creative'],
      interviews: []
    }
  ]);

  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'kanban'>('grid');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set());

  const statusColumns = [
    { id: 'new', label: 'New Applications', color: 'blue', count: candidates.filter(c => c.status === 'new').length },
    { id: 'reviewing', label: 'Reviewing', color: 'yellow', count: candidates.filter(c => c.status === 'reviewing').length },
    { id: 'shortlisted', label: 'Shortlisted', color: 'purple', count: candidates.filter(c => c.status === 'shortlisted').length },
    { id: 'interview', label: 'Interview', color: 'orange', count: candidates.filter(c => c.status === 'interview').length },
    { id: 'offer', label: 'Offer', color: 'green', count: candidates.filter(c => c.status === 'offer').length },
    { id: 'hired', label: 'Hired', color: 'emerald', count: candidates.filter(c => c.status === 'hired').length },
    { id: 'rejected', label: 'Rejected', color: 'red', count: candidates.filter(c => c.status === 'rejected').length }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      reviewing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      shortlisted: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      interview: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      offer: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      hired: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    return colors[status as keyof typeof colors] || colors.new;
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-100 dark:bg-red-900/20';
  };

  const renderCandidateCard = (candidate: Candidate, index: number) => (
    <motion.div
      key={candidate.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all cursor-pointer"
      onClick={() => setSelectedCandidate(candidate)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
            {candidate.avatar}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">{candidate.name}</h3>
            <p className="text-slate-600 dark:text-slate-400">{candidate.title}</p>
            <p className="text-slate-500 text-sm">{candidate.company}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchScoreColor(candidate.matchScore)}`}>
            {candidate.matchScore}% match
          </span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < candidate.rating
                    ? 'text-yellow-500 fill-current'
                    : 'text-slate-300 dark:text-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{candidate.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          <span>{candidate.experience} years experience</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Applied {new Date(candidate.appliedDate).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Applied For */}
      <div className="mb-4">
        <p className="text-sm text-slate-500 mb-1">Applied for:</p>
        <p className="font-medium text-slate-900 dark:text-white">{candidate.appliedFor}</p>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {candidate.skills.slice(0, 4).map((skill, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded text-xs"
          >
            {skill}
          </span>
        ))}
        {candidate.skills.length > 4 && (
          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-xs">
            +{candidate.skills.length - 4} more
          </span>
        )}
      </div>

      {/* Status and Actions */}
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(candidate.status)}`}>
          {candidate.status}
        </span>
        
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle shortlist
            }}
            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
            title="Shortlist"
          >
            <UserCheck className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle schedule interview
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="Schedule Interview"
          >
            <Video className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle message
            }}
            className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
            title="Send Message"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderKanbanView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 overflow-x-auto">
      {statusColumns.map((column) => (
        <div
          key={column.id}
          className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-200 dark:border-slate-700 min-w-[300px]"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">{column.label}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${column.color}-100 text-${column.color}-800 dark:bg-${column.color}-900/20 dark:text-${column.color}-400`}>
              {column.count}
            </span>
          </div>
          
          <div className="space-y-3 min-h-[400px]">
            {candidates
              .filter(candidate => candidate.status === column.id)
              .map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl cursor-pointer hover:shadow-md transition-all"
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg">
                      {candidate.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 dark:text-white truncate">{candidate.name}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{candidate.appliedFor}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{candidate.matchScore}% match</span>
                    <span>{new Date(candidate.appliedDate).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Candidates</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage and review job applications
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-600 text-blue-600 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-600 text-blue-600 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'kanban'
                    ? 'bg-white dark:bg-slate-600 text-blue-600 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Users className="w-4 h-4" />
              </button>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              Add Candidate
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Candidates', value: candidates.length, icon: Users, color: 'blue' },
            { label: 'New Applications', value: candidates.filter(c => c.status === 'new').length, icon: FileText, color: 'green' },
            { label: 'In Interview', value: candidates.filter(c => c.status === 'interview').length, icon: Video, color: 'purple' },
            { label: 'Hired This Month', value: candidates.filter(c => c.status === 'hired').length, icon: Award, color: 'orange' }
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
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search candidates by name, skills, or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {viewMode === 'kanban' ? (
            renderKanbanView()
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {candidates.map((candidate, index) => renderCandidateCard(candidate, index))}
            </div>
          )}
        </motion.div>

        {/* Candidate Detail Modal */}
        <AnimatePresence>
          {selectedCandidate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedCandidate(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
                      {selectedCandidate.avatar}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCandidate.name}</h2>
                      <p className="text-slate-600 dark:text-slate-400">{selectedCandidate.title}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {selectedCandidate.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {selectedCandidate.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Candidate details content would go here */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Basic Info */}
                  <div className="space-y-6">
                    {/* Contact Information */}
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-600 dark:text-slate-400">{selectedCandidate.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-600 dark:text-slate-400">{selectedCandidate.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-600 dark:text-slate-400">{selectedCandidate.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-600 dark:text-slate-400">{selectedCandidate.experience} years experience</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <button className="w-full flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors">
                          <UserCheck className="w-4 h-4" />
                          Shortlist Candidate
                        </button>
                        <button className="w-full flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors">
                          <Video className="w-4 h-4" />
                          Schedule Interview
                        </button>
                        <button className="w-full flex items-center gap-2 px-3 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          Send Message
                        </button>
                        <button className="w-full flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors">
                          <Download className="w-4 h-4" />
                          Download Resume
                        </button>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Social Profiles</h4>
                      <div className="space-y-2">
                        <a href={selectedCandidate.linkedinUrl} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                          <Linkedin className="w-4 h-4" />
                          LinkedIn Profile
                        </a>
                        <a href={selectedCandidate.githubUrl} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                          <Github className="w-4 h-4" />
                          GitHub Profile
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column - Details */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Application Details */}
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Application Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500 mb-1">Applied For</p>
                          <p className="font-medium text-slate-900 dark:text-white">{selectedCandidate.appliedFor}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 mb-1">Application Date</p>
                          <p className="font-medium text-slate-900 dark:text-white">{new Date(selectedCandidate.appliedDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 mb-1">Current Status</p>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(selectedCandidate.status)}`}>
                            {selectedCandidate.status}
                          </span>
                        </div>
                        <div>
                          <p className="text-slate-500 mb-1">Match Score</p>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchScoreColor(selectedCandidate.matchScore)}`}>
                            {selectedCandidate.matchScore}% match
                          </span>
                        </div>
                        <div>
                          <p className="text-slate-500 mb-1">Expected Salary</p>
                          <p className="font-medium text-slate-900 dark:text-white">{selectedCandidate.salary}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 mb-1">Availability</p>
                          <p className="font-medium text-slate-900 dark:text-white">{selectedCandidate.availability}</p>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Skills & Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Education</h4>
                      <p className="text-slate-600 dark:text-slate-400">{selectedCandidate.education}</p>
                    </div>

                    {/* Interview History */}
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Interview History</h4>
                      {selectedCandidate.interviews.length > 0 ? (
                        <div className="space-y-3">
                          {selectedCandidate.interviews.map((interview, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-slate-600 rounded-lg">
                              <div>
                                <p className="font-medium text-slate-900 dark:text-white">{interview.type}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{new Date(interview.date).toLocaleDateString()}</p>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                interview.status === 'completed' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              }`}>
                                {interview.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-600 dark:text-slate-400">No interviews scheduled yet</p>
                      )}
                    </div>

                    {/* Notes */}
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Notes</h4>
                      {selectedCandidate.notes.length > 0 ? (
                        <div className="space-y-2">
                          {selectedCandidate.notes.map((note, idx) => (
                            <div key={idx} className="p-3 bg-white dark:bg-slate-600 rounded-lg">
                              <p className="text-slate-600 dark:text-slate-400">{note}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-600 dark:text-slate-400">No notes added yet</p>
                      )}
                      
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add a note..."
                            className="flex-1 px-3 py-2 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}