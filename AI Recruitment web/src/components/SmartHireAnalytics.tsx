import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Target,
  Clock,
  MapPin,
  Users,
  Award,
  Briefcase,
  DollarSign,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Brain,
  Star
} from 'lucide-react';

interface AnalyticsProps {
  user: any;
}

export function SmartHireAnalytics({ user }: AnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [selectedChart, setSelectedChart] = useState('applications');
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [selectedPeriod, selectedChart]);

  const periods = [
    { value: '1month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' }
  ];

  const chartTypes = [
    { value: 'applications', label: 'Applications', icon: Briefcase },
    { value: 'interviews', label: 'Interviews', icon: Users },
    { value: 'responses', label: 'Response Rate', icon: MessageSquare },
    { value: 'salary', label: 'Salary Insights', icon: DollarSign }
  ];

  // Mock data - in real app this would come from API
  const analyticsData = {
    overview: {
      totalApplications: 47,
      applicationsTrend: 12,
      interviewsScheduled: 8,
      interviewsTrend: 3,
      responseRate: 68,
      responseRateTrend: 5,
      averageResponseTime: 4.2,
      responseTimeTrend: -0.8
    },
    applicationTrends: [
      { month: 'Jan', applications: 12, interviews: 3, offers: 1 },
      { month: 'Feb', applications: 15, interviews: 4, offers: 0 },
      { month: 'Mar', applications: 20, interviews: 1, offers: 1 },
      { month: 'Apr', applications: 18, interviews: 2, offers: 0 },
      { month: 'May', applications: 22, interviews: 5, offers: 2 },
      { month: 'Jun', applications: 25, interviews: 6, offers: 1 }
    ],
    successRateBreakdown: [
      { stage: 'Applied', count: 47, percentage: 100 },
      { stage: 'Viewed', count: 32, percentage: 68 },
      { stage: 'Phone Screen', count: 15, percentage: 32 },
      { stage: 'Interview', count: 8, percentage: 17 },
      { stage: 'Final Round', count: 4, percentage: 9 },
      { stage: 'Offer', count: 2, percentage: 4 }
    ],
    geographicData: [
      { location: 'San Francisco', applications: 15, success: 3 },
      { location: 'New York', applications: 12, success: 2 },
      { location: 'Seattle', applications: 8, success: 1 },
      { location: 'Austin', applications: 6, success: 1 },
      { location: 'Remote', applications: 6, success: 0 }
    ],
    skillsDemand: [
      { skill: 'React', demand: 95, yourLevel: 85 },
      { skill: 'Node.js', demand: 88, yourLevel: 78 },
      { skill: 'Python', demand: 82, yourLevel: 90 },
      { skill: 'AWS', demand: 79, yourLevel: 65 },
      { skill: 'TypeScript', demand: 76, yourLevel: 80 },
      { skill: 'Docker', demand: 71, yourLevel: 60 }
    ],
    companyInsights: [
      { company: 'Google', applications: 3, stage: 'Interview', responseTime: 2.1 },
      { company: 'Microsoft', applications: 2, stage: 'Offer', responseTime: 1.8 },
      { company: 'Apple', applications: 2, stage: 'Phone Screen', responseTime: 3.2 },
      { company: 'Netflix', applications: 1, stage: 'Applied', responseTime: 0 },
      { company: 'Spotify', applications: 1, stage: 'Rejected', responseTime: 5.2 }
    ],
    predictiveInsights: [
      {
        type: 'success',
        title: '40% more likely to get interviews',
        description: 'Based on your recent profile updates and skill improvements',
        confidence: 87
      },
      {
        type: 'warning',
        title: 'Response rate declining',
        description: 'Consider updating your resume format for better ATS compatibility',
        confidence: 73
      },
      {
        type: 'info',
        title: 'Peak application time',
        description: 'Tuesday mornings show 23% higher response rates for your profile',
        confidence: 91
      }
    ]
  };

  const renderChart = () => {
    switch (selectedChart) {
      case 'applications':
        return (
          <div className="space-y-6">
            {/* Application Trends Line Chart */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Application Trends</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {analyticsData.applicationTrends.map((data, index) => (
                  <motion.div
                    key={`${animationKey}-${index}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.applications / 25) * 100}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg min-h-[20px] relative group"
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded">
                      {data.applications} apps
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 text-xs text-slate-600 dark:text-slate-400">
                      {data.month}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Success Funnel */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Application Funnel</h3>
              <div className="space-y-3">
                {analyticsData.successRateBreakdown.map((stage, index) => (
                  <motion.div
                    key={`${animationKey}-funnel-${index}`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{stage.stage}</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">{stage.count} ({stage.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stage.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full rounded-full ${
                          index === 0 ? 'bg-blue-500' :
                          index === 1 ? 'bg-green-500' :
                          index === 2 ? 'bg-yellow-500' :
                          index === 3 ? 'bg-orange-500' :
                          index === 4 ? 'bg-red-500' : 'bg-purple-500'
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'interviews':
        return (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Interview Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Interview Success Rate Donut */}
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-slate-200 dark:text-slate-700"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - 0.75) }}
                      transition={{ duration: 1.5 }}
                      className="text-green-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">75%</span>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400">Success Rate</p>
              </div>

              {/* Interview Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="text-slate-900 dark:text-white">Total Interviews</span>
                  <span className="font-bold text-slate-900 dark:text-white">8</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="text-slate-900 dark:text-white">Avg. Preparation Time</span>
                  <span className="font-bold text-slate-900 dark:text-white">2.5h</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="text-slate-900 dark:text-white">Confidence Score</span>
                  <span className="font-bold text-green-600">82%</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'responses':
        return (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Response Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-3">Response Time by Company</h4>
                <div className="space-y-3">
                  {analyticsData.companyInsights.map((company, index) => (
                    <motion.div
                      key={`${animationKey}-response-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                    >
                      <div>
                        <span className="font-medium text-slate-900 dark:text-white">{company.company}</span>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{company.stage}</p>
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {company.responseTime > 0 ? `${company.responseTime} days` : 'Pending'}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-3">Geographic Distribution</h4>
                <div className="space-y-3">
                  {analyticsData.geographicData.map((location, index) => (
                    <motion.div
                      key={`${animationKey}-geo-${index}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-600" />
                        <span className="font-medium text-slate-900 dark:text-white">{location.location}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{location.applications}</span>
                        <p className="text-xs text-green-600">{location.success} success</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'salary':
        return (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Salary Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-3">Market Comparison</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Your Target Range</span>
                      <span className="font-bold text-slate-900 dark:text-white">$120k - $150k</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Market Average</span>
                      <span className="font-bold text-green-600">$135k</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <h5 className="font-medium text-slate-900 dark:text-white mb-2">Negotiation Potential</h5>
                    <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '78%' }}
                        transition={{ duration: 1 }}
                        className="bg-gradient-to-r from-yellow-400 to-green-500 h-full rounded-full"
                      />
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      High potential based on your skills and market demand
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-3">Skills vs Market Demand</h4>
                <div className="space-y-3">
                  {analyticsData.skillsDemand.slice(0, 4).map((skill, index) => (
                    <motion.div
                      key={`${animationKey}-skill-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900 dark:text-white">{skill.skill}</span>
                        <div className="flex gap-2 text-xs">
                          <span className="text-blue-600">Demand: {skill.demand}%</span>
                          <span className="text-green-600">Your Level: {skill.yourLevel}%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-slate-200 dark:bg-slate-600 rounded-full h-1">
                          <div 
                            className="bg-blue-500 h-full rounded-full" 
                            style={{ width: `${skill.demand}%` }}
                          />
                        </div>
                        <div className="flex-1 bg-slate-200 dark:bg-slate-600 rounded-full h-1">
                          <div 
                            className="bg-green-500 h-full rounded-full" 
                            style={{ width: `${skill.yourLevel}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Track your job search performance and get insights
            </p>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const reportData = `📊 SMARTHIRE ANALYTICS REPORT - ${periods.find(p => p.value === selectedPeriod)?.label}\n${'='.repeat(60)}\n\n📈 OVERVIEW METRICS:\n• Total Applications: ${analyticsData.overview.totalApplications} (+${analyticsData.overview.applicationsTrend} from previous period)\n• Interviews Scheduled: ${analyticsData.overview.interviewsScheduled} (+${analyticsData.overview.interviewsTrend} from previous period)\n• Response Rate: ${analyticsData.overview.responseRate}% (+${analyticsData.overview.responseRateTrend}% from previous period)\n• Average Response Time: ${analyticsData.overview.averageResponseTime} days (${analyticsData.overview.responseTimeTrend} days improvement)\n\n📊 APPLICATION TRENDS:\n${analyticsData.applicationTrends.map(trend => `• ${trend.month}: ${trend.applications} applications, ${trend.interviews} interviews, ${trend.offers} offers`).join('\n')}\n\n🎯 SUCCESS FUNNEL ANALYSIS:\n${analyticsData.successRateBreakdown.map(stage => `• ${stage.stage}: ${stage.count} candidates (${stage.percentage}%)`).join('\n')}\n\n🌍 GEOGRAPHIC BREAKDOWN:\n${analyticsData.geographicData.map(geo => `• ${geo.location}: ${geo.applications} applications, ${geo.success} successful outcomes`).join('\n')}\n\n🔧 SKILLS MARKET ANALYSIS:\n${analyticsData.skillsDemand.map(skill => `• ${skill.skill}: Market demand ${skill.demand}%, Your proficiency ${skill.yourLevel}%`).join('\n')}\n\n🏢 COMPANY INSIGHTS:\n${analyticsData.companyInsights.map(company => `• ${company.company}: ${company.applications} applications, Current stage: ${company.stage}, Response time: ${company.responseTime > 0 ? company.responseTime + ' days' : 'Pending'}`).join('\n')}\n\n🤖 AI-POWERED PREDICTIONS:\n${analyticsData.predictiveInsights.map(insight => `• ${insight.title} (${insight.confidence}% confidence)\n  Analysis: ${insight.description}`).join('\n\n')}\n\n📅 Report Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n📧 Contact: anshojha420@gmail.com | 📱 +91 9956126495\n\n${'='.repeat(60)}\nSmartHire Analytics Dashboard - Powered by AI`;
                
                // Create and download the report
                const blob = new Blob([reportData], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `smarthire-analytics-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                // Also copy to clipboard
                navigator.clipboard.writeText(reportData);
                
                // Show success message
                alert('📊 Analytics Report Successfully Exported!\n\n✅ Downloaded as: smarthire-analytics-' + selectedPeriod + '-' + new Date().toISOString().split('T')[0] + '.txt\n✅ Copied to clipboard for easy sharing\n\n📧 You can now share this comprehensive report with:\n• Career coaches and mentors\n• Recruitment consultants\n• Professional network contacts\n• Job search accountability partners\n\n💡 Tip: Review this report weekly to track your job search progress and optimize your strategy!');
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg font-medium"
            >
              <Download className="w-5 h-5" />
              <span>Export Report</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">PDF + TXT</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              💡 Click on any card below for detailed analytics breakdown
            </p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Total Applications',
              value: analyticsData.overview.totalApplications,
              trend: analyticsData.overview.applicationsTrend,
              icon: Briefcase,
              color: 'blue',
              details: {
                title: 'Total Applications Breakdown',
                data: [
                  { label: 'This Month', value: 12, change: '+3 from last month' },
                  { label: 'Last Month', value: 9, change: '+2 from previous' },
                  { label: 'Average per Month', value: 8, change: 'Based on 6 months' },
                  { label: 'Success Rate', value: '17%', change: '8 interviews from 47 apps' },
                  { label: 'Top Companies', value: 'Google (3), Microsoft (2)', change: 'Most applications sent' },
                  { label: 'Peak Day', value: 'Tuesday', change: '23% higher response rate' }
                ]
              }
            },
            {
              label: 'Interviews Scheduled',
              value: analyticsData.overview.interviewsScheduled,
              trend: analyticsData.overview.interviewsTrend,
              icon: Users,
              color: 'green',
              details: {
                title: 'Interview Performance',
                data: [
                  { label: 'Scheduled This Month', value: 3, change: '+1 from last month' },
                  { label: 'Completed', value: 5, change: '3 pending results' },
                  { label: 'Success Rate', value: '53%', change: '8 interviews from 15 screens' },
                  { label: 'Average Duration', value: '45 min', change: 'Technical: 60min, HR: 30min' },
                  { label: 'Next Interview', value: 'Tomorrow', change: 'Google - Final Round' },
                  { label: 'Preparation Time', value: '2.5 hours', change: 'Average prep per interview' }
                ]
              }
            },
            {
              label: 'Response Rate',
              value: `${analyticsData.overview.responseRate}%`,
              trend: analyticsData.overview.responseRateTrend,
              icon: MessageSquare,
              color: 'purple',
              details: {
                title: 'Response Rate Analysis',
                data: [
                  { label: 'Current Rate', value: '68%', change: '+5% from last month' },
                  { label: 'Industry Average', value: '45%', change: 'You\'re 23% above average' },
                  { label: 'Best Performing', value: 'Tuesday 9AM', change: '85% response rate' },
                  { label: 'Company Size Impact', value: 'Startups: 78%', change: 'Large corps: 52%' },
                  { label: 'Resume Views', value: 32, change: 'Out of 47 applications' },
                  { label: 'Profile Strength', value: 'Strong', change: 'ATS compatibility: 92%' }
                ]
              }
            },
            {
              label: 'Avg Response Time',
              value: `${analyticsData.overview.averageResponseTime} days`,
              trend: analyticsData.overview.responseTimeTrend,
              icon: Clock,
              color: 'orange',
              details: {
                title: 'Response Time Insights',
                data: [
                  { label: 'Current Average', value: '4.2 days', change: '0.8 days faster than before' },
                  { label: 'Fastest Response', value: '2 hours', change: 'Microsoft recruiter' },
                  { label: 'Slowest Response', value: '14 days', change: 'Large enterprise company' },
                  { label: 'By Company Size', value: 'Startup: 2.1 days', change: 'Enterprise: 7.3 days' },
                  { label: 'Follow-up Impact', value: '+40%', change: 'Response rate after follow-up' },
                  { label: 'Optimal Follow-up', value: '5-7 days', change: 'Best time to send reminder' }
                ]
              }
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.trend > 0;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -4, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderColor: stat.color === 'blue' ? '#3B82F6' : 
                              stat.color === 'green' ? '#10B981' : 
                              stat.color === 'purple' ? '#8B5CF6' : '#F59E0B'
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border-2 border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
                onClick={() => {
                  const detailsText = `📊 ${stat.details.title}\n\n${stat.details.data.map(item => `• ${item.label}: ${item.value}\n  ${item.change}`).join('\n\n')}`;
                  
                  // Create a more interactive modal-like experience
                  const confirmed = confirm(`${detailsText}\n\n📋 Would you like to copy this data to clipboard?`);
                  if (confirmed) {
                    navigator.clipboard.writeText(detailsText);
                    alert('✅ Analytics data copied to clipboard!');
                  }
                }}
              >
                {/* Subtle background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-50 to-transparent dark:from-${stat.color}-900/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(stat.trend)}{stat.label === 'Avg Response Time' ? ' days' : stat.label === 'Response Rate' ? '%' : ''}
                  </div>
                </div>
                <div className="relative z-10">
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-blue-600 dark:text-blue-400 opacity-75 group-hover:opacity-100 transition-opacity">👆 Click for detailed breakdown</p>
                    <div className="w-2 h-2 bg-blue-500 rounded-full opacity-50 group-hover:opacity-100 group-hover:animate-pulse transition-all"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Chart Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {chartTypes.map((chart) => {
            const Icon = chart.icon;
            return (
              <motion.button
                key={chart.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedChart(chart.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedChart === chart.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {chart.label}
              </motion.button>
            );
          })}
        </div>

        {/* Main Chart Area */}
        <motion.div
          key={selectedChart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {renderChart()}
        </motion.div>

        {/* Predictive Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI Insights & Predictions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analyticsData.predictiveInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`p-4 rounded-xl border-2 cursor-pointer hover:shadow-lg transition-all ${
                  insight.type === 'success' ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20 hover:border-green-300' :
                  insight.type === 'warning' ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20 hover:border-yellow-300' :
                  'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20 hover:border-blue-300'
                }`}
                onClick={() => {
                  const detailedInsight = {
                    '40% more likely to get interviews': `🎯 Interview Success Prediction\n\n📊 Analysis:\n• Profile completeness: 95%\n• Recent skill updates: +3 new skills\n• Resume optimization: ATS score 92%\n• LinkedIn activity: +40% engagement\n\n💡 Key Factors:\n• Added React 18 and TypeScript skills\n• Updated work experience with metrics\n• Improved headline with keywords\n• More active in professional groups\n\n🚀 Recommendations:\n• Continue posting technical content\n• Apply to 5-7 jobs per week\n• Target companies with React/TS stack\n• Follow up on applications after 1 week\n\n📈 Confidence: ${insight.confidence}% based on 10,000+ similar profiles`,
                    
                    'Response rate declining': `⚠️ Response Rate Analysis\n\n📉 Current Trend:\n• Last month: 75% response rate\n• This month: 68% response rate\n• Decline: -7% over 30 days\n\n🔍 Potential Causes:\n• Resume format may not be ATS-friendly\n• Job market seasonal changes\n• Increased competition in your field\n• Application timing could be improved\n\n🛠️ Recommended Actions:\n• Run ATS compatibility check\n• Update resume with recent achievements\n• Apply Tuesday-Thursday 9-11 AM\n• Customize cover letters for each role\n• Follow up after 5-7 days\n\n📊 Expected Impact:\n• ATS optimization: +15% response rate\n• Better timing: +8% response rate\n• Personalized applications: +12% response rate\n\n📈 Confidence: ${insight.confidence}% based on response pattern analysis`,
                    
                    'Peak application time': `⏰ Optimal Application Timing\n\n📅 Best Performance Data:\n• Tuesday 9-11 AM: 85% response rate\n• Wednesday 10 AM-12 PM: 78% response rate\n• Thursday 9-10 AM: 72% response rate\n• Monday/Friday: 45% response rate\n• Weekends: 23% response rate\n\n🎯 Your Profile Analysis:\n• Tech industry focus: Tuesday peak confirmed\n• Senior level applications: Morning preference\n• West Coast companies: 9-11 AM PST optimal\n• East Coast companies: 12-2 PM EST optimal\n\n💡 Strategic Recommendations:\n• Schedule applications for Tuesday mornings\n• Batch apply to 3-5 companies per session\n• Set calendar reminders for optimal times\n• Track response rates by application time\n• Adjust timing based on company location\n\n📊 Data Source:\n• Analysis of 50,000+ applications\n• Your historical performance data\n• Industry-specific timing patterns\n• Recruiter activity analysis\n\n📈 Confidence: ${insight.confidence}% - highest accuracy prediction`
                  };
                  
                  const details = detailedInsight[insight.title as keyof typeof detailedInsight] || 
                    `📊 ${insight.title}\n\n${insight.description}\n\nConfidence: ${insight.confidence}%\n\nThis insight is based on AI analysis of your profile data, application patterns, and market trends. Click on other insights for more detailed recommendations.`;
                  
                  alert(details);
                }}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    insight.type === 'success' ? 'bg-green-100 dark:bg-green-900/40' :
                    insight.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/40' :
                    'bg-blue-100 dark:bg-blue-900/40'
                  }`}>
                    {insight.type === 'success' ? <TrendingUp className="w-4 h-4 text-green-600" /> :
                     insight.type === 'warning' ? <AlertCircle className="w-4 h-4 text-yellow-600" /> :
                     <Zap className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{insight.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{insight.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                        <div 
                          className={`h-full rounded-full ${
                            insight.type === 'success' ? 'bg-green-500' :
                            insight.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${insight.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-400">{insight.confidence}%</span>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 opacity-75">👆 Click for detailed AI analysis</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}