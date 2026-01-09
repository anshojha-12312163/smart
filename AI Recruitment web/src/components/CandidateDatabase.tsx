import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Star,
  Calendar,
  Eye,
  MessageSquare,
  UserPlus,
  FileText,
  ChevronDown,
  X,
  Check,
  TrendingUp,
  Award,
  Code,
  Palette,
  Database,
  Globe,
  Zap,
  Target,
  Users,
  Building
} from 'lucide-react';

interface CandidateDatabaseProps {
  user?: any;
}

export function CandidateDatabase({ user }: CandidateDatabaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  const candidates = [
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: '👨‍💻',
      title: 'Senior Full-Stack Developer',
      location: 'San Francisco, CA',
      experience: '8 years',
      education: 'BS Computer Science - Stanford',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
      rating: 4.9,
      matchScore: 95,
      salary: '$140k - $160k',
      status: 'available',
      lastActive: '2 hours ago',
      applications: 3,
      interviews: 1,
      email: 'alex.j@email.com',
      phone: '+1 (555) 123-4567',
      summary: 'Experienced full-stack developer with a passion for building scalable web applications. Proven track record of leading development teams and delivering high-quality solutions.',
      category: 'Engineering',
      bgColor: 'from-blue-500 to-indigo-500',
    },
    {
      id: 2,
      name: 'Sarah Martinez',
      avatar: '👩‍🎨',
      title: 'Senior UX/UI Designer',
      location: 'New York, NY',
      experience: '6 years',
      education: 'MFA Design - Parsons',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
      rating: 4.8,
      matchScore: 92,
      salary: '$120k - $140k',
      status: 'interviewing',
      lastActive: '1 day ago',
      applications: 5,
      interviews: 3,
      email: 'sarah.m@email.com',
      phone: '+1 (555) 234-5678',
      summary: 'Creative UX/UI designer specializing in user-centered design. Experience in leading design teams and creating intuitive digital experiences.',
      category: 'Design',
      bgColor: 'from-purple-500 to-pink-500',
    },
    {
      id: 3,
      name: 'Michael Chen',
      avatar: '👨‍💼',
      title: 'Product Manager',
      location: 'Seattle, WA',
      experience: '7 years',
      education: 'MBA - Harvard Business School',
      skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Roadmapping', 'Stakeholder Management'],
      rating: 4.7,
      matchScore: 88,
      salary: '$130k - $150k',
      status: 'available',
      lastActive: '3 hours ago',
      applications: 4,
      interviews: 2,
      email: 'michael.c@email.com',
      phone: '+1 (555) 345-6789',
      summary: 'Strategic product manager with expertise in SaaS products. Track record of launching successful products and driving business growth.',
      category: 'Product',
      bgColor: 'from-cyan-500 to-blue-500',
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      avatar: '👩‍🔬',
      title: 'Data Scientist',
      location: 'Boston, MA',
      experience: '5 years',
      education: 'PhD Machine Learning - MIT',
      skills: ['Python', 'TensorFlow', 'SQL', 'Statistics', 'Deep Learning'],
      rating: 4.9,
      matchScore: 94,
      salary: '$135k - $155k',
      status: 'passive',
      lastActive: '1 week ago',
      applications: 2,
      interviews: 1,
      email: 'emily.r@email.com',
      phone: '+1 (555) 456-7890',
      summary: 'PhD data scientist with deep expertise in machine learning and AI. Published researcher with experience in building production ML systems.',
      category: 'Data Science',
      bgColor: 'from-green-500 to-emerald-500',
    },
    {
      id: 5,
      name: 'James Wilson',
      avatar: '👨‍🏫',
      title: 'Marketing Director',
      location: 'Austin, TX',
      experience: '10 years',
      education: 'BA Marketing - UT Austin',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics', 'Team Leadership'],
      rating: 4.6,
      matchScore: 86,
      salary: '$115k - $135k',
      status: 'available',
      lastActive: '5 hours ago',
      applications: 6,
      interviews: 4,
      email: 'james.w@email.com',
      phone: '+1 (555) 567-8901',
      summary: 'Results-driven marketing director with expertise in B2B and B2C strategies. Proven success in building and scaling marketing teams.',
      category: 'Marketing',
      bgColor: 'from-orange-500 to-red-500',
    },
    {
      id: 6,
      name: 'Olivia Taylor',
      avatar: '👩‍💻',
      title: 'DevOps Engineer',
      location: 'Denver, CO',
      experience: '6 years',
      education: 'BS Information Systems - CU Boulder',
      skills: ['Kubernetes', 'Docker', 'CI/CD', 'AWS', 'Terraform'],
      rating: 4.8,
      matchScore: 91,
      salary: '$125k - $145k',
      status: 'available',
      lastActive: '4 hours ago',
      applications: 3,
      interviews: 2,
      email: 'olivia.t@email.com',
      phone: '+1 (555) 678-9012',
      summary: 'DevOps engineer specialized in cloud infrastructure and automation. Experience in building scalable, reliable deployment pipelines.',
      category: 'Engineering',
      bgColor: 'from-violet-500 to-purple-500',
    },
  ];

  const filterOptions = [
    { id: 'available', label: 'Available', icon: Check },
    { id: 'interviewing', label: 'Interviewing', icon: Calendar },
    { id: 'passive', label: 'Passive', icon: Eye },
    { id: 'engineering', label: 'Engineering', icon: Code },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'product', label: 'Product', icon: Target },
    { id: 'data-science', label: 'Data Science', icon: Database },
    { id: 'marketing', label: 'Marketing', icon: Globe },
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedFilters.length === 0) return matchesSearch;
    
    const matchesFilters = selectedFilters.some(filter =>
      candidate.status === filter ||
      candidate.category.toLowerCase().replace(' ', '-') === filter
    );
    
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black text-gradient-animate mb-2">Candidate Database</h1>
          <p className="text-gray-400">Browse and manage your talent pool of {candidates.length} candidates</p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, title, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass-card rounded-2xl outline-none focus:border-cyan-400/40 transition-all"
                style={{ color: 'var(--text-primary)' }}
              />
            </div>

            {/* Filter Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`glass-card px-6 py-4 rounded-2xl flex items-center gap-2 font-medium transition-all ${
                showFilters ? 'border-cyan-400/40' : ''
              }`}
            >
              <Filter className="w-5 h-5" />
              Filters
              {selectedFilters.length > 0 && (
                <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-bold">
                  {selectedFilters.length}
                </span>
              )}
            </motion.button>

            {/* View Mode Toggle */}
            <div className="glass-card p-1 rounded-2xl flex gap-1">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 rounded-xl transition-all ${
                  viewMode === 'grid' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' : 'text-gray-400'
                }`}
              >
                Grid
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 rounded-xl transition-all ${
                  viewMode === 'list' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' : 'text-gray-400'
                }`}
              >
                List
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
          </div>

          {/* Filter Pills */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="glass-card p-4 rounded-2xl"
              >
                <div className="flex flex-wrap gap-3">
                  {filterOptions.map((filter) => {
                    const Icon = filter.icon;
                    const isSelected = selectedFilters.includes(filter.id);
                    return (
                      <motion.button
                        key={filter.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleFilter(filter.id)}
                        className={`px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                            : 'bg-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {filter.label}
                        {isSelected && <X className="w-4 h-4" />}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-400">
            Showing <span className="text-cyan-400 font-bold">{filteredCandidates.length}</span> candidates
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort by:</span>
            <select className="glass-card px-4 py-2 rounded-xl outline-none text-sm" style={{ color: 'var(--text-primary)' }}>
              <option>Match Score</option>
              <option>Recently Added</option>
              <option>Experience</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        {/* Candidates Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredCandidates.map((candidate, i) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedCandidate(candidate)}
              className="glass-card-hover p-6 rounded-2xl cursor-pointer"
            >
              {viewMode === 'grid' ? (
                <>
                  {/* Grid View */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${candidate.bgColor} flex items-center justify-center text-2xl`}>
                        {candidate.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>{candidate.name}</h3>
                        <p className="text-sm text-gray-400">{candidate.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-bold">{candidate.rating}</span>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Match Score</span>
                      <span className="text-sm font-bold text-cyan-400">{candidate.matchScore}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${candidate.matchScore}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Briefcase className="w-4 h-4" />
                      {candidate.experience}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <GraduationCap className="w-4 h-4" />
                      {candidate.education}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {candidate.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-300">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-400">
                        +{candidate.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      candidate.status === 'available' ? 'bg-green-500/20 text-green-400 border border-green-500/40' :
                      candidate.status === 'interviewing' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' :
                      'bg-gray-500/20 text-gray-400 border border-gray-500/40'
                    }`}>
                      {candidate.status}
                    </span>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-cyan-500/20 rounded-lg hover:bg-cyan-500/30 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-cyan-400" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-purple-400" />
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* List View */}
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${candidate.bgColor} flex items-center justify-center text-3xl flex-shrink-0`}>
                      {candidate.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{candidate.name}</h3>
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs font-bold">{candidate.rating}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          candidate.status === 'available' ? 'bg-green-500/20 text-green-400' :
                          candidate.status === 'interviewing' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {candidate.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{candidate.title}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {candidate.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          {candidate.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          Match: {candidate.matchScore}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-colors flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Contact
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-xl hover:bg-purple-500/30 transition-colors"
                      >
                        View Profile
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Candidate Detail Modal */}
        <AnimatePresence>
          {selectedCandidate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
              onClick={() => setSelectedCandidate(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card p-8 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedCandidate.bgColor} flex items-center justify-center text-4xl`}>
                      {selectedCandidate.avatar}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{selectedCandidate.name}</h2>
                      <p className="text-lg text-gray-400">{selectedCandidate.title}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedCandidate(null)}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-400">Rating</span>
                    </div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{selectedCandidate.rating}/5.0</p>
                  </div>
                  <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm text-gray-400">Match Score</span>
                    </div>
                    <p className="text-2xl font-bold text-cyan-400">{selectedCandidate.matchScore}%</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Summary</h3>
                    <p className="text-gray-400">{selectedCandidate.summary}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill: string, idx: number) => (
                        <span key={idx} className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Contact</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Mail className="w-4 h-4" />
                          {selectedCandidate.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Phone className="w-4 h-4" />
                          {selectedCandidate.phone}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <MapPin className="w-4 h-4" />
                          {selectedCandidate.location}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Activity</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-400">
                          <FileText className="w-4 h-4" />
                          {selectedCandidate.applications} Applications
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          {selectedCandidate.interviews} Interviews
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          Active {selectedCandidate.lastActive}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Send Message
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 btn-secondary flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Schedule Interview
                    </motion.button>
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
