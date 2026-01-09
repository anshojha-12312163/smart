import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Video, 
  Mic, 
  MessageSquare, 
  Target, 
  TrendingUp,
  Award,
  Clock,
  Zap,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  ThumbsUp,
  ThumbsDown,
  VideoOff,
  MicOff,
  Camera,
  Info,
  Shield,
  X,
  Settings,
  MonitorPlay,
  Square,
  Eye,
  Activity,
  BarChart3
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  aiTip: string;
}

interface Answer {
  questionId: number;
  response: string;
  score: number;
  feedback: string[];
  strengths: string[];
  improvements: string[];
}

export function InterviewPrep() {
  const [activeTab, setActiveTab] = useState<'practice' | 'feedback' | 'tips'>('practice');
  const [isPracticing, setIsPracticing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionError, setPermissionError] = useState<string>('');
  const [showPermissionHelp, setShowPermissionHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTestMode, setShowTestMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('general');
  const [devices, setDevices] = useState<{ cameras: MediaDeviceInfo[], mics: MediaDeviceInfo[] }>({ cameras: [], mics: [] });
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [selectedMic, setSelectedMic] = useState<string>('');
  const [videoQuality, setVideoQuality] = useState<'720p' | '1080p'>('720p');
  const [bodyLanguageScore, setBodyLanguageScore] = useState(0);
  const [speechClarityScore, setSpeechClarityScore] = useState(0);
  const [confidenceScore, setConfidenceScore] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      text: "Tell me about a challenging project you worked on and how you overcame obstacles.",
      category: "Behavioral",
      difficulty: "Medium",
      aiTip: "Use the STAR method: Situation, Task, Action, Result. Be specific with metrics."
    },
    {
      id: 2,
      text: "Explain how you would optimize a React application's performance.",
      category: "Technical",
      difficulty: "Hard",
      aiTip: "Mention React.memo, useMemo, useCallback, code splitting, and lazy loading."
    },
    {
      id: 3,
      text: "How do you handle disagreements with team members?",
      category: "Behavioral",
      difficulty: "Easy",
      aiTip: "Focus on communication, empathy, and finding win-win solutions."
    },
    {
      id: 4,
      text: "What's your approach to learning new technologies?",
      category: "Growth Mindset",
      difficulty: "Easy",
      aiTip: "Show continuous learning, practical application, and sharing knowledge."
    },
    {
      id: 5,
      text: "Describe your experience with machine learning integration in web applications.",
      category: "Technical",
      difficulty: "Hard",
      aiTip: "Discuss ML APIs, model integration, data processing, and performance considerations."
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const startPractice = () => {
    setIsPracticing(true);
    setCurrentQuestionIndex(0);
    setTimer(0);
    setAnswers([]);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start timer
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      timerIntervalRef.current = interval;
    } else {
      // Generate AI feedback
      generateFeedback();
    }
  };

  const generateFeedback = () => {
    const mockAnswer: Answer = {
      questionId: currentQuestion.id,
      response: "Mock answer response...",
      score: Math.floor(70 + Math.random() * 25),
      feedback: [
        "Strong use of specific examples",
        "Clear communication style",
        "Good structure with STAR method"
      ],
      strengths: [
        "Confident delivery",
        "Relevant technical details",
        "Quantified results"
      ],
      improvements: [
        "Could elaborate more on team collaboration",
        "Add more context about the business impact",
        "Speak slightly slower for clarity"
      ]
    };

    setAnswers([...answers, mockAnswer]);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimer(0);
      setIsRecording(false);
    } else {
      setIsPracticing(false);
      setActiveTab('feedback');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const averageScore = answers.length > 0 
    ? Math.round(answers.reduce((sum, a) => sum + a.score, 0) / answers.length)
    : 0;

  useEffect(() => {
    const currentRef = videoRef.current;
    if (stream && currentRef) {
      currentRef.srcObject = stream;
      currentRef.play();
    }
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [stream]);

  const toggleCamera = async () => {
    if (!isCameraOn) {
      try {
        const constraints: MediaStreamConstraints = {
          video: true,
          audio: isMicOn ? true : false
        };
        
        // Stop existing stream if any
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        
        const newStream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(newStream);
        setIsCameraOn(true);
        setPermissionError(''); // Clear any previous errors
      } catch (error) {
        setPermissionError("Could not access camera. Please ensure you've granted camera permissions in your browser settings.");
        setShowPermissionHelp(true);
      }
    } else {
      // Turn off camera but keep mic if it's on
      if (stream) {
        const videoTracks = stream.getVideoTracks();
        videoTracks.forEach(track => track.stop());
        
        if (isMicOn) {
          // Keep only audio tracks
          const audioTracks = stream.getAudioTracks();
          const newStream = new MediaStream(audioTracks);
          setStream(newStream);
        } else {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
        setIsCameraOn(false);
      }
    }
  };

  const toggleMic = async () => {
    if (!isMicOn) {
      try {
        const constraints: MediaStreamConstraints = {
          video: isCameraOn ? true : false,
          audio: true
        };
        
        // Stop existing stream if any
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        
        const newStream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(newStream);
        setIsMicOn(true);
        setPermissionError(''); // Clear any previous errors
      } catch (error) {
        setPermissionError("Could not access microphone. Please ensure you've granted microphone permissions in your browser settings.");
        setShowPermissionHelp(true);
      }
    } else {
      // Turn off mic but keep camera if it's on
      if (stream) {
        const audioTracks = stream.getAudioTracks();
        audioTracks.forEach(track => track.stop());
        
        if (isCameraOn) {
          // Keep only video tracks
          const videoTracks = stream.getVideoTracks();
          const newStream = new MediaStream(videoTracks);
          setStream(newStream);
        } else {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
        setIsMicOn(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center">
            <Video className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Interview Prep</h2>
            <p className="text-gray-400 text-sm">Practice with AI-powered feedback</p>
          </div>
        </div>
        
        {answers.length > 0 && (
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
            <Award className="w-5 h-5 text-yellow-400" />
            <div>
              <div className="text-xs text-gray-400">Avg Score</div>
              <div className="text-lg font-bold text-white">{averageScore}%</div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        {[
          { id: 'practice', label: 'Practice', icon: Video },
          { id: 'feedback', label: 'AI Feedback', icon: Brain },
          { id: 'tips', label: 'ML Tips', icon: Sparkles },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Practice Tab */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {!isPracticing ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-12 border border-white/20 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Start Interview Practice</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Practice common interview questions with AI-powered analysis. Get instant feedback on your answers.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                {[
                  { icon: Brain, label: 'AI Analysis', value: 'Real-time' },
                  { icon: MessageSquare, label: 'Questions', value: questions.length },
                  { icon: Award, label: 'Skill Level', value: 'Adaptive' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startPractice}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Play className="w-5 h-5 inline mr-2" />
                Start Practice Session
              </motion.button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Video Preview and Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Video Preview */}
                  <div className="space-y-4">
                    <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border-2 border-white/10">
                      {isCameraOn ? (
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                          <Camera className="w-16 h-16 text-gray-600 mb-3" />
                          <p className="text-gray-500 text-sm">Camera Off</p>
                        </div>
                      )}
                      
                      {/* Recording Indicator */}
                      {isRecording && (
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                          <motion.div
                            className="w-2 h-2 bg-white rounded-full"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <span className="text-white text-xs font-semibold">REC</span>
                        </div>
                      )}
                      
                      {/* Audio Level Indicator */}
                      {isMicOn && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                            <div className="flex items-center gap-2">
                              <Mic className="w-4 h-4 text-green-400" />
                              <div className="flex-1 flex gap-1 items-center">
                                {[...Array(10)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="w-full h-2 bg-green-400 rounded-full"
                                    animate={{
                                      opacity: [0.3, 1, 0.3],
                                      scaleY: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                      delay: i * 0.1
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Camera and Mic Controls */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleCamera}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                          isCameraOn 
                            ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' 
                            : 'bg-white/10 text-gray-400 hover:bg-white/20'
                        }`}
                      >
                        {isCameraOn ? (
                          <><Video className="w-5 h-5" /> Camera On</>
                        ) : (
                          <><VideoOff className="w-5 h-5" /> Camera Off</>
                        )}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleMic}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                          isMicOn 
                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                            : 'bg-white/10 text-gray-400 hover:bg-white/20'
                        }`}
                      >
                        {isMicOn ? (
                          <><Mic className="w-5 h-5" /> Mic On</>
                        ) : (
                          <><MicOff className="w-5 h-5" /> Mic Off</>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Setup Tips */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white mb-3">Setup Tips</h3>
                    <div className="space-y-3">
                      {[
                        { icon: Camera, title: "Camera Position", tip: "Position yourself at eye level with good lighting" },
                        { icon: Mic, title: "Audio Quality", tip: "Use a quiet space and test your microphone" },
                        { icon: Brain, title: "AI Analysis", tip: "Our AI will analyze your body language and speech patterns" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                            <p className="text-xs text-gray-400">{item.tip}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Question Card */}
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
              >
                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      currentQuestion.difficulty === 'Easy' ? 'bg-green-400/20 text-green-400 border border-green-400/30' :
                      currentQuestion.difficulty === 'Medium' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' :
                      'bg-red-400/20 text-red-400 border border-red-400/30'
                    }`}>
                      {currentQuestion.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-purple-400/20 text-purple-400 rounded-full text-xs font-semibold border border-purple-400/30">
                      {currentQuestion.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-4 h-4" />
                    <span className="text-lg font-mono font-bold">{formatTime(timer)}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                  />
                </div>

                {/* Question */}
                <div className="bg-white/5 rounded-xl p-6 mb-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{currentQuestion.text}</h3>
                  
                  {/* AI Tip */}
                  <div className="flex items-start gap-3 bg-cyan-400/10 rounded-lg p-4 border border-cyan-400/30">
                    <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-cyan-400 mb-1">AI Tip:</div>
                      <p className="text-sm text-gray-300">{currentQuestion.aiTip}</p>
                    </div>
                  </div>
                </div>

                {/* Recording Controls */}
                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleRecording}
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-gradient-to-br from-cyan-500 to-purple-500'
                    }`}
                  >
                    {isRecording ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Mic className="w-8 h-8 text-white" />
                    )}
                  </motion.button>

                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">
                      {isRecording ? 'Recording...' : 'Click to start recording'}
                    </div>
                    {isRecording && (
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-red-500 rounded-full"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTimer(0)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Retry
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={nextQuestion}
                    disabled={!isRecording && timer === 0}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
                    <CheckCircle className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Real-time Feedback */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-6 border border-green-400/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
                        <ThumbsUp className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-2">AI Feedback Generated</h4>
                        <p className="text-sm text-gray-300">
                          Your answer has been analyzed. Check the Feedback tab for detailed insights!
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <div className="space-y-6">
          {answers.length === 0 ? (
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-12 border border-white/20 text-center">
              <Brain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No feedback available yet. Complete a practice session first!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Overall Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: 'Average Score', value: `${averageScore}%`, icon: Award, color: 'cyan' },
                  { label: 'Questions Answered', value: answers.length, icon: MessageSquare, color: 'purple' },
                  { label: 'Improvement Rate', value: '+12%', icon: TrendingUp, color: 'green' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br from-${stat.color}-400 to-${stat.color}-500 rounded-lg flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-gray-400">{stat.label}</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* Individual Feedback */}
              {answers.map((answer, i) => {
                const question = questions.find(q => q.id === answer.questionId);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-2">{question?.text}</h4>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-purple-400/20 text-purple-400 rounded-full text-xs font-semibold">
                            {question?.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            question?.difficulty === 'Easy' ? 'bg-green-400/20 text-green-400' :
                            question?.difficulty === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
                            'bg-red-400/20 text-red-400'
                          }`}>
                            {question?.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-white mb-1">{answer.score}%</div>
                        <div className="text-xs text-gray-400">AI Score</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Strengths */}
                      <div className="bg-green-400/10 rounded-xl p-4 border border-green-400/30">
                        <div className="flex items-center gap-2 mb-3">
                          <ThumbsUp className="w-4 h-4 text-green-400" />
                          <span className="font-semibold text-green-400">Strengths</span>
                        </div>
                        <ul className="space-y-2">
                          {answer.strengths.map((strength, idx) => (
                            <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Improvements */}
                      <div className="bg-yellow-400/10 rounded-xl p-4 border border-yellow-400/30">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className="w-4 h-4 text-yellow-400" />
                          <span className="font-semibold text-yellow-400">Improvements</span>
                        </div>
                        <ul className="space-y-2">
                          {answer.improvements.map((improvement, idx) => (
                            <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                              <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ML Tips Tab */}
      {activeTab === 'tips' && (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-400/30"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-2">ML-Powered Interview Tips</h3>
                <p className="text-sm text-gray-300">
                  Based on analysis of 100K+ successful interviews, these tips are personalized for your profile.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6">
            {[
              {
                title: "Perfect Your STAR Method",
                description: "Machine learning analysis shows candidates using STAR method score 34% higher",
                tips: [
                  "Situation: Set context in 30 seconds or less",
                  "Task: Clearly define your responsibility",
                  "Action: Describe specific steps you took",
                  "Result: Quantify the impact with metrics"
                ],
                color: "cyan"
              },
              {
                title: "Optimal Response Length",
                description: "AI analysis of top performers: 90-120 seconds per answer",
                tips: [
                  "Too short (<60s): Appears under-prepared",
                  "Sweet spot (90-120s): Comprehensive yet concise",
                  "Too long (>150s): Risk losing interviewer attention",
                  "Practice pacing with our timer"
                ],
                color: "purple"
              },
              {
                title: "Body Language Matters",
                description: "Computer vision analysis shows these behaviors increase success by 28%",
                tips: [
                  "Maintain eye contact 60-70% of the time",
                  "Smile naturally, especially when greeting",
                  "Use hand gestures for emphasis (but don't overdo)",
                  "Sit upright with open posture"
                ],
                color: "green"
              },
              {
                title: "Technical Communication",
                description: "NLP analysis reveals successful tech interviews balance technical depth with clarity",
                tips: [
                  "Start with high-level overview",
                  "Dive into technical details gradually",
                  "Use analogies for complex concepts",
                  "Ask if interviewer wants more depth"
                ],
                color: "blue"
              },
            ].map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-br from-${tip.color}-400 to-${tip.color}-500 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-400">{tip.description}</p>
                  </div>
                </div>

                <ul className="space-y-2 ml-14">
                  {tip.tips.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Permission Error Modal */}
      <AnimatePresence>
        {showPermissionHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowPermissionHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 max-w-lg w-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Permission Required</h3>
                    <p className="text-sm text-gray-400">Camera/Microphone access needed</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPermissionHelp(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-red-500/10 rounded-xl p-4 border border-red-400/30 mb-6">
                <p className="text-sm text-gray-300">
                  {permissionError}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                  <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <p className="font-semibold text-white mb-1">How to enable permissions:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Click the lock icon in your browser's address bar</li>
                      <li>Find Camera and Microphone settings</li>
                      <li>Change permissions to "Allow"</li>
                      <li>Refresh the page and try again</li>
                    </ol>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-cyan-400/10 rounded-lg p-3 border border-cyan-400/30">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <p className="font-semibold text-cyan-400 mb-1">Why we need this:</p>
                    <p>Camera and microphone access allow our AI to provide feedback on your body language, speech clarity, and overall interview performance.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPermissionHelp(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                >
                  I'll Enable It
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowPermissionHelp(false);
                    setPermissionError('');
                  }}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg"
                >
                  Continue Without
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}