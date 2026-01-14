import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { SmartHireDashboard } from './components/SmartHireDashboard';
import { Navigation } from './components/Navigation';
import { ThemeProvider } from './components/ThemeProvider';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState<'jobseeker' | 'recruiter'>('jobseeker');
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        console.log('🔍 Found existing authentication:', userData.name);
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

  return (
    <div className="min-h-screen bg-slate-50">
      {isLoggedIn && (
        <Navigation 
          currentPage="dashboard" 
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