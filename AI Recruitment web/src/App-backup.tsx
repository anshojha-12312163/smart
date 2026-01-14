import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { SmartHireDashboard } from './components/SmartHireDashboard';
import { JobSearchHub } from './components/JobSearchHub';
import { PostJobPage } from './components/PostJobPage';
import { CandidatesPage } from './components/CandidatesPage';
import { Messaging } from './components/Messaging';
import { SmartHireAnalytics } from './components/SmartHireAnalytics';
import { InterviewPrepStudio } from './components/InterviewPrepStudio';
import { ApplicationTracker } from './components/ApplicationTracker';
import { SalaryNegotiationToolkit } from './components/SalaryNegotiationToolkit';
import { CompanyIntelligenceCenter } from './components/CompanyIntelligenceCenter';
import { NetworkBuilder } from './components/NetworkBuilder';
import { CVAnalysisBuilder } from './components/CVAnalysisBuilder';
import { CareerGrowthPlanner } from './components/CareerGrowthPlanner';
import { ProfessionalBrandBuilder } from './components/ProfessionalBrandBuilder';
import { ProfileSettings } from './components/ProfileSettings';
import { Navigation } from './components/Navigation';
import { ThemeProvider } from './components/ThemeProvider';
import { SmartBot } from './components/SmartBot';
import { AuthCallback } from './components/AuthCallback';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState<'jobseeker' | 'recruiter'>('jobseeker');
  const navigate = useNavigate();
  const location = useLocation();

  // Handle OAuth callback directly in App component
  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Check if URL has OAuth parameters (code or error) on any page
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');
      const oauthSuccess = urlParams.get('oauth_success');
      
      if (oauthSuccess && code) {
        console.log('🔍 OAuth success detected from test page');
        console.log('🔍 Current URL:', window.location.href);
        
        try {
          console.log('✅ Authorization code found, processing...');
          
          // Use Real Google Auth Service
          console.log('🔄 Processing with Real Google Auth Service...');
          const userData = await RealGoogleAuthService.handleGoogleCallback(code);
          
          console.log('✅ Real Google authentication completed:', userData.user.name);
          
          // Store auth data
          localStorage.setItem('authToken', userData.token);
          localStorage.setItem('user', JSON.stringify(userData.user));
          
          // Set user state
          setIsLoggedIn(true);
          setUser(userData.user);
          setUserType(userData.user.userType || 'jobseeker');
          
          // Show success message with real user data
          alert(`🎉 Welcome ${userData.user.name}!\n\nSuccessfully logged in with Google.\n\nEmail: ${userData.user.email}`);
          
          // Clean URL and redirect to dashboard
          window.history.replaceState({}, document.title, '/');
          navigate('/dashboard');
          
        } catch (error: any) {
          console.error('❌ Real OAuth processing error:', error);
          alert(`Authentication failed: ${error.message}`);
          // Clean URL
          window.history.replaceState({}, document.title, '/');
        }
      } else if (error) {
        console.error('❌ OAuth error:', error);
        alert(`Authentication failed: ${error}`);
        // Clean URL
        window.history.replaceState({}, document.title, '/');
      }
    };
    
    handleOAuthCallback();
  }, [location, navigate]);

  // Check for existing authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser && !location.pathname.includes('/auth/')) {
      try {
        const userData = JSON.parse(savedUser);
        console.log('🔍 Found existing authentication:', userData.name);
        setIsLoggedIn(true);
        setUser(userData);
        setUserType(userData.userType || 'jobseeker');
        
        // Show welcome back message
        if (location.pathname === '/') {
          setTimeout(() => {
            alert(`Welcome back, ${userData.name}! 👋`);
          }, 500);
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
    setCurrentPage('landing');
    
    // Clear stored auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    navigate('/');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {isLoggedIn && (
        <Navigation 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          user={user}
          userType={userType}
        />
      )}
      
      <main className={isLoggedIn ? 'ml-64' : ''}>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              isLoggedIn ? 
                <SmartHireDashboard user={user} userType={userType} onNavigate={handleNavigate} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          
          {/* OAuth Callback Routes - Handled by useEffect above */}
          <Route 
            path="/auth/:provider/callback" 
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p>Processing authentication...</p>
                </div>
              </div>
            } 
          />
          
          {/* Debug route to test callback */}
          <Route 
            path="/test-callback" 
            element={
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">Callback Route Test</h1>
                <p>If you can see this, the routing is working!</p>
                <p>Current URL: {window.location.href}</p>
              </div>
            } 
          />
          
          {/* Protected Routes */}
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
              isLoggedIn && userType === 'jobseeker' ? 
                <JobSearchHub user={user} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/interview-prep" 
            element={
              isLoggedIn && userType === 'jobseeker' ? 
                <InterviewPrepStudio user={user} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/applications" 
            element={
              isLoggedIn && userType === 'jobseeker' ? 
                <ApplicationTracker user={user} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/career-planner" 
            element={
              isLoggedIn && userType === 'jobseeker' ? 
                <CareerGrowthPlanner user={user} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/brand-builder" 
            element={
              isLoggedIn && userType === 'jobseeker' ? 
                <ProfessionalBrandBuilder user={user} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/salary-toolkit" 
            element={
              isLoggedIn && userType === 'jobseeker' ? 
                <SalaryNegotiationToolkit user={user} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/network-builder" 
            element={
              isLoggedIn && userType === 'jobseeker' ? 
                <NetworkBuilder user={user} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/cv-builder" 
            element={
              isLoggedIn && userType === 'jobseeker' ? 
                <CVAnalysisBuilder user={user} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          
          {/* Recruiter Routes */}
          <Route 
            path="/post-job" 
            element={
              isLoggedIn && userType === 'recruiter' ? 
                <PostJobPage user={user} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/candidates" 
            element={
              isLoggedIn && userType === 'recruiter' ? 
                <CandidatesPage user={user} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          
          {/* Shared Routes */}
          <Route 
            path="/messaging" 
            element={
              isLoggedIn ? 
                <Messaging user={user} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/analytics" 
            element={
              isLoggedIn ? 
                <SmartHireAnalytics user={user} userType={userType} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/company-intelligence" 
            element={
              isLoggedIn ? 
                <CompanyIntelligenceCenter user={user} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/profile" 
            element={
              isLoggedIn ? 
                <ProfileSettings user={user} /> :
                <LandingPage onLogin={handleLogin} />
            } 
          />
        </Routes>
      </main>

      {isLoggedIn && <SmartBot userType={userType} />}
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