import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Minimal Landing Page Component
function MinimalLandingPage({ onLogin }: { onLogin: (userData: any) => void }) {
  const handleLogin = () => {
    const mockUser = {
      id: 'user_123',
      name: 'Demo User',
      email: 'demo@smarthire.ai',
      token: 'demo_token_123'
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center">
      <div className="text-center text-white p-8">
        <h1 className="text-6xl font-bold mb-4">
          Smart<span className="text-blue-300">Hire</span>
        </h1>
        <p className="text-xl mb-8">AI-Powered Recruitment Solutions</p>
        <button
          onClick={handleLogin}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xl transition-all"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

// Minimal Dashboard Component
function MinimalDashboard({ user, onLogout }: { user: any; onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
          >
            Logout
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          <p className="text-gray-600">Your SmartHire dashboard is ready!</p>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  return (
    <div className="min-h-screen">
      <Routes>
        <Route 
          path="/" 
          element={
            isLoggedIn ? 
              <MinimalDashboard user={user} onLogout={handleLogout} /> :
              <MinimalLandingPage onLogin={handleLogin} />
          } 
        />
        <Route 
          path="*" 
          element={
            isLoggedIn ? 
              <MinimalDashboard user={user} onLogout={handleLogout} /> :
              <MinimalLandingPage onLogin={handleLogin} />
          } 
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}