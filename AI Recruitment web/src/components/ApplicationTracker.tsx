import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

export function ApplicationTracker({ user }: ApplicationTrackerProps) {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      company: 'Google',
      position: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      salary: '$180k - $220k',
      appliedDate: '2024-01-15',
      status: 'interview',
      stage: 'Technical Interview',
      nextAction: 'System Design Interview',
      nextActionDate: '2024-01-25',
      notes: 'Great culture fit, technical round went well',
      contactPerson: 'Sarah Johnson',
      contactEmail: 'sarah.j@google.com',
      priority: 'high',
      responseTime: 3,
      interviewDate: '2024-01-25'
    },
    {
      id: '2',
      company: 'Microsoft',
      position: 'Principal Product Manager',
      location: 'Seattle, WA',
      salary: '$200k - $250k',
      appliedDate: '2024-01-10',
      status: 'offer',
      stage: 'Offer Received',
      nextAction: 'Negotiate Terms',
      nextActionDate: '2024-01-28',
      notes: 'Excellent team, good growth opportunities',
      contactPerson: 'Mike Chen',
      contactEmail: 'mike.chen@microsoft.com',
      priority: 'high',
      responseTime: 5,
      offerAmount: '$225k'
    },
    {
      id: '3',
      company: 'Apple',
      position: 'iOS Developer',
      location: 'Cupertino, CA',
      salary: '$160k - $200k',
      appliedDate: '2024-01-08',
      status: 'screening',
      stage: 'Phone Screen',
      nextAction: 'Technical Phone Screen',
      nextActionDate: '2024-01-22',
      notes: 'Recruiter was very positive about my background',
      contactPerson: 'Lisa Wang',
      contactEmail: 'lisa.wang@apple.com',
      priority: 'medium',
      responseTime: 7
    },
    {
      id: '4',
      company: 'Netflix',
      position: 'Senior Data Scientist',
      location: 'Los Gatos, CA',
      salary: '$170k - $210k',
      appliedDate: '2024-01-05',
      status: 'applied',
      stage: 'Application Submitted',
      nextAction: 'Follow up',
      nextActionDate: '2024-01-26',
      notes: 'Applied through referral from John Smith',
      priority: 'medium',
      responseTime: 0
    },
    {
      id: '5',
      company: 'Spotify',
      position: 'Backend Engineer',
      location: 'New York, NY',
      salary: '$150k - $180k',
      appliedDate: '2024-01-03',
      status: 'rejected',
      stage: 'Application Rejected',
      nextAction: 'Learn from feedback',
      nextActionDate: '',
      notes: 'Not enough experience with their tech stack',
      priority: 'low',
      responseTime: 10
    }
  ]);

  const [filteredApplications, setFilteredApplications] = useState(applications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [viewMode, setViewMode] = useState<'pipeline' | 'list' | 'calendar'>('pipeline');

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
    { id: 'rejected', label: 'Rejected', color: 'red', count: applications.filter(a => a.status === 'rejected').length }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <FileText className="w-4 h-4" />;
      case 'screening': return <Phone className="w-4 h-4" />;
      case 'interview': return <Video className="w-4 h-4" />;
      case 'offer': return <Award className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const updateApplicationStatus = (appId: string, newStatus: string) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: newStatus as any } : app
    ));
  };

  const renderPipelineView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
      {statusColumns.map((column) => (
        <motion.div
          key={column.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg bg-${column.color}-100 dark:bg-${column.color}-900/20`}>
                {getStatusIcon(column.id)}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{column.label}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{column.count} applications</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 min-h-[400px]">
            <AnimatePresence>
              {filteredApplications
                .filter(app => app.status === column.id)
                .map((app, index) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    onClick={() => setSelectedApplication(app)}
                    className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl cursor-pointer hover:shadow-md transition-all border border-slate-200 dark:border-slate-600"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{app.company}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(app.priority)}`}>
                        {app.priority}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">{app.position}</p>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{app.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <DollarSign className="w-3 h-3" />
                      <span>{app.salary}</span>
                    </div>

                    {app.nextAction && (
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-xs font-medium text-blue-900 dark:text-blue-400">Next: {app.nextAction}</p>
                        {app.nextActionDate && (
                          <p className="text-xs text-blue-700 dark:text-blue-300">{new Date(app.nextActionDate).toLocaleDateString()}</p>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-white">Company</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-white">Position</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-white">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-white">Applied</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-white">Next Action</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-white">Priority</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredApplications.map((app, index) => (
              <motion.tr
                key={app.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{app.company}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{app.location}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{app.position}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{app.salary}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(app.status)}
                    <span className="capitalize text-slate-900 dark:text-white">{app.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                  {new Date(app.appliedDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{app.nextAction}</p>
                    {app.nextActionDate && (
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {new Date(app.nextActionDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(app.priority)}`}>
                    {app.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedApplication(app)}
                      className="p-1 text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-slate-600 hover:text-green-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-slate-600 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
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
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Application Tracker</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage and track all your job applications in one place
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Application
          </motion.button>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Applications', value: applications.length, icon: FileText, color: 'blue' },
            { label: 'Active Interviews', value: applications.filter(a => a.status === 'interview').length, icon: Video, color: 'purple' },
            { label: 'Pending Offers', value: applications.filter(a => a.status === 'offer').length, icon: Award, color: 'green' },
            { label: 'Success Rate', value: `${Math.round((applications.filter(a => a.status === 'accepted').length / applications.length) * 100)}%`, icon: TrendingUp, color: 'orange' }
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

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-8"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search companies or positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="applied">Applied</option>
              <option value="screening">Screening</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 rounded-xl p-1">
              {[
                { id: 'pipeline', label: 'Pipeline', icon: BarChart3 },
                { id: 'list', label: 'List', icon: FileText },
                { id: 'calendar', label: 'Calendar', icon: Calendar }
              ].map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setViewMode(view.id as any)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      viewMode === view.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {view.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {viewMode === 'pipeline' && renderPipelineView()}
          {viewMode === 'list' && renderListView()}
          {viewMode === 'calendar' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 text-center">
              <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Calendar View</h3>
              <p className="text-slate-600 dark:text-slate-400">Calendar integration coming soon!</p>
            </div>
          )}
        </motion.div>

        {/* Application Detail Modal */}
        <AnimatePresence>
          {selectedApplication && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedApplication(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedApplication.company}
                  </h2>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Position Details</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-slate-600 dark:text-slate-400">Position:</span> {selectedApplication.position}</p>
                        <p><span className="text-slate-600 dark:text-slate-400">Location:</span> {selectedApplication.location}</p>
                        <p><span className="text-slate-600 dark:text-slate-400">Salary:</span> {selectedApplication.salary}</p>
                        <p><span className="text-slate-600 dark:text-slate-400">Applied:</span> {new Date(selectedApplication.appliedDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Status & Progress</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-slate-600 dark:text-slate-400">Current Status:</span> 
                          <span className="ml-2 capitalize font-medium">{selectedApplication.status}</span>
                        </p>
                        <p><span className="text-slate-600 dark:text-slate-400">Stage:</span> {selectedApplication.stage}</p>
                        <p><span className="text-slate-600 dark:text-slate-400">Priority:</span> 
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedApplication.priority)}`}>
                            {selectedApplication.priority}
                          </span>
                        </p>
                        {selectedApplication.responseTime && (
                          <p><span className="text-slate-600 dark:text-slate-400">Response Time:</span> {selectedApplication.responseTime} days</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {selectedApplication.contactPerson && (
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Contact Information</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-slate-600 dark:text-slate-400">Contact Person:</span> {selectedApplication.contactPerson}</p>
                        {selectedApplication.contactEmail && (
                          <p><span className="text-slate-600 dark:text-slate-400">Email:</span> 
                            <a href={`mailto:${selectedApplication.contactEmail}`} className="ml-2 text-blue-600 hover:underline">
                              {selectedApplication.contactEmail}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedApplication.nextAction && (
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Next Actions</h3>
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="font-medium text-blue-900 dark:text-blue-400">{selectedApplication.nextAction}</p>
                        {selectedApplication.nextActionDate && (
                          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                            Due: {new Date(selectedApplication.nextActionDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedApplication.notes && (
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Notes</h3>
                      <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <p className="text-slate-700 dark:text-slate-300">{selectedApplication.notes}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Application
                    </button>
                    <button className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Update Status
                    </button>
                    <button className="py-2 px-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
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