import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users,
  Sparkles,
  Star,
  Zap,
  Award,
  ArrowRight,
  BookmarkPlus,
  Send
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedDays: number;
  applicants: number;
  logo: string;
  matchScore: number;
  matchReasons: string[];
  trending: boolean;
  salaryPrediction: number;
  successRate: number;
}

export function MLJobRecommendations() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'best-match' | 'high-salary' | 'remote'>('best-match');

  useEffect(() => {
    // Simulate ML recommendation engine
    setTimeout(() => {
      const mlGeneratedJobs: Job[] = [
        {
          id: '1',
          title: 'Senior ML Engineer',
          company: 'AI Dynamics',
          location: 'Remote',
          salary: '$140k - $180k',
          type: 'Full-time',
          postedDays: 2,
          applicants: 23,
          logo: '🤖',
          matchScore: 96,
          matchReasons: [
            'Strong ML skills match',
            'Salary +25% above average',
            'Remote work preference'
          ],
          trending: true,
          salaryPrediction: 160000,
          successRate: 87
        },
        {
          id: '2',
          title: 'Lead Full Stack Developer',
          company: 'TechVision Inc.',
          location: 'San Francisco, CA',
          salary: '$130k - $170k',
          type: 'Full-time',
          postedDays: 1,
          applicants: 45,
          logo: '💼',
          matchScore: 94,
          matchReasons: [
            'React & TypeScript expertise',
            'Leadership experience',
            'Top 10% match in location'
          ],
          trending: true,
          salaryPrediction: 150000,
          successRate: 82
        },
        {
          id: '3',
          title: 'AI Product Manager',
          company: 'InnovateLabs',
          location: 'New York, NY',
          salary: '$145k - $185k',
          type: 'Full-time',
          postedDays: 3,
          applicants: 31,
          logo: '🚀',
          matchScore: 91,
          matchReasons: [
            'Technical + Leadership skills',
            'AI/ML domain expertise',
            'Product management background'
          ],
          trending: false,
          salaryPrediction: 165000,
          successRate: 78
        },
        {
          id: '4',
          title: 'React Native Developer',
          company: 'MobileFirst',
          location: 'Remote',
          salary: '$120k - $155k',
          type: 'Full-time',
          postedDays: 5,
          applicants: 67,
          logo: '📱',
          matchScore: 89,
          matchReasons: [
            'React skills transferable',
            'Mobile development opportunity',
            'Remote work available'
          ],
          trending: false,
          salaryPrediction: 137500,
          successRate: 75
        },
        {
          id: '5',
          title: 'Cloud Solutions Architect',
          company: 'CloudTech',
          location: 'Seattle, WA',
          salary: '$135k - $175k',
          type: 'Full-time',
          postedDays: 4,
          applicants: 28,
          logo: '☁️',
          matchScore: 88,
          matchReasons: [
            'AWS experience match',
            'System design skills',
            'High growth potential'
          ],
          trending: true,
          salaryPrediction: 155000,
          successRate: 80
        },
        {
          id: '6',
          title: 'Frontend Tech Lead',
          company: 'DesignCo',
          location: 'Austin, TX',
          salary: '$125k - $160k',
          type: 'Full-time',
          postedDays: 7,
          applicants: 52,
          logo: '🎨',
          matchScore: 86,
          matchReasons: [
            'Frontend expertise match',
            'Leadership opportunity',
            'Great culture fit'
          ],
          trending: false,
          salaryPrediction: 142500,
          successRate: 72
        },
      ];
      setJobs(mlGeneratedJobs);
      setIsLoading(false);
    }, 1500);
  }, []);

  const getFilteredJobs = () => {
    switch (filter) {
      case 'best-match':
        return jobs.sort((a, b) => b.matchScore - a.matchScore);
      case 'high-salary':
        return jobs.sort((a, b) => b.salaryPrediction - a.salaryPrediction);
      case 'remote':
        return jobs.filter(j => j.location === 'Remote');
      default:
        return jobs;
    }
  };

  const filteredJobs = getFilteredJobs();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Job Recommendations</h2>
            <p className="text-gray-400 text-sm">Personalized matches powered by machine learning</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
          <Sparkles className="w-4 h-4 text-yellow-400 ml-2" />
          <span className="text-sm text-gray-300 mr-2">ML Score Active</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[
          { id: 'best-match', label: 'Best Match', icon: Target },
          { id: 'high-salary', label: 'High Salary', icon: DollarSign },
          { id: 'remote', label: 'Remote Only', icon: MapPin },
          { id: 'all', label: 'All Jobs', icon: Users },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              filter === f.id
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <f.icon className="w-4 h-4" />
            {f.label}
          </button>
        ))}
      </div>

      {/* ML Insights Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-400/30"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white mb-1">ML Insight: High Match Rate</h3>
            <p className="text-sm text-gray-300 mb-3">
              Your profile matches <span className="text-purple-400 font-semibold">87% better</span> than average for senior tech roles. 
              Apply within 48 hours for <span className="text-cyan-400 font-semibold">3x higher</span> response rates.
            </p>
            <div className="flex gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-400" />
                +23% this week
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3 h-3 text-yellow-400" />
                Top 5% candidate
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Job Listings */}
      {isLoading ? (
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 animate-pulse"
            >
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-xl" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-white/10 rounded w-1/3" />
                  <div className="h-3 bg-white/10 rounded w-1/4" />
                  <div className="h-3 bg-white/10 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredJobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all overflow-hidden"
            >
              {/* Trending Badge */}
              {job.trending && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-400/30">
                  <TrendingUp className="w-3 h-3 text-orange-400" />
                  <span className="text-xs font-semibold text-orange-400">Trending</span>
                </div>
              )}

              <div className="flex gap-6">
                {/* Company Logo */}
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-2xl flex items-center justify-center text-4xl">
                    {job.logo}
                  </div>
                  {/* ML Match Badge */}
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center border-2 border-[#0A1628]">
                    <div className="text-center">
                      <div className="text-xs font-bold text-white leading-none">{job.matchScore}</div>
                      <div className="text-[8px] text-white/70 leading-none">ML</div>
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-gray-400">{job.company}</p>
                    </div>
                  </div>

                  {/* Job Meta */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.postedDays}d ago
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {job.applicants} applicants
                    </span>
                  </div>

                  {/* ML Match Reasons */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-semibold text-white">AI Match Analysis:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.matchReasons.map((reason, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-400/10 text-purple-400 text-xs rounded-full border border-purple-400/30"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ML Predictions */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-gray-400">ML Salary Estimate</span>
                      </div>
                      <div className="text-lg font-bold text-white">
                        ${(job.salaryPrediction / 1000).toFixed(0)}K
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-gray-400">Success Rate</span>
                      </div>
                      <div className="text-lg font-bold text-white">{job.successRate}%</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                    >
                      <Send className="w-4 h-4" />
                      Quick Apply
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                      <BookmarkPlus className="w-4 h-4" />
                      Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Match Score Bar */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    AI Match Score
                  </span>
                  <span className="font-semibold text-white">{job.matchScore}% Match</span>
                </div>
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${job.matchScore}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
                    style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredJobs.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No jobs found matching your filters</p>
        </div>
      )}
    </div>
  );
}
