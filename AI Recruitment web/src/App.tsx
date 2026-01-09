import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { CVAnalysis } from './components/CVAnalysis';
import { JobSearch } from './components/JobSearch';
import { ApplicationTracking } from './components/ApplicationTracking';
import { ProfileSettings } from './components/ProfileSettings';
import { Messaging } from './components/Messaging';
import { Pricing } from './components/Pricing';
import { AIAssistant } from './components/AIAssistant';
import { Navigation } from './components/Navigation';
import { StarField } from './components/StarField';
import { MLJobRecommendations } from './components/MLJobRecommendations';
import { InterviewPrep } from './components/InterviewPrep';
import { AICareerStudio } from './components/AICareerStudio';
import { AboutUs } from './components/AboutUs';
import { Analytics } from './components/Analytics';
import { CandidateDatabase } from './components/CandidateDatabase';
import { TeamCollaboration } from './components/TeamCollaboration';
import { FloatingParticles, NeonGlowRings, AnimatedBlobs } from './components/FloatingParticles';
import { AIChatbot } from './components/AIChatbot';
import { EnhancedInterviewPrep } from './components/EnhancedInterviewPrep';
import { ApplicationLifecycleManager } from './components/ApplicationLifecycleManager';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setIsLoggedIn(true);
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    if (!isLoggedIn && currentPage === 'landing') {
      return <LandingPage onLogin={handleLogin} />;
    }

    if (!isLoggedIn) {
      return <LandingPage onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} onNavigate={setCurrentPage} />;
      case 'career-studio':
        return <AICareerStudio user={user} />;
      case 'about':
        return <AboutUs user={user} />;
      case 'cv-analysis':
        return <CVAnalysis user={user} />;
      case 'job-search':
        return <JobSearch user={user} />;
      case 'ml-jobs':
        return <MLJobRecommendations />;
      case 'interview-prep':
        return <InterviewPrep />;
      case 'enhanced-interview':
        return <EnhancedInterviewPrep />;
      case 'application-manager':
        return <ApplicationLifecycleManager />;
      case 'applications':
        return <ApplicationTracking user={user} />;
      case 'profile':
        return <ProfileSettings user={user} />;
      case 'messages':
        return <Messaging user={user} />;
      case 'pricing':
        return <Pricing user={user} />;
      case 'analytics':
        return <Analytics user={user} />;
      case 'candidate-database':
        return <CandidateDatabase user={user} />;
      case 'team-collaboration':
        return <TeamCollaboration user={user} />;
      default:
        return <Dashboard user={user} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: 'var(--background-1)' }}>
      {/* Premium Background Effects */}
      <AnimatedBlobs />
      <NeonGlowRings />
      <FloatingParticles count={40} />
      
      {isLoggedIn && (
        <Navigation 
          currentPage={currentPage} 
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
          user={user}
        />
      )}
      
      <main className={isLoggedIn ? 'ml-64' : ''}>
        {renderPage()}
      </main>

      {isLoggedIn && <AIAssistant />}
      {isLoggedIn && <AIChatbot />}
    </div>
  );
}