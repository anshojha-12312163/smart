import React, { useState } from 'react';

// Simple Landing Page with LinkedIn colors
function WorkingLandingPage({ onLogin }: { onLogin: (userData: any) => void }) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-900/95 backdrop-blur-md shadow-xl border-b border-blue-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Smart<span className="text-blue-300">Hire</span>
                </h1>
                <p className="text-xs text-blue-200 uppercase tracking-wider -mt-1">
                  Professional Network
                </p>
              </div>
            </div>
            <button
              onClick={handleLogin}
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
                  onClick={handleLogin}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Get Started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative h-[600px] hidden lg:block">
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-48 h-48 bg-gradient-to-br from-white via-blue-100 to-blue-200 rounded-3xl shadow-2xl flex items-center justify-center">
                  <svg className="w-24 h-24 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
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
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Screening</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Advanced algorithms analyze resumes and predict candidate success with 95% accuracy.</p>
              <div className="text-blue-600 font-semibold">10x Faster</div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 10.793a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Matching</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Perfect candidate-role fit based on skills, experience, and culture analysis.</p>
              <div className="text-blue-600 font-semibold">85% Match Rate</div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Automated Workflows</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Streamline screening, scheduling, and assessments while maintaining personal touch.</p>
              <div className="text-blue-600 font-semibold">70% Time Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h1 className="text-lg font-bold text-white">
                Smart<span className="text-blue-300">Hire</span>
              </h1>
            </div>
            <p className="text-sm mb-8">Revolutionizing recruitment with AI-powered solutions.</p>
            <div className="border-t border-blue-600 pt-8 text-center text-sm">
              <p>&copy; 2024 SmartHireAI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Simple Dashboard Component
function WorkingDashboard({ user, onLogout }: { user: any; onLogout: () => void }) {
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

export default function App() {
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
      {isLoggedIn ? (
        <WorkingDashboard user={user} onLogout={handleLogout} />
      ) : (
        <WorkingLandingPage onLogin={handleLogin} />
      )}
    </div>
  );
}