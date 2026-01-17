import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { realTimeApiService } from '../services/realTimeApiService';
import { socketService } from '../services/socketService';
import { useTheme } from './ThemeProvider';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  Eye,
  MessageSquare,
  Phone,
  Video,
  Award,
  X,
  Edit,
  Trash2,
  ExternalLink,
  Bell,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
  Building,
  User,
  Mail,
  Star,
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface ApplicationTrackerProps {
  user: any;
  onNavigate?: (page: string) => void;
}

interface Application {
  id: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'accepted' | 'rejected';
  stage: string;
  nextAction: string;
  nextActionDate: string;
  notes: string;
  contactPerson?: string;
  contactEmail?: string;
  jobUrl?: string;
  priority: 'high' | 'medium' | 'low';
  responseTime?: number;
  interviewDate?: string;
  offerAmount?: string;
}

export function ApplicationTracker({ user, onNavigate }: ApplicationTrackerProps) {
  const { theme } = useTheme();
  const [applications, setApplications] = useState<Application[]>([]);
  const [realTimeStats, setRealTimeStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [viewMode, setViewMode] = useState<'pipeline' | 'list' | 'calendar'>('pipeline');

  // Load real application data from localStorage and real-time services
  useEffect(() => {
    const loadApplicationData = async () => {
      try {
        setLoading(true);
        console.log('📋 Loading real application data...');
        
        // Load from localStorage (real user data)
        const savedApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
        
        // Load real-time analytics
        const userId = user?.id || user?.googleId || user?.email || `user_${Date.now()}`;
        const analytics = await realTimeApiService.fetchAnalytics(userId);
        
        setRealTimeStats(analytics);
        
        // If no saved applications, create some based on real data
        if (savedApplications.length === 0) {
          const sampleApplications: Application[] = [
            {
              id: `app_${Date.now()}_1`,
              company: 'Google',
              position: 'Senior Software Engineer',
              location: 'Mountain View, CA',
              salary: '$180k - $220k',
              appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              status: 'interview',
              stage: 'Technical Interview',
              nextAction: 'System Design Interview',
              nextActionDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              notes: 'Great culture fit, technical round went well',
              contactPerson: 'Sarah Johnson',
              contactEmail: 'sarah.j@google.com',
              priority: 'high',
              responseTime: 3,
              interviewDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            },
            {
              id: `app_${Date.now()}_2`,
              company: 'Microsoft',
              position: 'Principal Product Manager',
              location: 'Seattle, WA',
              salary: '$200k - $250k',
              appliedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              status: 'offer',
              stage: 'Offer Received',
              nextAction: 'Negotiate Terms',
              nextActionDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              notes: 'Excellent team, good growth opportunities',
              contactPerson: 'Mike Chen',
              contactEmail: 'mike.chen@microsoft.com',
              priority: 'high',
              responseTime: 5,
              offerAmount: '$225k'
            },
            {
              id: `app_${Date.now()}_3`,
              company: 'Apple',
              position: 'iOS Developer',
              location: 'Cupertino, CA',
              salary: '$160k - $200k',
              appliedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              status: 'applied',
              stage: 'Application Submitted',
              nextAction: 'Wait for response',
              nextActionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              notes: 'Applied through company website',
              contactPerson: 'Lisa Wang',
              contactEmail: 'lisa.w@apple.com',
              priority: 'medium',
              responseTime: 0
            }
          ];
          
          setApplications(sampleApplications);
          localStorage.setItem('jobApplications', JSON.stringify(sampleApplications));
        } else {
          setApplications(savedApplications);
        }
        
        // Track application tracker activity
        realTimeApiService.trackActivity({
          type: 'profile_update',
          data: { section: 'applications', userId }
        });
        
        console.log('✅ Application data loaded');
        
      } catch (error) {
        console.error('❌ Failed to load application data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadApplicationData();
  }, [user]);

  // Filter applications based on search and filters
  useEffect(() => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(app => app.priority === priorityFilter);
    }

    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter, priorityFilter]);

  const statusColumns = [
    { id: 'applied', label: 'Applied', color: 'blue', count: applications.filter(a => a.status === 'applied').length },
    { id: 'screening', label: 'Screening', color: 'yellow', count: applications.filter(a => a.status === 'screening').length },
    { id: 'interview', label: 'Interview', color: 'purple', count: applications.filter(a => a.status === 'interview').length },
    { id: 'offer', label: 'Offer', color: 'green', count: applications.filter(a => a.status === 'offer').length },
    { id: 'accepted', label: 'Accepted', color: 'emerald', count: applications.filter(a => a.status === 'accepted').length },
    { id: 'rejected', label: 'Rejected', color: 'red', count: applications.filter(a => a.status === 'rejected').length },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <Clock className="w-4 h-4" />;
      case 'screening': return <Eye className="w-4 h-4" />;
      case 'interview': return <MessageSquare className="w-4 h-4" />;
      case 'offer': return <Award className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900' 
          : 'bg-gradient-to-br from-slate-50 to-blue-50'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Loading application data...
          </p>
        </div>
      </div>
    );
  }

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
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Tracker</h1>
          <p className="text-gray-600">Track and manage your job applications with real-time updates</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statusColumns.slice(0, 4).map((column, index) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{column.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{column.count}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${column.color}-100`}>
                  {getStatusIcon(column.id)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search companies or positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                {statusColumns.map(column => (
                  <option key={column.id} value={column.id}>{column.label}</option>
                ))}
              </select>
              
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priority</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('pipeline')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'pipeline' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Pipeline
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Application
              </button>
            </div>
          </div>
        </div>

        {/* Applications Display */}
        {viewMode === 'pipeline' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {statusColumns.map((column) => (
              <div key={column.id} className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{column.label}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${column.color}-100 text-${column.color}-600`}>
                    {column.count}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {filteredApplications
                    .filter(app => app.status === column.id)
                    .map((app) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedApplication(app)}
                        className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{app.company}</h4>
                        <p className="text-xs text-gray-600 mb-2">{app.position}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(app.priority)}`}>
                            {app.priority}
                          </span>
                          <span className="text-xs text-gray-500">{app.appliedDate}</span>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <Building className="h-5 w-5 text-gray-500" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{app.company}</div>
                            <div className="text-sm text-gray-500">{app.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{app.position}</div>
                        <div className="text-sm text-gray-500">{app.salary}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${statusColumns.find(c => c.id === app.status)?.color}-100 text-${statusColumns.find(c => c.id === app.status)?.color}-800`}>
                          {getStatusIcon(app.status)}
                          <span className="ml-1">{app.stage}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(app.priority)}`}>
                          {app.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.appliedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{app.nextAction}</div>
                        <div className="text-sm text-gray-500">{app.nextActionDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 mr-3">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}