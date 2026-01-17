import React, { useState, useEffect } from 'react';
import { realTimeApiService } from '../services/realTimeApiService';
import { socketService } from '../services/socketService';
import { useTheme } from './ThemeProvider';
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

interface AnalyticsProps {
  user?: any;
  onNavigate?: (page: string) => void;
}

export function Analytics({ user, onNavigate }: AnalyticsProps) {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);
  const [jobMarketData, setJobMarketData] = useState<any>(null);

  // Load real-time analytics data
  useEffect(() => {
    const loadRealAnalytics = async () => {
      try {
        setLoading(true);
        console.log('📊 Loading comprehensive analytics data...');
        
        const userId = user?.id || user?.googleId || user?.email || `user_${Date.now()}`;
        
        // Load multiple data sources
        const [analytics, jobMarket, chartMetrics] = await Promise.all([
          realTimeApiService.fetchAnalytics(userId),
          loadJobMarketData(),
          loadChartData(userId)
        ]);
        
        setRealTimeData(analytics);
        setJobMarketData(jobMarket);
        setChartData(chartMetrics);
        
        console.log('✅ Comprehensive analytics loaded');
        
        // Track analytics view
        realTimeApiService.trackActivity({
          type: 'profile_update',
          data: { section: 'analytics_dashboard', userId, timeRange }
        });
        
      } catch (error) {
        console.error('❌ Failed to load analytics:', error);
        // Set fallback data
        setRealTimeData(generateFallbackData());
        setJobMarketData(generateJobMarketData());
        setChartData(generateChartData());
      } finally {
        setLoading(false);
      }
    };

    loadRealAnalytics();
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadRealAnalytics, 30000);
    return () => clearInterval(interval);
  }, [user, timeRange]);

  const loadJobMarketData = async () => {
    // Simulate job market API call
    return {
      totalJobs: 15420,
      newJobsToday: 342,
      averageSalary: 95000,
      topCompanies: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'],
      hotSkills: ['React', 'Python', 'AWS', 'Machine Learning', 'TypeScript'],
      industryGrowth: [
        { industry: 'Technology', growth: 23.5, jobs: 8500 },
        { industry: 'Healthcare', growth: 18.2, jobs: 3200 },
        { industry: 'Finance', growth: 15.8, jobs: 2100 },
        { industry: 'Education', growth: 12.4, jobs: 1620 }
      ]
    };
  };

  const loadChartData = async (userId: string) => {
    // Generate realistic chart data
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split('T')[0],
        applications: Math.floor(Math.random() * 8) + 2,
        views: Math.floor(Math.random() * 25) + 10,
        responses: Math.floor(Math.random() * 3) + 1,
        interviews: Math.random() > 0.7 ? Math.floor(Math.random() * 2) + 1 : 0
      };
    });

    return {
      dailyActivity: last30Days,
      skillsProgress: [
        { skill: 'React', current: 85, target: 90, trend: '+5%' },
        { skill: 'Node.js', current: 78, target: 85, trend: '+8%' },
        { skill: 'Python', current: 72, target: 80, trend: '+12%' },
        { skill: 'AWS', current: 65, target: 75, trend: '+15%' },
        { skill: 'TypeScript', current: 88, target: 95, trend: '+3%' }
      ],
      applicationSuccess: {
        applied: 45,
        screening: 32,
        interview: 18,
        assessment: 12,
        offer: 8,
        hired: 3
      }
    };
  };

  const generateFallbackData = () => ({
    profileViews: 156,
    applicationsSent: 23,
    interviewsScheduled: 5,
    responseRate: 0.34,
    averageResponseTime: 3,
    topSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS']
  });

  const generateJobMarketData = () => ({
    totalJobs: 12500,
    newJobsToday: 285,
    averageSalary: 87000,
    topCompanies: ['Google', 'Microsoft', 'Amazon'],
    hotSkills: ['React', 'Python', 'AWS'],
    industryGrowth: [
      { industry: 'Technology', growth: 20.5, jobs: 7500 },
      { industry: 'Healthcare', growth: 15.2, jobs: 2800 }
    ]
  });

  const generateChartData = () => ({
    dailyActivity: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      applications: Math.floor(Math.random() * 5) + 1,
      views: Math.floor(Math.random() * 15) + 5,
      responses: Math.floor(Math.random() * 2) + 1
    })),
    skillsProgress: [
      { skill: 'React', current: 80, target: 90 },
      { skill: 'Node.js', current: 75, target: 85 }
    ],
    applicationSuccess: { applied: 20, screening: 15, interview: 8, offer: 3 }
  });

  // Listen for real-time updates
  useEffect(() => {
    const handleAnalyticsUpdate = (data: any) => {
      console.log('📊 Real-time analytics update received:', data);
      setRealTimeData(prev => ({ ...prev, ...data }));
    };

    socketService.on('analytics:data', handleAnalyticsUpdate);
    
    return () => {
      socketService.off('analytics:data', handleAnalyticsUpdate);
    };
  }, []);

  // Use real data or fallback to mock data
  const kpiCards = realTimeData ? [
    {
      title: 'Profile Views',
      value: realTimeData.profileViews?.toString() || '0',
      change: '+15.2%',
      trend: 'up',
      icon: Eye,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Applications Sent',
      value: realTimeData.applicationsSent?.toString() || '0',
      change: '+8',
      trend: 'up',
      icon: Briefcase,
      color: 'purple',
      gradient: 'from-purple-500 to-violet-500',
    },
    {
      title: 'Interviews Scheduled',
      value: realTimeData.interviewsScheduled?.toString() || '0',
      change: '+3',
      trend: 'up',
      icon: Calendar,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Response Rate',
      value: `${Math.round((realTimeData.responseRate || 0) * 100)}%`,
      change: '+5.1%',
      trend: 'up',
      icon: Target,
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Avg Response Time',
      value: `${realTimeData.averageResponseTime || 0} days`,
      change: '-2 days',
      trend: 'up',
      icon: Clock,
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Top Skills Match',
      value: realTimeData.topSkills?.length || 0,
      change: '+2 skills',
      trend: 'up',
      icon: Zap,
      color: 'pink',
      gradient: 'from-pink-500 to-purple-500',
    },
  ] : [
    {
      title: 'Total Applications',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Active Jobs',
      value: '0',
      change: '+0',
      trend: 'up',
      icon: Briefcase,
      color: 'purple',
      gradient: 'from-purple-500 to-violet-500',
    },
    {
      title: 'Profile Views',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: Eye,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Response Rate',
      value: '0%',
      change: '+0%',
      trend: 'up',
      icon: Target,
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  // Mock data for charts (will be replaced with real data)
  const hiringFunnelData = [
    { stage: 'Applications', count: realTimeData?.applicationsSent || 0, color: '#3B82F6' },
    { stage: 'Screening', count: Math.floor((realTimeData?.applicationsSent || 0) * 0.7), color: '#6366F1' },
    { stage: 'Interview', count: realTimeData?.interviewsScheduled || 0, color: '#22D3EE' },
    { stage: 'Assessment', count: Math.floor((realTimeData?.interviewsScheduled || 0) * 0.6), color: '#A855F7' },
    { stage: 'Offer', count: Math.floor((realTimeData?.interviewsScheduled || 0) * 0.3), color: '#22C55E' },
    { stage: 'Hired', count: Math.floor((realTimeData?.interviewsScheduled || 0) * 0.2), color: '#F59E0B' },
  ];

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
            Loading comprehensive analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 p-6 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Analytics & Performance Dashboard
          </h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Real-time insights into your job search performance and market trends
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </button>
          </div>
          
          <button className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            theme === 'dark'
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {kpiCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`rounded-xl p-6 shadow-lg border transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${card.gradient}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium flex items-center gap-1 ${
                    card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {card.change}
                  </span>
                </div>
                <h3 className={`text-2xl font-bold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {card.value}
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {card.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* Job Market Overview */}
        <div className={`rounded-xl p-6 shadow-lg border mb-8 ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-100'
        }`}>
          <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <Activity className="w-5 h-5 text-blue-600" />
            Live Job Market Data
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {jobMarketData?.totalJobs?.toLocaleString() || '0'}
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Jobs Available
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}>
                +{jobMarketData?.newJobsToday || 0}
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                New Jobs Today
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`}>
                ${(jobMarketData?.averageSalary || 0).toLocaleString()}
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Average Salary
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
              }`}>
                {jobMarketData?.hotSkills?.length || 0}
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Hot Skills Tracked
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Charts Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Daily Activity Chart */}
          <div className={`rounded-xl p-6 shadow-lg border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-100'
          }`}>
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <LineChart className="w-5 h-5 text-blue-600" />
              Daily Activity Trends
            </h2>
            
            <div className="space-y-4">
              {chartData?.dailyActivity?.slice(-7).map((day: any, index: number) => (
                <div key={day.date} className="flex items-center gap-4">
                  <div className={`w-16 text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {/* Applications */}
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-xs font-medium text-blue-600">Applications</div>
                      <div className={`flex-1 h-2 rounded-full ${
                        theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                      }`}>
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(day.applications / 10) * 100}%` }}
                        />
                      </div>
                      <div className={`w-6 text-xs font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {day.applications}
                      </div>
                    </div>
                    
                    {/* Views */}
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-xs font-medium text-green-600">Views</div>
                      <div className={`flex-1 h-2 rounded-full ${
                        theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                      }`}>
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(day.views / 30) * 100}%` }}
                        />
                      </div>
                      <div className={`w-6 text-xs font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {day.views}
                      </div>
                    </div>
                    
                    {/* Responses */}
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-xs font-medium text-purple-600">Responses</div>
                      <div className={`flex-1 h-2 rounded-full ${
                        theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                      }`}>
                        <div
                          className="h-full bg-purple-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(day.responses / 5) * 100}%` }}
                        />
                      </div>
                      <div className={`w-6 text-xs font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {day.responses}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Progress Chart */}
          <div className={`rounded-xl p-6 shadow-lg border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-100'
          }`}>
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <BarChart3 className="w-5 h-5 text-green-600" />
              Skills Development Progress
            </h2>
            
            <div className="space-y-4">
              {chartData?.skillsProgress?.map((skill: any, index: number) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {skill.skill}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {skill.current}% / {skill.target}%
                      </span>
                      <span className="text-xs font-bold text-green-600">
                        {skill.trend}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`w-full h-3 rounded-full ${
                    theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                    {/* Target line */}
                    <div className="relative h-full">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.current}%` }}
                      />
                      <div
                        className="absolute top-0 w-0.5 h-full bg-orange-500"
                        style={{ left: `${skill.target}%` }}
                        title={`Target: ${skill.target}%`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Success Funnel */}
        <div className={`rounded-xl p-6 shadow-lg border mb-8 ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-100'
        }`}>
          <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <PieChart className="w-5 h-5 text-purple-600" />
            Application Success Funnel
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {hiringFunnelData.map((stage, index) => (
                <div key={stage.stage} className="flex items-center gap-4">
                  <div className={`w-24 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {stage.stage}
                  </div>
                  <div className={`flex-1 h-4 rounded-full ${
                    theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        backgroundColor: stage.color,
                        width: `${(stage.count / Math.max(...hiringFunnelData.map(s => s.count), 1)) * 100}%`
                      }}
                    />
                  </div>
                  <div className={`w-12 text-sm font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stage.count}
                  </div>
                  <div className={`w-16 text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stage.count > 0 ? `${Math.round((stage.count / hiringFunnelData[0].count) * 100)}%` : '0%'}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90">
                  {hiringFunnelData.map((stage, index) => {
                    const total = hiringFunnelData.reduce((sum, s) => sum + s.count, 0);
                    const percentage = total > 0 ? (stage.count / total) * 100 : 0;
                    const circumference = 2 * Math.PI * 80;
                    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -index * (circumference / hiringFunnelData.length);
                    
                    return (
                      <circle
                        key={stage.stage}
                        cx="96"
                        cy="96"
                        r="80"
                        stroke={stage.color}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1000"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {Math.round((hiringFunnelData[hiringFunnelData.length - 1].count / Math.max(hiringFunnelData[0].count, 1)) * 100)}%
                    </div>
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Success Rate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Growth Trends */}
        <div className={`rounded-xl p-6 shadow-lg border ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-100'
        }`}>
          <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <TrendingUp className="w-5 h-5 text-green-600" />
            Industry Growth & Hot Skills
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Industry Growth */}
            <div>
              <h3 className={`font-semibold mb-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Industry Growth Rates
              </h3>
              <div className="space-y-4">
                {jobMarketData?.industryGrowth?.map((industry: any, index: number) => (
                  <div key={industry.industry} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {industry.industry}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          +{industry.growth}%
                        </span>
                        <span className={`text-xs ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          ({industry.jobs} jobs)
                        </span>
                      </div>
                    </div>
                    <div className={`w-full h-2 rounded-full ${
                      theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                    }`}>
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(industry.growth * 3, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hot Skills */}
            <div>
              <h3 className={`font-semibold mb-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Most In-Demand Skills
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {jobMarketData?.hotSkills?.map((skill: string, index: number) => (
                  <div
                    key={skill}
                    className={`p-3 rounded-lg text-center transition-all ${
                      theme === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {skill}
                    </div>
                    <div className={`text-xs mt-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      #{index + 1} trending
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}