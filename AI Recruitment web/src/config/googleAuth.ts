// Google OAuth Configuration for SmartHire AI
// This file contains the configuration and helper functions for Google authentication

export interface GoogleAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string[];
}

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  verified_email: boolean;
  given_name: string;
  family_name: string;
}

// Google OAuth Configuration
export const googleAuthConfig: GoogleAuthConfig = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  redirectUri: (import.meta.env.VITE_APP_URL || window.location.origin) + '/auth/google/callback',
  scope: [
    'openid',
    'email',
    'profile'
  ]
};

// OAuth URLs
export const GOOGLE_AUTH_URL = 'https://accounts.google.com/oauth/authorize';
export const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization';
export const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';

/**
 * Generate Google OAuth authorization URL
 */
export function getGoogleAuthUrl(): string {
  if (!googleAuthConfig.clientId) {
    throw new Error('Google Client ID not configured. Please set VITE_GOOGLE_CLIENT_ID in your environment variables.');
  }

  const params = new URLSearchParams({
    client_id: googleAuthConfig.clientId,
    redirect_uri: googleAuthConfig.redirectUri,
    scope: googleAuthConfig.scope.join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent'
  });

  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

/**
 * Generate LinkedIn OAuth authorization URL
 */
export function getLinkedInAuthUrl(): string {
  const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
  if (!clientId) {
    throw new Error('LinkedIn Client ID not configured. Please set VITE_LINKEDIN_CLIENT_ID in your environment variables.');
  }

  const redirectUri = (import.meta.env.VITE_APP_URL || window.location.origin) + '/auth/linkedin/callback';
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'r_liteprofile r_emailaddress'
  });

  return `${LINKEDIN_AUTH_URL}?${params.toString()}`;
}

/**
 * Generate GitHub OAuth authorization URL
 */
export function getGitHubAuthUrl(): string {
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  if (!clientId) {
    throw new Error('GitHub Client ID not configured. Please set VITE_GITHUB_CLIENT_ID in your environment variables.');
  }

  const redirectUri = (import.meta.env.VITE_APP_URL || window.location.origin) + '/auth/github/callback';
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'user:email'
  });

  return `${GITHUB_AUTH_URL}?${params.toString()}`;
}

/**
 * Initialize OAuth login flow for any provider
 */
export function initiateOAuthLogin(provider: 'google' | 'linkedin' | 'github'): void {
  try {
    let authUrl: string;
    
    switch (provider) {
      case 'google':
        authUrl = getGoogleAuthUrl();
        break;
      case 'linkedin':
        authUrl = getLinkedInAuthUrl();
        break;
      case 'github':
        authUrl = getGitHubAuthUrl();
        break;
      default:
        throw new Error(`Unsupported OAuth provider: ${provider}`);
    }
    
    // Redirect to OAuth provider
    window.location.href = authUrl;
    
  } catch (error) {
    console.error(`OAuth initialization error for ${provider}:`, error);
    throw error;
  }
}

/**
 * Check if OAuth providers are configured
 */
export function getConfiguredProviders(): string[] {
  const providers: string[] = [];
  
  if (import.meta.env.VITE_GOOGLE_CLIENT_ID) {
    providers.push('google');
  }
  
  if (import.meta.env.VITE_LINKEDIN_CLIENT_ID) {
    providers.push('linkedin');
  }
  
  if (import.meta.env.VITE_GITHUB_CLIENT_ID) {
    providers.push('github');
  }
  
  return providers;
}

export default {
  googleAuthConfig,
  getGoogleAuthUrl,
  getLinkedInAuthUrl,
  getGitHubAuthUrl,
  initiateOAuthLogin,
  getConfiguredProviders
};