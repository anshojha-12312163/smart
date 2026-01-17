import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users } from 'lucide-react';
import { LoginModal } from './LoginModal';
import { SmartHireLogo } from './SmartHireLogo';

interface LandingPageMinimalProps {
  onLogin: (userData: any) => void;
}

export function LandingPageMinimal({ onLogin }: LandingPageMinimalProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <SmartHireLogo size="medium" showText={true} animated={false} />
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLoginModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/50 hover:shadow-2xl transition-all hover:scale-105"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                AI-Powered<br />
                Recruitment<br />
                <span className="text-cyan-400">Solutions</span>
              </motion.h1>

              <motion.p
                className="text-2xl text-cyan-300 font-semibold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Hire Smarter. Hire Faster.
              </motion.p>

              <motion.p
                className="text-lg text-blue-100 mb-8 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Transform your hiring process with cutting-edge AI technology. Find the perfect candidates faster, reduce bias, and make data-driven decisions.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLoginModal(true)}
                  className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - Simple Icon */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] hidden lg:block"
            >
              {/* Central Icon */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-64 h-80"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full blur-3xl opacity-50" />
                      
                      {/* Icon */}
                      <div className="relative w-48 h-48 bg-gradient-to-br from-white via-purple-100 to-teal-200 rounded-3xl shadow-2xl flex items-center justify-center">
                        <Users className="w-24 h-24 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simple Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose SmartHire AI?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful AI-driven tools designed to streamline your recruitment process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered Screening',
                description: 'Advanced algorithms analyze resumes and predict candidate success with 95% accuracy.',
                icon: '🧠'
              },
              {
                title: 'Smart Matching',
                description: 'Perfect candidate-role fit based on skills, experience, and culture analysis.',
                icon: '🎯'
              },
              {
                title: 'Automated Workflows',
                description: 'Streamline screening, scheduling, and assessments while maintaining personal touch.',
                icon: '⚡'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all group cursor-pointer border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-teal-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Ready to Transform Your Hiring?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-cyan-300 max-w-3xl mx-auto mb-8"
          >
            Join thousands of companies using SmartHire AI to hire faster and smarter
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLoginModal(true)}
            className="px-10 py-4 bg-white text-blue-900 font-bold rounded-lg shadow-2xl hover:shadow-cyan-500/50 transition-all text-lg"
          >
            Start Your Free Trial
          </motion.button>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={onLogin}
      />
    </div>
  );
}