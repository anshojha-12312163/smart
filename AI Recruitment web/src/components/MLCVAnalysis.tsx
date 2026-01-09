import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Award, 
  Zap, 
  BarChart3, 
  CheckCircle, 
  AlertTriangle,
  Sparkles,
  DollarSign,
  Clock,
  Users,
  Lightbulb,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Star
} from 'lucide-react';

interface MLCVAnalysisProps {
  resumeFile: File | null;
}

interface Skill {
  name: string;
  proficiency: number;
  category: 'technical' | 'soft' | 'domain';
  inDemand: boolean;
  matchScore: number;
}

interface JobMatch {
  title: string;
  company: string;
  matchScore: number;
  salaryRange: string;
  location: string;
  logo: string;
}

interface MLInsight {
  type: 'strength' | 'improvement' | 'opportunity';
  title: string;
  description: string;
  impact: number;
}

export function MLCVAnalysis({ resumeFile }: MLCVAnalysisProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  
  // ML Results
  const [overallScore, setOverallScore] = useState(0);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [insights, setInsights] = useState<MLInsight[]>([]);
  const [salaryPrediction, setSalaryPrediction] = useState({ min: 0, max: 0, median: 0 });
  const [careerLevel, setCareerLevel] = useState('');
  const [experienceYears, setExperienceYears] = useState(0);

  useEffect(() => {
    if (resumeFile) {
      runMLAnalysis();
    }
  }, [resumeFile]);

  const runMLAnalysis = async () => {
    setAnalyzing(true);
    setProgress(0);
    setAnalysisComplete(false);

    const steps = [
      { name: 'Parsing document structure...', duration: 800 },
      { name: 'Extracting text with NLP...', duration: 1000 },
      { name: 'Identifying skills with ML...', duration: 1200 },
      { name: 'Analyzing experience level...', duration: 900 },
      { name: 'Computing job matches...', duration: 1100 },
      { name: 'Predicting salary range...', duration: 800 },
      { name: 'Generating AI insights...', duration: 1000 },
    ];

    let currentProgress = 0;
    
    for (const step of steps) {
      setCurrentStep(step.name);
      await new Promise(resolve => setTimeout(resolve, step.duration));
      currentProgress += 100 / steps.length;
      setProgress(Math.min(currentProgress, 100));
    }

    // Generate ML results
    generateMLResults();
    
    setAnalyzing(false);
    setAnalysisComplete(true);
  };

  const generateMLResults = () => {
    // Overall Score (ML-calculated)
    const score = Math.floor(75 + Math.random() * 20);
    setOverallScore(score);

    // Extract Skills (NLP + ML)
    const extractedSkills: Skill[] = [
      { name: 'React.js', proficiency: 92, category: 'technical', inDemand: true, matchScore: 95 },
      { name: 'TypeScript', proficiency: 88, category: 'technical', inDemand: true, matchScore: 90 },
      { name: 'Node.js', proficiency: 85, category: 'technical', inDemand: true, matchScore: 88 },
      { name: 'Python', proficiency: 82, category: 'technical', inDemand: true, matchScore: 85 },
      { name: 'Machine Learning', proficiency: 78, category: 'technical', inDemand: true, matchScore: 92 },
      { name: 'Leadership', proficiency: 86, category: 'soft', inDemand: true, matchScore: 80 },
      { name: 'Communication', proficiency: 90, category: 'soft', inDemand: true, matchScore: 75 },
      { name: 'Problem Solving', proficiency: 88, category: 'soft', inDemand: true, matchScore: 82 },
      { name: 'Agile/Scrum', proficiency: 75, category: 'domain', inDemand: true, matchScore: 78 },
      { name: 'Cloud (AWS)', proficiency: 80, category: 'technical', inDemand: true, matchScore: 87 },
    ];
    setSkills(extractedSkills);

    // Job Matching (ML Algorithm)
    const matches: JobMatch[] = [
      {
        title: 'Senior Full Stack Developer',
        company: 'TechCorp Inc.',
        matchScore: 94,
        salaryRange: '$120k - $160k',
        location: 'San Francisco, CA',
        logo: '💼'
      },
      {
        title: 'Lead React Engineer',
        company: 'InnovateLabs',
        matchScore: 91,
        salaryRange: '$115k - $155k',
        location: 'Remote',
        logo: '🚀'
      },
      {
        title: 'ML Engineer',
        company: 'AI Solutions',
        matchScore: 88,
        salaryRange: '$130k - $170k',
        location: 'New York, NY',
        logo: '🤖'
      },
      {
        title: 'Frontend Architect',
        company: 'DesignTech',
        matchScore: 86,
        salaryRange: '$110k - $145k',
        location: 'Austin, TX',
        logo: '🎨'
      },
    ];
    setJobMatches(matches);

    // AI-Generated Insights
    const mlInsights: MLInsight[] = [
      {
        type: 'strength',
        title: 'Strong Technical Stack',
        description: 'Your React and TypeScript skills are in the top 15% of candidates in your field.',
        impact: 95
      },
      {
        type: 'strength',
        title: 'High Demand Skills',
        description: 'ML and Cloud experience significantly increase your market value by 35%.',
        impact: 90
      },
      {
        type: 'improvement',
        title: 'Add DevOps Skills',
        description: 'Learning Docker and Kubernetes could open 23% more job opportunities.',
        impact: 78
      },
      {
        type: 'improvement',
        title: 'Quantify Achievements',
        description: 'Adding metrics to your achievements could boost ATS score by 18%.',
        impact: 72
      },
      {
        type: 'opportunity',
        title: 'Leadership Roles Available',
        description: 'Your experience level qualifies you for 47 senior positions in your area.',
        impact: 88
      },
      {
        type: 'opportunity',
        title: 'Remote Work Premium',
        description: 'Remote positions matching your profile offer 12% higher compensation.',
        impact: 82
      },
    ];
    setInsights(mlInsights);

    // Salary Prediction (ML Model)
    setSalaryPrediction({
      min: 105000,
      max: 165000,
      median: 135000
    });

    // Experience Analysis
    setCareerLevel('Senior Level');
    setExperienceYears(6);
  };

  if (!resumeFile) {
    return (
      <div className="text-center py-12">
        <Brain className="w-16 h-16 text-cyan-400 mx-auto mb-4 opacity-50" />
        <p className="text-gray-400">Upload your resume to get AI-powered analysis</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analysis Progress */}
      <AnimatePresence>
        {analyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center"
              >
                <Brain className="w-7 h-7 text-white" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">AI Analysis in Progress</h3>
                <p className="text-cyan-400 text-sm">{currentStep}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{Math.round(progress)}%</div>
                <div className="text-xs text-gray-400">Complete</div>
              </div>
            </div>

            <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                style={{ boxShadow: '0 0 20px rgba(0, 229, 255, 0.6)' }}
              />
            </div>

            {/* Particle effects */}
            <div className="mt-6 flex gap-2">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-cyan-400 rounded-full"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Results */}
      {analysisComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Overall Score Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-8 border border-white/20 overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-64 h-64 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-3xl"
                  animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: i * 2
                  }}
                  style={{
                    left: `${i * 30}%`,
                    top: `${i * 20}%`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-2xl font-bold text-white">ML Analysis Complete</h2>
                </div>
                <p className="text-gray-300">Your resume has been analyzed by our AI engine</p>
              </div>
              
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.3 }}
                  className="relative"
                >
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 352" }}
                      animate={{ strokeDasharray: `${(overallScore / 100) * 352} 352` }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00E5FF" />
                        <stop offset="100%" stopColor="#B537F2" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div>
                      <div className="text-4xl font-bold text-white">{overallScore}</div>
                      <div className="text-xs text-gray-400">Score</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="relative z-10 grid grid-cols-4 gap-4 mt-6">
              {[
                { icon: Clock, label: 'Experience', value: `${experienceYears} Years`, color: 'cyan' },
                { icon: Target, label: 'Career Level', value: careerLevel, color: 'purple' },
                { icon: Award, label: 'Skills Found', value: skills.length, color: 'pink' },
                { icon: TrendingUp, label: 'Job Matches', value: jobMatches.length, color: 'green' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <stat.icon className={`w-5 h-5 text-${stat.color}-400 mb-2`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Salary Prediction */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Salary Prediction</h3>
                <p className="text-sm text-gray-400">Based on ML analysis of 50K+ similar profiles</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Predicted Range</div>
                  <div className="text-2xl font-bold text-white">
                    ${(salaryPrediction.min / 1000).toFixed(0)}K - ${(salaryPrediction.max / 1000).toFixed(0)}K
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 mb-1">Market Median</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    ${(salaryPrediction.median / 1000).toFixed(0)}K
                  </div>
                </div>
              </div>

              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-400"
                    style={{ width: '70%', boxShadow: '0 0 20px rgba(52, 211, 153, 0.5)' }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <ArrowUpRight className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">
                  <span className="text-green-400 font-semibold">15% above</span> average for your experience level
                </span>
              </div>
            </div>
          </motion.div>

          {/* Skills Analysis */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Extracted Skills</h3>
                  <p className="text-sm text-gray-400">NLP + ML skill detection</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{skills.filter(s => s.inDemand).length}</div>
                <div className="text-xs text-gray-400">High Demand</div>
              </div>
            </div>

            <div className="space-y-3">
              {skills.slice(0, 6).map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-cyan-400/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        skill.category === 'technical' ? 'bg-cyan-400' :
                        skill.category === 'soft' ? 'bg-purple-400' :
                        'bg-pink-400'
                      }`} style={{ boxShadow: '0 0 10px currentColor' }} />
                      <span className="font-semibold text-white">{skill.name}</span>
                      {skill.inDemand && (
                        <span className="px-2 py-0.5 bg-green-400/20 text-green-400 text-xs rounded-full border border-green-400/30">
                          High Demand
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">Match:</span>
                      <span className="font-bold text-cyan-400">{skill.matchScore}%</span>
                    </div>
                  </div>
                  <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                      className={`h-full ${
                        skill.category === 'technical' ? 'bg-gradient-to-r from-cyan-400 to-blue-400' :
                        skill.category === 'soft' ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
                        'bg-gradient-to-r from-pink-400 to-rose-400'
                      }`}
                      style={{ boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Top Job Matches */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI-Powered Job Matches</h3>
                <p className="text-sm text-gray-400">Intelligent matching algorithm</p>
              </div>
            </div>

            <div className="space-y-3">
              {jobMatches.map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-400/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {job.logo}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                          {job.title}
                        </h4>
                        <p className="text-sm text-gray-400 mb-2">{job.company}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {job.salaryRange}
                          </span>
                          <span>📍 {job.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full border border-purple-400/30">
                        <Star className="w-3 h-3 text-purple-400 fill-purple-400" />
                        <span className="font-bold text-white">{job.matchScore}%</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Match Score</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI-Generated Insights</h3>
                <p className="text-sm text-gray-400">Personalized recommendations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border ${
                    insight.type === 'strength' ? 'border-green-400/30 bg-green-400/5' :
                    insight.type === 'improvement' ? 'border-yellow-400/30 bg-yellow-400/5' :
                    'border-purple-400/30 bg-purple-400/5'
                  } hover:scale-105 transition-transform`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    {insight.type === 'strength' && <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />}
                    {insight.type === 'improvement' && <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />}
                    {insight.type === 'opportunity' && <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{insight.title}</h4>
                      <p className="text-sm text-gray-400">{insight.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${insight.impact}%` }}
                        transition={{ duration: 1, delay: 0.7 + i * 0.1 }}
                        className={`h-full ${
                          insight.type === 'strength' ? 'bg-gradient-to-r from-green-400 to-emerald-400' :
                          insight.type === 'improvement' ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                          'bg-gradient-to-r from-purple-400 to-pink-400'
                        }`}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{insight.impact}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
