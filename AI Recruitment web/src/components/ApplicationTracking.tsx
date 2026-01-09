import { useState } from 'react';
import { motion } from 'motion/react';
import { MoreVertical, Calendar, TrendingUp, CheckCircle, XCircle, Clock, Award } from 'lucide-react';

export function ApplicationTracking({ user }: { user: any }) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const columns = [
    { id: 'applied', label: 'Applied', color: 'from-blue-500 to-cyan-500', count: 8 },
    { id: 'screening', label: 'Screening', color: 'from-purple-500 to-pink-500', count: 5 },
    { id: 'interview', label: 'Interview', color: 'from-orange-500 to-yellow-500', count: 3 },
    { id: 'offer', label: 'Offer', color: 'from-green-500 to-emerald-500', count: 1 },
    { id: 'rejected', label: 'Rejected', color: 'from-red-500 to-rose-500', count: 2 },
  ];

  const applications = {
    applied: [
      { id: 1, title: 'Senior React Developer', company: 'TechCorp', date: '2 days ago', logo: '💼' },
      { id: 2, title: 'Frontend Engineer', company: 'WebSolutions', date: '3 days ago', logo: '🌐' },
      { id: 3, title: 'UI Developer', company: 'DesignHub', date: '5 days ago', logo: '🎨' },
    ],
    screening: [
      { id: 4, title: 'Full Stack Developer', company: 'StartupXYZ', date: '1 week ago', logo: '🚀' },
      { id: 5, title: 'React Native Dev', company: 'MobileFirst', date: '1 week ago', logo: '📱' },
    ],
    interview: [
      { id: 6, title: 'Frontend Architect', company: 'Digital Solutions', date: '2 weeks ago', logo: '🎯', interview: 'Tomorrow at 2 PM' },
      { id: 7, title: 'Lead Developer', company: 'TechGiants', date: '2 weeks ago', logo: '⚡' },
    ],
    offer: [
      { id: 8, title: 'Senior Engineer', company: 'CloudCorp', date: '3 weeks ago', logo: '☁️', salary: '$150k' },
    ],
    rejected: [
      { id: 9, title: 'JS Developer', company: 'CodeFactory', date: '1 month ago', logo: '🏭' },
    ],
  };

  const stats = [
    { label: 'Total Applications', value: 19, icon: TrendingUp, change: '+3 this week' },
    { label: 'Response Rate', value: '68%', icon: CheckCircle, change: '+5% vs last month' },
    { label: 'Avg Response Time', value: '4.2 days', icon: Clock, change: '-1.3 days' },
    { label: 'Success Rate', value: '35%', icon: Award, change: '+8%' },
  ];

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Application Tracking</h1>
          <p className="text-gray-400">Monitor your job applications in real-time</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-xs text-gray-400">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-green-400">{stat.change}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {columns.map((column, columnIndex) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: columnIndex * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10"
            >
              {/* Column Header */}
              <div className="mb-4">
                <div className={`h-1 w-full bg-gradient-to-r ${column.color} rounded-full mb-3`} />
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{column.label}</h3>
                  <span className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300">
                    {column.count}
                  </span>
                </div>
              </div>

              {/* Applications */}
              <div className="space-y-3">
                {applications[column.id as keyof typeof applications]?.map((app, index) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: columnIndex * 0.1 + index * 0.05 }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all cursor-move group"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-lg flex-shrink-0">
                        {app.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                          {app.title}
                        </h4>
                        <p className="text-xs text-gray-400">{app.company}</p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {app.date}
                      </div>
                      {'interview' in app && (
                        <div className="text-xs text-cyan-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {app.interview}
                        </div>
                      )}
                      {'salary' in app && (
                        <div className="text-xs text-green-400 font-semibold">
                          {app.salary}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline View */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6">Application Timeline</h2>
          <div className="space-y-4">
            {[
              { event: 'Applied to Senior React Developer at TechCorp', time: '2 days ago', type: 'applied' },
              { event: 'Screening call scheduled with StartupXYZ', time: '1 week ago', type: 'screening' },
              { event: 'Interview completed at Digital Solutions', time: '2 weeks ago', type: 'interview' },
              { event: 'Offer received from CloudCorp - $150k', time: '3 weeks ago', type: 'offer' },
              { event: 'Application rejected by CodeFactory', time: '1 month ago', type: 'rejected' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    item.type === 'offer' ? 'bg-green-400' :
                    item.type === 'rejected' ? 'bg-red-400' :
                    item.type === 'interview' ? 'bg-orange-400' :
                    item.type === 'screening' ? 'bg-purple-400' :
                    'bg-blue-400'
                  }`} />
                  {index < 4 && <div className="w-0.5 h-12 bg-white/10 mt-2" />}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-white text-sm mb-1">{item.event}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
