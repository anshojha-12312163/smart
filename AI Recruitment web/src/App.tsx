import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { SmartHireDashboard } from './components/SmartHireDashboard';
import { Navigation } from './components/Navigation';
import { ThemeProvider } from './components/ThemeProvider';
import { JobSearchHub } from './components/JobSearchHub';
import { Analytics } from './components/Analytics';
import { InterviewPrepStudio } from './components/InterviewPrepStudio';
import { ApplicationTracker } from './components/ApplicationTracker';
import { CareerGrowthPlanner } from './components/CareerGrowthPlanner';
import { ProfessionalBrandBuilder } from './components/ProfessionalBrandBuilder';
import { SalaryNegotiationToolkit } from './components/SalaryNegotiationToolkit';
import { CompanyIntelligenceCenter } from './components/CompanyIntelligenceCenter';
import { NetworkBuilder } from './components/NetworkBuilder';
import { CVAnalysisBuilder } from './components/CVAnalysisBuilder';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState<'jobseeker' | 'recruiter'>('jobseeker');
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing authentication on app load
  useEffect(() => {
    // Clean URL parameters (remove OAuth params and other unwanted parameters)
    const url = new URL(window.location.href);
    const cleanParams = new URLSearchParams();
    
    // Only keep essential parameters, remove OAuth and other unwanted params
    const allowedParams = ['page']; // Add any parameters you want to keep
    
    for (const [key, value] of url.searchParams.entries()) {
      if (allowedParams.includes(key)) {
        cleanParams.set(key, value);
      }
    }
    
    // Update URL without unwanted parameters
    const cleanUrl = `${url.origin}${url.pathname}${cleanParams.toString() ? '?' + cleanParams.toString() : ''}`;
    if (cleanUrl !== window.location.href) {
      window.history.replaceState({}, '', cleanUrl);
    }
    
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        // console.log('🔍 Found existing authentication:', userData.name);
        setIsLoggedIn(true);
        setUser(userData);
        setUserType(userData.userType || 'jobseeker');
        
        if (location.pathname === '/') {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
  }, [navigate, location.pathname]);

  const handleLogin = (userData: any, type: 'jobseeker' | 'recruiter' = 'jobseeker') => {
    setIsLoggedIn(true);
    setUser(userData);
    setUserType(type);
    
    // Save to localStorage
    localStorage.setItem('authToken', userData.token || 'temp_token');
    localStorage.setItem('user', JSON.stringify({ ...userData, userType: type }));
    
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    
    // Clear stored auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    navigate('/');
  };

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
  };

  // Get current page from location
  const getCurrentPage = () => {
    const path = location.pathname.slice(1); // Remove leading slash
    return path || 'dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-200">
      {isLoggedIn && (
        <Navigation 
          currentPage={getCurrentPage()} 
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          user={user}
          userType={userType}
        />
      )}
      
      <main className={isLoggedIn ? 'ml-64' : ''}>
        <Routes>
          <Route 
            path="/" 
            element={
              isLoggedIn ? 
                <SmartHireDashboard user={user} userType={userType} onNavigate={handleNavigate} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              isLoggedIn ? 
                <SmartHireDashboard user={user} userType={userType} onNavigate={handleNavigate} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />

          {/* Job Seeker Routes */}
          <Route 
            path="/job-search" 
            element={
              isLoggedIn ? 
                <JobSearchHub user={user} onNavigate={handleNavigate} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/analytics" 
            element={
              isLoggedIn ? 
                <Analytics user={user} onNavigate={handleNavigate} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/interview-prep" 
            element={
              isLoggedIn ? 
                <InterviewPrepStudio user={user} onNavigate={handleNavigate} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/applications" 
            element={
              isLoggedIn ? 
                <ApplicationTracker user={user} onNavigate={handleNavigate} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/career-planner" 
            element={
              isLoggedIn ? 
                <CareerGrowthPlanner user={user} onNavigate={handleNavigate} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/brand-builder" 
            element={
              isLoggedIn ? 
                <ProfessionalBrandBuilder user={user} onNavigate={handleNavigate} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/salary-toolkit" 
            element={
              isLoggedIn ? 
                <SalaryNegotiationToolkit user={user} onNavigate={handleNavigate} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/company-intel" 
            element={
              isLoggedIn ? 
                <CompanyIntelligenceCenter user={user} onNavigate={handleNavigate} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/company-intelligence" 
            element={
              isLoggedIn ? 
                <CompanyIntelligenceCenter user={user} onNavigate={handleNavigate} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/network-builder" 
            element={
              isLoggedIn ? 
                <NetworkBuilder user={user} onNavigate={handleNavigate} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/cv-builder" 
            element={
              isLoggedIn ? 
                <CVAnalysisBuilder user={user} onNavigate={handleNavigate} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          
          {/* Catch-all route - redirect to dashboard if logged in, otherwise to home */}
          <Route 
            path="*" 
            element={
              isLoggedIn ? 
                <SmartHireDashboard user={user} userType={userType} onNavigate={handleNavigate} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}