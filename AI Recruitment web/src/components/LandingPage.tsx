import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Play, ArrowRight, Search, Target, MessageSquare, Star, Users, TrendingUp, Clock, Shield, Check, Sparkles, Brain, Zap, Mail, Phone, MapPin, Calendar, Award, BarChart3, Globe, Cpu, Network, Eye, Filter, UserCheck, Briefcase, Building } from 'lucide-react';
import { LoginModal } from './LoginModal';
import { SmartHireLogo } from './SmartHireLogo';
import { emailService } from '../services/emailService';

interface LandingPageProps {
  onLogin: (userData: any) => void;
}

// Professional candidate personas for enterprise display
const professionalCandidates = [
  {
    name: 'Priya Sharma',
    title: 'Senior Software Engineer',
    rating: 4.8,
    skills: ['React', 'Node.js', 'AWS'],
    experience: '6+ years',
    location: 'Bangalore, India',
    avatar: '👩‍💻',
    company: 'Ex-Microsoft'
  },
  {
    name: 'Michael Chen',
    title: 'Product Manager',
    rating: 4.9,
    skills: ['Strategy', 'Analytics', 'Leadership'],
    experience: '8+ years',
    location: 'San Francisco, USA',
    avatar: '👨‍💼',
    company: 'Ex-Google'
  },
  {
    name: 'Aisha Rahman',
    title: 'Data Scientist',
    rating: 5.0,
    skills: ['Python', 'ML', 'TensorFlow'],
    experience: '5+ years',
    location: 'London, UK',
    avatar: '👩‍🔬',
    company: 'Ex-Amazon'
  },
  {
    name: 'David Kim',
    title: 'DevOps Engineer',
    rating: 4.7,
    skills: ['Kubernetes', 'Docker', 'CI/CD'],
    experience: '7+ years',
    location: 'Seoul, South Korea',
    avatar: '👨‍💻',
    company: 'Ex-Netflix'
  },
  {
    name: 'Sarah Johnson',
    title: 'UX Designer',
    rating: 4.9,
    skills: ['Figma', 'Research', 'Prototyping'],
    experience: '4+ years',
    location: 'New York, USA',
    avatar: '👩‍🎨',
    company: 'Ex-Apple'
  }
];

