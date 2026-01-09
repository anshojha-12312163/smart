import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Video,
  Mic,
  Square,
  Play,
  Pause,
  SkipForward,
  Camera,
  MicOff,
  VideoOff,
  BarChart3,
  TrendingUp,
  Eye,
  Clock,
  Zap,
  CheckCircle,
  AlertTriangle,
  Activity,
  Award,
  Target,
  Brain,
  Volume2,
  Users,
  FileText,
  Download,
  RotateCcw,
  Settings,
  X
} from 'lucide-react';

interface AnalyticsData {
  speakingPace: number; // WPM
  confidenceLevel: number; // percentage
  eyeContact: number; // percentage
  fillerWords: number; // count
  postureScore: number; // percentage
  toneEnthusiasm: number; // percentage
  answerLength: number; // seconds
  aiReady: boolean;
}

interface SessionReport {
  date: Date;
  duration: number;
  questionsAnswered: number;
  averageScore: number;
  analytics: AnalyticsData;
  strengths: string[];
  improvements: string[];
}

export function EnhancedInterviewPrep() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Real-time analytics
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    speakingPace: 0,
    confidenceLevel: 0,
    eyeContact: 0,
    fillerWords: 0,
    postureScore: 0,
    toneEnthusiasm: 0,
    answerLength: 0,
    aiReady: false,
  });

  const [sessions, setSessions] = useState<SessionReport[]>([
    {
      date: new Date(Date.now() - 86400000),
      duration: 1245,
      questionsAnswered: 5,
      averageScore: 78,
      analytics: {
        speakingPace: 138,
        confidenceLevel: 75,
        eyeContact: 82,
        fillerWords: 8,
        postureScore: 88,
        toneEnthusiasm: 71,
        answerLength: 125,
        aiReady: true,
      },
      strengths: ['Clear communication', 'Good examples', 'Strong eye contact'],
      improvements: ['Reduce filler words', 'Improve speaking pace', 'More enthusiasm'],
    },
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const questions = [
    "Tell me about yourself and your background.",
    "What are your greatest strengths?",
    "Describe a challenging project you worked on.",
    "Where do you see yourself in 5 years?",
    "Why should we hire you?",
  ];

  // Simulate real-time analytics updates
  useEffect(() => {
    if (isRecording && !isPaused) {
      const interval = setInterval(() => {
        setAnalytics({
          speakingPace: 140 + Math.floor(Math.random() * 20),
          confidenceLevel: 70 + Math.floor(Math.random() * 25),
          eyeContact: 80 + Math.floor(Math.random() * 15),
          fillerWords: Math.floor(Math.random() * 5),
          postureScore: 85 + Math.floor(Math.random() * 12),
          toneEnthusiasm: 75 + Math.floor(Math.random() * 20),
          answerLength: sessionTime,
          aiReady: true,
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isRecording, isPaused, sessionTime]);

  // Session timer
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, isPaused]);

  const toggleCamera = async () => {
    try {
      if (!isCameraOn) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: isMicOn,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setIsCameraOn(true);
      } else {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        setStream(null);
        setIsCameraOn(false);
      }
    } catch (error) {
      console.error('Camera error:', error);
    }
  };

  const toggleMic = async () => {
    try {
      if (!isMicOn) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: isCameraOn,
          audio: true,
        });
        setStream(mediaStream);
        setIsMicOn(true);
      } else {
        if (stream) {
          stream.getAudioTracks().forEach(track => track.stop());
        }
        setIsMicOn(false);
      }
    } catch (error) {
      console.error('Microphone error:', error);
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setSessionTime(0);
    } else {
      setIsRecording(false);
      setShowReport(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number, optimal: number) => {
    const diff = Math.abs(score - optimal);
    if (diff <= 10) return '#22c55e'; // green
    if (diff <= 20) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div className="min-h-screen p-8" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
    }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)',
              }}>
              <Video className="w-6 h-6 text-white" />
            </div>
            AI Mock Interview with Real-Time Analytics
          </h1>
          <p className="text-gray-400">Practice interviews with live performance feedback and detailed analytics</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl overflow-hidden backdrop-blur-xl border shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 58, 138, 0.9) 100%)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="relative aspect-video bg-slate-900/50">
                {isCameraOn ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-500">Camera is off</p>
                    </div>
                  </div>
                )}

                {/* Recording Indicator */}
                {isRecording && !isPaused && (
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-md"
                    style={{
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.5)',
                    }}
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-white font-semibold text-sm">RECORDING</span>
                  </motion.div>
                )}

                {/* AI Ready Indicator */}
                {analytics.aiReady && isRecording && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-md"
                    style={{
                      background: 'rgba(34, 197, 94, 0.2)',
                      border: '1px solid rgba(34, 197, 94, 0.5)',
                    }}
                  >
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-semibold text-sm">AI Ready</span>
                  </motion.div>
                )}

                {/* Timer */}
                <div className="absolute bottom-4 left-4 px-4 py-2 rounded-lg backdrop-blur-md"
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span className="text-white font-mono font-bold">{formatTime(sessionTime)}</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="p-6 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleCamera}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        isCameraOn ? 'bg-gradient-to-br from-cyan-500 to-blue-600' : 'bg-white/10'
                      }`}
                      style={isCameraOn ? {
                        boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)',
                      } : {}}
                    >
                      {isCameraOn ? (
                        <Camera className="w-5 h-5 text-white" />
                      ) : (
                        <VideoOff className="w-5 h-5 text-gray-400" />
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleMic}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        isMicOn ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-white/10'
                      }`}
                      style={isMicOn ? {
                        boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)',
                      } : {}}
                    >
                      {isMicOn ? (
                        <Mic className="w-5 h-5 text-white" />
                      ) : (
                        <MicOff className="w-5 h-5 text-gray-400" />
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleRecording}
                      disabled={!isCameraOn || !isMicOn}
                      className="px-6 h-12 rounded-xl flex items-center gap-2 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: isRecording 
                          ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                          : 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                        boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)',
                      }}
                    >
                      {isRecording ? (
                        <>
                          <Square className="w-5 h-5" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          Start Interview
                        </>
                      )}
                    </motion.button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSettings(true)}
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all"
                  >
                    <Settings className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>

                {/* Current Question */}
                {isRecording && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl backdrop-blur-sm"
                    style={{
                      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400">
                            Question {currentQuestion + 1}/{questions.length}
                          </span>
                          <span className="text-xs text-gray-500">Answer Length: {formatTime(analytics.answerLength)}</span>
                        </div>
                        <p className="text-white font-medium">{questions[currentQuestion]}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentQuestion(prev => (prev + 1) % questions.length)}
                        className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all flex items-center gap-2 text-sm text-gray-300"
                      >
                        <SkipForward className="w-4 h-4" />
                        Next
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Performance History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-6 backdrop-blur-xl border"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 58, 138, 0.9) 100%)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                Practice Session History
              </h3>
              <div className="space-y-3">
                {sessions.map((session, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 4 }}
                    className="p-4 rounded-xl backdrop-blur-sm border cursor-pointer"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">{session.date.toLocaleDateString()}</span>
                      <span className="text-cyan-400 font-bold">{session.averageScore}% Score</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3 text-xs">
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="text-white font-semibold">{formatTime(session.duration)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Questions</p>
                        <p className="text-white font-semibold">{session.questionsAnswered}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Confidence</p>
                        <p className="text-white font-semibold">{session.analytics.confidenceLevel}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Eye Contact</p>
                        <p className="text-white font-semibold">{session.analytics.eyeContact}%</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Real-Time Analytics Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl p-6 backdrop-blur-xl border sticky top-8"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 58, 138, 0.9) 100%)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Live Performance Metrics
              </h3>

              <div className="space-y-5">
                {/* Speaking Pace */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm text-gray-300">Speaking Pace</span>
                    </div>
                    <span className="font-bold text-white">{analytics.speakingPace} WPM</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min((analytics.speakingPace / 160) * 100, 100)}%`,
                        background: `linear-gradient(90deg, ${getScoreColor(analytics.speakingPace, 150)} 0%, ${getScoreColor(analytics.speakingPace, 150)} 100%)`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((analytics.speakingPace / 160) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Ideal: 140-160 WPM</p>
                </div>

                {/* Confidence Level */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-300">Confidence Level</span>
                    </div>
                    <span className="font-bold text-white">{analytics.confidenceLevel}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        width: `${analytics.confidenceLevel}%`,
                        background: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${analytics.confidenceLevel}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Target: 70%+</p>
                </div>

                {/* Eye Contact */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-pink-400" />
                      <span className="text-sm text-gray-300">Eye Contact</span>
                    </div>
                    <span className="font-bold text-white">{analytics.eyeContact}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        width: `${analytics.eyeContact}%`,
                        background: 'linear-gradient(90deg, #ec4899 0%, #f472b6 100%)',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${analytics.eyeContact}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Target: 80%+</p>
                </div>

                {/* Filler Words */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-300">Filler Words</span>
                    </div>
                    <span className="font-bold text-white">{analytics.fillerWords}</span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 h-2 rounded-full"
                        style={{
                          background: i < analytics.fillerWords
                            ? 'linear-gradient(90deg, #eab308 0%, #facc15 100%)'
                            : 'rgba(255, 255, 255, 0.1)',
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">um, uh, like, you know</p>
                </div>

                {/* Posture Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-300">Posture & Body Language</span>
                    </div>
                    <span className="font-bold text-white">{analytics.postureScore}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        width: `${analytics.postureScore}%`,
                        background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${analytics.postureScore}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Professional positioning detected</p>
                </div>

                {/* Tone & Enthusiasm */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-400" />
                      <span className="text-sm text-gray-300">Tone & Enthusiasm</span>
                    </div>
                    <span className="font-bold text-white">{analytics.toneEnthusiasm}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        width: `${analytics.toneEnthusiasm}%`,
                        background: 'linear-gradient(90deg, #f97316 0%, #fb923c 100%)',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${analytics.toneEnthusiasm}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Voice energy and variation</p>
                </div>
              </div>

              {/* Quick Tips */}
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                  }}
                >
                  <div className="flex items-start gap-2">
                    <Brain className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">AI Tip</h4>
                      <p className="text-xs text-gray-300">
                        {analytics.fillerWords > 3 
                          ? "Try to reduce filler words. Pause instead of saying 'um' or 'uh'."
                          : analytics.speakingPace > 160
                          ? "You're speaking a bit fast. Take a breath and slow down."
                          : "Great job! Maintain this pace and confidence level."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* View Report Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowReport(true)}
                className="w-full mt-6 px-4 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                  boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)',
                }}
              >
                <FileText className="w-5 h-5" />
                View Detailed Report
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Session Report Modal */}
      <AnimatePresence>
        {showReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReport(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-xl border shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 58, 138, 0.98) 100%)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              {/* Report content would go here */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Award className="w-8 h-8 text-cyan-400" />
                    Interview Performance Report
                  </h2>
                  <button
                    onClick={() => setShowReport(false)}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="p-6 rounded-xl backdrop-blur-sm"
                    style={{
                      background: 'rgba(6, 182, 212, 0.1)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                    }}>
                    <h3 className="text-lg font-bold text-white mb-4">Strengths</h3>
                    <ul className="space-y-2">
                      {sessions[0].strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-xl backdrop-blur-sm"
                    style={{
                      background: 'rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                    }}>
                    <h3 className="text-lg font-bold text-white mb-4">Areas to Improve</h3>
                    <ul className="space-y-2">
                      {sessions[0].improvements.map((improvement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                          <TrendingUp className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                    }}
                  >
                    <Download className="w-5 h-5" />
                    Download PDF Report
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Practice Again
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
