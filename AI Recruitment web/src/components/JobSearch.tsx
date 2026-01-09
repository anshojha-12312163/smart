import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, DollarSign, Briefcase, Heart, ExternalLink, Filter, TrendingUp, Clock, X } from 'lucide-react';

export function JobSearch({ user }: { user: any }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const jobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      salary: '$120k - $160k',
      type: 'Full-time',
      match: 95,
      logo: '💼',
      postedDate: '2 days ago',
      applicants: 23,
      description: 'We are looking for an experienced React developer to join our growing team...',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'Team leadership'],
      benefits: ['Health Insurance', 'Remote Work', '401k Match', 'Unlimited PTO']
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      salary: '$100k - $140k',
      type: 'Full-time',
      match: 89,
      logo: '🚀',
      postedDate: '1 week ago',
      applicants: 45,
      description: 'Join our fast-paced startup and help build the next generation platform...',
      requirements: ['3+ years full-stack experience', 'Node.js and React', 'AWS knowledge'],
      benefits: ['Equity', 'Health Insurance', 'Gym Membership', 'Learning Budget']
    },
    {
      id: 3,
      title: 'Frontend Architect',
      company: 'Digital Solutions',
      location: 'San Francisco, CA',
      salary: '$140k - $180k',
      type: 'Full-time',
      match: 87,
      logo: '🎯',
      postedDate: '3 days ago',
      applicants: 67,
      description: 'Lead our frontend architecture and mentor a team of talented developers...',
      requirements: ['8+ years frontend experience', 'Architecture design', 'Mentoring skills'],
      benefits: ['Stock Options', 'Health Insurance', 'Relocation Assistance', 'Conferences']
    },
    {
      id: 4,
      title: 'UI/UX Engineer',
      company: 'Creative Labs',
      location: 'Remote',
      salary: '$90k - $120k',
      type: 'Contract',
      match: 82,
      logo: '🎨',
      postedDate: '5 days ago',
      applicants: 34,
      description: 'Create beautiful and intuitive user interfaces for our products...',
      requirements: ['Strong design skills', 'React/Vue experience', 'Figma proficiency'],
      benefits: ['Flexible Hours', 'Remote Work', 'Project Bonuses']
    },
    {
      id: 5,
      title: 'JavaScript Developer',
      company: 'Tech Innovators',
      location: 'Austin, TX',
      salary: '$85k - $115k',
      type: 'Full-time',
      match: 78,
      logo: '⚡',
      postedDate: '1 day ago',
      applicants: 12,
      description: 'Work on cutting-edge web applications using modern JavaScript frameworks...',
      requirements: ['2+ years JavaScript', 'Modern frameworks', 'API integration'],
      benefits: ['Health Insurance', '401k', 'Casual Environment', 'Team Events']
    },
    {
      id: 6,
      title: 'React Native Developer',
      company: 'Mobile First',
      location: 'Los Angeles, CA',
      salary: '$95k - $130k',
      type: 'Full-time',
      match: 85,
      logo: '📱',
      postedDate: '4 days ago',
      applicants: 28,
      description: 'Build amazing mobile experiences for millions of users...',
      requirements: ['React Native expertise', 'iOS/Android knowledge', 'API integration'],
      benefits: ['Health Insurance', 'Stock Options', 'Phone Allowance', 'Remote Fridays']
    },
    {
      id: 7,
      title: 'Software Engineer',
      company: 'Amazon',
      location: 'Seattle, WA',
      salary: '$130k - $170k',
      type: 'Full-time',
      match: 91,
      logo: '🌟',
      postedDate: '1 day ago',
      applicants: 156,
      description: 'Join Amazon and work on products used by millions worldwide...',
      requirements: ['Computer Science degree', 'Algorithm expertise', '3+ years experience'],
      benefits: ['RSU', 'Health Insurance', 'Relocation', '401k', 'Career Growth']
    },
    {
      id: 8,
      title: 'Frontend Developer',
      company: 'Shopify',
      location: 'Toronto, Canada',
      salary: '$80k - $110k CAD',
      type: 'Full-time',
      match: 80,
      logo: '🛍️',
      postedDate: '6 days ago',
      applicants: 42,
      description: 'Help merchants around the world build their online stores...',
      requirements: ['React experience', 'E-commerce knowledge', 'API development'],
      benefits: ['Health Insurance', 'RRSP', 'Remote Options', 'Learning Budget']
    },
    {
      id: 9,
      title: 'Senior JavaScript Engineer',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      salary: '$150k - $200k',
      type: 'Full-time',
      match: 93,
      logo: '🎬',
      postedDate: '3 days ago',
      applicants: 203,
      description: 'Build streaming experiences that entertain hundreds of millions...',
      requirements: ['Expert JavaScript', 'Performance optimization', 'Large-scale systems'],
      benefits: ['Unlimited Vacation', 'Stock Options', 'Top Tier Insurance', 'Parental Leave']
    },
    {
      id: 10,
      title: 'Web Developer',
      company: 'Local Agency',
      location: 'Boston, MA',
      salary: '$70k - $95k',
      type: 'Full-time',
      match: 72,
      logo: '💻',
      postedDate: '2 weeks ago',
      applicants: 18,
      description: 'Work with diverse clients on creative web projects...',
      requirements: ['HTML/CSS/JavaScript', 'WordPress', 'Client communication'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Creative Freedom']
    },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = locationQuery === '' || 
      job.location.toLowerCase().includes(locationQuery.toLowerCase());
    
    return matchesSearch && matchesLocation;
  });

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
    setLocationQuery('');
  };

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Job Search</h1>
          <p className="text-gray-400">Find your dream job with AI-powered matching</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="City, state, zip code, or remote"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              <Search className="w-5 h-5" />
              Find Jobs
            </motion.button>
          </div>
          
          {/* Popular Locations */}
          {!searchQuery && !locationQuery && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-2">Popular locations:</p>
              <div className="flex flex-wrap gap-2">
                {['Remote', 'New York, NY', 'San Francisco, CA', 'Los Angeles, CA', 'Seattle, WA', 'Austin, TX', 'Boston, MA'].map((location) => (
                  <motion.button
                    key={location}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLocationQuery(location)}
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300 transition-all"
                  >
                    {location}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
          
          {/* Active Filters */}
          {(searchQuery || locationQuery) && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-400">Active filters:</span>
                  {searchQuery && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-lg text-xs text-cyan-400 flex items-center gap-2"
                    >
                      <Search className="w-3 h-3" />
                      {searchQuery}
                      <button onClick={() => setSearchQuery('')} className="hover:text-cyan-300">
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )}
                  {locationQuery && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-lg text-xs text-purple-400 flex items-center gap-2"
                    >
                      <MapPin className="w-3 h-3" />
                      {locationQuery}
                      <button onClick={() => setLocationQuery('')} className="hover:text-purple-300">
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearSearch}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Clear all
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        {(searchQuery || locationQuery) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between px-4"
          >
            <p className="text-sm text-gray-400">
              Found <span className="text-white font-semibold">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'job' : 'jobs'}
              {searchQuery && <> for "<span className="text-cyan-400">{searchQuery}</span>"</>}
              {locationQuery && <> in "<span className="text-purple-400">{locationQuery}</span>"</>}
            </p>
          </motion.div>
        )}

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Jobs List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedJob(job)}
                className={`p-6 bg-white/5 backdrop-blur-xl rounded-xl border transition-all cursor-pointer ${
                  selectedJob?.id === job.id
                    ? 'border-cyan-400/50 shadow-lg shadow-cyan-500/25'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Logo */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-2xl flex-shrink-0">
                    {job.logo}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-white mb-1 hover:text-cyan-400 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-gray-400 text-sm">{job.company}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveJob(job.id);
                        }}
                        className="ml-2"
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors ${
                            savedJobs.includes(job.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-400 hover:text-red-400'
                          }`}
                        />
                      </motion.button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-white/5 rounded-lg text-xs text-gray-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {job.salary}
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {job.type}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {job.postedDate}
                        </span>
                        <span>{job.applicants} applicants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Match:</span>
                        <span className="text-sm font-semibold text-cyan-400">{job.match}%</span>
                        <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                            style={{ width: `${job.match}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Job Details Panel */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedJob ? (
                <motion.div
                  key={selectedJob.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 sticky top-8"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-3xl">
                      {selectedJob.logo}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-white mb-1">{selectedJob.title}</h2>
                      <p className="text-gray-400">{selectedJob.company}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Match Score */}
                    <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-400/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-300">AI Match Score</span>
                        <span className="text-2xl font-bold text-cyan-400">{selectedJob.match}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedJob.match}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Excellent match for your profile!</p>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="font-semibold text-white mb-2">Description</h3>
                      <p className="text-sm text-gray-400">{selectedJob.description}</p>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h3 className="font-semibold text-white mb-2">Requirements</h3>
                      <ul className="space-y-2">
                        {selectedJob.requirements.map((req: string, index: number) => (
                          <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="font-semibold text-white mb-2">Benefits</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.benefits.map((benefit: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-white/5 rounded-lg text-xs text-gray-300"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                      >
                        Apply Now
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 sticky top-8 text-center"
                >
                  <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Select a job to view details</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}