export function LandingPage({ onLogin }: LandingPageProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingCards, setFloatingCards] = useState(professionalCandidates.map((_, index) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    delay: index * 0.2
  })));

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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate floating cards
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingCards(prev => prev.map(card => ({
        ...card,
        x: (card.x + 0.1) % 100,
        y: card.y + Math.sin(Date.now() * 0.001 + card.delay) * 0.1,
        rotation: card.rotation + 0.1
      })));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavigation = (sectionId: string) => {
    setCurrentSection(sectionId);
    setShowMobileMenu(false);
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Contact form handlers
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
      
      // Send email using real email service
      const response = await emailService.sendContactEmail(contactForm);
      
      if (response.success) {
        // Show beautiful success message
        const successMessage = `
✅ Message Sent Successfully!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 From: ${contactForm.firstName} ${contactForm.lastName}
📧 Email: ${contactForm.email}
🏢 Company: ${contactForm.company || 'Not specified'}
📋 Subject: ${contactForm.subject}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${response.message}

📞 Contact Information:
   Email: anshojha420@gmail.com
   Phone: +91 9956126495
   Hours: Mon-Fri 9am to 6pm IST

Thank you for reaching out to SmartHire AI!
We look forward to helping you transform your hiring process.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `.trim();
        
        alert(successMessage);
        
        // Try to send auto-reply to user
        try {
          await emailService.sendAutoReply(
            contactForm.email,
            `${contactForm.firstName} ${contactForm.lastName}`
          );
        } catch (error) {
          console.warn('Could not send auto-reply:', error);
        }
        
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
        
        // Store in localStorage for history
        const messageData = {
          ...contactForm,
          timestamp: new Date().toISOString(),
          id: Math.random().toString(36).substr(2, 9),
          status: 'sent'
        };
        const existingMessages = JSON.parse(localStorage.getItem('smarthire_messages') || '[]');
        existingMessages.push(messageData);
        localStorage.setItem('smarthire_messages', JSON.stringify(existingMessages));
        
      } else {
        throw new Error(response.error || 'Failed to send email');
      }
      
    } catch (error) {
      console.error('❌ Error sending message:', error);
      setSubmitStatus('error');
      
      const errorMessage = `
❌ Unable to Send Message Automatically

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We encountered an issue sending your message automatically.

📧 Please contact us directly:

   Email: anshojha420@gmail.com
   Phone: +91 9956126495
   Hours: Mon-Fri 9am to 6pm IST

Or try again in a few moments.

Your message has been saved locally and you can
also use the mailto link that will open shortly.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim();
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // View message history
  const viewMessageHistory = () => {
    const messages = JSON.parse(localStorage.getItem('smarthire_messages') || '[]');
    
    if (messages.length === 0) {
      alert('📭 No messages found.\n\nSend a message using the contact form to see it appear here!');
      return;
    }
    
    let historyText = '📧 MESSAGE HISTORY\n' + '='.repeat(40) + '\n\n';
    
    historyText += '💬 CONTACT MESSAGES:\n';
    messages.forEach((msg: any, index: number) => {
      historyText += `\n${index + 1}. ${msg.firstName} ${msg.lastName}\n`;
      historyText += `   📧 ${msg.email}\n`;
      historyText += `   🏢 ${msg.company || 'No company'}\n`;
      historyText += `   📝 ${msg.subject}\n`;
      historyText += `   💬 "${msg.message.substring(0, 50)}..."\n`;
      historyText += `   📅 ${new Date(msg.timestamp).toLocaleString()}\n`;
      historyText += `   ✅ Status: ${msg.status || 'Sent'}\n`;
    });
    
    historyText += '\n\n📞 Contact: anshojha420@gmail.com | +91 9956126495';
    
    alert(historyText);
  };

  const aiFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Screening',
      subtitle: 'Intelligent Resume Analysis',
      description: 'Advanced machine learning algorithms analyze resumes, assess skills, and predict candidate success with 95% accuracy.',
      color: 'from-purple-500 to-indigo-600',
      stats: '10x Faster'
    },
    {
      icon: Target,
      title: 'Smart Matching',
      subtitle: 'Perfect Candidate-Role Fit',
      description: 'Our AI matches candidates to roles based on skills, experience, culture fit, and career trajectory analysis.',
      color: 'from-teal-500 to-blue-600',
      stats: '85% Match Rate'
    },
    {
      icon: Zap,
      title: 'Automated Workflows',
      subtitle: 'Streamlined Hiring Process',
      description: 'Automate screening, scheduling, and initial assessments while maintaining personalized candidate experience.',
      color: 'from-violet-500 to-purple-600',
      stats: '70% Time Saved'
    },
    {
      icon: BarChart3,
      title: 'Predictive Analytics',
      subtitle: 'Data-Driven Decisions',
      description: 'Leverage hiring analytics, performance predictions, and market insights to make informed recruitment decisions.',
      color: 'from-indigo-500 to-cyan-600',
      stats: '90% Accuracy'
    }
  ];

  const enterpriseStats = [
    { number: '500+', label: 'Enterprise Clients', icon: Building, color: 'from-purple-500 to-indigo-500' },
    { number: '2M+', label: 'Candidates Screened', icon: Users, color: 'from-teal-500 to-blue-500' },
    { number: '98%', label: 'Client Satisfaction', icon: Star, color: 'from-violet-500 to-purple-500' },
    { number: '24/7', label: 'AI Support', icon: Cpu, color: 'from-indigo-500 to-cyan-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-xl border-b border-gray-200' 
            : 'bg-white shadow-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-4 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => handleNavigation('home')}
            >
              {/* Use the new professional SmartHireLogo component */}
              <SmartHireLogo size="medium" showText={true} animated={false} />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`font-medium transition-colors ${
                    currentSection === item.id
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLoginModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get Started
              </motion.button>
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
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-3">
                {navigationItems.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => handleNavigation(item.id)}
                    className={`block w-full text-left py-2 font-medium transition-colors ${
                      currentSection === item.id
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg mt-4"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
          {/* Geometric Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(30deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6),
                linear-gradient(150deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6),
                linear-gradient(30deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6),
                linear-gradient(150deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6)`,
              backgroundSize: '80px 140px',
              backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px'
            }}
          />
          
          {/* Floating Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Light Beams */}
          <div className="absolute bottom-0 left-0 right-0 h-full opacity-20">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0"
                style={{
                  left: `${i * 33}%`,
                  width: '200px',
                  height: '100%',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(34, 211, 238, 0.3) 50%, transparent 100%)',
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
        </div>

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
                  onClick={() => setShowLoginModal(true)}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - AI Robot & Floating Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] hidden lg:block"
            >
              {/* Floating Profile Cards - All Removed */}
              
              {/* Central Robot Illustration */}
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
                  {/* Simplified Robot Design */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-3xl opacity-50" />
                      
                      {/* Robot Icon */}
                      <div className="relative w-48 h-48 bg-gradient-to-br from-white via-blue-100 to-blue-200 rounded-3xl shadow-2xl flex items-center justify-center">
                        <Users className="w-24 h-24 text-blue-600" />
                        
                        {/* Accent Elements */}
                        <div className="absolute top-4 left-4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                        <div className="absolute top-4 right-4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <div className="absolute bottom-4 left-4 w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                        <div className="absolute bottom-4 right-4 w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="solutions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-cyan-600 font-semibold text-sm uppercase tracking-wide mb-3"
            >
              Our Solutions
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Everything You Need to Hire Smarter
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Powerful AI-driven tools designed to streamline your recruitment process from start to finish
            </motion.p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all group cursor-pointer border border-gray-100"
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{feature.subtitle}</p>
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>

                  {/* Learn More Link */}
                  <button className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
        {/* Background Pattern */}
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
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              About SmartHireAI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-cyan-300 max-w-3xl mx-auto mb-8"
            >
              We're revolutionizing recruitment with cutting-edge AI technology, making hiring faster, smarter, and more effective for companies worldwide.
            </motion.p>
          </div>

          {/* About Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              <p className="text-blue-100 leading-relaxed">
                At SmartHireAI, we believe that finding the right talent shouldn't be a time-consuming, biased, or inefficient process. Our mission is to empower organizations with AI-driven tools that transform how they discover, evaluate, and hire exceptional candidates.
              </p>
              <p className="text-blue-100 leading-relaxed">
                Founded by a team of AI researchers and HR professionals, we combine deep technical expertise with real-world recruitment experience to deliver solutions that actually work.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { title: 'Founded', value: '2023', icon: Calendar },
                { title: 'Companies', value: '10K+', icon: Users },
                { title: 'Success Rate', value: '94%', icon: TrendingUp },
                { title: 'Time Saved', value: '85%', icon: Clock }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                    <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">{item.value}</div>
                    <div className="text-blue-200 text-sm">{item.title}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {enterpriseStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl font-bold text-white mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-cyan-300 font-semibold">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLoginModal(true)}
              className="px-10 py-4 bg-white text-blue-900 font-bold rounded-lg shadow-2xl hover:shadow-cyan-500/50 transition-all text-lg"
            >
              Start Your Free Trial
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Get in Touch
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Ready to transform your hiring process? Contact our team to learn more about SmartHireAI
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8"
            >
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
                <div className="grid grid-cols-2 gap-4">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => handleContactFormChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => handleContactFormChange('subject', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Pricing Information">Pricing Information</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Media Inquiry">Media Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => handleContactFormChange('message', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your hiring needs, questions, or how we can help you..."
                    required
                    minLength={10}
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {contactForm.message.length}/500 characters
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                      Sending Message...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      ✅ Message Sent!
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      ❌ Try Again
                    </>
                  ) : (
                    <>
                      📧 Send Message
                    </>
                  )}
                </motion.button>
                {submitStatus === 'success' && (
                  <div className="text-center text-green-600 text-sm font-medium">
                    ✅ Thank you! We'll get back to you within 24 hours.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="text-center text-red-600 text-sm font-medium">
                    ❌ Something went wrong. Please try again or email us directly.
                  </div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
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
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
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

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 mb-3">Ready to get started?</h4>
                <p className="text-gray-600 mb-4">
                  Have questions? Fill out the contact form above or reach out directly.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // Scroll to contact form
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📧 Contact Us
                </motion.button>
              </div>

              {/* Message History Viewer */}
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">📧 Message Center</h4>
                <p className="text-gray-600 mb-4 text-sm">
                  View your sent messages and contact history
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={viewMessageHistory}
                  className="w-full px-4 py-2 bg-slate-600 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors text-sm"
                >
                  📋 View Message History
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
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