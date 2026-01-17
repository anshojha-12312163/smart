import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { realTimeApiService } from '../services/realTimeApiService';
import { 
  Building, 
  Search, 
  Star, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Globe,
  MapPin,
  DollarSign,
  Clock,
  Award,
  MessageSquare,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Filter,
  BarChart3,
  ExternalLink,
  Briefcase,
  Target
} from 'lucide-react';

interface CompanyIntelligenceCenterProps {
  user: any;
  onNavigate?: (page: string) => void;
}

interface CompanyData {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  rating: number;
  reviewCount: number;
  salaryRange: string;
  benefits: string[];
  culture: {
    workLifeBalance: number;
    compensation: number;
    careerOpportunities: number;
    management: number;
    culture: number;
  };
  pros: string[];
  cons: string[];
  interviewProcess: {
    difficulty: 'Easy' | 'Medium' | 'Hard';
    duration: string;
    stages: string[];
  };
  recentNews: string[];
  hiring: boolean;
  redFlags: string[];
}

export function CompanyIntelligenceCenter({ user, onNavigate }: CompanyIntelligenceCenterProps) {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyData[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    industry: '',
    size: '',
    rating: 0,
    hiring: false
  });

  const mockCompanies: CompanyData[] = [
    {
      id: '1',
      name: 'Google',
      logo: '🔍',
      industry: 'Technology',
      size: 'Large (100,000+)',
      location: 'Mountain View, CA',
      website: 'google.com',
      rating: 4.4,
      reviewCount: 15420,
      salaryRange: '$120K - $300K',
      benefits: ['Health Insurance', 'Stock Options', 'Free Food', 'Flexible Hours', 'Remote Work'],
      culture: {
        workLifeBalance: 4.1,
        compensation: 4.6,
        careerOpportunities: 4.5,
        management: 3.9,
        culture: 4.3
      },
      pros: [
        'Excellent compensation and benefits',
        'Cutting-edge technology and projects',
        'Smart and talented colleagues',
        'Great learning opportunities',
        'Strong company culture'
      ],
      cons: [
        'High pressure and expectations',
        'Work-life balance can be challenging',
        'Bureaucracy in large teams',
        'Competitive internal environment'
      ],
      interviewProcess: {
        difficulty: 'Hard',
        duration: '4-6 weeks',
        stages: ['Phone Screen', 'Technical Phone', 'Onsite (4-5 rounds)', 'Team Match']
      },
      recentNews: [
        'Google announces new AI initiatives',
        'Expansion of remote work policies',
        'New sustainability commitments'
      ],
      hiring: true,
      redFlags: []
    },
    {
      id: '2',
      name: 'Microsoft',
      logo: '🪟',
      industry: 'Technology',
      size: 'Large (200,000+)',
      location: 'Redmond, WA',
      website: 'microsoft.com',
      rating: 4.3,
      reviewCount: 12850,
      salaryRange: '$110K - $280K',
      benefits: ['Health Insurance', 'Stock Options', '401k Match', 'Flexible PTO', 'Learning Budget'],
      culture: {
        workLifeBalance: 4.2,
        compensation: 4.4,
        careerOpportunities: 4.3,
        management: 4.0,
        culture: 4.2
      },
      pros: [
        'Great work-life balance',
        'Inclusive and diverse culture',
        'Strong leadership and vision',
        'Excellent benefits package',
        'Growth opportunities'
      ],
      cons: [
        'Slow decision making process',
        'Legacy systems and processes',
        'Limited innovation in some areas',
        'Corporate bureaucracy'
      ],
      interviewProcess: {
        difficulty: 'Medium',
        duration: '3-4 weeks',
        stages: ['Recruiter Screen', 'Technical Screen', 'Onsite Loop', 'Final Review']
      },
      recentNews: [
        'Microsoft Teams reaches 300M users',
        'Azure cloud growth continues',
        'New hybrid work initiatives'
      ],
      hiring: true,
      redFlags: []
    },
    {
      id: '3',
      name: 'Meta',
      logo: '📘',
      industry: 'Social Media',
      size: 'Large (80,000+)',
      location: 'Menlo Park, CA',
      website: 'meta.com',
      rating: 3.9,
      reviewCount: 8940,
      salaryRange: '$130K - $350K',
      benefits: ['Health Insurance', 'Stock Options', 'Free Food', 'Gym Access', 'Commuter Benefits'],
      culture: {
        workLifeBalance: 3.5,
        compensation: 4.7,
        careerOpportunities: 4.1,
        management: 3.6,
        culture: 3.8
      },
      pros: [
        'Top-tier compensation',
        'Innovative and fast-paced environment',
        'Great perks and benefits',
        'Smart colleagues',
        'Impact at scale'
      ],
      cons: [
        'High stress and pressure',
        'Long working hours',
        'Constant reorganizations',
        'Uncertain future direction',
        'Public scrutiny'
      ],
      interviewProcess: {
        difficulty: 'Hard',
        duration: '4-5 weeks',
        stages: ['Recruiter Call', 'Technical Phone', 'Onsite (3-4 rounds)', 'Hiring Committee']
      },
      recentNews: [
        'Meta focuses on metaverse development',
        'Reality Labs investment continues',
        'Workforce optimization ongoing'
      ],
      hiring: false,
      redFlags: ['Recent layoffs', 'Regulatory challenges', 'Stock price volatility']
    },
    {
      id: '4',
      name: 'Apple',
      logo: '🍎',
      industry: 'Technology',
      size: 'Large (150,000+)',
      location: 'Cupertino, CA',
      website: 'apple.com',
      rating: 4.1,
      reviewCount: 11200,
      salaryRange: '$115K - $270K',
      benefits: ['Health Insurance', 'Stock Purchase Plan', 'Employee Discounts', 'Wellness Programs'],
      culture: {
        workLifeBalance: 3.8,
        compensation: 4.2,
        careerOpportunities: 4.0,
        management: 3.9,
        culture: 4.1
      },
      pros: [
        'Prestigious brand and products',
        'High-quality work environment',
        'Employee discounts on products',
        'Strong company values',
        'Innovation focus'
      ],
      cons: [
        'Secretive culture',
        'High expectations and pressure',
        'Limited work flexibility',
        'Competitive internal environment'
      ],
      interviewProcess: {
        difficulty: 'Hard',
        duration: '3-5 weeks',
        stages: ['Phone Screen', 'Technical Assessment', 'Onsite Interview', 'Executive Review']
      },
      recentNews: [
        'Apple Vision Pro launch preparations',
        'Services revenue growth',
        'Sustainability initiatives expansion'
      ],
      hiring: true,
      redFlags: []
    },
    {
      id: '5',
      name: 'Netflix',
      logo: '🎬',
      industry: 'Entertainment',
      size: 'Medium (11,000+)',
      location: 'Los Gatos, CA',
      website: 'netflix.com',
      rating: 4.0,
      reviewCount: 3450,
      salaryRange: '$140K - $400K',
      benefits: ['Unlimited PTO', 'Stock Options', 'Health Insurance', 'Parental Leave'],
      culture: {
        workLifeBalance: 3.6,
        compensation: 4.8,
        careerOpportunities: 4.2,
        management: 3.7,
        culture: 4.0
      },
      pros: [
        'Exceptional compensation',
        'High-performance culture',
        'Unlimited vacation policy',
        'Freedom and responsibility',
        'Cutting-edge content technology'
      ],
      cons: [
        'High-pressure environment',
        'Job security concerns',
        'Limited work-life balance',
        'Keeper test culture'
      ],
      interviewProcess: {
        difficulty: 'Hard',
        duration: '3-4 weeks',
        stages: ['Recruiter Screen', 'Hiring Manager', 'Technical/Panel', 'Executive Interview']
      },
      recentNews: [
        'Netflix password sharing crackdown',
        'Ad-supported tier growth',
        'Content investment strategies'
      ],
      hiring: true,
      redFlags: ['High turnover rate', 'Intense performance culture']
    },
    {
      id: '6',
      name: 'Amazon',
      logo: '📦',
      industry: 'Technology',
      size: 'Large (1,500,000+)',
      location: 'Seattle, WA',
      website: 'amazon.com',
      rating: 3.8,
      reviewCount: 28450,
      salaryRange: '$100K - $250K',
      benefits: ['Health Insurance', 'Stock Options', 'Career Choice Program', 'Parental Leave'],
      culture: {
        workLifeBalance: 3.2,
        compensation: 4.1,
        careerOpportunities: 4.3,
        management: 3.4,
        culture: 3.6
      },
      pros: [
        'Great career growth opportunities',
        'Competitive compensation',
        'Learn from the best',
        'Global impact and scale',
        'Innovation-focused culture'
      ],
      cons: [
        'High-pressure work environment',
        'Long working hours',
        'Demanding performance standards',
        'Work-life balance challenges',
        'Bureaucratic processes'
      ],
      interviewProcess: {
        difficulty: 'Hard',
        duration: '4-6 weeks',
        stages: ['Phone Screen', 'Technical Assessment', 'Onsite Loop', 'Bar Raiser Review']
      },
      recentNews: [
        'AWS continues cloud market leadership',
        'Amazon Prime membership growth',
        'Sustainability and climate initiatives'
      ],
      hiring: true,
      redFlags: ['High attrition rate', 'Intense work culture']
    },
    {
      id: '7',
      name: 'Tesla',
      logo: '⚡',
      industry: 'Automotive',
      size: 'Large (120,000+)',
      location: 'Austin, TX',
      website: 'tesla.com',
      rating: 3.6,
      reviewCount: 5670,
      salaryRange: '$90K - $200K',
      benefits: ['Health Insurance', 'Stock Options', 'Employee Discounts', 'Wellness Programs'],
      culture: {
        workLifeBalance: 2.8,
        compensation: 3.9,
        careerOpportunities: 4.2,
        management: 3.1,
        culture: 3.7
      },
      pros: [
        'Cutting-edge technology',
        'Mission-driven work',
        'Fast-paced innovation',
        'Stock growth potential',
        'Industry leadership'
      ],
      cons: [
        'Extremely demanding hours',
        'High stress environment',
        'Unpredictable leadership',
        'Job security concerns',
        'Work-life balance issues'
      ],
      interviewProcess: {
        difficulty: 'Hard',
        duration: '3-5 weeks',
        stages: ['Phone Screen', 'Technical Interview', 'Panel Interview', 'Executive Review']
      },
      recentNews: [
        'Cybertruck production ramp-up',
        'Supercharger network expansion',
        'Full Self-Driving updates'
      ],
      hiring: true,
      redFlags: ['Unpredictable work environment', 'High burnout rate', 'Frequent reorganizations']
    },
    {
      id: '8',
      name: 'Spotify',
      logo: '🎵',
      industry: 'Entertainment',
      size: 'Medium (9,000+)',
      location: 'Stockholm, Sweden',
      website: 'spotify.com',
      rating: 4.2,
      reviewCount: 2890,
      salaryRange: '$110K - $220K',
      benefits: ['Health Insurance', 'Flexible PTO', 'Spotify Premium', 'Wellness Budget', 'Remote Work'],
      culture: {
        workLifeBalance: 4.3,
        compensation: 4.0,
        careerOpportunities: 4.1,
        management: 4.0,
        culture: 4.4
      },
      pros: [
        'Excellent work-life balance',
        'Creative and innovative culture',
        'Great music perks',
        'Flexible work arrangements',
        'Diverse and inclusive environment'
      ],
      cons: [
        'Limited career advancement',
        'Competitive music industry',
        'Licensing cost pressures',
        'Market saturation challenges'
      ],
      interviewProcess: {
        difficulty: 'Medium',
        duration: '3-4 weeks',
        stages: ['Recruiter Call', 'Hiring Manager', 'Technical/Case Study', 'Team Interview']
      },
      recentNews: [
        'Podcast platform expansion',
        'AI-powered recommendations',
        'Artist payment improvements'
      ],
      hiring: true,
      redFlags: []
    },
    {
      id: '9',
      name: 'Salesforce',
      logo: '☁️',
      industry: 'Technology',
      size: 'Large (70,000+)',
      location: 'San Francisco, CA',
      website: 'salesforce.com',
      rating: 4.3,
      reviewCount: 8920,
      salaryRange: '$105K - $240K',
      benefits: ['Health Insurance', 'Stock Options', 'Volunteer Time Off', 'Mindfulness Programs'],
      culture: {
        workLifeBalance: 4.1,
        compensation: 4.2,
        careerOpportunities: 4.4,
        management: 4.0,
        culture: 4.5
      },
      pros: [
        'Strong company values',
        'Excellent benefits package',
        'Focus on equality and inclusion',
        'Great learning opportunities',
        'Supportive management'
      ],
      cons: [
        'Rapid organizational changes',
        'Complex product ecosystem',
        'High sales targets',
        'Competitive internal environment'
      ],
      interviewProcess: {
        difficulty: 'Medium',
        duration: '3-4 weeks',
        stages: ['Recruiter Screen', 'Hiring Manager', 'Panel Interview', 'Executive Interview']
      },
      recentNews: [
        'AI integration across platform',
        'Slack integration improvements',
        'Sustainability commitments'
      ],
      hiring: true,
      redFlags: []
    },
    {
      id: '10',
      name: 'Uber',
      logo: '🚗',
      industry: 'Technology',
      size: 'Large (32,000+)',
      location: 'San Francisco, CA',
      website: 'uber.com',
      rating: 3.7,
      reviewCount: 4560,
      salaryRange: '$95K - $210K',
      benefits: ['Health Insurance', 'Stock Options', 'Uber Credits', 'Flexible Work'],
      culture: {
        workLifeBalance: 3.6,
        compensation: 4.0,
        careerOpportunities: 4.0,
        management: 3.5,
        culture: 3.8
      },
      pros: [
        'Fast-paced environment',
        'Global impact',
        'Innovation opportunities',
        'Diverse workforce',
        'Free Uber rides'
      ],
      cons: [
        'High-pressure culture',
        'Regulatory challenges',
        'Work-life balance issues',
        'Frequent strategy changes'
      ],
      interviewProcess: {
        difficulty: 'Hard',
        duration: '4-5 weeks',
        stages: ['Phone Screen', 'Technical Phone', 'Onsite Loop', 'Final Review']
      },
      recentNews: [
        'Autonomous vehicle development',
        'Uber Eats expansion',
        'Profitability improvements'
      ],
      hiring: true,
      redFlags: ['Regulatory uncertainties', 'Competitive market pressures']
    }
  ];

  useEffect(() => {
    console.log('🏢 Loading Company Intelligence Center data...');
    setIsLoading(true);
    
    // Load real-time company data
    const loadRealTimeCompanies = async () => {
      try {
        // For now, we'll use a list of popular companies to fetch data for
        const popularCompanies = [
          'Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix', 
          'Tesla', 'Spotify', 'Salesforce', 'Uber', 'Airbnb', 'Stripe'
        ];
        
        const companyPromises = popularCompanies.map(async (companyName) => {
          try {
            const companyData = await realTimeApiService.fetchCompanyData(companyName);
            return companyData;
          } catch (error) {
            console.warn(`Failed to fetch data for ${companyName}:`, error);
            return null;
          }
        });
        
        const results = await Promise.all(companyPromises);
        const validCompanies = results.filter(company => company !== null) as CompanyData[];
        
        // Transform to match our interface
        const transformedCompanies: CompanyData[] = validCompanies.map(company => ({
          ...company,
          logo: '🏢', // Default logo
          interviewProcess: {
            difficulty: 'Medium' as const,
            duration: '3-4 weeks',
            stages: ['Phone Screen', 'Technical Interview', 'Onsite', 'Final Review']
          },
          recentNews: [
            `${company.name} announces new initiatives`,
            'Recent product updates and improvements',
            'Company growth and expansion news'
          ],
          redFlags: company.redFlags || []
        }));
        
        setCompanies(transformedCompanies);
        setFilteredCompanies(transformedCompanies);
        console.log('✅ Loaded', transformedCompanies.length, 'real-time companies');
        
      } catch (error) {
        console.error('❌ Failed to load company data:', error);
        // Fallback to empty array
        setCompanies([]);
        setFilteredCompanies([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRealTimeCompanies();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, companies]);

  const applyFilters = () => {
    let filtered = [...companies];

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Industry filter
    if (filters.industry) {
      filtered = filtered.filter(company => company.industry === filters.industry);
    }

    // Size filter
    if (filters.size) {
      filtered = filtered.filter(company => company.size === filters.size);
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(company => company.rating >= filters.rating);
    }

    // Hiring filter
    if (filters.hiring) {
      filtered = filtered.filter(company => company.hiring);
    }

    setFilteredCompanies(filtered);
  };

  const getCultureColor = (score: number) => {
    if (score >= 4.0) return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    if (score >= 3.5) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-100 dark:bg-red-900/20';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Hard': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            🏢 Company Intelligence Center
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Deep insights into company culture, reviews, and hiring practices
          </p>
          
          {/* Debug Info */}
          <div className="mt-4 text-sm text-slate-500">
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                Loading company data...
              </span>
            ) : (
              <span>📊 {filteredCompanies.length} companies loaded</span>
            )}
          </div>
        </motion.div>

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
                placeholder="Search companies (e.g., Google, Microsoft, Apple)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              {/* Search Suggestions */}
              {searchTerm.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10">
                  {companies
                    .filter(company => 
                      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      company.industry.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .slice(0, 5)
                    .map(company => (
                      <button
                        key={company.id}
                        onClick={() => {
                          setSearchTerm(company.name);
                          setSelectedCompany(company);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 last:border-b-0"
                      >
                        <span className="text-2xl">{company.logo}</span>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{company.name}</p>
                          <p className="text-sm text-slate-500">{company.industry} • {company.rating}⭐</p>
                        </div>
                      </button>
                    ))
                  }
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-4 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                  showFilters
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
              <button
                onClick={() => {
                  const topCompanies = companies
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 5);
                  const analysis = `📊 TOP 5 COMPANIES ANALYSIS\n${'='.repeat(50)}\n\n${topCompanies.map((company, index) => 
                    `${index + 1}. ${company.name}\n   ⭐ Rating: ${company.rating}/5 (${company.reviewCount} reviews)\n   💰 Salary: ${company.salaryRange}\n   🏢 Size: ${company.size}\n   ${company.hiring ? '✅ Hiring' : '❌ Not Hiring'}\n   🎯 Best For: ${company.culture.compensation >= 4.0 ? 'High Pay' : company.culture.workLifeBalance >= 4.0 ? 'Work-Life Balance' : 'Career Growth'}\n`
                  ).join('\n')}\n📈 INSIGHTS:\n• Average Rating: ${(topCompanies.reduce((sum, c) => sum + c.rating, 0) / topCompanies.length).toFixed(1)}/5\n• ${topCompanies.filter(c => c.hiring).length} out of 5 are actively hiring\n• Most common industry: Technology\n\n💡 These companies represent the best employee satisfaction in our database!`;
                  alert(analysis);
                }}
                className="px-4 py-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors flex items-center gap-2"
              >
                <Award className="w-5 h-5" />
                Top 5
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Industry
                    </label>
                    <select
                      value={filters.industry}
                      onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="">All Industries</option>
                      <option value="Technology">Technology</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Company Size
                    </label>
                    <select
                      value={filters.size}
                      onChange={(e) => setFilters(prev => ({ ...prev, size: e.target.value }))}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="">All Sizes</option>
                      <option value="Small (1-100)">Small (1-100)</option>
                      <option value="Medium (100-1000)">Medium (100-1000)</option>
                      <option value="Medium (1,000-10,000)">Medium (1K-10K)</option>
                      <option value="Large (10,000+)">Large (10K+)</option>
                      <option value="Large (100,000+)">Large (100K+)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Minimum Rating
                    </label>
                    <select
                      value={filters.rating}
                      onChange={(e) => setFilters(prev => ({ ...prev, rating: Number(e.target.value) }))}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value={0}>Any Rating</option>
                      <option value={3}>3+ Stars</option>
                      <option value={3.5}>3.5+ Stars</option>
                      <option value={4}>4+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Status
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.hiring}
                        onChange={(e) => setFilters(prev => ({ ...prev, hiring: e.target.checked }))}
                        className="rounded border-slate-300 dark:border-slate-600"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Currently Hiring</span>
                    </label>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setFilters({ industry: '', size: '', rating: 0, hiring: false });
                        setSearchTerm('');
                      }}
                      className="w-full px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors text-sm"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCompanies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedCompany(company)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                  {company.logo}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white">{company.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{company.industry}</p>
                </div>
                {company.hiring && (
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                    Hiring
                  </span>
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium text-slate-900 dark:text-white">{company.rating}</span>
                    <span className="text-sm text-slate-500">({company.reviewCount})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Salary Range</span>
                  <span className="font-medium text-slate-900 dark:text-white">{company.salaryRange}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Size</span>
                  <span className="font-medium text-slate-900 dark:text-white">{company.size}</span>
                </div>
              </div>

              {company.redFlags.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-red-600">Red Flags</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {company.redFlags.slice(0, 2).map((flag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded text-xs">
                        {flag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCompany(company);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const quickInfo = `🏢 ${company.name} Quick Info:\n\n⭐ Rating: ${company.rating}/5 (${company.reviewCount} reviews)\n💰 Salary: ${company.salaryRange}\n📍 Location: ${company.location}\n🏢 Size: ${company.size}\n${company.hiring ? '✅ Currently Hiring' : '❌ Not Hiring'}\n\n🎯 Top Pros:\n${company.pros.slice(0, 2).map(pro => `• ${pro}`).join('\n')}\n\n⚠️ Main Concerns:\n${company.cons.slice(0, 2).map(con => `• ${con}`).join('\n')}\n\n${company.redFlags.length > 0 ? `🚩 Red Flags: ${company.redFlags.join(', ')}\n\n` : ''}💡 Click "View Details" for complete analysis!`;
                    alert(quickInfo);
                  }}
                  className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  title="Quick Info"
                >
                  ℹ️
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-20">
            <Building className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No companies found</h3>
            <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Company Detail Modal */}
      <AnimatePresence>
        {selectedCompany && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCompany(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
                    {selectedCompany.logo}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.name}</h2>
                    <p className="text-slate-600 dark:text-slate-400">{selectedCompany.industry} • {selectedCompany.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Culture Scores */}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Culture & Work Environment</h3>
                  <div className="space-y-3">
                    {Object.entries(selectedCompany.culture).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${((value as number) / 5) * 100}%` }}
                            />
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCultureColor(value as number)}`}>
                            {value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interview Process */}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Interview Process</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Difficulty</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedCompany.interviewProcess.difficulty)}`}>
                        {selectedCompany.interviewProcess.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Duration</span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedCompany.interviewProcess.duration}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 block mb-2">Stages</span>
                      <div className="space-y-1">
                        {selectedCompany.interviewProcess.stages.map((stage, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </span>
                            <span className="text-sm text-slate-900 dark:text-white">{stage}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pros */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                  <h3 className="font-bold text-green-800 dark:text-green-400 mb-4 flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5" />
                    Pros
                  </h3>
                  <ul className="space-y-2">
                    {selectedCompany.pros.map((pro, idx) => (
                      <li key={idx} className="text-sm text-green-700 dark:text-green-300 flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                  <h3 className="font-bold text-red-800 dark:text-red-400 mb-4 flex items-center gap-2">
                    <ThumbsDown className="w-5 h-5" />
                    Cons
                  </h3>
                  <ul className="space-y-2">
                    {selectedCompany.cons.map((con, idx) => (
                      <li key={idx} className="text-sm text-red-700 dark:text-red-300 flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">Benefits & Perks</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCompany.benefits.map((benefit, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent News */}
              <div className="mt-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">Recent News</h3>
                <ul className="space-y-2">
                  {selectedCompany.recentNews.map((news, idx) => (
                    <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {news}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => window.open(`https://${selectedCompany.website}`, '_blank')}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Website
                </button>
                <button
                  onClick={() => {
                    const jobSearchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(selectedCompany.name)}`;
                    window.open(jobSearchUrl, '_blank');
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  Find Jobs
                </button>
                <button
                  onClick={() => {
                    const report = `📊 COMPANY INTELLIGENCE REPORT: ${selectedCompany.name}\n${'='.repeat(60)}\n\n⭐ OVERALL RATING: ${selectedCompany.rating}/5 (${selectedCompany.reviewCount} reviews)\n💰 SALARY RANGE: ${selectedCompany.salaryRange}\n🏢 COMPANY SIZE: ${selectedCompany.size}\n📍 LOCATION: ${selectedCompany.location}\n🌐 WEBSITE: ${selectedCompany.website}\n${selectedCompany.hiring ? '✅ CURRENTLY HIRING' : '❌ NOT ACTIVELY HIRING'}\n\n🎯 CULTURE SCORES:\n${Object.entries(selectedCompany.culture).map(([key, value]) => `• ${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}/5`).join('\n')}\n\n✅ TOP PROS:\n${selectedCompany.pros.map(pro => `• ${pro}`).join('\n')}\n\n⚠️ MAIN CONS:\n${selectedCompany.cons.map(con => `• ${con}`).join('\n')}\n\n🎯 INTERVIEW PROCESS:\n• Difficulty: ${selectedCompany.interviewProcess.difficulty}\n• Duration: ${selectedCompany.interviewProcess.duration}\n• Stages: ${selectedCompany.interviewProcess.stages.join(' → ')}\n\n🎁 BENEFITS & PERKS:\n${selectedCompany.benefits.map(benefit => `• ${benefit}`).join('\n')}\n\n📰 RECENT NEWS:\n${selectedCompany.recentNews.map(news => `• ${news}`).join('\n')}\n\n${selectedCompany.redFlags.length > 0 ? `🚩 RED FLAGS:\n${selectedCompany.redFlags.map(flag => `• ${flag}`).join('\n')}\n\n` : ''}📅 Report Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n📧 Contact: anshojha420@gmail.com | 📱 +91 9956126495\n\n${'='.repeat(60)}\nSmartHire Company Intelligence Center`;
                    
                    navigator.clipboard.writeText(report);
                    
                    // Also create downloadable file
                    const blob = new Blob([report], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${selectedCompany.name.toLowerCase().replace(/\s+/g, '-')}-intelligence-report.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    alert(`📊 Company Intelligence Report Generated!\n\n✅ Copied to clipboard\n✅ Downloaded as: ${selectedCompany.name.toLowerCase().replace(/\s+/g, '-')}-intelligence-report.txt\n\n📋 This comprehensive report includes:\n• Company ratings & reviews\n• Culture analysis\n• Interview process details\n• Salary information\n• Benefits & perks\n• Recent news & updates\n• Red flags & warnings\n\n💡 Use this report to prepare for interviews and make informed career decisions!`);
                  }}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  Export Report
                </button>
              </div>

              {/* Additional Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    const glassdoorUrl = `https://www.glassdoor.com/Reviews/${selectedCompany.name.replace(/\s+/g, '-')}-Reviews-E${Math.floor(Math.random() * 100000)}.htm`;
                    window.open(glassdoorUrl, '_blank');
                  }}
                  className="flex-1 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/30 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Star className="w-4 h-4" />
                  Glassdoor Reviews
                </button>
                <button
                  onClick={() => {
                    const linkedinUrl = `https://www.linkedin.com/company/${selectedCompany.name.toLowerCase().replace(/\s+/g, '-')}`;
                    window.open(linkedinUrl, '_blank');
                  }}
                  className="flex-1 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Users className="w-4 h-4" />
                  LinkedIn Page
                </button>
                <button
                  onClick={() => {
                    const comparisonData = `🔍 ${selectedCompany.name} vs Industry Average:\n\n📊 RATINGS COMPARISON:\n• ${selectedCompany.name}: ${selectedCompany.rating}/5\n• Industry Average: 3.8/5\n• Difference: ${selectedCompany.rating >= 3.8 ? '+' : ''}${(selectedCompany.rating - 3.8).toFixed(1)}\n\n💰 SALARY COMPARISON:\n• ${selectedCompany.name}: ${selectedCompany.salaryRange}\n• Industry Average: $95K - $180K\n\n🎯 CULTURE SCORES vs Industry:\n${Object.entries(selectedCompany.culture).map(([key, value]) => {
                      const industryAvg = 3.7;
                      const diff = (value as number) - industryAvg;
                      return `• ${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}/5 (${diff >= 0 ? '+' : ''}${diff.toFixed(1)} vs avg)`;
                    }).join('\n')}\n\n📈 COMPETITIVE POSITION:\n${selectedCompany.rating >= 4.0 ? '🟢 Above Average' : selectedCompany.rating >= 3.5 ? '🟡 Average' : '🔴 Below Average'}\n\n💡 This company ${selectedCompany.rating >= 3.8 ? 'outperforms' : 'underperforms'} industry standards in overall employee satisfaction.`;
                    alert(comparisonData);
                  }}
                  className="flex-1 px-3 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Target className="w-4 h-4" />
                  Compare
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}