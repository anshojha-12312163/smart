import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Sparkles, TrendingUp, Award, AlertCircle, CheckCircle2, Target, Zap, BarChart3, BookOpen, Lightbulb, Star } from 'lucide-react';

interface SkillAnalysis {
  name: string;
  proficiency: number;
  demand: number;
  category: string;
}

interface ResumeAnalysis {
  overallScore: number;
  skills: SkillAnalysis[];
  strengths: string[];
  improvements: string[];
  keywordMatch: number;
  experienceLevel: string;
  salaryPrediction: { min: number; max: number };
  topRoles: string[];
  industryFit: { industry: string; score: number }[];
  aiSuggestions: string[];
}

interface AIResumeAnalyzerProps {
  resumeFile?: File | null;
  onAnalysisComplete?: (analysis: ResumeAnalysis) => void;
}

export function AIResumeAnalyzer({ resumeFile, onAnalysisComplete }: AIResumeAnalyzerProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [currentStep, setCurrentStep] = useState('');

  useEffect(() => {
    if (resumeFile) {
      performAIAnalysis();
    }
  }, [resumeFile]);

  const performAIAnalysis = async () => {
    setAnalyzing(true);
    setProgress(0);
    
    const steps = [
      { name: 'Extracting text from resume...', duration: 800 },
      { name: 'Analyzing skills with NLP...', duration: 1200 },
      { name: 'Running ML matching algorithm...', duration: 1000 },
      { name: 'Predicting salary range...', duration: 900 },
      { name: 'Generating AI recommendations...', duration: 1100 },
    ];

    let currentProgress = 0;
    for (const step of steps) {
      setCurrentStep(step.name);
      await new Promise(resolve => setTimeout(resolve, step.duration));
      currentProgress += 100 / steps.length;
      setProgress(Math.min(currentProgress, 100));
    }

    // Simulate ML analysis results
    const mockAnalysis: ResumeAnalysis = {
      overallScore: 87,
      skills: [
        { name: 'JavaScript', proficiency: 92, demand: 95, category: 'Programming' },
        { name: 'React', proficiency: 88, demand: 90, category: 'Framework' },
        { name: 'TypeScript', proficiency: 85, demand: 88, category: 'Programming' },
        { name: 'Python', proficiency: 78, demand: 93, category: 'Programming' },
        { name: 'Machine Learning', proficiency: 72, demand: 96, category: 'AI/ML' },
        { name: 'Node.js', proficiency: 80, demand: 85, category: 'Backend' },
        { name: 'SQL', proficiency: 75, demand: 82, category: 'Database' },
        { name: 'AWS', proficiency: 70, demand: 89, category: 'Cloud' },
      ],
      strengths: [
        'Strong technical foundation in modern web technologies',
        'Demonstrated leadership in managing cross-functional teams',
        'Excellent problem-solving skills with data-driven approach',
        'Active contributor to open-source projects'
      ],
      improvements: [
        'Consider adding cloud certifications (AWS/Azure)',
        'Quantify achievements with metrics (e.g., "increased performance by 40%")',
        'Add more recent projects from the last 6 months',
        'Include soft skills like communication and collaboration'
      ],
      keywordMatch: 78,
      experienceLevel: 'Senior',
      salaryPrediction: { min: 95000, max: 135000 },
      topRoles: [
        'Senior Full Stack Developer',
        'Frontend Engineering Lead',
        'Technical Architect',
        'ML Engineer'
      ],
      industryFit: [
        { industry: 'Technology', score: 94 },
        { industry: 'FinTech', score: 86 },
        { industry: 'Healthcare Tech', score: 79 },
        { industry: 'E-commerce', score: 82 }
      ],
      aiSuggestions: [
        'Your ML skills are in high demand! Consider highlighting AI/ML projects more prominently.',
        'Strong React experience - perfect timing as demand is up 23% this quarter.',
        'Cloud skills gap detected. AWS certification could increase your market value by 15-20%.',
        'Consider reordering your experience section to lead with most recent achievements.'
      ]
    };

    setAnalysis(mockAnalysis);
    setAnalyzing(false);
    onAnalysisComplete?.(mockAnalysis);
  };

  if (analyzing) {
    return (
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-6"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 flex items-center justify-center relative">
              <Brain className="w-10 h-10 text-white" />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-white/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-2">AI Analysis in Progress</h3>
          <p className="text-cyan-400 mb-6">{currentStep}</p>

          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              style={{ boxShadow: '0 0 20px rgba(0, 229, 255, 0.8)' }}
            />
          </div>
          <p className="text-white text-sm">{Math.round(progress)}% Complete</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Overall Score */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl" />
        
        <div className="relative flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">AI Resume Score</h3>
            <p className="text-gray-400">Based on ML analysis of 10,000+ successful applications</p>
          </div>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="relative"
            >
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 352" }}
                  animate={{ strokeDasharray: `${(analysis.overallScore / 100) * 352} 352` }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#B537F2" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">{analysis.overallScore}</div>
                  <div className="text-xs text-gray-400">out of 100</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Salary Prediction */}
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Salary Prediction</h4>
              <p className="text-xs text-gray-400">ML-powered estimate</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            ${(analysis.salaryPrediction.min / 1000).toFixed(0)}K - ${(analysis.salaryPrediction.max / 1000).toFixed(0)}K
          </div>
          <p className="text-sm text-gray-400">Based on your skills, experience, and market data</p>
        </div>

        {/* Experience Level */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Experience Level</h4>
              <p className="text-xs text-gray-400">AI-detected seniority</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{analysis.experienceLevel}</div>
          <p className="text-sm text-gray-400">Keyword match: {analysis.keywordMatch}%</p>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white">Skill Proficiency vs Market Demand</h4>
            <p className="text-sm text-gray-400">AI-extracted from resume content</p>
          </div>
        </div>

        <div className="space-y-4">
          {analysis.skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">{skill.name}</span>
                <span className="text-xs text-gray-400">{skill.category}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Your Level</span>
                    <span className="text-cyan-400">{skill.proficiency}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Market Demand</span>
                    <span className="text-purple-400">{skill.demand}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.demand}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top Matching Roles */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-xl font-bold text-white">AI-Recommended Roles</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {analysis.topRoles.map((role, idx) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-cyan-400" />
                <span className="text-white text-sm font-semibold">{role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Industry Fit */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-xl font-bold text-white">Industry Compatibility Score</h4>
        </div>
        <div className="space-y-3">
          {analysis.industryFit.map((industry, idx) => (
            <div key={industry.industry}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">{industry.industry}</span>
                <span className="text-cyan-400 font-semibold">{industry.score}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${industry.score}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-bold text-white">Key Strengths</h4>
          </div>
          <ul className="space-y-3">
            {analysis.strengths.map((strength, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-2 text-sm text-gray-300"
              >
                <Zap className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>{strength}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-bold text-white">Areas to Improve</h4>
          </div>
          <ul className="space-y-3">
            {analysis.improvements.map((improvement, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-2 text-sm text-gray-300"
              >
                <Lightbulb className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>{improvement}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white">AI-Powered Suggestions</h4>
            <p className="text-sm text-gray-400">Personalized insights based on current market trends</p>
          </div>
        </div>
        <div className="space-y-3">
          {analysis.aiSuggestions.map((suggestion, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 rounded-lg p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all"
            >
              <p className="text-white text-sm">{suggestion}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
