import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, Sparkles, TrendingUp, Award, AlertCircle, CheckCircle, Download, RefreshCw } from 'lucide-react';
import { MLCVAnalysis } from './MLCVAnalysis';

export function CVAnalysis({ user }: { user: any }) {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showMLAnalysis, setShowMLAnalysis] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setShowMLAnalysis(true);
    }, 2000);
  };

  const analysisResults = {
    overallScore: 87,
    categories: [
      { name: 'ATS Compatibility', score: 92, icon: CheckCircle, color: 'text-green-400' },
      { name: 'Skills Match', score: 85, icon: Award, color: 'text-cyan-400' },
      { name: 'Experience Level', score: 88, icon: TrendingUp, color: 'text-purple-400' },
      { name: 'Keyword Optimization', score: 84, icon: Sparkles, color: 'text-pink-400' },
    ],
    improvements: [
      { text: 'Add 3 more technical skills from job descriptions', priority: 'high' },
      { text: 'Include quantifiable achievements in work experience', priority: 'high' },
      { text: 'Optimize for ATS by using standard section headings', priority: 'medium' },
      { text: 'Add a professional summary section', priority: 'medium' },
      { text: 'Include relevant certifications', priority: 'low' },
    ],
    keywords: {
      present: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Git', 'Agile'],
      missing: ['Docker', 'Kubernetes', 'CI/CD', 'Testing', 'AWS']
    }
  };

  return (
    <div className="min-h-screen p-8" style={{ perspective: '1500px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header with 3D depth */}
        <motion.div
          initial={{ opacity: 0, z: -50 }}
          animate={{ opacity: 1, z: 0 }}
          transition={{ duration: 0.8 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <h1 
            className="text-4xl font-bold text-white mb-2"
            style={{ 
              textShadow: '0 10px 30px rgba(0, 229, 255, 0.5), 0 0 60px rgba(181, 55, 242, 0.3)',
              transform: 'translateZ(40px)'
            }}
          >
            CV Analysis
          </h1>
          <p className="text-gray-400" style={{ transform: 'translateZ(30px)' }}>
            AI-powered resume optimization and scoring
          </p>
        </motion.div>

        {/* Upload Section with 3D card */}
        {!analysisComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* 3D layered card */}
            <div className="relative">
              {/* Back layer */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl"
                style={{ transform: 'translateZ(-40px)', opacity: 0.5 }}
              />
              
              {/* Front card */}
              <div 
                className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-12 border border-white/10"
                style={{
                  transform: 'translateZ(0px)',
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4), inset 0 0 60px rgba(255, 255, 255, 0.05)'
                }}
              >
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-12 transition-all ${
                    dragActive
                      ? 'border-cyan-400 bg-cyan-400/10 scale-105'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: dragActive ? 'translateZ(30px)' : 'translateZ(10px)',
                    boxShadow: dragActive 
                      ? '0 20px 60px rgba(0, 229, 255, 0.3), inset 0 0 40px rgba(0, 229, 255, 0.1)'
                      : 'inset 0 2px 10px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <input
                    type="file"
                    onChange={handleFileInput}
                    accept=".pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isAnalyzing}
                  />

                  <div className="flex flex-col items-center text-center" style={{ transformStyle: 'preserve-3d' }}>
                    {isAnalyzing ? (
                      <>
                        <motion.div
                          animate={{ 
                            rotateY: [0, 360],
                            rotateX: [0, 360]
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="mb-6"
                          style={{ 
                            transformStyle: 'preserve-3d',
                            transform: 'translateZ(40px)',
                            filter: 'drop-shadow(0 0 40px rgba(0, 229, 255, 0.8))'
                          }}
                        >
                          <Sparkles className="w-16 h-16 text-cyan-400" />
                        </motion.div>
                        <h3 
                          className="text-2xl font-bold text-white mb-2"
                          style={{ 
                            transform: 'translateZ(30px)',
                            textShadow: '0 5px 20px rgba(0, 0, 0, 0.5)'
                          }}
                        >
                          Analyzing Your CV...
                        </h3>
                        <p className="text-gray-400 mb-6" style={{ transform: 'translateZ(20px)' }}>
                          Our AI is processing your resume
                        </p>
                        <div className="w-full max-w-md" style={{ transform: 'translateZ(15px)' }}>
                          <div 
                            className="h-3 bg-white/10 rounded-full overflow-hidden"
                            style={{ boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)' }}
                          >
                            <motion.div
                              initial={{ width: '0%', x: '-100%' }}
                              animate={{ width: '100%', x: '0%' }}
                              transition={{ duration: 3 }}
                              className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                              style={{
                                boxShadow: '0 0 30px rgba(0, 229, 255, 0.8)'
                              }}
                            />
                          </div>
                          {/* Particle effects during analysis */}
                          {[...Array(12)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                              initial={{ 
                                x: '50%',
                                y: '50%',
                                opacity: 0,
                                scale: 0
                              }}
                              animate={{
                                x: `${50 + Math.cos(i * Math.PI / 6) * 150}%`,
                                y: `${50 + Math.sin(i * Math.PI / 6) * 150}%`,
                                opacity: [0, 1, 0],
                                scale: [0, 2, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.1
                              }}
                              style={{ boxShadow: '0 0 20px currentColor' }}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <motion.div
                          whileHover={{ 
                            scale: 1.1,
                            rotateY: 10,
                            rotateX: 10
                          }}
                          style={{ 
                            transformStyle: 'preserve-3d',
                            transform: 'translateZ(40px)'
                          }}
                        >
                          <Upload 
                            className="w-16 h-16 text-gray-400 mb-6"
                            style={{ filter: 'drop-shadow(0 10px 30px rgba(0, 229, 255, 0.3))' }}
                          />
                        </motion.div>
                        <h3 
                          className="text-2xl font-bold text-white mb-2"
                          style={{ 
                            transform: 'translateZ(30px)',
                            textShadow: '0 5px 20px rgba(0, 0, 0, 0.5)'
                          }}
                        >
                          {file ? file.name : 'Upload Your Resume'}
                        </h3>
                        <p className="text-gray-400 mb-2" style={{ transform: 'translateZ(20px)' }}>
                          Drag and drop your file here, or click to browse
                        </p>
                        <p className="text-sm text-gray-500" style={{ transform: 'translateZ(15px)' }}>
                          Supported formats: PDF, DOC, DOCX
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analysis Results with 3D cards */}
        <AnimatePresence>
          {analysisComplete && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="space-y-6"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Overall Score Card with 3D circular gauge */}
              <motion.div 
                className="relative"
                initial={{ rotateX: -20 }}
                animate={{ rotateX: 0 }}
                transition={{ duration: 0.8 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Back layers */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl"
                  style={{ transform: 'translateZ(-40px)' }}
                />
                
                {/* Main card */}
                <div 
                  className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
                  style={{
                    transform: 'translateZ(0px)',
                    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4), inset 0 0 60px rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <div style={{ transform: 'translateZ(20px)' }}>
                      <h2 
                        className="text-2xl font-bold text-white mb-2"
                        style={{ textShadow: '0 5px 20px rgba(0, 229, 255, 0.4)' }}
                      >
                        Analysis Results
                      </h2>
                      <p className="text-gray-400">AI-generated insights and recommendations</p>
                    </div>
                    <div className="flex gap-3" style={{ transform: 'translateZ(20px)' }}>
                      <motion.button
                        whileHover={{ scale: 1.05, z: 10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setAnalysisComplete(false)}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white flex items-center gap-2 transition-all"
                        style={{ boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)' }}
                      >
                        <RefreshCw className="w-4 h-4" />
                        Re-analyze
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, z: 10 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white flex items-center gap-2"
                        style={{ boxShadow: '0 10px 30px rgba(0, 229, 255, 0.4)' }}
                      >
                        <Download className="w-4 h-4" />
                        Download Report
                      </motion.button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 3D Score Circle with depth */}
                    <div className="flex flex-col items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                      <motion.div 
                        className="relative w-48 h-48"
                        style={{ transform: 'translateZ(40px)' }}
                        whileHover={{
                          scale: 1.1,
                          rotateY: 15,
                          transition: { duration: 0.3 }
                        }}
                      >
                        {/* Glow layers */}
                        <div 
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 blur-2xl opacity-50"
                          style={{ transform: 'translateZ(-30px)' }}
                        />
                        <div 
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 blur-xl opacity-30"
                          style={{ transform: 'translateZ(-20px)' }}
                        />
                        
                        <svg className="w-full h-full -rotate-90" style={{ transform: 'translateZ(0px)' }}>
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#00E5FF" />
                              <stop offset="50%" stopColor="#B537F2" />
                              <stop offset="100%" stopColor="#FF006E" />
                            </linearGradient>
                            <filter id="glow">
                              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="16"
                            fill="none"
                          />
                          <motion.circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="url(#gradient)"
                            strokeWidth="16"
                            fill="none"
                            strokeLinecap="round"
                            filter="url(#glow)"
                            initial={{ strokeDasharray: "0 552" }}
                            animate={{ strokeDasharray: `${(analysisResults.overallScore / 100) * 552} 552` }}
                            transition={{ duration: 2, ease: "easeOut" }}
                          />
                        </svg>
                        <div 
                          className="absolute inset-0 flex flex-col items-center justify-center"
                          style={{ transform: 'translateZ(20px)' }}
                        >
                          <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-5xl font-bold text-white"
                            style={{ textShadow: '0 0 40px rgba(0, 229, 255, 0.8), 0 10px 30px rgba(0, 0, 0, 0.5)' }}
                          >
                            {analysisResults.overallScore}
                          </motion.span>
                          <span className="text-gray-400">Overall Score</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Category Scores with 3D bars */}
                    <div className="lg:col-span-2 space-y-4" style={{ transformStyle: 'preserve-3d' }}>
                      {analysisResults.categories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                          <motion.div
                            key={category.name}
                            initial={{ opacity: 0, x: 50, rotateY: -10 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            transition={{ delay: index * 0.15, type: 'spring' }}
                            whileHover={{
                              x: 10,
                              scale: 1.02,
                              transition: { duration: 0.2 }
                            }}
                            className="flex items-center gap-4"
                            style={{
                              transformStyle: 'preserve-3d',
                              transform: `translateZ(${20 + index * 5}px)`
                            }}
                          >
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0`}
                              style={{
                                transform: 'translateZ(15px)',
                                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 229, 255, 0.2)'
                              }}
                            >
                              <Icon className={`w-5 h-5 ${category.color}`} style={{ filter: 'drop-shadow(0 0 10px currentColor)' }} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-2">
                                <span 
                                  className="text-white font-semibold"
                                  style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
                                >
                                  {category.name}
                                </span>
                                <span className={category.color}>{category.score}%</span>
                              </div>
                              <div 
                                className="h-3 bg-white/10 rounded-full overflow-hidden"
                                style={{ 
                                  boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)',
                                  transform: 'translateZ(5px)'
                                }}
                              >
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${category.score}%` }}
                                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                                  style={{
                                    boxShadow: '0 0 20px rgba(0, 229, 255, 0.6)'
                                  }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Improvements and Keywords with 3D cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ transformStyle: 'preserve-3d' }}>
                {/* Improvements card */}
                <motion.div
                  initial={{ opacity: 0, x: -50, rotateY: 10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl blur-xl"
                    style={{ transform: 'translateZ(-20px)' }}
                  />
                  <div 
                    className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                    style={{
                      transform: 'translateZ(0px)',
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <h3 
                      className="text-xl font-bold text-white mb-4 flex items-center gap-2"
                      style={{ 
                        transform: 'translateZ(15px)',
                        textShadow: '0 3px 15px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      <AlertCircle 
                        className="w-5 h-5 text-orange-400"
                        style={{ filter: 'drop-shadow(0 0 15px currentColor)' }}
                      />
                      Improvement Suggestions
                    </h3>
                    <div className="space-y-3">
                      {analysisResults.improvements.map((improvement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{
                            x: 5,
                            scale: 1.02,
                            transition: { duration: 0.2 }
                          }}
                          className="flex items-start gap-3 p-3 bg-white/5 rounded-lg"
                          style={{
                            transform: `translateZ(${10 + index * 3}px)`,
                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
                          }}
                        >
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            improvement.priority === 'high'
                              ? 'bg-red-500/20 text-red-400'
                              : improvement.priority === 'medium'
                              ? 'bg-orange-500/20 text-orange-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}
                          style={{ boxShadow: '0 0 15px currentColor' }}
                          >
                            {improvement.priority}
                          </span>
                          <p className="text-gray-300 text-sm flex-1">{improvement.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Keywords card */}
                <motion.div
                  initial={{ opacity: 0, x: 50, rotateY: -10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl"
                    style={{ transform: 'translateZ(-20px)' }}
                  />
                  <div 
                    className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                    style={{
                      transform: 'translateZ(0px)',
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <h3 
                      className="text-xl font-bold text-white mb-4 flex items-center gap-2"
                      style={{ 
                        transform: 'translateZ(15px)',
                        textShadow: '0 3px 15px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      <Sparkles 
                        className="w-5 h-5 text-cyan-400"
                        style={{ filter: 'drop-shadow(0 0 15px currentColor)' }}
                      />
                      Keyword Analysis
                    </h3>
                    <div className="space-y-4">
                      <div style={{ transform: 'translateZ(10px)' }}>
                        <p className="text-sm text-gray-400 mb-2">Present Keywords</p>
                        <div className="flex flex-wrap gap-2">
                          {analysisResults.keywords.present.map((keyword, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{
                                scale: 1.1,
                                y: -3,
                                transition: { duration: 0.2 }
                              }}
                              className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm"
                              style={{
                                boxShadow: '0 0 20px rgba(0, 255, 160, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)',
                                transform: 'translateZ(5px)'
                              }}
                            >
                              {keyword}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      <div style={{ transform: 'translateZ(10px)' }}>
                        <p className="text-sm text-gray-400 mb-2">Missing Keywords</p>
                        <div className="flex flex-wrap gap-2">
                          {analysisResults.keywords.missing.map((keyword, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{
                                scale: 1.1,
                                y: -3,
                                transition: { duration: 0.2 }
                              }}
                              className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm"
                              style={{
                                boxShadow: '0 0 20px rgba(255, 0, 110, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)',
                                transform: 'translateZ(5px)'
                              }}
                            >
                              {keyword}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ML Analysis Section */}
        {showMLAnalysis && file && (
          <MLCVAnalysis resumeFile={file} />
        )}
      </motion.div>
    </div>
  );
}