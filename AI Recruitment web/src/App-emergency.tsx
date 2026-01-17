import React from 'react';

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Smart<span style={{ color: '#93c5fd' }}>Hire</span>
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
          AI-Powered Recruitment Solutions
        </p>
        <button
          onClick={() => alert('Welcome to SmartHire! The app is working correctly.')}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#1d4ed8';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Get Started
        </button>
        <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.8 }}>
          ✅ App is running successfully on localhost:3001
        </div>
      </div>
    </div>
  );
}