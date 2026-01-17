import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  user: any;
  userType: 'jobseeker' | 'recruiter';
}

export function NavigationStable({ currentPage, onNavigate, onLogout, user, userType }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  // Job Seeker Menu Items
  const jobSeekerMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'job-search', label: 'Job Search', icon: '🔍', badge: 'LIVE' },
    { id: 'analytics', label: 'Analytics & Charts', icon: '📊', badge: 'NEW' },
    { id: 'interview-prep', label: 'Interview Prep', icon: '🎥', badge: 'AI' },
    { id: 'applications', label: 'Applications', icon: '📄' },
    { id: 'career-planner', label: 'Career Planner', icon: '🎯', badge: 'NEW' },
    { id: 'brand-builder', label: 'Brand Builder', icon: '⭐', badge: 'HOT' },
    { id: 'salary-toolkit', label: 'Salary Toolkit', icon: '💰', badge: 'PRO' },
    { id: 'company-intelligence', label: 'Company Intel', icon: '🏢', badge: 'BETA' },
    { id: 'network-builder', label: 'Network Builder', icon: '👥', badge: 'SMART' },
    { id: 'cv-builder', label: 'CV Builder', icon: '👤', badge: 'ML' },
  ];

  // Recruiter Menu Items
  const recruiterMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'post-job', label: 'Post Job', icon: '➕', badge: 'QUICK' },
    { id: 'candidates', label: 'Candidates', icon: '👥', badge: 'LIVE' },
    { id: 'analytics', label: 'Analytics', icon: '📊', badge: 'NEW' },
    { id: 'messaging', label: 'Messages', icon: '💬' },
    { id: 'company-intelligence', label: 'Company Intel', icon: '🏢', badge: 'BETA' },
  ];

  const menuItems = userType === 'recruiter' ? recruiterMenuItems : jobSeekerMenuItems;

  return (
    <nav className={`fixed left-0 top-0 h-screen w-64 z-50 border-r shadow-xl transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-slate-900 border-slate-700'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className={`p-6 border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-slate-700'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Smart<span className="text-blue-300">Hire</span>
              </h1>
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                AI Platform
              </p>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className={`p-4 border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-slate-700'
        }`}>
          <div className={`flex items-center gap-3 p-3 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-slate-800'
          }`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">
                {user?.name || 'Professional'}
              </p>
              <p className="text-xs text-slate-400 capitalize">
                {userType === 'recruiter' ? 'Recruiter' : 'Job Seeker'}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-blue-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Theme Toggle & Logout */}
        <div className={`p-4 border-t space-y-2 ${
          theme === 'dark' ? 'border-gray-700' : 'border-slate-700'
        }`}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              theme === 'dark'
                ? 'text-yellow-400 hover:bg-gray-800'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <>
                <span className="text-lg">☀️</span>
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <span className="text-lg">🌙</span>
                <span>Dark Mode</span>
              </>
            )}
          </button>
          
          {/* Logout */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <span className="text-lg">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}