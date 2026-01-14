import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  BarChart3, 
  Eye, 
  Upload,
  Download,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Globe,
  Linkedin,
  Github,
  Star,
  CheckCircle
} from 'lucide-react';

interface CVTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  color: string;
  features: string[];
  difficulty: string;
  atsScore: number;
  popularity: number;
  templateData: CVFormData;
}

interface CVFormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    website: string;
    linkedin: string;
    github: string;
    profileImage: string;
  };
  professionalSummary: string;
  workExperience: Array<{
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa: string;
    description: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    category: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiryDate: string;
    credentialId: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    startDate: string;
    endDate: string;
    url: string;
  }>;
  languages: Array<{
    id: string;
    name: string;
    proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
  }>;
  awards: Array<{
    id: string;
    title: string;
    issuer: string;
    date: string;
    description: string;
  }>;
}

interface CVAnalysisBuilderProps {
  user?: any;
}

export function CVAnalysisBuilder({ user }: CVAnalysisBuilderProps) {
  const [activeMode, setActiveMode] = useState('builder');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('personal');
  const [cvData, setCvData] = useState<CVFormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      website: '',
      linkedin: '',
      github: '',
      profileImage: ''
    },
    professionalSummary: '',
    workExperience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    languages: [],
    awards: []
  });

  const modes = [
    { id: 'builder', label: 'CV Builder', icon: FileText },
    { id: 'templates', label: 'Templates', icon: Eye },
    { id: 'analysis', label: 'CV Analysis', icon: BarChart3 }
  ];

  const builderSections = [
    { id: 'personal', label: 'Personal Info', icon: User, required: true },
    { id: 'summary', label: 'Professional Summary', icon: FileText, required: true },
    { id: 'experience', label: 'Work Experience', icon: Briefcase, required: true },
    { id: 'education', label: 'Education', icon: GraduationCap, required: true },
    { id: 'skills', label: 'Skills', icon: Star, required: true },
    { id: 'certifications', label: 'Certifications', icon: Award, required: false },
    { id: 'projects', label: 'Projects', icon: Globe, required: false },
    { id: 'languages', label: 'Languages', icon: Globe, required: false },
    { id: 'awards', label: 'Awards', icon: Award, required: false }
  ];

  const cvTemplates: CVTemplate[] = [
    {
      id: 'modern-professional',
      name: 'Modern Professional',
      category: 'Professional',
      description: 'Clean, modern design perfect for corporate roles',
      preview: '📄',
      color: 'blue',
      features: ['ATS Optimized', 'Clean Layout', 'Professional Fonts', 'Contact Section'],
      difficulty: 'beginner',
      atsScore: 95,
      popularity: 89,
      templateData: {
        personalInfo: {
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@email.com',
          phone: '+1 (555) 123-4567',
          address: '123 Main Street',
          city: 'New York',
          country: 'United States',
          postalCode: '10001',
          website: 'www.johnsmith.com',
          linkedin: 'linkedin.com/in/johnsmith',
          github: 'github.com/johnsmith',
          profileImage: ''
        },
        professionalSummary: 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading cross-functional teams.',
        workExperience: [
          {
            id: '1',
            jobTitle: 'Senior Software Engineer',
            company: 'Tech Solutions Inc.',
            location: 'New York, NY',
            startDate: '2022-01',
            endDate: '',
            current: true,
            description: 'Lead development of enterprise web applications using React and Node.js',
            achievements: [
              'Improved application performance by 40%',
              'Led team of 5 developers',
              'Implemented CI/CD pipeline reducing deployment time by 60%'
            ]
          }
        ],
        education: [
          {
            id: '1',
            degree: 'Bachelor of Science in Computer Science',
            institution: 'University of Technology',
            location: 'New York, NY',
            startDate: '2016-09',
            endDate: '2020-05',
            gpa: '3.8',
            description: 'Graduated Magna Cum Laude with focus on software engineering and algorithms'
          }
        ],
        skills: [
          { id: '1', name: 'JavaScript', level: 'Expert', category: 'Programming' },
          { id: '2', name: 'React', level: 'Expert', category: 'Frontend' },
          { id: '3', name: 'Node.js', level: 'Advanced', category: 'Backend' },
          { id: '4', name: 'AWS', level: 'Intermediate', category: 'Cloud' }
        ],
        certifications: [],
        projects: [],
        languages: [],
        awards: []
      }
    },
    {
      id: 'creative-designer',
      name: 'Creative Designer',
      category: 'Creative',
      description: 'Visually appealing template for creative professionals',
      preview: '🎨',
      color: 'purple',
      features: ['Visual Elements', 'Portfolio Section', 'Color Accents', 'Creative Layout'],
      difficulty: 'intermediate',
      atsScore: 78,
      popularity: 76,
      templateData: {
        personalInfo: {
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1 (555) 987-6543',
          address: '456 Creative Ave',
          city: 'Los Angeles',
          country: 'United States',
          postalCode: '90210',
          website: 'www.sarahjohnson.design',
          linkedin: 'linkedin.com/in/sarahjohnson',
          github: '',
          profileImage: ''
        },
        professionalSummary: 'Creative UI/UX designer with 4+ years of experience crafting user-centered digital experiences. Passionate about creating intuitive interfaces that balance aesthetics with functionality.',
        workExperience: [
          {
            id: '1',
            jobTitle: 'Senior UI/UX Designer',
            company: 'Design Studio Pro',
            location: 'Los Angeles, CA',
            startDate: '2021-03',
            endDate: '',
            current: true,
            description: 'Lead design for mobile and web applications across various industries',
            achievements: [
              'Increased user engagement by 35% through redesign',
              'Created design system used across 10+ products',
              'Mentored 3 junior designers'
            ]
          }
        ],
        education: [
          {
            id: '1',
            degree: 'Bachelor of Fine Arts in Graphic Design',
            institution: 'Art Institute of California',
            location: 'Los Angeles, CA',
            startDate: '2017-09',
            endDate: '2021-05',
            gpa: '3.9',
            description: 'Specialized in digital design and user experience'
          }
        ],
        skills: [
          { id: '1', name: 'Figma', level: 'Expert', category: 'Design Tools' },
          { id: '2', name: 'Adobe Creative Suite', level: 'Expert', category: 'Design Tools' },
          { id: '3', name: 'Prototyping', level: 'Advanced', category: 'UX' },
          { id: '4', name: 'User Research', level: 'Advanced', category: 'UX' }
        ],
        certifications: [],
        projects: [],
        languages: [],
        awards: []
      }
    },
    {
      id: 'tech-developer',
      name: 'Tech Developer',
      category: 'Technology',
      description: 'Code-focused template for software developers',
      preview: '💻',
      color: 'green',
      features: ['GitHub Integration', 'Project Showcase', 'Tech Skills', 'Code Samples'],
      difficulty: 'intermediate',
      atsScore: 92,
      popularity: 84,
      templateData: {
        personalInfo: {
          firstName: 'Alex',
          lastName: 'Chen',
          email: 'alex.chen@email.com',
          phone: '+1 (555) 456-7890',
          address: '789 Tech Blvd',
          city: 'San Francisco',
          country: 'United States',
          postalCode: '94105',
          website: 'www.alexchen.dev',
          linkedin: 'linkedin.com/in/alexchen',
          github: 'github.com/alexchen',
          profileImage: ''
        },
        professionalSummary: 'Full-stack developer with 6+ years of experience building scalable web applications. Expert in modern JavaScript frameworks, cloud architecture, and DevOps practices.',
        workExperience: [
          {
            id: '1',
            jobTitle: 'Lead Full-Stack Developer',
            company: 'StartupTech',
            location: 'San Francisco, CA',
            startDate: '2020-06',
            endDate: '',
            current: true,
            description: 'Architect and develop microservices-based applications using React, Node.js, and AWS',
            achievements: [
              'Built platform serving 1M+ users',
              'Reduced server costs by 45% through optimization',
              'Implemented automated testing increasing code coverage to 95%'
            ]
          }
        ],
        education: [
          {
            id: '1',
            degree: 'Master of Science in Computer Science',
            institution: 'Stanford University',
            location: 'Stanford, CA',
            startDate: '2016-09',
            endDate: '2018-06',
            gpa: '3.9',
            description: 'Specialized in distributed systems and machine learning'
          }
        ],
        skills: [
          { id: '1', name: 'Python', level: 'Expert', category: 'Programming' },
          { id: '2', name: 'JavaScript/TypeScript', level: 'Expert', category: 'Programming' },
          { id: '3', name: 'Docker', level: 'Advanced', category: 'DevOps' },
          { id: '4', name: 'Kubernetes', level: 'Advanced', category: 'DevOps' },
          { id: '5', name: 'PostgreSQL', level: 'Advanced', category: 'Database' }
        ],
        certifications: [],
        projects: [],
        languages: [],
        awards: []
      }
    }
  ];

  // Helper functions
  const updatePersonalInfo = (field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateProfessionalSummary = (value: string) => {
    setCvData(prev => ({ ...prev, professionalSummary: value }));
  };

  const addWorkExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
    setCvData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newExp]
    }));
  };

  const updateWorkExperience = (id: string, field: string, value: any) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeWorkExperience = (id: string) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    };
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate' as const,
      category: ''
    };
    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const applyTemplate = (templateId: string) => {
    const template = cvTemplates.find(t => t.id === templateId);
    if (template) {
      setCvData(template.templateData);
      setActiveMode('builder');
      setActiveSection('personal');
      alert(`✅ Template Applied!\n\n"${template.name}" template has been applied successfully.\n\nAll sections have been pre-filled with sample data. You can now customize the information to match your profile.`);
    }
  };

  const saveCvData = () => {
    localStorage.setItem('smarthire_cv_data', JSON.stringify(cvData));
    alert('✅ CV Data Saved!\n\nYour CV has been saved successfully. You can continue editing anytime.');
  };

  const loadCvData = () => {
    const saved = localStorage.getItem('smarthire_cv_data');
    if (saved) {
      setCvData(JSON.parse(saved));
      alert('✅ CV Data Loaded!\n\nYour previously saved CV data has been loaded.');
    } else {
      alert('ℹ️ No saved CV data found.');
    }
  };

  const exportToPdf = () => {
    alert('📄 Export to PDF\n\nPDF export functionality would be implemented here.\n\nFeatures:\n• Professional formatting\n• ATS-optimized layout\n• Multiple template styles\n• High-quality output\n\nThis would integrate with a PDF generation library like jsPDF or Puppeteer.');
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 0;

    // Personal Info (required)
    const personalFields = ['firstName', 'lastName', 'email', 'phone'];
    personalFields.forEach(field => {
      total++;
      if (cvData.personalInfo[field as keyof typeof cvData.personalInfo]) completed++;
    });

    // Professional Summary (required)
    total++;
    if (cvData.professionalSummary) completed++;

    // Work Experience (required)
    total++;
    if (cvData.workExperience.length > 0) completed++;

    // Education (required)
    total++;
    if (cvData.education.length > 0) completed++;

    // Skills (required)
    total++;
    if (cvData.skills.length > 0) completed++;

    return Math.round((completed / total) * 100);
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={cvData.personalInfo.firstName}
            onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={cvData.personalInfo.lastName}
            onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Smith"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={cvData.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="john.smith@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Phone *
          </label>
          <input
            type="tel"
            value={cvData.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Address
          </label>
          <input
            type="text"
            value={cvData.personalInfo.address}
            onChange={(e) => updatePersonalInfo('address', e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="123 Main Street"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            City
          </label>
          <input
            type="text"
            value={cvData.personalInfo.city}
            onChange={(e) => updatePersonalInfo('city', e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="New York"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Website
          </label>
          <input
            type="url"
            value={cvData.personalInfo.website}
            onChange={(e) => updatePersonalInfo('website', e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="www.yourwebsite.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            LinkedIn
          </label>
          <input
            type="url"
            value={cvData.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="linkedin.com/in/yourprofile"
          />
        </div>
      </div>
    </div>
  );

  const renderProfessionalSummary = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Professional Summary</h3>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Professional Summary *
        </label>
        <textarea
          rows={6}
          value={cvData.professionalSummary}
          onChange={(e) => updateProfessionalSummary(e.target.value)}
          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Write a compelling professional summary that highlights your key skills, experience, and career objectives..."
        />
        <div className="text-right text-xs text-slate-500 mt-1">
          {cvData.professionalSummary.length}/500 characters
        </div>
      </div>
    </div>
  );

  const renderWorkExperience = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Work Experience</h3>
        <button
          onClick={addWorkExperience}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>
      
      {cvData.workExperience.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400">No work experience added yet</p>
          <button
            onClick={addWorkExperience}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Job
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cvData.workExperience.map((exp, index) => (
            <div key={exp.id} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-slate-900 dark:text-white">Experience #{index + 1}</h4>
                <button
                  onClick={() => removeWorkExperience(exp.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => updateWorkExperience(exp.id, 'jobTitle', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Software Engineer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tech Company Inc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="New York, NY"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateWorkExperience(exp.id, 'current', e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  I currently work here
                </label>
              </div>
              
              {!exp.current && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Job Description
                </label>
                <textarea
                  rows={4}
                  value={exp.description}
                  onChange={(e) => updateWorkExperience(exp.id, 'description', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Describe your role, responsibilities, and key accomplishments..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Education</h3>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>
      
      {cvData.education.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400">No education added yet</p>
          <button
            onClick={addEducation}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cvData.education.map((edu, index) => (
            <div key={edu.id} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-slate-900 dark:text-white">Education #{index + 1}</h4>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Degree *
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Institution *
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="University Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="City, State"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Skills</h3>
        <button
          onClick={addSkill}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>
      
      {cvData.skills.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <Star className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400">No skills added yet</p>
          <button
            onClick={addSkill}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Skills
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cvData.skills.map((skill, index) => (
            <div key={skill.id} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-slate-900 dark:text-white">Skill #{index + 1}</h4>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="JavaScript"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Level
                  </label>
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={skill.category}
                    onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Programming"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Choose Your Template</h2>
          <p className="text-slate-600 dark:text-slate-400">Select from our professionally designed CV templates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cvTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border-2 cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            {/* Template Preview */}
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">{template.preview}</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{template.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{template.description}</p>
            </div>

            {/* Template Stats */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">ATS Score</span>
                <span className="font-semibold text-green-600">{template.atsScore}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Popularity</span>
                <span className="font-semibold text-blue-600">{template.popularity}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Difficulty</span>
                <span className="font-semibold text-orange-600 capitalize">{template.difficulty}</span>
              </div>
            </div>

            {/* Template Features */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {template.features.map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-xs">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button 
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  applyTemplate(template.id);
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                ✨ Use Template
              </button>
              <button 
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  alert(`📋 ${template.name}\n\nCategory: ${template.category}\nATS Score: ${template.atsScore}%\nDifficulty: ${template.difficulty}\n\nFeatures:\n${template.features.map(f => `• ${f}`).join('\n')}`);
                }}
                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                👁️ Preview
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">CV Analysis</h2>
        <p className="text-slate-600 dark:text-slate-400">Upload your CV for AI-powered analysis and optimization suggestions</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-8 text-center">
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Upload Your CV</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Drag and drop your CV file or click to browse</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Choose File
          </button>
          <p className="text-xs text-slate-500 mt-2">Supports PDF, DOC, DOCX files up to 10MB</p>
        </div>
      </div>
    </div>
  );

  const renderBuilder = () => (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg sticky top-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">CV Sections</h3>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Completion</span>
              <span className="text-sm font-bold text-blue-600">{getCompletionPercentage()}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getCompletionPercentage()}%` }}
              />
            </div>
          </div>
          
          {/* Section Navigation */}
          <div className="space-y-2">
            {builderSections.map((section) => {
              const Icon = section.icon;
              const isCompleted = section.id === 'personal' ? 
                cvData.personalInfo.firstName && cvData.personalInfo.lastName && cvData.personalInfo.email && cvData.personalInfo.phone :
                section.id === 'summary' ? cvData.professionalSummary :
                section.id === 'experience' ? cvData.workExperience.length > 0 :
                section.id === 'education' ? cvData.education.length > 0 :
                section.id === 'skills' ? cvData.skills.length > 0 :
                false;
              
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">{section.label}</div>
                    {section.required && (
                      <div className="text-xs opacity-75">Required</div>
                    )}
                  </div>
                  {isCompleted && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={saveCvData}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save CV
            </button>
            
            <button
              onClick={loadCvData}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Load Saved
            </button>
            
            <button
              onClick={exportToPdf}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="lg:col-span-3">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
          {activeSection === 'personal' && renderPersonalInfo()}
          {activeSection === 'summary' && renderProfessionalSummary()}
          {activeSection === 'experience' && renderWorkExperience()}
          {activeSection === 'education' && renderEducation()}
          {activeSection === 'skills' && renderSkills()}
          {activeSection === 'certifications' && (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Certifications</h3>
              <p className="text-slate-600 dark:text-slate-400">Add your professional certifications and licenses</p>
              <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Coming Soon
              </button>
            </div>
          )}
          {activeSection === 'projects' && (
            <div className="text-center py-8">
              <Globe className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Projects</h3>
              <p className="text-slate-600 dark:text-slate-400">Showcase your key projects and achievements</p>
              <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Coming Soon
              </button>
            </div>
          )}
          {activeSection === 'languages' && (
            <div className="text-center py-8">
              <Globe className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Languages</h3>
              <p className="text-slate-600 dark:text-slate-400">Add languages you speak and your proficiency level</p>
              <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Coming Soon
              </button>
            </div>
          )}
          {activeSection === 'awards' && (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Awards & Honors</h3>
              <p className="text-slate-600 dark:text-slate-400">Highlight your achievements and recognition</p>
              <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Coming Soon
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            CV Analysis & Builder
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            AI-powered resume optimization and professional CV building tools
          </p>
        </motion.div>

        {/* Mode Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <motion.button
                key={mode.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveMode(mode.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeMode === mode.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {mode.label}
              </motion.button>
            );
          })}
        </div>

        {/* Content */}
        <motion.div
          key={activeMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeMode === 'builder' && renderBuilder()}
          {activeMode === 'templates' && renderTemplates()}
          {activeMode === 'analysis' && renderAnalysis()}
        </motion.div>
      </div>
    </div>
  );
}