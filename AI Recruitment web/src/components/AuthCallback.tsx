import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface AuthCallbackProps {
  onLogin: (userData: any) => void;
}

export function AuthCallback({ onLogin }: AuthCallbackProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('🔍 AuthCallback component loaded');
        console.log('🔍 Current URL:', window.location.href);
        console.log('🔍 Search params:', window.location.search);
        console.log('🔍 Pathname:', window.location.pathname);
        
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        const provider = window.location.pathname.split('/')[2]; // Extract provider from URL

        console.log('🔍 OAuth params:', { 
          code: code ? code.substring(0, 20) + '...' : null, 
          state, 
          error, 
          errorDescription,
          provider 
        });

        // Handle OAuth errors from Google
        if (error) {
          let errorMessage = `OAuth Error: ${error}`;
          if (errorDescription) {
            errorMessage += ` - ${errorDescription}`;
          }
          throw new Error(errorMessage);
        }

        // Check if we have an authorization code
        if (!code) {
          console.error('❌ No authorization code in URL params');
          console.error('❌ Full search params:', Object.fromEntries(searchParams.entries()));
          throw new Error('No authorization code received from Google. Please try again.');
        }

        console.log('✅ Authorization code received, processing...');
        setMessage(`Completing ${provider} authentication...`);

        let userData;
        
        // REAL AUTHENTICATION - NO MOCK DATA
        // This component is for redirect-based OAuth (not needed for our popup implementation)
        // But keeping it for future use with other OAuth providers
        
        console.log('⚠️ AuthCallback component called - not needed for popup-based Google OAuth');
        
        // For now, redirect to home
        setStatus('success');
        setMessage('Redirecting to home...');
        
        setTimeout(() => {
          navigate('/');
        }, 1000);

      } catch (error: any) {
        console.error('❌ OAuth callback error:', error);
        setStatus('error');
        setMessage(`Authentication failed: ${error.message}`);
        
        setTimeout(() => {
          navigate('/?error=auth_failed');
        }, 3000);
      }
    };

    // Only run if we're on the callback page
    if (window.location.pathname.includes('/auth/')) {
      handleCallback();
    }
  }, [searchParams, navigate, onLogin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authenticating...</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Success!</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Failed</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}