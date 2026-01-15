import { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  Clock,
  Target,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Download,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  Eye,
  MousePointer,
  Share2,
  UserCheck,
  Zap
} from 'lucide-react';
import { LineChart as RechartsLine, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsProps {
  user?: any;
}

export function Analytics({ user }: AnalyticsProps) {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  // Mock data for charts
  const hiringFunnelData = [
    { stage: 'Applications', count: 1250, color: '#3B82F6' },
    { stage: 'Screening', count: 850, color: '#6366F1' },
    { stage: 'Interview', count: 420, color: '#22D3EE' },
    { stage: 'Assessment', count: 180, color: '#A855F7' },
    { stage: 'Offer', count: 95, color: '#22C55E' },
    { stage: 'Hired', count: 78, color: '#F59E0B' },
  ];

  const weeklyTrendData = [
    { week: 'Week 1', applications: 180, interviews: 45, hires: 12 },
    { week: 'Week 2', applications: 220, interviews: 62, hires: 18 },
    { week: 'Week 3', applications: 195, interviews: 51, hires: 14 },
    { week: 'Week 4', applications: 250, interviews: 75, hires: 22 },
  ];

  const sourceBreakdownData = [
    { name: 'LinkedIn', value: 35, color: '#3B82F6' },
    { name: 'Indeed', value: 28, color: '#6366F1' },
    { name: 'Referrals', value: 20, color: '#22D3EE' },
    { name: 'Company Site', value: 12, color: '#A855F7' },
    { name: 'Other', value: 5, color: '#22C55E' },
  ];

  const timeToHireData = [
    { month: 'Jan', days: 28 },
    { month: 'Feb', days: 25 },
    { month: 'Mar', days: 22 },
    { month: 'Apr', days: 19 },
    { month: 'May', days: 18 },
    { month: 'Jun', days: 16 },
  ];

  const departmentData = [
    { dept: 'Engineering', open: 24, filled: 18, pending: 6 },
    { dept: 'Sales', open: 15, filled: 12, pending: 3 },
    { dept: 'Marketing', open: 10, filled: 8, pending: 2 },
    { dept: 'Product', open: 12, filled: 10, pending: 2 },
    { dept: 'Support', open: 8, filled: 7, pending: 1 },
  ];

  const kpiCards = [
    {
      title: 'Total Applications',
      value: '1,250',
      change: '+18.2%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Active Jobs',
      value: '47',
      change: '+5',
      trend: 'up',
      icon: Briefcase,
      color: 'purple',
      gradient: 'from-purple-500 to-violet-500',
    },
    {
      title: 'Avg Time to Hire',
      value: '16 days',
      change: '-3 days',
      trend: 'up',
      icon: Clock,
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Offer Acceptance',
      value: '82%',
      change: '+7.2%',
      trend: 'up',
      icon: Target,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Cost per Hire',
      value: '$3,250',
      change: '-$420',
      trend: 'up',
      icon: DollarSign,
      color: 'orange',
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Quality of Hire',
      value: '4.6/5',
      change: '+0.3',
      trend: 'up',
      icon: UserCheck,
      color: 'pink',
      gradient: 'from-pink-500 to-rose-500',
    },
  ];

  const topPerformers = [
    { name: 'Senior Full-Stack Developer', views: 2450, applications: 186, fillRate: 95, status: 'active' },
    { name: 'Product Manager', views: 1820, applications: 142, fillRate: 88, status: 'active' },
    { name: 'UX Designer', views: 1560, applications: 98, fillRate: 75, status: 'filled' },
    { name: 'Data Scientist', views: 1340, applications: 124, fillRate: 92, status: 'active' },
    { name: 'DevOps Engineer', views: 1150, applications: 89, fillRate: 68, status: 'active' },
  ];

  const recentActivities = [
    { type: 'hire', message: '3 new candidates hired for Engineering roles', time: '2 hours ago', icon: CheckCircle, color: 'green' },
    { type: 'interview', message: '12 interviews scheduled for this week', time: '4 hours ago', icon: Calendar, color: 'blue' },
    { type: 'application', message: '45 new applications received', time: '6 hours ago', icon: Users, color: 'purple' },
    { type: 'job', message: 'New job posted: Senior React Developer', time: '1 day ago', icon: Briefcase, color: 'cyan' },
    { type: 'assessment', message: '8 candidates completed technical assessment', time: '1 day ago', icon: Target, color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 p-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-4"
          >
            <div>
              <h1 className="text-4xl font-black text-gradient-animate">Analytics Dashboard</h1>
              <p className="text-gray-400 mt-2">Real-time insights into your hiring performance</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Time Range Selector */}
              <div className="flex gap-2 glass-card p-1 rounded-xl">
                {['7d', '30d', '90d', '1y'].map((range) => (
                  <motion.button
                    key={range}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      timeRange === range
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '1 Year'}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card p-3 rounded-xl hover:border-cyan-400/40 transition-colors"
              >
                <RefreshCw className="w-5 h-5 text-cyan-400" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Report
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpiCards.map((kpi, i) => {
            const Icon = kpi.icon;
            const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card-hover p-6 rounded-2xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${kpi.gradient} glow-sm`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                    kpi.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    <TrendIcon className="w-4 h-4" />
                    <span className="text-sm font-bold">{kpi.change}</span>
                  </div>
                </div>
                <h3 className="text-gray-400 text-sm mb-1">{kpi.title}</h3>
                <p className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>{kpi.value}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Hiring Funnel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Hiring Funnel</h2>
              <BarChart3 className="w-5 h-5 text-cyan-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hiringFunnelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="stage" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--glass-bg)', 
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(24px)'
                  }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Source Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Candidate Sources</h2>
              <PieChart className="w-5 h-5 text-purple-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPie>
                <Pie
                  data={sourceBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--glass-bg)', 
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(24px)'
                  }}
                />
                <Legend />
              </RechartsPie>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Weekly Trends</h2>
              <LineChart className="w-5 h-5 text-cyan-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyTrendData}>
                <defs>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--glass-bg)', 
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(24px)'
                  }}
                />
                <Area type="monotone" dataKey="applications" stroke="#3B82F6" fillOpacity={1} fill="url(#colorApplications)" />
                <Area type="monotone" dataKey="interviews" stroke="#6366F1" fillOpacity={1} fill="url(#colorInterviews)" />
                <Area type="monotone" dataKey="hires" stroke="#22C55E" fillOpacity={1} fill="url(#colorHires)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Recent Activity</h2>
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className={`p-2 rounded-lg bg-${activity.color}-500/20`}>
                      <Icon className={`w-4 h-4 text-${activity.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Top Performing Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-2xl mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Top Performing Jobs</h2>
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Job Title</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Views</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Applications</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Fill Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {topPerformers.map((job, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{job.name}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Eye className="w-4 h-4" />
                        {job.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <MousePointer className="w-4 h-4" />
                        {job.applications}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden max-w-[100px]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${job.fillRate}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          />
                        </div>
                        <span className="text-sm font-semibold text-cyan-400">{job.fillRate}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        job.status === 'active' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/40' 
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Time to Hire Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Time to Hire Trend</h2>
              <p className="text-sm text-gray-400 mt-1">Average days from job posting to offer acceptance</p>
            </div>
            <Clock className="w-5 h-5 text-cyan-400" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <RechartsLine data={timeToHireData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--glass-bg)', 
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(24px)'
                }}
              />
              <Line type="monotone" dataKey="days" stroke="#22D3EE" strokeWidth={3} dot={{ fill: '#22D3EE', r: 6 }} />
            </RechartsLine>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
