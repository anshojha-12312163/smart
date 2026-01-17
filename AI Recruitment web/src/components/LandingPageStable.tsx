import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Users, Target, Brain, BarChart3, Clock, Award, TrendingUp, Check, MessageSquare, Mail, Phone, MapPin, Building } from 'lucide-react';
import { LoginModal } from './LoginModal';
import { SmartHireLogo } from './SmartHireLogo';
import { emailService } from '../services/emailService';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from './ThemeProvider';

interface LandingPageStableProps {
  onLogin: (userData: any) => void;
}

export function LandingPageStable({ onLogin }: LandingPageStableProps) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  // Contact form state
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
    phone: '',
    subject: 'General Inquiry'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      try {
        setIsScrolled(window.scrollY > 50);
      } catch (error) {
        console.warn('Scroll handler error:', error);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavigation = (sectionId: string) => {
    try {
      setCurrentSection(sectionId);
      setShowMobileMenu(false);
      
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.warn('Navigation error:', error);
    }
  };

  const handleContactFormChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const validateContactForm = () => {
    const { firstName, lastName, email, message } = contactForm;
    
    if (!firstName.trim() || !lastName.trim()) {
      alert('❌ Please enter your first and last name');
      return false;
    }
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('❌ Please enter a valid email address');
      return false;
    }
    
    if (!message.trim() || message.trim().length < 10) {
      alert('❌ Please enter a message with at least 10 characters');
      return false;
    }
    
    return true;
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateContactForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      console.log('📧 Sending contact form email...');
      
      // Simple timeout without Promise.race to avoid timeout errors
      const response = await emailService.sendContactEmail(contactForm);
      
      if (response && response.success) {
        alert(`✅ Message Sent Successfully!\n\nThank you ${contactForm.firstName}! We'll get back to you within 24 hours.\n\nContact: anshojha420@gmail.com | +91 9956126495`);
        
        // Reset form
        setContactForm({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          message: '',
          phone: '',
          subject: 'General Inquiry'
        });
        
        setSubmitStatus('success');
        
      } else {
        throw new Error(response?.error || 'Failed to send email');
      }
      
    } catch (error) {
      console.error('❌ Error sending message:', error);
      setSubmitStatus('error');
      alert(`❌ Unable to send message automatically.\n\nPlease contact us directly:\nEmail: anshojha420@gmail.com\nPhone: +91 9956126495`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const aiFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Screening',
      description: 'Advanced machine learning algorithms analyze resumes and predict candidate success with 95% accuracy.',
      color: 'from-purple-500 to-indigo-600',
      stats: '10x Faster'
    },
    {
      icon: Target,
      title: 'Smart Matching',
      description: 'Perfect candidate-role fit based on skills, experience, culture fit, and career trajectory analysis.',
      color: 'from-teal-500 to-blue-600',
      stats: '85% Match Rate'
    },
    {
      icon: BarChart3,
      title: 'Predictive Analytics',
      description: 'Leverage hiring analytics, performance predictions, and market insights for informed decisions.',
      color: 'from-indigo-500 to-cyan-600',
      stats: '90% Accuracy'
    }
  ];

  const enterpriseStats = [
    { number: '500+', label: 'Enterprise Clients', icon: Building },
    { number: '2M+', label: 'Candidates Screened', icon: Users },
    { number: '98%', label: 'Client Satisfaction', icon: Award },
    { number: '24/7', label: 'AI Support', icon: Clock }
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-800 via-blue-800 to-blue-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-cyan-50'
    }`}>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? theme === 'dark' 
            ? 'bg-blue-900/95 backdrop-blur-md shadow-xl border-b border-blue-700' 
            : 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200'
          : theme === 'dark'
            ? 'bg-blue-900/90 backdrop-blur-md shadow-lg'
            : 'bg-white/90 backdrop-blur-md shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleNavigation('home')}>
              <SmartHireLogo size="medium" showText={true} animated={false} />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`font-medium transition-colors ${
                    currentSection === item.id
                      ? theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                      : theme === 'dark' ? 'text-blue-100 hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <ThemeToggle isDark={theme === 'dark'} onToggle={toggleTheme} />
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 text-gray-700"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className={`lg:hidden ${theme === 'dark' ? 'bg-blue-900' : 'bg-white'} border-t ${theme === 'dark' ? 'border-blue-700' : 'border-gray-200'} overflow-hidden`}>
            <div className="px-6 py-4 space-y-3">
              {navigationItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => handleNavigation(item.id)}
                  className={`block w-full text-left py-2 font-medium transition-colors ${
                    currentSection === item.id
                      ? theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                      : theme === 'dark' ? 'text-blue-100 hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mt-4"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
          <div className="absolute inset-0 opacity-10">
            <div 
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
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
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Side - Simple Icon */}
            <div className="relative h-[600px] hidden lg:block">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-64 h-80">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur-3xl opacity-30" />
                      <div className="relative w-48 h-48 bg-gradient-to-br from-white via-blue-100 to-blue-200 rounded-3xl shadow-2xl flex items-center justify-center">
                        <Users className="w-24 h-24 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Hire Smarter
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful AI-driven tools designed to streamline your recruitment process from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all group cursor-pointer border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
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
      <section id="about" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
            className="w-full h-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              About SmartHireAI
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Revolutionizing recruitment with AI-powered solutions that help companies find the perfect candidates faster and more efficiently.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {enterpriseStats.map((stat, index) => {
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

          <div className="text-center">
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-10 py-4 bg-white text-blue-900 font-bold rounded-lg shadow-2xl hover:shadow-blue-500/50 transition-all text-lg"
            >
              Start Your Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to transform your hiring process? Contact our team to learn more about SmartHireAI
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
              <form onSubmit={handleContactFormSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={contactForm.firstName}
                      onChange={(e) => handleContactFormChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={contactForm.lastName}
                      onChange={(e) => handleContactFormChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => handleContactFormChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={contactForm.company}
                    onChange={(e) => handleContactFormChange('company', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => handleContactFormChange('message', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your hiring needs..."
                    required
                    minLength={10}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : submitStatus === 'success'
                      ? 'bg-green-600 hover:bg-green-700'
                      : submitStatus === 'error'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    '✅ Message Sent!'
                  ) : submitStatus === 'error' ? (
                    '❌ Try Again'
                  ) : (
                    '📧 Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
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
                      <div key={contact.title} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{contact.title}</h4>
                          <p className="text-blue-600 font-medium">{contact.value}</p>
                          <p className="text-sm text-gray-600">{contact.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3">Ready to get started?</h4>
                <p className="text-gray-600 mb-4">
                  Have questions? Fill out the contact form or reach out directly.
                </p>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-gray-300 py-12 border-t border-blue-600/30">
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
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
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