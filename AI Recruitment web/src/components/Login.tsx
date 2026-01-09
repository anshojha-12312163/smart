import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, User, BarChart3, TrendingUp, Star, Shield, Brain } from 'lucide-react';

interface LoginProps {
  onLogin: (userData: any) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyeBlink, setEyeBlink] = useState(false);

  useEffect(() => {
    // Eye blink animation
    const blinkInterval = setInterval(() => {
      setEyeBlink(true);
      setTimeout(() => setEyeBlink(false), 150);
    }, 4000);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onLogin({
        name: 'Alex Johnson',
        email: email || 'alex@example.com',
        avatar: '👤',
        tier: 'premium'
      });
    }, 2000);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ 
        background: 'linear-gradient(180deg, #0A1628 0%, #006B8F 100%)',
        perspective: '1500px'
      }}
    >
      {/* Animated star field */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Volumetric light beams */}
      <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none opacity-30">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 left-0 right-0"
            style={{
              background: `linear-gradient(180deg, transparent 0%, rgba(0, 229, 255, 0.1) 50%, transparent 100%)`,
              transform: `rotate(${i * 15 - 30}deg)`,
              transformOrigin: 'bottom center',
              height: '150%',
              width: '100px',
              left: `${i * 20}%`,
              filter: 'blur(40px)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Floating profile cards */}
      {[
        { avatar: '👨‍💼', name: 'John Smith', rating: 4.9, left: '5%', top: '15%', delay: 0 },
        { avatar: '👩‍💻', name: 'Sarah Chen', rating: 4.8, left: '15%', top: '60%', delay: 0.5 },
        { avatar: '👨‍🔬', name: 'Dr. Martinez', rating: 5.0, left: '85%', top: '20%', delay: 1 },
        { avatar: '👩‍🎨', name: 'Emma Wilson', rating: 4.7, left: '80%', top: '65%', delay: 1.5 },
      ].map((card, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
          style={{
            left: card.left,
            top: card.top,
            width: '180px',
            boxShadow: '0 20px 60px rgba(0, 229, 255, 0.2)',
          }}
          animate={{
            y: [0, -20, 0],
            rotateY: [-5, 5, -5],
            rotateX: [-5, 5, -5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: card.delay,
            ease: "easeInOut",
          }}
          style={{
            transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-2xl">
              {card.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">{card.name}</p>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 text-xs">{card.rating}</span>
              </div>
            </div>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
              initial={{ width: 0 }}
              animate={{ width: `${card.rating * 20}%` }}
              transition={{ duration: 1.5, delay: card.delay }}
            />
          </div>
        </motion.div>
      ))}

      {/* Floating data visualizations */}
      <motion.div
        className="absolute top-[40%] left-[10%] bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10"
        animate={{
          y: [0, -15, 0],
          rotateZ: [-2, 2, -2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        style={{
          width: '140px',
          boxShadow: '0 20px 60px rgba(0, 229, 255, 0.15)',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span className="text-xs text-gray-400">Applications</span>
        </div>
        <div className="flex items-end gap-1 h-16">
          {[65, 80, 55, 90, 75].map((height, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute top-[25%] right-[8%] bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10"
        animate={{
          y: [0, -12, 0],
          rotateZ: [2, -2, 2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        style={{
          width: '160px',
          boxShadow: '0 20px 60px rgba(0, 229, 255, 0.15)',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-xs text-gray-400">Success Rate</span>
        </div>
        <div className="text-3xl font-bold text-white mb-1">87%</div>
        <div className="text-xs text-green-400">↑ 12% this month</div>
      </motion.div>

      {/* Grid floor with reflection */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 229, 255, 0.05) 100%)',
          backgroundImage: `
            linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom',
          opacity: 0.3,
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex items-center justify-between px-20 py-12">
        
        {/* Login Card - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotateY: 20 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, type: 'spring' }}
          className="w-full max-w-md"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Multiple depth layers */}
          <div className="relative">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-3xl"
              style={{ transform: 'translateZ(-80px)', opacity: 0.6 }}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-purple-500/15 rounded-3xl blur-2xl"
              style={{ transform: 'translateZ(-40px)', opacity: 0.8 }}
            />
            
            {/* Main card */}
            <div 
              className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-10 border border-white/20"
              style={{
                transform: 'translateZ(0px)',
                boxShadow: `
                  0 40px 100px rgba(0, 0, 0, 0.7),
                  inset 0 0 80px rgba(255, 255, 255, 0.05),
                  0 0 100px rgba(0, 229, 255, 0.3)
                `,
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 20px rgba(0, 229, 255, 0.8)' }} />
              <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 20px rgba(0, 229, 255, 0.8)' }} />
              <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-purple-400" style={{ boxShadow: '0 0 20px rgba(181, 55, 242, 0.8)' }} />
              <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-purple-400" style={{ boxShadow: '0 0 20px rgba(181, 55, 242, 0.8)' }} />

              {/* Logo */}
              <div className="flex justify-center mb-8" style={{ transform: 'translateZ(30px)' }}>
                <motion.div 
                  className="relative"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 flex items-center justify-center relative overflow-hidden">
                    <Brain className="w-10 h-10 text-white relative z-10" />
                    <Shield className="w-8 h-8 text-white/30 absolute" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  </div>
                </motion.div>
              </div>

              <div className="text-center mb-8" style={{ transform: 'translateZ(25px)' }}>
                <motion.h1 
                  className="text-3xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #00E5FF 0%, #00E5FF 50%, #B537F2 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 40px rgba(0, 229, 255, 0.5)',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                >
                  SmartHire AI
                </motion.h1>
                <p className="text-cyan-400 text-sm font-semibold">Revolutionary Recruitment Platform</p>
              </div>

              <motion.h2 
                className="text-2xl font-bold text-white mb-6 text-center"
                style={{ 
                  transform: 'translateZ(20px)',
                  textShadow: '0 5px 20px rgba(0, 0, 0, 0.5)'
                }}
              >
                Welcome Back! 👋
              </motion.h2>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <motion.div
                  style={{ transform: 'translateZ(15px)' }}
                  whileHover={{ z: 20 }}
                >
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
                </motion.div>

                {/* Password Field */}
                <motion.div
                  style={{ transform: 'translateZ(15px)' }}
                  whileHover={{ z: 20 }}
                >
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
                </motion.div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm" style={{ transform: 'translateZ(15px)' }}>
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

                {/* Login Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full py-4 rounded-xl font-semibold text-lg text-white overflow-hidden disabled:opacity-70"
                  style={{
                    transform: 'translateZ(20px)',
                    background: 'linear-gradient(135deg, #00E5FF 0%, #0099FF 100%)',
                    boxShadow: '0 10px 30px rgba(0, 229, 255, 0.4), 0 0 60px rgba(0, 229, 255, 0.2)',
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </span>
                </motion.button>
              </form>

              {/* Create Account */}
              <p className="text-center text-gray-400 mt-6" style={{ transform: 'translateZ(15px)' }}>
                New here?{' '}
                <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold hover:underline">
                  Create Account
                </a>
              </p>

              {/* Security Badge */}
              <div className="mt-6 text-center" style={{ transform: 'translateZ(10px)' }}>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Shield className="w-3 h-3" />
                  <span>Secured by 256-bit encryption</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Character - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, type: 'spring', delay: 0.3 }}
          className="relative"
          style={{ 
            width: '500px',
            height: '600px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Character glow */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl"
            style={{ transform: 'translateZ(-50px)' }}
          />

          {/* AI Robot Character */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Body */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Head */}
              <div className="relative mb-8">
                {/* Helmet */}
                <div 
                  className="w-48 h-56 rounded-t-full bg-gradient-to-b from-white via-gray-100 to-gray-200 relative overflow-hidden"
                  style={{
                    boxShadow: `
                      0 20px 60px rgba(0, 0, 0, 0.3),
                      inset 0 -20px 40px rgba(0, 0, 0, 0.1),
                      0 0 80px rgba(0, 229, 255, 0.3)
                    `,
                  }}
                >
                  {/* Reflections */}
                  <div 
                    className="absolute top-8 left-8 w-20 h-24 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-xl"
                  />
                  
                  {/* Eyes */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8">
                    <motion.div
                      animate={{
                        scaleY: eyeBlink ? 0.1 : 1,
                        x: emailFocused ? -5 : passwordFocused ? -5 : 0,
                        y: emailFocused ? -10 : passwordFocused ? 10 : 0,
                      }}
                      transition={{ duration: 0.1 }}
                      className="w-12 h-16 rounded-full bg-gradient-to-b from-cyan-400 to-cyan-600"
                      style={{
                        boxShadow: '0 0 40px rgba(0, 229, 255, 0.8), inset 0 4px 10px rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      <div className="w-6 h-6 rounded-full bg-white/90 mt-6 ml-3" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)' }} />
                    </motion.div>
                    <motion.div
                      animate={{
                        scaleY: eyeBlink ? 0.1 : 1,
                        x: emailFocused ? -5 : passwordFocused ? -5 : 0,
                        y: emailFocused ? -10 : passwordFocused ? 10 : 0,
                      }}
                      transition={{ duration: 0.1 }}
                      className="w-12 h-16 rounded-full bg-gradient-to-b from-cyan-400 to-cyan-600"
                      style={{
                        boxShadow: '0 0 40px rgba(0, 229, 255, 0.8), inset 0 4px 10px rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      <div className="w-6 h-6 rounded-full bg-white/90 mt-6 ml-3" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)' }} />
                    </motion.div>
                  </div>

                  {/* Smile/Mouth */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-8 rounded-full bg-gradient-to-b from-cyan-400 to-cyan-600 opacity-80" style={{ boxShadow: '0 0 20px rgba(0, 229, 255, 0.6)' }} />

                  {/* Antenna */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-8 bg-gray-300 rounded-full">
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400"
                      style={{ boxShadow: '0 0 20px rgba(0, 229, 255, 0.8)' }}
                    />
                  </div>
                </div>

                {/* Neck */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-12 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg" style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }} />
              </div>

              {/* Torso */}
              <div className="relative">
                <div 
                  className="w-56 h-64 rounded-3xl bg-gradient-to-b from-white via-gray-100 to-gray-200 relative overflow-hidden"
                  style={{
                    boxShadow: `
                      0 30px 80px rgba(0, 0, 0, 0.4),
                      inset 0 -30px 50px rgba(0, 0, 0, 0.1),
                      0 0 100px rgba(0, 229, 255, 0.2)
                    `,
                  }}
                >
                  {/* Chest Core */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600"
                      style={{
                        boxShadow: `
                          0 0 60px rgba(0, 229, 255, 0.8),
                          inset 0 0 30px rgba(255, 255, 255, 0.3)
                        `,
                      }}
                    >
                      <div className="absolute inset-2 rounded-full border-2 border-white/30" />
                      <div className="absolute inset-4 rounded-full border-2 border-white/50" />
                    </motion.div>
                  </div>

                  {/* Panel Lines */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
                </div>

                {/* Arms */}
                <motion.div
                  animate={{
                    rotate: [0, -15, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-12 -left-16 w-14 h-32 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full origin-top"
                  style={{ 
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    transformOrigin: 'top center',
                  }}
                >
                  <div className="absolute bottom-0 -left-2 w-12 h-20 bg-gradient-to-b from-gray-300 to-white rounded-full" style={{ boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)' }} />
                </motion.div>

                <motion.div
                  animate={{
                    rotate: [0, 25, 15, 25],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-12 -right-16 w-14 h-32 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full origin-top"
                  style={{ 
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    transformOrigin: 'top center',
                  }}
                >
                  {/* Pointing hand */}
                  <div className="absolute bottom-0 -right-2 w-12 h-20 bg-gradient-to-b from-gray-300 to-white rounded-full" style={{ boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)' }}>
                    <div className="absolute -right-1 top-4 w-3 h-10 bg-white rounded-full" style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }} />
                  </div>
                </motion.div>
              </div>

              {/* Shadow */}
              <div 
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-8 bg-black/30 rounded-full blur-2xl"
              />
            </motion.div>
          </div>

          {/* Floating sparkles around character */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.8)',
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom user count */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="text-gray-400 text-sm">
          Join <span className="text-cyan-400 font-semibold">50,000+</span> professionals already using SmartHire AI
        </p>
      </motion.div>
    </div>
  );
}