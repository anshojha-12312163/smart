import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, Eye, EyeOff, Shield, Brain, Star, BarChart3, TrendingUp, Chrome, Linkedin, Github, Upload, FileText, CheckCircle, User } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: any) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [eyeBlink, setEyeBlink] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const blinkInterval = setInterval(() => {
        setEyeBlink(true);
        setTimeout(() => setEyeBlink(false), 150);
      }, 4000);
      return () => clearInterval(blinkInterval);
    }
  }, [isOpen]);

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
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or DOC file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    setResumeFile(file);
    
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onLogin({
        name: mode === 'signup' ? name : 'Alex Johnson',
        email: email || 'alex@example.com',
        avatar: '👤',
        tier: 'premium',
        hasResume: mode === 'signup' && !!resumeFile
      });
    }, 2000);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      onLogin({
        name: provider === 'google' ? 'John Doe' : provider === 'linkedin' ? 'Jane Smith' : 'Alex Developer',
        email: `user@${provider}.com`,
        avatar: provider === 'google' ? '👨‍💼' : provider === 'linkedin' ? '👩‍💼' : '👨‍💻',
        tier: 'premium',
        provider: provider
      });
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Mini floating cards */}
          {[
            { avatar: '👨‍💼', rating: 4.9, left: '10%', top: '15%' },
            { avatar: '👩‍💻', rating: 4.8, left: '85%', top: '20%' },
            { avatar: '👨‍🔬', rating: 5.0, left: '15%', top: '70%' },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10"
              style={{ left: card.left, top: card.top, width: '120px' }}
              animate={{
                y: [0, -15, 0],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-lg">
                  {card.avatar}
                </div>
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-white text-xs">{card.rating}</span>
              </div>
            </motion.div>
          ))}

          {/* Mini charts */}
          <motion.div
            className="absolute top-[35%] left-[8%] bg-white/5 backdrop-blur-xl rounded-lg p-3 border border-white/10"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ width: '100px' }}
          >
            <BarChart3 className="w-4 h-4 text-cyan-400 mb-2" />
            <div className="flex items-end gap-1 h-10">
              {[60, 80, 55, 90].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0, 229, 255, 0.3) transparent'
          }}
        >
          {/* Multiple depth layers */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-3xl" style={{ transform: 'translateZ(-80px)', opacity: 0.6 }} />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-purple-500/15 rounded-3xl blur-2xl" style={{ transform: 'translateZ(-40px)', opacity: 0.8 }} />
            
            {/* Main card */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-10 border border-white/20"
              style={{
                boxShadow: `
                  0 40px 100px rgba(0, 0, 0, 0.7),
                  inset 0 0 80px rgba(255, 255, 255, 0.05),
                  0 0 100px rgba(0, 229, 255, 0.3)
                `,
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10 z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 20px rgba(0, 229, 255, 0.8)' }} />
              <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-purple-400" style={{ boxShadow: '0 0 20px rgba(181, 55, 242, 0.8)' }} />

              {/* Logo */}
              <div className="flex justify-center mb-6">
                <motion.div 
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 flex items-center justify-center relative overflow-hidden">
                    <Brain className="w-10 h-10 text-white relative z-10" />
                    <Shield className="w-8 h-8 text-white/30 absolute" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </div>
                </motion.div>
              </div>

              <div className="text-center mb-6">
                <motion.h1 
                  className="text-3xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #00E5FF 0%, #00E5FF 50%, #B537F2 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  SmartHire AI
                </motion.h1>
                <p className="text-cyan-400 text-sm">
                  {mode === 'login' ? 'Welcome Back! 👋' : 'Join Us Today! 🚀'}
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-xl">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                    mode === 'login'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                    mode === 'signup'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <motion.button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  <Chrome className="w-5 h-5 text-blue-600" />
                  Continue with Google
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => handleSocialLogin('linkedin')}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#0077B5] hover:bg-[#006399] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  <Linkedin className="w-5 h-5" />
                  Continue with LinkedIn
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => handleSocialLogin('github')}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#24292e] hover:bg-[#1a1e22] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  <Github className="w-5 h-5" />
                  Continue with GitHub
                </motion.button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-gray-400">Or continue with email</span>
                </div>
              </div>

              {/* Login/Signup Form */}
              <AnimatePresence mode="wait">
                <motion.form
                  key={mode}
                  initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Name Field (Signup only) */}
                  {mode === 'signup' && (
                    <div className="relative">
                      <AnimatePresence>
                        {(nameFocused || name) && (
                          <motion.label
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            className="absolute -top-2 left-4 px-2 bg-gradient-to-r from-[#0A1628] to-[#006B8F] text-xs text-cyan-400 z-10"
                          >
                            Full Name
                          </motion.label>
                        )}
                      </AnimatePresence>
                      <div className="relative">
                        <User 
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all" 
                          style={{ 
                            color: nameFocused ? '#00E5FF' : 'rgba(255, 255, 255, 0.4)',
                            filter: nameFocused ? 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.8))' : 'none',
                          }}
                        />
                        <input
                          type="text"
                          placeholder={!nameFocused && !name ? 'Enter your full name' : ''}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onFocus={() => setNameFocused(true)}
                          onBlur={() => setNameFocused(false)}
                          required={mode === 'signup'}
                          className="w-full bg-white/5 border-2 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all"
                          style={{
                            borderColor: nameFocused ? '#00E5FF' : 'rgba(255, 255, 255, 0.15)',
                            boxShadow: nameFocused 
                              ? '0 0 20px rgba(0, 229, 255, 0.4), inset 0 2px 10px rgba(0, 0, 0, 0.3)' 
                              : 'inset 0 2px 10px rgba(0, 0, 0, 0.3)',
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="relative">
                    <AnimatePresence>
                      {(emailFocused || email) && (
                        <motion.label
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          className="absolute -top-2 left-4 px-2 bg-gradient-to-r from-[#0A1628] to-[#006B8F] text-xs text-cyan-400 z-10"
                        >
                          Email
                        </motion.label>
                      )}
                    </AnimatePresence>
                    <div className="relative">
                      <Mail 
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all" 
                        style={{ 
                          color: emailFocused ? '#00E5FF' : 'rgba(255, 255, 255, 0.4)',
                          filter: emailFocused ? 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.8))' : 'none',
                        }}
                      />
                      <input
                        type="email"
                        placeholder={!emailFocused && !email ? 'Enter your email' : ''}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        required
                        className="w-full bg-white/5 border-2 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all"
                        style={{
                          borderColor: emailFocused ? '#00E5FF' : 'rgba(255, 255, 255, 0.15)',
                          boxShadow: emailFocused 
                            ? '0 0 20px rgba(0, 229, 255, 0.4), inset 0 2px 10px rgba(0, 0, 0, 0.3)' 
                            : 'inset 0 2px 10px rgba(0, 0, 0, 0.3)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <AnimatePresence>
                      {(passwordFocused || password) && (
                        <motion.label
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          className="absolute -top-2 left-4 px-2 bg-gradient-to-r from-[#0A1628] to-[#006B8F] text-xs text-cyan-400 z-10"
                        >
                          Password
                        </motion.label>
                      )}
                    </AnimatePresence>
                    <div className="relative">
                      <Lock 
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all" 
                        style={{ 
                          color: passwordFocused ? '#00E5FF' : 'rgba(255, 255, 255, 0.4)',
                          filter: passwordFocused ? 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.8))' : 'none',
                        }}
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={!passwordFocused && !password ? 'Enter your password' : ''}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        required
                        className="w-full bg-white/5 border-2 rounded-xl py-4 pl-12 pr-12 text-white placeholder-gray-500 outline-none transition-all"
                        style={{
                          borderColor: passwordFocused ? '#00E5FF' : 'rgba(255, 255, 255, 0.15)',
                          boxShadow: passwordFocused 
                            ? '0 0 20px rgba(0, 229, 255, 0.4), inset 0 2px 10px rgba(0, 0, 0, 0.3)' 
                            : 'inset 0 2px 10px rgba(0, 0, 0, 0.3)',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Resume Upload (Signup only) */}
                  {mode === 'signup' && (
                    <div className="relative">
                      <p className="text-sm text-gray-400 mb-2">Upload Resume (Optional)</p>
                      <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`relative border-2 border-dashed rounded-xl p-6 transition-all ${
                          dragActive
                            ? 'border-cyan-400 bg-cyan-400/10 scale-105'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <input
                          type="file"
                          onChange={handleFileInput}
                          accept=".pdf,.doc,.docx"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />

                        {!resumeFile ? (
                          <div className="flex flex-col items-center text-center">
                            <Upload className="w-10 h-10 text-cyan-400 mb-3" />
                            <p className="text-white text-sm mb-1">
                              Drag & drop your resume here
                            </p>
                            <p className="text-gray-500 text-xs">
                              or click to browse (PDF, DOC, DOCX - Max 5MB)
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-semibold truncate">
                                  {resumeFile.name}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {(resumeFile.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                              {uploadProgress === 100 && (
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                              )}
                            </div>

                            {uploadProgress < 100 && (
                              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${uploadProgress}%` }}
                                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                                  style={{ boxShadow: '0 0 10px rgba(0, 229, 255, 0.6)' }}
                                />
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setResumeFile(null);
                                setUploadProgress(0);
                              }}
                              className="text-xs text-red-400 hover:text-red-300 transition-colors"
                            >
                              Remove file
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Remember & Forgot (Login only) */}
                  {mode === 'login' && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-5 h-5 bg-white/5 border-2 border-white/20 rounded peer-checked:bg-gradient-to-r peer-checked:from-cyan-400 peer-checked:to-purple-400 peer-checked:border-cyan-400 transition-all" />
                          <svg className="absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">Remember Me</span>
                      </label>
                      <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors hover:underline">
                        Forgot Password?
                      </a>
                    </div>
                  )}

                  {/* Terms (Signup only) */}
                  {mode === 'signup' && (
                    <div className="text-xs text-gray-400 text-center">
                      By signing up, you agree to our{' '}
                      <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">Privacy Policy</a>
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full py-4 rounded-xl font-semibold text-lg text-white overflow-hidden disabled:opacity-70"
                    style={{
                      background: 'linear-gradient(135deg, #00E5FF 0%, #0099FF 100%)',
                      boxShadow: '0 10px 30px rgba(0, 229, 255, 0.4), 0 0 60px rgba(0, 229, 255, 0.2)',
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          {mode === 'login' ? 'Logging in...' : 'Creating account...'}
                        </>
                      ) : (
                        mode === 'login' ? 'Login' : 'Create Account'
                      )}
                    </span>
                  </motion.button>
                </motion.form>
              </AnimatePresence>

              {/* Toggle Mode Link */}
              <p className="text-center text-gray-400 mt-6">
                {mode === 'login' ? (
                  <>
                    New here?{' '}
                    <button
                      onClick={() => setMode('signup')}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold hover:underline"
                    >
                      Create Account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => setMode('login')}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold hover:underline"
                    >
                      Login
                    </button>
                  </>
                )}
              </p>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Shield className="w-3 h-3" />
                  <span>Secured by 256-bit encryption</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}