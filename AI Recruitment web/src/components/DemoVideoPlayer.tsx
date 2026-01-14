import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Maximize,
  Search,
  Target,
  MessageSquare,
  BarChart3,
  Users,
  FileText,
  Calendar,
  Settings,
  Star,
  TrendingUp,
  Brain,
  Zap,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface DemoVideoPlayerProps {
  onClose: () => void;
  onLogin: () => void;
}

interface DemoScene {
  id: string;
  title: string;
  description: string;
  duration: number;
  component: React.ReactNode;
}

export function DemoVideoPlayer({ onClose, onLogin }: DemoVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);

  const demoScenes: DemoScene[] = [
    {
      id: 'dashboard',
      title: 'Smart Dashboard Overview',
      description: 'See your recruitment metrics at a glance',
      duration: 4000,
      component: <DashboardDemo />
    },
    {
      id: 'cv-analysis',
      title: 'AI-Powered CV Analysis',
      description: 'Intelligent resume screening and scoring',
      duration: 5000,
      component: <CVAnalysisDemo />
    },
    {
      id: 'candidate-matching',
      title: 'Smart Candidate Matching',
      description: 'Find perfect candidates with AI matching',
      duration: 4500,
      component: <CandidateMatchingDemo />
    },
    {
      id: 'interview-prep',
      title: 'Interview Preparation Studio',
      description: 'AI-assisted interview preparation',
      duration: 4000,
      component: <InterviewPrepDemo />
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics',
      description: 'Data-driven hiring insights',
      duration: 3500,
      component: <AnalyticsDemo />
    }
  ];

  const totalDuration = demoScenes.reduce((sum, scene) => sum + scene.duration, 0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setSceneProgress(prev => {
          const newProgress = prev + 50;
          const currentSceneDuration = demoScenes[currentScene].duration;
          
          if (newProgress >= currentSceneDuration) {
            if (currentScene < demoScenes.length - 1) {
              setCurrentScene(prev => prev + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return currentSceneDuration;
            }
          }
          return newProgress;
        });
        
        setProgress(prev => {
          const newProgress = prev + (50 / totalDuration) * 100;
          return Math.min(newProgress, 100);
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentScene, totalDuration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSceneChange = (sceneIndex: number) => {
    setCurrentScene(sceneIndex);
    setSceneProgress(0);
    
    // Calculate progress based on completed scenes
    const completedDuration = demoScenes.slice(0, sceneIndex).reduce((sum, scene) => sum + scene.duration, 0);
    setProgress((completedDuration / totalDuration) * 100);
  };

  const handleRestart = () => {
    setCurrentScene(0);
    setProgress(0);
    setSceneProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
        {/* Video Content */}
        <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {demoScenes[currentScene].component}
            </motion.div>
          </AnimatePresence>

          {/* Scene Info Overlay */}
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
            <h3 className="font-bold text-lg">{demoScenes[currentScene].title}</h3>
            <p className="text-sm text-gray-300">{demoScenes[currentScene].description}</p>
          </div>

          {/* Progress Indicator */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-2 text-white">
            <div className="text-sm">
              {currentScene + 1} / {demoScenes.length}
            </div>
          </div>
        </div>

        {/* Video Controls */}
        <div className="bg-black/90 p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleSceneChange(Math.max(0, currentScene - 1))}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                disabled={currentScene === 0}
              >
                <SkipBack className="w-5 h-5 text-white" />
              </button>
              
              <button
                onClick={handlePlayPause}
                className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </button>
              
              <button
                onClick={() => handleSceneChange(Math.min(demoScenes.length - 1, currentScene + 1))}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                disabled={currentScene === demoScenes.length - 1}
              >
                <SkipForward className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={handleRestart}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <span className="text-white text-sm">Restart</span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-white" />
                <div className="w-20 bg-gray-700 rounded-full h-1">
                  <div className="bg-white h-1 rounded-full w-3/4" />
                </div>
              </div>
              
              <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <Maximize className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scene Navigation */}
      <div className="grid grid-cols-5 gap-3">
        {demoScenes.map((scene, index) => (
          <motion.button
            key={scene.id}
            onClick={() => handleSceneChange(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-3 rounded-lg text-left transition-all ${
              currentScene === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="font-semibold text-sm mb-1">{scene.title}</div>
            <div className="text-xs opacity-75">{scene.description}</div>
          </motion.button>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Transform Your Hiring?</h3>
        <p className="text-gray-600 mb-4">Join thousands of companies using SmartHireAI</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogin}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Start Free Trial
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-all"
          >
            Close Demo
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Demo Scene Components
function DashboardDemo() {
  return (
    <div className="p-8 h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        {[
          { icon: Users, label: 'Active Jobs', value: '24', color: 'from-blue-500 to-cyan-500' },
          { icon: FileText, label: 'Applications', value: '1,247', color: 'from-purple-500 to-pink-500' },
          { icon: CheckCircle, label: 'Hired', value: '89', color: 'from-green-500 to-emerald-500' },
          { icon: TrendingUp, label: 'Success Rate', value: '94%', color: 'from-orange-500 to-red-500' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-blue-200 text-sm">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function CVAnalysisDemo() {
  return (
    <div className="p-8 h-full bg-gradient-to-br from-purple-900 to-slate-900">
      <div className="grid grid-cols-2 gap-8 h-full">
        {/* CV Upload */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <FileText className="w-12 h-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Resume Analysis</h3>
            <p className="text-blue-200 mb-4">AI analyzing candidate profile...</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Skills Match</span>
                <span className="text-green-400">95%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div 
                  className="bg-green-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '95%' }}
                  transition={{ duration: 2 }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Analysis Results */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            {[
              { label: 'Experience Level', value: 'Senior (5+ years)', color: 'text-green-400' },
              { label: 'Technical Skills', value: 'Excellent Match', color: 'text-blue-400' },
              { label: 'Cultural Fit', value: '92% Compatible', color: 'text-purple-400' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{item.label}</span>
                  <span className={`font-semibold ${item.color}`}>{item.value}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CandidateMatchingDemo() {
  return (
    <div className="p-8 h-full bg-gradient-to-br from-green-900 to-slate-900">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Target className="w-12 h-12 text-white" />
          </motion.div>
          
          <h3 className="text-3xl font-bold text-white mb-4">Finding Perfect Matches</h3>
          <p className="text-green-200 mb-8">AI analyzing 10,000+ candidate profiles...</p>
          
          <div className="grid grid-cols-3 gap-4 max-w-2xl">
            {[
              { name: 'Sarah Chen', match: '98%', role: 'Senior Developer' },
              { name: 'Mike Johnson', match: '95%', role: 'Full Stack Engineer' },
              { name: 'Lisa Wang', match: '92%', role: 'Tech Lead' }
            ].map((candidate, index) => (
              <motion.div
                key={candidate.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">{candidate.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="text-white font-semibold text-sm">{candidate.name}</div>
                <div className="text-gray-300 text-xs mb-2">{candidate.role}</div>
                <div className="text-green-400 font-bold">{candidate.match} Match</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InterviewPrepDemo() {
  return (
    <div className="p-8 h-full bg-gradient-to-br from-orange-900 to-slate-900">
      <div className="grid grid-cols-2 gap-8 h-full">
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <MessageSquare className="w-12 h-12 text-orange-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">AI Interview Assistant</h3>
            <div className="space-y-3">
              <div className="bg-blue-600/20 rounded-lg p-3">
                <p className="text-blue-200 text-sm">"Tell me about your experience with React?"</p>
              </div>
              <div className="bg-green-600/20 rounded-lg p-3 ml-8">
                <p className="text-green-200 text-sm">"I have 5 years of experience building scalable React applications..."</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <Brain className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Real-time Analysis</h3>
            <div className="space-y-3">
              {[
                { metric: 'Confidence Level', value: '85%', color: 'bg-green-500' },
                { metric: 'Technical Accuracy', value: '92%', color: 'bg-blue-500' },
                { metric: 'Communication', value: '88%', color: 'bg-purple-500' }
              ].map((item, index) => (
                <div key={item.metric} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{item.metric}</span>
                    <span className="text-white font-semibold">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className={`${item.color} h-2 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: item.value }}
                      transition={{ delay: 1 + index * 0.2, duration: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsDemo() {
  return (
    <div className="p-8 h-full bg-gradient-to-br from-cyan-900 to-slate-900">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <BarChart3 className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-white mb-2">Hiring Analytics</h3>
          <p className="text-cyan-200">Data-driven insights for better decisions</p>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <h4 className="text-lg font-bold text-white mb-4">Hiring Funnel</h4>
          <div className="space-y-3">
            {[
              { stage: 'Applications', count: 1247, width: '100%' },
              { stage: 'Screened', count: 324, width: '75%' },
              { stage: 'Interviewed', count: 89, width: '50%' },
              { stage: 'Hired', count: 23, width: '25%' }
            ].map((item, index) => (
              <div key={item.stage} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{item.stage}</span>
                  <span className="text-white font-semibold">{item.count}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className="bg-cyan-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: item.width }}
                    transition={{ delay: 1 + index * 0.2, duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <h4 className="text-lg font-bold text-white mb-4">Key Metrics</h4>
          <div className="space-y-4">
            {[
              { label: 'Time to Hire', value: '12 days', trend: '↓ 40%' },
              { label: 'Cost per Hire', value: '$2,400', trend: '↓ 35%' },
              { label: 'Quality Score', value: '9.2/10', trend: '↑ 15%' }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.2 }}
                className="flex justify-between items-center"
              >
                <div>
                  <div className="text-gray-300 text-sm">{metric.label}</div>
                  <div className="text-white font-bold text-lg">{metric.value}</div>
                </div>
                <div className="text-green-400 font-semibold text-sm">{metric.trend}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}