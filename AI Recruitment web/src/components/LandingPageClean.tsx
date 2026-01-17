import React, { useState } from 'react';
import { ArrowRight, Users, Target, Brain, Mail, Phone, MapPin, Building, Award, Clock } from 'lucide-react';
import { LoginModal } from './LoginModal';
import { SmartHireLogo } from './SmartHireLogo';

interface LandingPageCleanProps {
  onLogin: (userData: any) => void;
}

export function LandingPageClean({ onLogin }: LandingPageCleanProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-900/95 backdrop-blur-md shadow-xl border-b border-blue-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <SmartHireLogo size="medium" showText={true} animated={false} />
            </div>
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                AI-Powered<br />
                Recruitment<br />
                <span className="text-blue-300">Solutions</span>
              </h1>
              <p className="text-2xl text-blue-200 font-semibold mb-6">
                Hire Smarter. Hire Faster.
              </p>
              <p className="text-lg text-blue-100 mb-8 max-w-xl leading-relaxed">
                Transform your hiring process with cutting-edge AI technology. Find the perfect candidates faster, reduce bias, and make data-driven decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative h-[600px] hidden lg:block">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-48 h-48 bg-gradient-to-br from-white via-blue-100 to-blue-200 rounded-3xl shadow-2xl flex items-center justify-center">
                  <Users className="w-24 h-24 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Hire Smarter
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful AI-driven tools designed to streamline your recruitment process
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI-Powered Screening',
                description: 'Advanced algorithms analyze resumes and predict candidate success with 95% accuracy.',
                stats: '10x Faster'
              },
              {
                icon: Target,
                title: 'Smart Matching',
                description: 'Perfect candidate-role fit based on skills, experience, and culture analysis.',
                stats: '85% Match Rate'
              },
              {
                icon: Users,
                title: 'Automated Workflows',
                description: 'Streamline screening, scheduling, and assessments while maintaining personal touch.',
                stats: '70% Time Saved'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                  <div className="text-blue-600 font-semibold">{feature.stats}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            About SmartHireAI
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-16">
            Revolutionizing recruitment with AI-powered solutions that help companies find the perfect candidates faster and more efficiently.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { number: '500+', label: 'Enterprise Clients', icon: Building },
              { number: '2M+', label: 'Candidates Screened', icon: Users },
              { number: '98%', label: 'Client Satisfaction', icon: Award },
              { number: '24/7', label: 'AI Support', icon: Clock }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-blue-300" />
                  </div>
                  <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-blue-200 font-semibold">{stat.label}</div>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-10 py-4 bg-white text-blue-900 font-bold rounded-lg shadow-2xl hover:shadow-blue-500/50 transition-all text-lg"
          >
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to transform your hiring process? Contact our team to learn more about SmartHireAI
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Mail,
                title: 'Email',
                value: 'anshojha420@gmail.com',
                description: 'Send us an email anytime!'
              },
              {
                icon: Phone,
                title: 'Phone',
                value: '+91 9956126495',
                description: 'Mon-Fri from 8am to 6pm IST'
              },
              {
                icon: MapPin,
                title: 'Office',
                value: 'San Francisco, CA',
                description: '123 Innovation Drive, Suite 100'
              }
            ].map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div key={contact.title} className="text-center p-6 bg-blue-50 rounded-2xl">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{contact.title}</h4>
                  <p className="text-blue-600 font-medium mb-1">{contact.value}</p>
                  <p className="text-sm text-gray-600">{contact.description}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <SmartHireLogo size="small" showText={true} animated={false} />
              </div>
              <p className="text-sm">Revolutionizing recruitment with AI-powered solutions.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-600 pt-8 text-center text-sm">
            <p>&copy; 2024 SmartHireAI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={onLogin}
      />
    </div>
  );
}