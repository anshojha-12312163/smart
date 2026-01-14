import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { realTimeApiService } from '../services/realTimeApiService';
import { jobBoardsApi } from '../services/jobBoardsApi';
import { socketService } from '../services/socketService';
import {
  Search,
  MapPin,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Clock,
  Users,
  DollarSign,
  Star,
  Zap,
  CheckCircle,
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronDown,
  X,
  Send,
  FileText,
  Upload,
  Navigation
} from 'lucide-react';

// Comprehensive job titles database
const JOB_TITLES = [
  // Technology & Engineering
  'Software Engineer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer',
  'Data Scientist', 'Data Analyst', 'Data Engineer', 'Machine Learning Engineer', 'AI Engineer',
  'DevOps Engineer', 'Cloud Engineer', 'Cybersecurity Analyst', 'Network Engineer',
  'Database Administrator', 'System Administrator', 'QA Engineer', 'Test Engineer',
  'Mobile Developer', 'iOS Developer', 'Android Developer', 'React Developer',
  'Angular Developer', 'Vue.js Developer', 'Node.js Developer', 'Python Developer',
  'Java Developer', 'C# Developer', 'PHP Developer', 'Ruby Developer', 'Go Developer',
  
  // Design & Creative
  'UI/UX Designer', 'Product Designer', 'Graphic Designer', 'Web Designer', 'Visual Designer',
  'Motion Graphics Designer', 'Brand Designer', 'Creative Director', 'Art Director',
  
  // Product & Management
  'Product Manager', 'Senior Product Manager', 'Product Owner', 'Project Manager',
  'Program Manager', 'Scrum Master', 'Agile Coach', 'Technical Product Manager',
  
  // Business & Analytics
  'Business Analyst', 'Business Intelligence Analyst', 'Financial Analyst',
  'Market Research Analyst', 'Operations Analyst', 'Strategy Consultant',
  
  // Marketing & Sales
  'Digital Marketing Manager', 'Marketing Manager', 'Content Marketing Manager',
  'Social Media Manager', 'SEO Specialist', 'Sales Manager', 'Account Manager',
  'Business Development Manager', 'Customer Success Manager',
  
  // Operations & HR
  'Operations Manager', 'Supply Chain Manager', 'HR Manager', 'Recruiter',
  'Talent Acquisition Specialist', 'HR Business Partner',
  
  // Finance & Accounting
  'Accountant', 'Senior Accountant', 'Financial Controller', 'CFO', 'Bookkeeper',
  
  // Healthcare & Medical
  'Registered Nurse', 'Physician', 'Medical Assistant', 'Physical Therapist',
  
  // Executive & Leadership
  'CEO', 'CTO', 'VP of Engineering', 'VP of Sales', 'VP of Marketing', 'Director of Operations'
];

// Popular job categories for quick search
const JOB_CATEGORIES = [
  { name: 'Technology', icon: '💻', keywords: ['engineer', 'developer', 'programmer', 'tech'] },
  { name: 'Design', icon: '🎨', keywords: ['designer', 'creative', 'ui', 'ux'] },
  { name: 'Marketing', icon: '📈', keywords: ['marketing', 'sales', 'growth', 'digital'] },
  { name: 'Management', icon: '👔', keywords: ['manager', 'director', 'lead', 'supervisor'] },
  { name: 'Finance', icon: '💰', keywords: ['finance', 'accounting', 'analyst', 'controller'] },
  { name: 'Healthcare', icon: '🏥', keywords: ['nurse', 'doctor', 'medical', 'healthcare'] }
];

interface JobSearchHubProps {
  user: any;
}

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  postedDate: string;
  jobType: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  matchScore: number;
  applicantCount: number;
  isEasyApply: boolean;
  isRemote: boolean;
  isUrgent: boolean;
  companyRating: number;
  source: string;
  skills: string[];
  experienceLevel: string;
  companySize: string;
  industry: string;
}

