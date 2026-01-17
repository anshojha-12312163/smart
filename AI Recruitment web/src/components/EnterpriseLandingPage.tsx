import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ArrowRight, Shield, Globe, BarChart3, Users, 
  Building, Award, CheckCircle, TrendingUp, Lock, Zap,
  Clock, Target, Network, Database, Settings, Phone
} from 'lucide-react';
import { LoginModal } from './LoginModal';
import { SmartHireLogo } from './SmartHireLogo';
import { emailService } from '../services/emailService';

interface EnterpriseLandingPageProps {
  onLogin: (userData: any) => void;
}

export function EnterpriseLandingPage({ onLogin }: EnterpriseLandingPageProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [showConsultation, setShowConsultation] = useState(false);

  // Enterprise statistics with animation
  const [stats, setStats] = useState({
    clients: 0,
    candidates: 0,
    accuracy: 0,
    uptime: 0
  });

  useEffect(() => {
    // Animate statistics on load
    const timer = setTimeout(() => {
      setStats({
        clients: 500,
        candidates: 2000000,
        accuracy: 95,
        uptime: 99.9
      });
    }, 500);

    // Show consultation button after scroll
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowConsultation(true);
      } else {
        setShowConsultation(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Enterprise Navigation - Will be added in next part */}
      {/* Enterprise Hero - Will be added in next part */}
      {/* Trust Signals - Will be added in next part */}
      {/* Features - Will be added in next part */}
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={onLogin}
      />
    </div>
  );
}
