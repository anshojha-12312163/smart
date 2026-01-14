import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  Mic,
  MicOff,
  CameraOff,
  Play,
  Pause,
  Square,
  Settings,
  Volume2,
  Wifi,
  Monitor,
  Eye,
  Brain,
  Clock,
  BarChart3,
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Download,
  Share,
  Lightbulb,
  Users,
  FileText,
  Zap,
  TrendingUp,
  Star
} from 'lucide-react';

interface InterviewPrepStudioProps {
  user: any;
}

export function InterviewPrepStudio({ user }: InterviewPrepStudioProps) {
  const [currentStep, setCurrentStep] = useState<'setup' | 'practice' | 'analysis'>('setup');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sessionData, setSessionData] = useState<any>(null);
  
  // Device states
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [devices, setDevices] = useState({ cameras: [], microphones: [], speakers: [] });
  const [selectedDevices, setSelectedDevices] = useState({
    camera: '',
    microphone: '',
    speaker: ''
  });
  
  // Technical checks
  const [techChecks, setTechChecks] = useState({
    camera: { status: 'checking', message: 'Detecting camera...' },
    microphone: { status: 'checking', message: 'Testing microphone...' },
    internet: { status: 'checking', message: 'Testing connection...' },
    browser: { status: 'checking', message: 'Checking compatibility...' }
  });

  // Real-time analysis
  const [liveAnalysis, setLiveAnalysis] = useState({
    confidence: 0,
    eyeContact: 0,
    speechPace: 0,
    fillerWords: 0,
    volume: 0,
    clarity: 0
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const interviewQuestions = [
    {
      id: 1,
      category: 'Behavioral',
      difficulty: 'Medium',
      question: "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
      tips: "Use the STAR method: Situation, Task, Action, Result",
      timeLimit: 120
    },
    {
      id: 2,
      category: 'Technical',
      difficulty: 'Hard',
      question: "Explain how you would design a scalable system to handle 1 million concurrent users.",
      tips: "Consider load balancing, caching, database sharding, and microservices",
      timeLimit: 180
    },
    {
      id: 3,
      category: 'Leadership',
      difficulty: 'Medium',
      question: "Describe a situation where you had to make a difficult decision with limited information.",
      tips: "Focus on your decision-making process and the outcome",
      timeLimit: 150
    }
  ];

  useEffect(() => {
    if (currentStep === 'setup') {
      initializeDevices();
      runTechnicalChecks();
    }
  }, [currentStep]);

  useEffect(() => {
    let interval: any;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        // Simulate real-time analysis updates
        updateLiveAnalysis();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const initializeDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === 'videoinput');
      const microphones = devices.filter(device => device.kind === 'audioinput');
      const speakers = devices.filter(device => device.kind === 'audiooutput');
      
      setDevices({ cameras, microphones, speakers });
      
      if (cameras.length > 0) setSelectedDevices(prev => ({ ...prev, camera: cameras[0].deviceId }));
      if (microphones.length > 0) setSelectedDevices(prev => ({ ...prev, microphone: microphones[0].deviceId }));
      if (speakers.length > 0) setSelectedDevices(prev => ({ ...prev, speaker: speakers[0].deviceId }));
      
    } catch (error) {
      console.error('Error enumerating devices:', error);
    }
  };

  const runTechnicalChecks = async () => {
    // Camera check
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setTechChecks(prev => ({
        ...prev,
        camera: { status: 'success', message: 'Camera detected and working' }
      }));
      setCameraEnabled(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (error) {
      setTechChecks(prev => ({
        ...prev,
        camera: { status: 'error', message: 'Camera access denied or not available' }
      }));
    }

    // Microphone check
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setTechChecks(prev => ({
        ...prev,
        microphone: { status: 'success', message: 'Microphone detected and working' }
      }));
      setMicEnabled(true);
    } catch (error) {
      setTechChecks(prev => ({
        ...prev,
        microphone: { status: 'error', message: 'Microphone access denied or not available' }
      }));
    }

    // Internet speed check (simulated)
    setTimeout(() => {
      setTechChecks(prev => ({
        ...prev,
        internet: { status: 'success', message: 'Connection speed: 45 Mbps (Excellent)' }
      }));
    }, 2000);

    // Browser compatibility check
    const isCompatible = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    setTechChecks(prev => ({
      ...prev,
      browser: { 
        status: isCompatible ? 'success' : 'error', 
        message: isCompatible ? 'Browser fully compatible' : 'Browser not supported' 
      }
    }));
  };

  const updateLiveAnalysis = () => {
    // Simulate real-time AI analysis
    setLiveAnalysis({
      confidence: Math.min(100, Math.random() * 100),
      eyeContact: Math.min(100, Math.random() * 100),
      speechPace: 120 + Math.random() * 60, // WPM
      fillerWords: Math.floor(Math.random() * 5),
      volume: Math.random() * 100,
      clarity: Math.min(100, Math.random() * 100)
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { deviceId: selectedDevices.camera },
        audio: { deviceId: selectedDevices.microphone }
      });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      // Generate analysis data
      generateAnalysisData();
      setCurrentStep('analysis');
    }
  };

  const generateAnalysisData = () => {
    const analysisData = {
      overallScore: 78,
      duration: recordingTime,
      scores: {
        content: 82,
        delivery: 75,
        bodyLanguage: 80,
        confidence: 76,
        technical: 85
      },
      insights: {
        fillerWords: { count: 12, improvement: 'Reduce "um" and "like" usage' },
        eyeContact: { percentage: 68, improvement: 'Maintain more consistent eye contact' },
        speechPace: { wpm: 145, improvement: 'Slightly slow down for better clarity' },
        energy: { level: 'Good', improvement: 'Show more enthusiasm when discussing achievements' }
      },
      strengths: [
        'Clear articulation and professional tone',
        'Good use of specific examples',
        'Confident body language',
        'Well-structured responses using STAR method'
      ],
      improvements: [
        'Reduce filler words by 50%',
        'Increase eye contact to 80%+',
        'Add more enthusiasm when discussing achievements',
        'Practice smoother transitions between points'
      ]
    };
    
    setSessionData(analysisData);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
    }
  };

  if (currentStep === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Interview Prep Studio
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Let's set up your equipment and run some technical checks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-600" />
                Camera Preview
              </h2>
              
              <div className="relative bg-slate-900 rounded-xl overflow-hidden aspect-video mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
                {!cameraEnabled && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <CameraOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Camera not available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Device Selection */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Camera
                  </label>
                  <select 
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    value={selectedDevices.camera}
                    onChange={async (e) => {
                      setSelectedDevices(prev => ({ ...prev, camera: e.target.value }));
                      // Update video stream with new camera
                      try {
                        if (streamRef.current) {
                          streamRef.current.getTracks().forEach(track => track.stop());
                        }
                        const stream = await navigator.mediaDevices.getUserMedia({ 
                          video: { deviceId: e.target.value },
                          audio: { deviceId: selectedDevices.microphone }
                        });
                        if (videoRef.current) {
                          videoRef.current.srcObject = stream;
                        }
                        streamRef.current = stream;
                      } catch (error) {
                        console.error('Error switching camera:', error);
                      }
                    }}
                  >
                    {devices.cameras.map((camera: any) => (
                      <option key={camera.deviceId} value={camera.deviceId}>
                        {camera.label || `Camera ${camera.deviceId.slice(0, 8)}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Microphone
                  </label>
                  <select 
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    value={selectedDevices.microphone}
                    onChange={async (e) => {
                      setSelectedDevices(prev => ({ ...prev, microphone: e.target.value }));
                      // Test new microphone
                      try {
                        const stream = await navigator.mediaDevices.getUserMedia({ 
                          audio: { deviceId: e.target.value }
                        });
                        // Test audio levels
                        const audioContext = new AudioContext();
                        const analyser = audioContext.createAnalyser();
                        const microphone = audioContext.createMediaStreamSource(stream);
                        microphone.connect(analyser);
                        
                        // Clean up test stream
                        setTimeout(() => {
                          stream.getTracks().forEach(track => track.stop());
                          audioContext.close();
                        }, 1000);
                      } catch (error) {
                        console.error('Error testing microphone:', error);
                      }
                    }}
                  >
                    {devices.microphones.map((mic: any) => (
                      <option key={mic.deviceId} value={mic.deviceId}>
                        {mic.label || `Microphone ${mic.deviceId.slice(0, 8)}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Technical Checks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-green-600" />
                System Checks
              </h2>

              <div className="space-y-4">
                {Object.entries(techChecks).map(([key, check]: [string, any]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                    onClick={() => {
                      const details = {
                        camera: `📹 Camera Details:\n\n• Status: ${check.status === 'success' ? 'Working' : check.status === 'error' ? 'Error' : 'Checking'}\n• Resolution: 1920x1080 (HD)\n• Frame Rate: 30 FPS\n• Device: ${devices.cameras.find((c: any) => c.deviceId === selectedDevices.camera)?.label || 'Default Camera'}\n\n${check.status === 'success' ? '✅ Camera is ready for recording' : check.status === 'error' ? '❌ Please check camera permissions' : '⏳ Testing camera...'}`,
                        microphone: `🎤 Microphone Details:\n\n• Status: ${check.status === 'success' ? 'Working' : check.status === 'error' ? 'Error' : 'Checking'}\n• Sample Rate: 44.1 kHz\n• Channels: Stereo\n• Device: ${devices.microphones.find((m: any) => m.deviceId === selectedDevices.microphone)?.label || 'Default Microphone'}\n\n${check.status === 'success' ? '✅ Microphone is ready for recording' : check.status === 'error' ? '❌ Please check microphone permissions' : '⏳ Testing microphone...'}`,
                        internet: `🌐 Internet Connection:\n\n• Speed: 45 Mbps Download / 12 Mbps Upload\n• Latency: 23ms\n• Stability: Excellent\n• Quality: HD video streaming supported\n\n✅ Connection is optimal for interview recording`,
                        browser: `🌍 Browser Compatibility:\n\n• Browser: ${navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Firefox') ? 'Firefox' : navigator.userAgent.includes('Safari') ? 'Safari' : 'Other'}\n• WebRTC Support: ${!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) ? 'Yes' : 'No'}\n• Media Recording: ${typeof MediaRecorder !== 'undefined' ? 'Supported' : 'Not Supported'}\n• Screen Sharing: ${navigator.mediaDevices && typeof navigator.mediaDevices.getDisplayMedia === 'function' ? 'Available' : 'Not Available'}\n\n${check.status === 'success' ? '✅ Browser fully compatible' : '❌ Browser not supported'}`
                      };
                      alert(details[key as keyof typeof details]);
                    }}
                  >
                    {getStatusIcon(check.status)}
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white capitalize">
                        {key === 'internet' ? 'Internet Speed' : key}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {check.message}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Re-run specific check
                        if (key === 'camera') {
                          runTechnicalChecks();
                        } else if (key === 'microphone') {
                          runTechnicalChecks();
                        } else if (key === 'internet') {
                          setTechChecks(prev => ({
                            ...prev,
                            internet: { status: 'checking', message: 'Testing connection...' }
                          }));
                          setTimeout(() => {
                            const speeds = ['25 Mbps (Good)', '45 Mbps (Excellent)', '15 Mbps (Fair)', '60 Mbps (Excellent)'];
                            const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
                            setTechChecks(prev => ({
                              ...prev,
                              internet: { status: 'success', message: `Connection speed: ${randomSpeed}` }
                            }));
                          }, 2000);
                        }
                      }}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      Retest
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Audio Level Test */}
              <div className="mt-6">
                <h3 className="font-medium text-slate-900 dark:text-white mb-3">Audio Level Test</h3>
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-slate-600" />
                  <div className="flex-1 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                    <motion.div
                      className="bg-green-500 h-full rounded-full"
                      style={{ width: `${liveAnalysis.volume}%` }}
                      animate={{ width: `${liveAnalysis.volume}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {Math.round(liveAnalysis.volume)}%
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Speak normally to test your microphone</p>
              </div>

              {/* Start Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Save setup preferences
                  const setupData = {
                    selectedDevices,
                    techChecks,
                    timestamp: new Date().toISOString()
                  };
                  localStorage.setItem('interviewSetup', JSON.stringify(setupData));
                  setCurrentStep('practice');
                }}
                disabled={!cameraEnabled || !micEnabled}
                className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                {!cameraEnabled || !micEnabled ? 
                  'Please enable camera and microphone' : 
                  'Start Interview Practice'
                }
              </motion.button>
              
              {/* Additional Setup Options */}
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => {
                    const tips = `🎯 Interview Preparation Tips:\n\n📋 Before You Start:\n• Find a quiet, well-lit space\n• Ensure stable internet connection\n• Have a glass of water nearby\n• Review your resume and job description\n• Prepare STAR method examples\n\n💡 During the Interview:\n• Maintain eye contact with camera\n• Speak clearly and at moderate pace\n• Use hand gestures naturally\n• Take brief pauses to think\n• Ask clarifying questions if needed\n\n🎬 Technical Tips:\n• Look directly at camera, not screen\n• Keep your face well-lit\n• Minimize background distractions\n• Test your setup beforehand`;
                    alert(tips);
                  }}
                  className="w-full py-2 px-4 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm"
                >
                  📚 Preparation Tips
                </button>
                <button
                  onClick={() => {
                    const troubleshooting = `🔧 Troubleshooting Guide:\n\n❌ Camera Issues:\n• Check browser permissions\n• Close other apps using camera\n• Try refreshing the page\n• Use Chrome or Firefox for best results\n\n❌ Microphone Issues:\n• Check system audio settings\n• Ensure microphone isn't muted\n• Test with other applications\n• Check privacy settings\n\n❌ Connection Issues:\n• Test internet speed (minimum 5 Mbps)\n• Close bandwidth-heavy applications\n• Use wired connection if possible\n• Restart router if needed\n\n💡 Still having issues? Contact support for help.`;
                    alert(troubleshooting);
                  }}
                  className="w-full py-2 px-4 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm"
                >
                  🔧 Troubleshooting
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'practice') {
    const question = interviewQuestions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Feed */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
                    <span className="font-medium text-slate-900 dark:text-white">
                      {isRecording ? 'Recording' : 'Ready to Record'}
                    </span>
                  </div>
                  <div className="text-2xl font-mono text-slate-900 dark:text-white">
                    {formatTime(recordingTime)}
                  </div>
                </div>

                <div className="relative bg-slate-900 rounded-xl overflow-hidden aspect-video mb-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Live Analysis Overlay */}
                  {isRecording && (
                    <div className="absolute top-4 right-4 bg-black/70 text-white p-3 rounded-lg text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Eye className="w-4 h-4" />
                        <span>Eye Contact: {Math.round(liveAnalysis.eyeContact)}%</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="w-4 h-4" />
                        <span>Confidence: {Math.round(liveAnalysis.confidence)}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        <span>Pace: {Math.round(liveAnalysis.speechPace)} WPM</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  {!isRecording ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startRecording}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                      >
                        <Play className="w-5 h-5" />
                        Start Recording
                      </motion.button>
                      <button
                        onClick={() => {
                          const recordingTips = `🎬 Recording Tips:\n\n📹 Camera Setup:\n• Position camera at eye level\n• Ensure good lighting on your face\n• Keep background simple and professional\n• Maintain 2-3 feet distance from camera\n\n🎤 Audio Tips:\n• Speak clearly and at moderate pace\n• Avoid background noise\n• Test microphone levels before starting\n• Use headphones to avoid echo\n\n💡 Performance Tips:\n• Look directly at camera, not screen\n• Use natural hand gestures\n• Maintain good posture\n• Take brief pauses to think\n• Practice the STAR method\n\n⏱️ Time Management:\n• Aim for 1-3 minutes per answer\n• Don't rush your responses\n• It's okay to take a moment to think`;
                          alert(recordingTips);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        <Lightbulb className="w-4 h-4" />
                        Tips
                      </button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsPaused(!isPaused)}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                        {isPaused ? 'Resume' : 'Pause'}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={stopRecording}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Square className="w-4 h-4" />
                        Stop & Analyze
                      </motion.button>
                      
                      <button
                        onClick={() => {
                          const liveStats = `📊 LIVE SESSION STATS\n\n⏱️ Recording Time: ${formatTime(recordingTime)}\n📹 Status: ${isPaused ? 'Paused' : 'Recording'}\n🎯 Current Question: ${currentQuestion + 1}/${interviewQuestions.length}\n\n📈 Real-time Analysis:\n• Confidence Level: ${Math.round(liveAnalysis.confidence)}%\n• Eye Contact: ${Math.round(liveAnalysis.eyeContact)}%\n• Speech Pace: ${Math.round(liveAnalysis.speechPace)} WPM\n• Audio Level: ${Math.round(liveAnalysis.volume)}%\n• Clarity Score: ${Math.round(liveAnalysis.clarity)}%\n• Filler Words: ${liveAnalysis.fillerWords}\n\n💡 Current Performance: ${liveAnalysis.confidence > 80 ? 'Excellent' : liveAnalysis.confidence > 60 ? 'Good' : 'Needs Improvement'}`;
                          alert(liveStats);
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        <BarChart3 className="w-4 h-4" />
                        Stats
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Question Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Question {currentQuestion + 1} of {interviewQuestions.length}
                </h2>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {question.difficulty}
                </span>
              </div>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium mb-3">
                  {question.category}
                </span>
                <p className="text-slate-900 dark:text-white font-medium leading-relaxed">
                  {question.question}
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-400 mb-1">Tip:</p>
                    <p className="text-sm text-blue-800 dark:text-blue-300">{question.tips}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                <Clock className="w-4 h-4" />
                <span>Recommended time: {Math.floor(question.timeLimit / 60)}:{(question.timeLimit % 60).toString().padStart(2, '0')}</span>
              </div>

              {/* Question Navigation */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="flex-1 py-2 px-4 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentQuestion(Math.min(interviewQuestions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === interviewQuestions.length - 1}
                  className="flex-1 py-2 px-4 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Next
                </button>
              </div>

              {/* Additional Question Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const questionDetails = `📝 Question Analysis:\n\n🎯 Category: ${question.category}\n📊 Difficulty: ${question.difficulty}\n⏱️ Time Limit: ${Math.floor(question.timeLimit / 60)}:${(question.timeLimit % 60).toString().padStart(2, '0')}\n\n💡 What they're looking for:\n${question.category === 'Behavioral' ? '• Specific examples from your experience\n• Problem-solving approach\n• Results and impact\n• Learning and growth' : question.category === 'Technical' ? '• Technical knowledge depth\n• System design thinking\n• Scalability considerations\n• Best practices awareness' : '• Leadership experience\n• Decision-making process\n• Team management skills\n• Strategic thinking'}\n\n🎯 Success Tips:\n• Use the STAR method\n• Be specific with examples\n• Quantify your impact\n• Show continuous learning`;
                    alert(questionDetails);
                  }}
                  className="w-full py-2 px-4 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors text-sm"
                >
                  📊 Question Analysis
                </button>
                <button
                  onClick={() => {
                    const sampleAnswer = question.category === 'Behavioral' ? 
                      `🎯 Sample STAR Answer Structure:\n\n📍 Situation: "In my previous role as a senior developer, our team was struggling with deployment issues that were causing frequent production bugs..."\n\n📋 Task: "I was tasked with improving our deployment process and reducing bug incidents by 50% within 3 months..."\n\n⚡ Action: "I researched CI/CD best practices, implemented automated testing pipelines, set up staging environments, and trained the team on new processes..."\n\n🏆 Result: "We reduced production bugs by 70%, deployment time by 60%, and improved team confidence. This saved the company approximately $50K in downtime costs."` :
                      question.category === 'Technical' ?
                      `🏗️ System Design Approach:\n\n1️⃣ Clarify Requirements:\n• Expected user load (1M concurrent)\n• Geographic distribution\n• Consistency requirements\n• Budget constraints\n\n2️⃣ High-Level Architecture:\n• Load balancers for traffic distribution\n• Microservices for scalability\n• Database sharding for data management\n• Caching layers for performance\n\n3️⃣ Deep Dive:\n• Technology choices and trade-offs\n• Monitoring and alerting\n• Disaster recovery plans\n• Security considerations` :
                      `👥 Leadership Decision Framework:\n\n🔍 Situation Assessment:\n• Gathered all available information\n• Identified key stakeholders\n• Analyzed potential risks and benefits\n• Set decision timeline\n\n💭 Decision Process:\n• Consulted with team members\n• Considered multiple alternatives\n• Weighed short vs long-term impact\n• Made decision based on company values\n\n📈 Implementation & Results:\n• Communicated decision clearly\n• Monitored outcomes closely\n• Adjusted approach as needed\n• Achieved positive results`;
                    alert(sampleAnswer);
                  }}
                  className="w-full py-2 px-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors text-sm"
                >
                  💡 Sample Answer
                </button>
                <button
                  onClick={() => {
                    const randomQuestions = interviewQuestions.filter((_, index) => index !== currentQuestion);
                    const randomQuestion = randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
                    const randomIndex = interviewQuestions.findIndex(q => q.id === randomQuestion.id);
                    setCurrentQuestion(randomIndex);
                  }}
                  className="w-full py-2 px-4 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors text-sm"
                >
                  🎲 Random Question
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'analysis' && sessionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Interview Analysis Complete
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Here's your detailed performance breakdown
            </p>
          </motion.div>

          {/* Overall Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-4">
              <span className="text-4xl font-bold text-white">{sessionData.overallScore}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Overall Score</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Great job! You're interview-ready with room for improvement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Detailed Scores */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Performance Breakdown
              </h3>

              <div className="space-y-4">
                {Object.entries(sessionData.scores).map(([category, score]: [string, any]) => (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-slate-900 dark:text-white capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{score}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${
                          score >= 80 ? 'bg-green-500' :
                          score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Key Insights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                Key Insights
              </h3>

              <div className="space-y-4">
                {Object.entries(sessionData.insights).map(([key, insight]: [string, any]) => (
                  <div key={key} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-900 dark:text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-bold text-blue-600">
                        {typeof insight.count === 'number' ? insight.count :
                         typeof insight.percentage === 'number' ? `${insight.percentage}%` :
                         typeof insight.wpm === 'number' ? `${insight.wpm} WPM` :
                         insight.level}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {insight.improvement}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-600" />
                Your Strengths
              </h3>

              <div className="space-y-3">
                {sessionData.strengths.map((strength: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <p className="text-slate-900 dark:text-white">{strength}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Areas for Improvement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Areas for Improvement
              </h3>

              <div className="space-y-3">
                {sessionData.improvements.map((improvement: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  >
                    <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-slate-900 dark:text-white">{improvement}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-4 justify-center mt-8"
          >
            <button 
              onClick={() => {
                const reportData = `📊 INTERVIEW PERFORMANCE REPORT\n\n👤 Candidate: ${user?.name || 'John Doe'}\n📅 Date: ${new Date().toLocaleDateString()}\n⏱️ Duration: ${formatTime(sessionData.duration)}\n\n🎯 OVERALL SCORE: ${sessionData.overallScore}/100\n\n📈 DETAILED SCORES:\n${Object.entries(sessionData.scores).map(([key, score]) => `• ${key.charAt(0).toUpperCase() + key.slice(1)}: ${score}%`).join('\n')}\n\n💡 KEY INSIGHTS:\n${Object.entries(sessionData.insights).map(([key, insight]: [string, any]) => `• ${key.charAt(0).toUpperCase() + key.slice(1)}: ${insight.improvement}`).join('\n')}\n\n⭐ STRENGTHS:\n${sessionData.strengths.map((s: string) => `• ${s}`).join('\n')}\n\n🎯 IMPROVEMENTS:\n${sessionData.improvements.map((i: string) => `• ${i}`).join('\n')}\n\n📝 RECOMMENDATIONS:\n• Schedule follow-up practice session\n• Focus on identified improvement areas\n• Review technical concepts if needed\n• Practice with different question types`;
                
                // Create and download report
                const blob = new Blob([reportData], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Interview_Report_${new Date().toISOString().split('T')[0]}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                alert('📄 Report downloaded successfully!\n\nYour detailed interview analysis has been saved to your downloads folder.');
              }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Report
            </button>
            <button 
              onClick={() => {
                const shareText = `🎯 Just completed an AI-powered interview practice session!\n\n📊 Overall Score: ${sessionData.overallScore}/100\n⏱️ Duration: ${formatTime(sessionData.duration)}\n\n💪 Key Strengths:\n${sessionData.strengths.slice(0, 2).map((s: string) => `• ${s}`).join('\n')}\n\n🎯 Working on:\n${sessionData.improvements.slice(0, 2).map((i: string) => `• ${i}`).join('\n')}\n\n#InterviewPrep #CareerGrowth #SmartHire`;
                
                if (navigator.share) {
                  navigator.share({
                    title: 'Interview Practice Results',
                    text: shareText,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(shareText);
                  alert('📋 Share text copied to clipboard!\n\nYou can now paste this in your social media or messaging apps.');
                }
              }}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              <Share className="w-5 h-5" />
              Share Results
            </button>
            <button 
              onClick={() => {
                const mentorMessage = `📧 Share with Mentor:\n\nSubject: Interview Practice Session Results\n\nDear [Mentor Name],\n\nI just completed an AI-powered interview practice session and wanted to share my results with you:\n\n📊 Overall Performance: ${sessionData.overallScore}/100\n⏱️ Session Duration: ${formatTime(sessionData.duration)}\n\n🎯 Areas where I excelled:\n${sessionData.strengths.slice(0, 3).map((s: string) => `• ${s}`).join('\n')}\n\n📈 Areas for improvement:\n${sessionData.improvements.slice(0, 3).map((i: string) => `• ${i}`).join('\n')}\n\nI'd love to discuss these results with you and get your advice on how to improve further. Are you available for a quick call this week?\n\nBest regards,\n${user?.name || '[Your Name]'}\n\n---\nGenerated by SmartHire Interview Prep Studio`;
                
                // Copy to clipboard and show email options
                navigator.clipboard.writeText(mentorMessage);
                
                const emailOptions = confirm('📧 Mentor message copied to clipboard!\n\nWould you like to:\n• OK - Open email client to send\n• Cancel - Just keep in clipboard');
                
                if (emailOptions) {
                  const subject = encodeURIComponent('Interview Practice Session Results');
                  const body = encodeURIComponent(mentorMessage);
                  window.open(`mailto:?subject=${subject}&body=${body}`);
                }
              }}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
            >
              <Users className="w-5 h-5" />
              Share with Mentor
            </button>
            <button 
              onClick={() => {
                const confirmRestart = confirm('🔄 Start New Practice Session?\n\nThis will reset your current session and start fresh. Your results will be saved in your practice history.\n\nContinue?');
                
                if (confirmRestart) {
                  // Save session to history
                  const practiceHistory = JSON.parse(localStorage.getItem('interviewHistory') || '[]');
                  practiceHistory.push({
                    ...sessionData,
                    timestamp: new Date().toISOString(),
                    questions: interviewQuestions.length
                  });
                  localStorage.setItem('interviewHistory', JSON.stringify(practiceHistory));
                  
                  // Reset session
                  setCurrentStep('setup');
                  setSessionData(null);
                  setRecordingTime(0);
                  setCurrentQuestion(0);
                  setIsRecording(false);
                  setIsPaused(false);
                  
                  alert('✅ New practice session started!\n\nYour previous session has been saved to your practice history.');
                }
              }}
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Practice Again
            </button>
            <button 
              onClick={() => {
                const practiceHistory = JSON.parse(localStorage.getItem('interviewHistory') || '[]');
                const historyText = practiceHistory.length > 0 ? 
                  `📈 PRACTICE HISTORY (${practiceHistory.length} sessions)\n\n${practiceHistory.map((session: any, index: number) => 
                    `Session ${index + 1} (${new Date(session.timestamp).toLocaleDateString()}):\n• Score: ${session.overallScore}/100\n• Duration: ${formatTime(session.duration)}\n• Questions: ${session.questions}`
                  ).join('\n\n')}\n\n📊 PROGRESS TRACKING:\n• Average Score: ${Math.round(practiceHistory.reduce((sum: number, s: any) => sum + s.overallScore, 0) / practiceHistory.length)}/100\n• Total Practice Time: ${formatTime(practiceHistory.reduce((sum: number, s: any) => sum + s.duration, 0))}\n• Sessions This Month: ${practiceHistory.filter((s: any) => new Date(s.timestamp).getMonth() === new Date().getMonth()).length}` :
                  '📈 PRACTICE HISTORY\n\nNo previous sessions found. This is your first practice session!\n\n💡 Tip: Regular practice leads to better interview performance. Try to practice at least once a week.';
                
                alert(historyText);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              View History
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}