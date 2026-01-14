import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  Clock,
  Building,
  Globe,
  Zap,
  Eye,
  Share,
  Save,
  Send,
  ChevronRight,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Star,
  TrendingUp,
  Target,
  Calendar,
  FileText,
  Settings,
  Award
} from 'lucide-react';

interface PostJobPageProps {
  user: any;
}

export function PostJobPage({ user }: PostJobPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [jobData, setJobData] = useState({
    title: '',
    department: '',
    employmentType: 'full-time',
    workplaceType: 'on-site',
    positions: 1,
    category: '',
    seniority: '',
    description: '',
    responsibilities: [''],
    qualifications: [''],
    preferredSkills: [''],
    requiredSkills: [''],
    education: '',
    experience: 0,
    certifications: [''],
    languages: [''],
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    displaySalary: 'public',
    bonus: '',
    equity: false,
    benefits: [],
    location: '',
    remotePolicy: 'no-remote',
    relocation: false,
    travel: 'none',
    deadline: '',
    easyApply: true,
    screeningQuestions: [''],
    visibility: 'public',
    duration: 30
  });

  const [previewMode, setPreviewMode] = useState(false);

  const steps = [
    { id: 1, title: 'Basic Information', icon: Briefcase },
    { id: 2, title: 'Job Description', icon: FileText },
    { id: 3, title: 'Requirements', icon: Target },
    { id: 4, title: 'Compensation', icon: DollarSign },
    { id: 5, title: 'Location & Work', icon: MapPin },
    { id: 6, title: 'Application Settings', icon: Settings },
    { id: 7, title: 'Review & Publish', icon: Eye }
  ];

  const employmentTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'temporary', label: 'Temporary' },
    { value: 'internship', label: 'Internship' }
  ];

  const workplaceTypes = [
    { value: 'on-site', label: 'On-site', icon: Building },
    { value: 'remote', label: 'Remote', icon: Globe },
    { value: 'hybrid', label: 'Hybrid', icon: Zap }
  ];

  const seniorityLevels = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'lead', label: 'Lead' },
    { value: 'executive', label: 'Executive' }
  ];

  const benefitOptions = [
    'Health Insurance', 'Dental Insurance', 'Vision Insurance',
    '401(k) Matching', 'Stock Options', 'Paid Time Off',
    'Flexible Schedule', 'Work from Home', 'Professional Development',
    'Gym Membership', 'Free Lunch', 'Relocation Assistance',
    'Visa Sponsorship', 'Parental Leave', 'Mental Health Support'
  ];

  const handleInputChange = (field: string, value: any) => {
    setJobData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setJobData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: string) => {
    setJobData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], '']
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setJobData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: any, i: number) => i !== index)
    }));
  };

  const generateJobDescription = () => {
    // AI-powered description generator simulation
    const generatedDescription = `We are seeking a talented ${jobData.title} to join our dynamic team. In this role, you will be responsible for driving innovation and delivering exceptional results in a collaborative environment.

Key Responsibilities:
• Lead and execute strategic initiatives
• Collaborate with cross-functional teams
• Drive continuous improvement and innovation
• Mentor and guide team members
• Ensure high-quality deliverables

What We Offer:
• Competitive compensation package
• Comprehensive benefits
• Professional development opportunities
• Flexible work environment
• Collaborative team culture`;

    setJobData(prev => ({ ...prev, description: generatedDescription }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={jobData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  value={jobData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="e.g., Engineering"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Employment Type *
                </label>
                <select
                  value={jobData.employmentType}
                  onChange={(e) => handleInputChange('employmentType', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  {employmentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Number of Positions
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={jobData.positions}
                  onChange={(e) => handleInputChange('positions', parseInt(e.target.value))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Workplace Type *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {workplaceTypes.map(type => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() => handleInputChange('workplaceType', type.value)}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        jobData.workplaceType === type.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-slate-300 dark:border-slate-600 hover:border-slate-400'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2 text-slate-600 dark:text-slate-400" />
                      <span className="font-medium text-slate-900 dark:text-white">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Seniority Level
              </label>
              <select
                value={jobData.seniority}
                onChange={(e) => handleInputChange('seniority', e.target.value)}
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="">Select seniority level</option>
                {seniorityLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Job Description</h2>
              <button
                onClick={generateJobDescription}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Zap className="w-4 h-4" />
                AI Generate
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Job Description *
              </label>
              <textarea
                rows={12}
                value={jobData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
              />
              <p className="text-sm text-slate-500 mt-2">
                {jobData.description.length} characters (recommended: 500-2000)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Key Responsibilities
              </label>
              {jobData.responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                    className="flex-1 p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="Enter a key responsibility"
                  />
                  {jobData.responsibilities.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('responsibilities', index)}
                      className="p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem('responsibilities')}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Responsibility
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Requirements</h2>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Required Skills *
              </label>
              {jobData.requiredSkills.map((skill, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleArrayChange('requiredSkills', index, e.target.value)}
                    className="flex-1 p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="e.g., React, Node.js, TypeScript"
                  />
                  {jobData.requiredSkills.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('requiredSkills', index)}
                      className="p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem('requiredSkills')}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Skill
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Education Level
                </label>
                <select
                  value={jobData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="">No requirement</option>
                  <option value="high-school">High School</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={jobData.experience}
                  onChange={(e) => handleInputChange('experience', parseInt(e.target.value))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Compensation & Benefits</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Minimum Salary
                </label>
                <input
                  type="number"
                  value={jobData.salaryMin}
                  onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="80000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Maximum Salary
                </label>
                <input
                  type="number"
                  value={jobData.salaryMax}
                  onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="120000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Currency
                </label>
                <select
                  value={jobData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Benefits & Perks
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {benefitOptions.map(benefit => (
                  <label key={benefit} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={jobData.benefits.includes(benefit)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleInputChange('benefits', [...jobData.benefits, benefit]);
                        } else {
                          handleInputChange('benefits', jobData.benefits.filter(b => b !== benefit));
                        }
                      }}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{benefit}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Review & Publish</h2>

            {/* Job Preview */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{jobData.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{user?.company || 'Your Company'}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {jobData.location || 'Location not specified'}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {jobData.salaryMin && jobData.salaryMax 
                        ? `${jobData.currency} ${jobData.salaryMin} - ${jobData.salaryMax}`
                        : 'Salary not specified'
                      }
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Just posted
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                    95% match
                  </span>
                  {jobData.easyApply && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Easy Apply
                    </span>
                  )}
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-line">{jobData.description}</p>
              </div>

              {jobData.requiredSkills.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {jobData.requiredSkills.filter(skill => skill.trim()).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {jobData.benefits.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Benefits:</h4>
                  <div className="flex flex-wrap gap-2">
                    {jobData.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Publishing Options */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Publishing Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border border-slate-200 dark:border-slate-600 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Standard</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Free posting</p>
                  <p className="text-xs text-slate-500">~50 applications expected</p>
                </div>

                <div className="text-center p-4 border-2 border-blue-500 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Featured</h4>
                  <p className="text-sm text-blue-600 mb-3">$99 - Top of search</p>
                  <p className="text-xs text-slate-500">~150 applications expected</p>
                </div>

                <div className="text-center p-4 border border-slate-200 dark:border-slate-600 rounded-xl">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Premium</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">$199 - Featured + Promoted</p>
                  <p className="text-xs text-slate-500">~300 applications expected</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Step content not implemented</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Post a New Job
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Find the perfect candidates for your team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 sticky top-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Progress</h3>
              <div className="space-y-3">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : isCompleted
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive
                          ? 'bg-white/20'
                          : isCompleted
                          ? 'bg-green-200 dark:bg-green-800'
                          : 'bg-slate-200 dark:bg-slate-600'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{step.title}</p>
                        <p className="text-xs opacity-75">Step {step.id}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>

                  {currentStep === steps.length ? (
                    <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-blue-700 transition-all flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Publish Job
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}