export function JobSearchHub({ user }: JobSearchHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [showEasyApplyModal, setShowEasyApplyModal] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    resume: null as File | null,
    additionalInfo: '',
    phoneNumber: '',
    linkedinProfile: '',
    portfolioUrl: ''
  });

  // Filter states
  const [filters, setFilters] = useState({
    salaryRange: [30000, 200000],
    experienceLevel: [] as string[],
    jobType: [] as string[],
    companySize: [] as string[],
    postedDate: 'any',
    isRemote: false,
    isEasyApply: false,
    minRating: 0,
    benefits: [] as string[],
    skills: [] as string[]
  });

  const [sortBy, setSortBy] = useState('relevance');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [applicationHistory, setApplicationHistory] = useState<any[]>([]);

  // Load application history on component mount
  useEffect(() => {
    const savedApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    setApplicationHistory(savedApplications);
    
    // Load applied jobs from history
    const appliedJobIds = savedApplications.map((app: any) => app.jobId);
    setAppliedJobs(new Set(appliedJobIds));
  }, []);

  // Popular locations for suggestions - Global coverage
  const popularLocations = [
    // India - Major Cities
    'Bangalore, India',
    'Mumbai, India', 
    'Delhi, India',
    'Hyderabad, India',
    'Chennai, India',
    'Pune, India',
    'Kolkata, India',
    'Ahmedabad, India',
    'Gurgaon, India',
    'Noida, India',
    'Kochi, India',
    'Indore, India',
    'Jaipur, India',
    'Chandigarh, India',
    'Coimbatore, India',
    'Bhubaneswar, India',
    'Thiruvananthapuram, India',
    'Mysore, India',
    'Nagpur, India',
    'Vadodara, India',
    
    // India - States
    'Karnataka, India',
    'Maharashtra, India',
    'Tamil Nadu, India',
    'Telangana, India',
    'Andhra Pradesh, India',
    'Gujarat, India',
    'West Bengal, India',
    'Rajasthan, India',
    'Kerala, India',
    'Haryana, India',
    'Uttar Pradesh, India',
    'Punjab, India',
    'Madhya Pradesh, India',
    'Odisha, India',
    
    // USA - Major Cities
    'San Francisco, CA',
    'New York, NY',
    'Seattle, WA',
    'Austin, TX',
    'Boston, MA',
    'Los Angeles, CA',
    'Chicago, IL',
    'Denver, CO',
    'Atlanta, GA',
    'Miami, FL',
    'Dallas, TX',
    'Phoenix, AZ',
    'Philadelphia, PA',
    'San Diego, CA',
    'Portland, OR',
    
    // Global Options
    'Remote',
    'Hybrid',
    'Work from Home',
    'India',
    'United States',
    'California',
    'Texas',
    'New York',
    'Florida',
    'Washington'
  ];

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          setCurrentLocation('Current Location');
          setLocation('Current Location');
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  };

  // Filter location suggestions based on input
  const getLocationSuggestions = (input: string) => {
    if (!input) {
      // Show Indian cities first, then global
      return [
        'Bangalore, India',
        'Mumbai, India',
        'Delhi, India',
        'Hyderabad, India',
        'Chennai, India',
        'Pune, India',
        'Remote',
        'Work from Home'
      ];
    }
    
    const filtered = popularLocations.filter(loc => 
      loc.toLowerCase().includes(input.toLowerCase())
    );
    
    // Prioritize Indian locations if user types India-related terms
    if (input.toLowerCase().includes('india') || input.toLowerCase().includes('bangalore') || 
        input.toLowerCase().includes('mumbai') || input.toLowerCase().includes('delhi')) {
      const indianLocations = filtered.filter(loc => loc.includes('India'));
      const otherLocations = filtered.filter(loc => !loc.includes('India'));
      return [...indianLocations, ...otherLocations].slice(0, 10);
    }
    
    return filtered.slice(0, 10);
  };

  useEffect(() => {
    // Load real-time jobs from Socket.IO server
    const loadRealTimeJobs = () => {
      try {
        setLoading(true);
        console.log('🔍 Requesting REAL jobs from Socket.IO server...');
        
        // Request real jobs from Socket.IO server
        socketService.emit('jobs:search', {
          query: searchQuery,
          location: location,
          limit: 50
        });
        
        // Listen for real job results
        const handleJobResults = (data: any) => {
          console.log(`✅ Received ${data.count} REAL jobs from server`);
          console.log(`📊 Sources: ${data.sources.join(', ')}`);
          
          // Transform API response to match our Job interface
          const transformedJobs: Job[] = data.jobs.map((job: any) => ({
            id: job.id,
            title: job.title,
            company: job.company,
            companyLogo: job.logo || '🏢',
            location: job.location,
            salary: job.salary,
            postedDate: new Date(job.postedAt).toLocaleDateString(),
            jobType: [job.type],
            description: job.description,
            requirements: job.requirements,
            benefits: job.benefits,
            matchScore: Math.floor(Math.random() * 30) + 70,
            applicantCount: Math.floor(Math.random() * 200) + 10,
            isEasyApply: Math.random() > 0.5,
            isRemote: job.type === 'remote',
            isUrgent: Math.random() > 0.8,
            companyRating: 3.5 + Math.random() * 1.5,
            source: job.source,
            skills: job.requirements.slice(0, 5),
            experienceLevel: job.experience,
            companySize: 'Medium',
            industry: 'Technology'
          }));
          
          setJobs(transformedJobs);
          setFilteredJobs(transformedJobs);
          setLoading(false);
        };
        
        // Subscribe to job results
        socketService.on('jobs:results', handleJobResults);
        
        // Handle errors
        socketService.on('jobs:error', (error: any) => {
          console.error('❌ Failed to load real jobs:', error);
          setLoading(false);
        });
        
        // Cleanup
        return () => {
          socketService.off('jobs:results', handleJobResults);
          socketService.off('jobs:error');
        };
        
      } catch (error) {
        console.error('❌ Failed to request real jobs:', error);
        setJobs([]);
        setFilteredJobs([]);
        setLoading(false);
      }
    };

    loadRealTimeJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy, jobs, searchQuery, location]);

  const applyFilters = () => {
    let filtered = [...jobs];

    // Apply search query filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply location filter
    if (location.trim()) {
      filtered = filtered.filter(job => {
        if (location.toLowerCase() === 'remote') return job.isRemote;
        if (location.toLowerCase() === 'current location') return true; // Show all for current location
        return job.location.toLowerCase().includes(location.toLowerCase());
      });
    }

    // Apply experience level filter
    if (filters.experienceLevel.length > 0) {
      filtered = filtered.filter(job => filters.experienceLevel.includes(job.experienceLevel));
    }

    // Apply job type filter
    if (filters.jobType.length > 0) {
      filtered = filtered.filter(job => 
        job.jobType.some(type => filters.jobType.includes(type))
      );
    }

    // Apply company size filter
    if (filters.companySize.length > 0) {
      filtered = filtered.filter(job => {
        const sizeMap: { [key: string]: string } = {
          'Large': 'Large (1000+)',
          'Medium': 'Medium (201-1000)',
          'Small': 'Small (51-200)',
          'Startup': 'Startup (1-50)'
        };
        const jobSizeCategory = sizeMap[job.companySize] || job.companySize;
        return filters.companySize.includes(jobSizeCategory);
      });
    }

    // Apply remote filter
    if (filters.isRemote) {
      filtered = filtered.filter(job => job.isRemote);
    }

    // Apply easy apply filter
    if (filters.isEasyApply) {
      filtered = filtered.filter(job => job.isEasyApply);
    }

    // Apply minimum rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(job => job.companyRating >= filters.minRating);
    }

    // Apply posted date filter
    if (filters.postedDate !== 'any') {
      const now = new Date();
      filtered = filtered.filter(job => {
        const postedDate = new Date();
        // Simulate posted dates based on the job's postedDate string
        if (job.postedDate.includes('hour')) {
          postedDate.setHours(now.getHours() - parseInt(job.postedDate));
        } else if (job.postedDate.includes('day')) {
          postedDate.setDate(now.getDate() - parseInt(job.postedDate));
        } else if (job.postedDate.includes('week')) {
          postedDate.setDate(now.getDate() - (parseInt(job.postedDate) * 7));
        }

        switch (filters.postedDate) {
          case 'today':
            return job.postedDate.includes('hour') || job.postedDate.includes('today');
          case 'week':
            return job.postedDate.includes('hour') || job.postedDate.includes('day') || 
                   (job.postedDate.includes('week') && parseInt(job.postedDate) <= 1);
          case 'month':
            return !job.postedDate.includes('month') || 
                   (job.postedDate.includes('month') && parseInt(job.postedDate) <= 1);
          default:
            return true;
        }
      });
    }

    // Apply salary range filter
    if (filters.salaryRange[0] > 30000 || filters.salaryRange[1] < 200000) {
      filtered = filtered.filter(job => {
        // Extract salary numbers from salary string
        const salaryNumbers = job.salary.match(/[\d,]+/g);
        if (salaryNumbers && salaryNumbers.length >= 1) {
          const minSalary = parseInt(salaryNumbers[0].replace(/,/g, ''));
          const maxSalary = salaryNumbers.length > 1 ? 
            parseInt(salaryNumbers[1].replace(/,/g, '')) : minSalary;
          
          return minSalary >= filters.salaryRange[0] && maxSalary <= filters.salaryRange[1];
        }
        return true; // Include jobs without clear salary info
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => {
          // Sort by recency - jobs with "hour" come first, then "day", then "week"
          const getTimeValue = (postedDate: string) => {
            if (postedDate.includes('hour')) return parseInt(postedDate) || 0;
            if (postedDate.includes('day')) return (parseInt(postedDate) || 0) * 24;
            if (postedDate.includes('week')) return (parseInt(postedDate) || 0) * 24 * 7;
            return 999999; // Very old
          };
          return getTimeValue(a.postedDate) - getTimeValue(b.postedDate);
        });
        break;
      case 'salary':
        filtered.sort((a, b) => {
          const getSalaryValue = (salary: string) => {
            const numbers = salary.match(/[\d,]+/g);
            if (numbers && numbers.length > 0) {
              return parseInt(numbers[numbers.length - 1].replace(/,/g, ''));
            }
            return 0;
          };
          return getSalaryValue(b.salary) - getSalaryValue(a.salary);
        });
        break;
      case 'match':
        filtered.sort((a, b) => b.matchScore - a.matchScore);
        break;
      default:
        // Relevance - keep original order but prioritize match score
        filtered.sort((a, b) => b.matchScore - a.matchScore);
        break;
    }

    setFilteredJobs(filtered);
  };

  const handleSearch = async () => {
    setLoading(true);
    
    try {
      console.log('🔍 Searching for REAL jobs via Socket.IO...');
      
      // Add to search history
      if (searchQuery && !searchHistory.includes(searchQuery)) {
        setSearchHistory(prev => [searchQuery, ...prev.slice(0, 9)]);
      }
      
      // Request REAL jobs from Socket.IO server
      socketService.emit('jobs:search', {
        query: searchQuery,
        location: location,
        limit: 50
      });
      
      // Listen for results
      const handleJobResults = (data: any) => {
        console.log(`✅ Received ${data.count} REAL jobs`);
        
        const transformedJobs: Job[] = data.jobs.map((job: any) => ({
          id: job.id,
          title: job.title,
          company: job.company,
          companyLogo: job.logo || '🏢',
          location: job.location,
          salary: job.salary,
          postedDate: new Date(job.postedAt).toLocaleDateString(),
          jobType: [job.type],
          description: job.description,
          requirements: job.requirements,
          benefits: job.benefits,
          matchScore: Math.floor(Math.random() * 30) + 70,
          applicantCount: Math.floor(Math.random() * 200) + 10,
          isEasyApply: Math.random() > 0.5,
          isRemote: job.type === 'remote',
          isUrgent: Math.random() > 0.8,
          companyRating: 3.5 + Math.random() * 1.5,
          source: job.source,
          skills: job.requirements.slice(0, 5),
          experienceLevel: job.experience,
          companySize: 'Medium',
          industry: 'Technology'
        }));
        
        setJobs(transformedJobs);
        setFilteredJobs(transformedJobs);
        setLoading(false);
        
        // Cleanup listener
        socketService.off('jobs:results', handleJobResults);
      };
      
      socketService.on('jobs:results', handleJobResults);
      
      // Handle errors
      socketService.on('jobs:error', (error: any) => {
        console.error('❌ Job search error:', error);
        alert('Unable to fetch real jobs. Please check your connection.');
        setLoading(false);
        socketService.off('jobs:error');
      });
      
    } catch (error) {
      console.error('❌ Failed to search jobs:', error);
      alert('Unable to fetch real jobs. Please check your connection.');
      setLoading(false);
    }
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });
  };

  const handleEasyApply = (job: Job) => {
    setSelectedJob(job);
    setShowEasyApplyModal(true);
  };

  const submitApplication = () => {
    if (selectedJob && applicationData.coverLetter.trim()) {
      // Add to applied jobs
      setAppliedJobs(prev => new Set([...prev, selectedJob.id]));
      
      // Create application record (in real app, this would be sent to backend)
      const applicationRecord = {
        id: Date.now().toString(),
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        company: selectedJob.company,
        appliedDate: new Date().toISOString(),
        status: 'Applied',
        applicationData: {
          ...applicationData,
          resumeFileName: applicationData.resume?.name || 'Default Resume'
        }
      };
      
      // Store in localStorage for persistence (in real app, use proper backend)
      const existingApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
      existingApplications.push(applicationRecord);
      localStorage.setItem('jobApplications', JSON.stringify(existingApplications));
      
      // Reset form and close modal
      setShowEasyApplyModal(false);
      setSelectedJob(null);
      setApplicationData({
        coverLetter: '',
        resume: null,
        additionalInfo: '',
        phoneNumber: '',
        linkedinProfile: '',
        portfolioUrl: ''
      });
      
      // Show success notification with application details
      const successMessage = `✅ Application submitted successfully!\n\nJob: ${selectedJob.title}\nCompany: ${selectedJob.company}\nApplication ID: ${applicationRecord.id.slice(-6)}\n\nYou can track your application status in the Applications section.`;
      alert(successMessage);
      
      // Simulate application status updates (in real app, this would come from backend)
      setTimeout(() => {
        const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
        const updatedApplications = applications.map((app: any) => 
          app.id === applicationRecord.id 
            ? { ...app, status: 'Under Review', lastUpdated: new Date().toISOString() }
            : app
        );
        localStorage.setItem('jobApplications', JSON.stringify(updatedApplications));
      }, 5000); // Update status after 5 seconds
    } else {
      // Show validation errors
      let errorMessage = 'Please complete the following required fields:\n';
      if (!applicationData.resume) errorMessage += '• Resume\n';
      if (!applicationData.coverLetter.trim()) errorMessage += '• Cover Letter\n';
      alert(errorMessage);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setApplicationData(prev => ({ ...prev, resume: file }));
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-100 dark:bg-red-900/20';
  };

  const getPostedTimeColor = (postedDate: string) => {
    if (postedDate.includes('hour')) return 'text-green-600';
    if (postedDate.includes('day')) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const renderJobCard = (job: Job, index: number) => (
    <motion.div
      key={job.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all cursor-pointer"
      onClick={() => setSelectedJob(job)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
            {job.companyLogo}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">{job.title}</h3>
            <div className="flex items-center gap-2">
              <span className="text-slate-600 dark:text-slate-400">{job.company}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm text-slate-600 dark:text-slate-400">{job.companyRating}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchScoreColor(job.matchScore)}`}>
            {job.matchScore}% match
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveJob(job.id);
            }}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {savedJobs.has(job.id) ? (
              <BookmarkCheck className="w-5 h-5 text-blue-600" />
            ) : (
              <Bookmark className="w-5 h-5 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Location and Details */}
      <div className="flex items-center gap-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-green-500" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span className={getPostedTimeColor(job.postedDate)}>{job.postedDate}</span>
        </div>
      </div>

      {/* Job Type Badges */}
      <div className="flex items-center gap-2 mb-4">
        {job.jobType.map((type, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-medium"
          >
            {type}
          </span>
        ))}
        {job.isEasyApply && (
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-xs font-medium flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Easy Apply
          </span>
        )}
        {job.isUrgent && (
          <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-xs font-medium">
            Urgent
          </span>
        )}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 4).map((skill, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs">
            +{job.skills.length - 4} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{job.applicantCount} applicants</span>
          </div>
          <span className="text-xs">via {job.source}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {appliedJobs.has(job.id) ? (
            <div className="flex flex-col items-end gap-1">
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Applied
              </span>
              {(() => {
                const application = applicationHistory.find(app => app.jobId === job.id);
                return application ? (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(application.appliedDate).toLocaleDateString()} • {application.status}
                  </span>
                ) : null;
              })()}
            </div>
          ) : job.isEasyApply ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEasyApply(job);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-1"
            >
              <Zap className="w-4 h-4" />
              Easy Apply
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open('#', '_blank');
              }}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm font-medium flex items-center gap-1"
            >
              <ExternalLink className="w-4 h-4" />
              Apply
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Discover opportunities from top companies worldwide
          </p>
        </motion.div>

        {/* Quick Stats */}
        {applicationHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-8"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Your Application Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{applicationHistory.length}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Applied</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {applicationHistory.filter(app => app.status === 'Under Review').length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Under Review</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {applicationHistory.filter(app => app.status === 'Interview').length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Interviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((applicationHistory.filter(app => app.status !== 'Applied').length / applicationHistory.length) * 100) || 0}%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Response Rate</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-8 relative"
        >
          {/* Streamlined Search Bar */}
          <div className="flex items-center bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-full shadow-lg overflow-hidden">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-lg border-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            {/* Divider */}
            <div className="w-px h-12 bg-slate-200 dark:bg-slate-700"></div>

            {/* Location Input */}
            <div className="flex-1 relative">
              <MapPin className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="City, state, zip code, or 'remote'"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setShowLocationSuggestions(true);
                }}
                onFocus={() => setShowLocationSuggestions(true)}
                onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                className="w-full pl-14 pr-4 py-4 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-lg border-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSearch}
              disabled={loading}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-50 flex items-center gap-2 rounded-full m-1"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5 text-white" />
              )}
              Find jobs
            </motion.button>
          </div>

          {/* Search Suggestions */}
          {searchQuery && (
            <div className="absolute top-full left-6 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-40 max-w-md max-h-80 overflow-y-auto">
              <div className="p-2">
                <div className="text-xs text-slate-500 dark:text-slate-400 px-3 py-2">Matching job titles</div>
                {JOB_TITLES.filter(title => 
                  title.toLowerCase().includes(searchQuery.toLowerCase())
                ).slice(0, 8).map((title, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(title);
                      handleSearch();
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Search className="w-4 h-4 text-blue-500" />
                    <span className="text-slate-900 dark:text-white">{title}</span>
                  </button>
                ))}
                {JOB_TITLES.filter(title => 
                  title.toLowerCase().includes(searchQuery.toLowerCase())
                ).length === 0 && (
                  <div className="px-3 py-4 text-center text-slate-500 dark:text-slate-400">
                    <div className="text-sm">No matching job titles found</div>
                    <div className="text-xs mt-1">Try searching for keywords like "engineer", "manager", or "developer"</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Location Suggestions Dropdown */}
          <AnimatePresence>
            {showLocationSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-6 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto max-w-sm"
              >
                {getLocationSuggestions(location).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setLocation(suggestion);
                      setShowLocationSuggestions(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 last:border-b-0"
                  >
                    <MapPin className="w-4 h-4 text-green-500" />
                    <span className="text-slate-900 dark:text-white">{suggestion}</span>
                    {suggestion === 'Current Location' && (
                      <span className="ml-auto text-xs text-green-600 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded">
                        GPS
                      </span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Popular categories:</span>
            {JOB_CATEGORIES.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(category.keywords[0]);
                  handleSearch();
                }}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full transition-colors text-sm"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showFilters
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Advanced Filters
            </button>
          </div>

          {/* Additional Quick Filters */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showFilters
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            
            <button
              onClick={() => setFilters(prev => ({ ...prev, isRemote: !prev.isRemote }))}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filters.isRemote
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              Remote
            </button>
            
            <button
              onClick={() => setFilters(prev => ({ ...prev, isEasyApply: !prev.isEasyApply }))}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                filters.isEasyApply
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <Zap className="w-4 h-4" />
              Easy Apply
            </button>
          </div>
        </motion.div>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-8 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Advanced Filters</h3>
                <button
                  onClick={() => {
                    setFilters({
                      salaryRange: [30000, 200000],
                      experienceLevel: [],
                      jobType: [],
                      companySize: [],
                      postedDate: 'any',
                      isRemote: false,
                      isEasyApply: false,
                      minRating: 0,
                      benefits: [],
                      skills: []
                    });
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Experience Level
                  </label>
                  <div className="space-y-2">
                    {['Entry', 'Mid', 'Senior', 'Lead', 'Executive'].map((level) => (
                      <label key={level} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.experienceLevel.includes(level)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({
                                ...prev,
                                experienceLevel: [...prev.experienceLevel, level]
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                experienceLevel: prev.experienceLevel.filter(l => l !== level)
                              }));
                            }
                          }}
                          className="rounded border-slate-300 dark:border-slate-600"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Job Type
                  </label>
                  <div className="space-y-2">
                    {['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Remote', 'Hybrid'].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.jobType.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({
                                ...prev,
                                jobType: [...prev.jobType, type]
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                jobType: prev.jobType.filter(t => t !== type)
                              }));
                            }
                          }}
                          className="rounded border-slate-300 dark:border-slate-600"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Company Size */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Company Size
                  </label>
                  <div className="space-y-2">
                    {['Startup (1-50)', 'Small (51-200)', 'Medium (201-1000)', 'Large (1000+)'].map((size) => (
                      <label key={size} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.companySize.includes(size)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({
                                ...prev,
                                companySize: [...prev.companySize, size]
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                companySize: prev.companySize.filter(s => s !== size)
                              }));
                            }
                          }}
                          className="rounded border-slate-300 dark:border-slate-600"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Posted Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Posted Date
                  </label>
                  <select
                    value={filters.postedDate}
                    onChange={(e) => setFilters(prev => ({ ...prev, postedDate: e.target.value }))}
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="any">Any time</option>
                    <option value="today">Today</option>
                    <option value="week">Past week</option>
                    <option value="month">Past month</option>
                  </select>
                </div>

                {/* Company Rating */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Minimum Company Rating
                  </label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value={0}>Any rating</option>
                    <option value={3}>3+ stars</option>
                    <option value={4}>4+ stars</option>
                    <option value={4.5}>4.5+ stars</option>
                  </select>
                </div>

                {/* Salary Range */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Salary Range
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.salaryRange[0]}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          salaryRange: [Number(e.target.value), prev.salaryRange[1]]
                        }))}
                        className="flex-1 p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                      />
                      <span className="text-slate-500">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.salaryRange[1]}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          salaryRange: [prev.salaryRange[0], Number(e.target.value)]
                        }))}
                        className="flex-1 p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      Current: ${filters.salaryRange[0].toLocaleString()} - ${filters.salaryRange[1].toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Apply Filters Button */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {filteredJobs.length} jobs match your filters
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      applyFilters();
                      setShowFilters(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {filteredJobs.length} jobs found
            </h2>
            
            {/* Job Market Insights */}
            <div className="hidden md:flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <span>
                🇮🇳 {filteredJobs.filter(job => job.location.includes('India')).length} in India
              </span>
              <span>
                🌍 {filteredJobs.filter(job => !job.location.includes('India')).length} International
              </span>
              <span>
                🏠 {filteredJobs.filter(job => job.isRemote).length} Remote
              </span>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-600 text-blue-600 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-600 text-blue-600 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="date">Newest First</option>
            <option value="salary">Highest Salary</option>
            <option value="match">Best Match</option>
          </select>
        </div>

        {/* Job Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-400">Searching for jobs...</p>
            </div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No jobs found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Try adjusting your search criteria or location
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setLocation('');
                  setFilters({
                    salaryRange: [30000, 200000],
                    experienceLevel: [],
                    jobType: [],
                    companySize: [],
                    postedDate: 'any',
                    isRemote: false,
                    isEasyApply: false,
                    minRating: 0,
                    benefits: [],
                    skills: []
                  });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear all filters
              </button>
              <button
                onClick={() => setLocation('Remote')}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Try Remote jobs
              </button>
            </div>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredJobs.map((job, index) => renderJobCard(job, index))}
          </div>
        )}

        {/* Load More */}
        {!loading && filteredJobs.length > 0 && (
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Load More Jobs
            </motion.button>
          </div>
        )}
      </div>

      {/* Easy Apply Modal */}
      <AnimatePresence>
        {showEasyApplyModal && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowEasyApplyModal(false)}
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
                  Easy Apply
                </h2>
                <button
                  onClick={() => setShowEasyApplyModal(false)}
                  className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Job Summary */}
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl">
                    {selectedJob.companyLogo}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{selectedJob.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{selectedJob.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <span>{selectedJob.location}</span>
                  <span>{selectedJob.salary}</span>
                </div>
              </div>

              {/* Application Form */}
              <div className="space-y-6">
                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Resume *
                  </label>
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center">
                    {applicationData.resume ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileText className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="text-slate-900 dark:text-white font-medium">
                            {applicationData.resume.name}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {(applicationData.resume.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={() => setApplicationData(prev => ({ ...prev, resume: null }))}
                          className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                          Upload your resume (PDF, DOC, DOCX)
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="resume-upload"
                        />
                        <label
                          htmlFor="resume-upload"
                          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                        >
                          Choose File
                        </label>
                      </>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={applicationData.phoneNumber}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={applicationData.linkedinProfile}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, linkedinProfile: e.target.value }))}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>

                {/* Portfolio URL */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Portfolio/Website (Optional)
                  </label>
                  <input
                    type="url"
                    value={applicationData.portfolioUrl}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, portfolioUrl: e.target.value }))}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="https://yourportfolio.com"
                  />
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    rows={6}
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white resize-none"
                    placeholder="Write a compelling cover letter explaining why you're the perfect fit for this role..."
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-slate-500">
                      {applicationData.coverLetter.length}/500 characters
                    </span>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:underline"
                      onClick={() => {
                        const aiSuggestion = `Dear Hiring Manager,\n\nI am excited to apply for the ${selectedJob?.title} position at ${selectedJob?.company}. With my background in ${selectedJob?.skills.slice(0, 2).join(' and ')}, I am confident I can contribute to your team's success.\n\nI am particularly drawn to this opportunity because of ${selectedJob?.company}'s reputation for innovation and growth. My experience aligns well with your requirements, and I am eager to bring my skills to your organization.\n\nThank you for considering my application. I look forward to discussing how I can contribute to your team.\n\nBest regards`;
                        setApplicationData(prev => ({ ...prev, coverLetter: aiSuggestion }));
                      }}
                    >
                      Generate with AI
                    </button>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={applicationData.additionalInfo}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white resize-none"
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setShowEasyApplyModal(false)}
                    className="flex-1 py-3 px-6 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitApplication}
                    disabled={!applicationData.resume || !applicationData.coverLetter.trim()}
                    className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    Submit Application
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}