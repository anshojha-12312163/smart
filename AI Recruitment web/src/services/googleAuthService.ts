// Google OAuth Service for SmartHire AI
// Handles Google authentication flow

export interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  verified_email: boolean;
}

export interface GoogleAuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token?: string;
}

class GoogleAuthService {
  private clientId: string;
  private redirectUri: string;
  private scope: string[];

  constructor() {
    this.clientId = (import.meta as any).env.VITE_GOOGLE_CLIENT_ID || '';
    this.redirectUri = 'http://localhost:3001'; // Back to main page
    this.scope = [
      'openid',
      'email',
      'profile'
    ];
  }

  /**
   * Check if Google OAuth is configured
   */
  isConfigured(): boolean {
    return !!this.clientId;
  }

  /**
   * Generate Google OAuth authorization URL
   */
  getAuthUrl(): string {
    if (!this.isConfigured()) {
      throw new Error('Google OAuth not configured. Please set VITE_GOOGLE_CLIENT_ID in your environment variables.');
    }

    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scope.join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
      state: this.generateState()
    });

    return `https://accounts.google.com/oauth/authorize?${params.toString()}`;
  }

  /**
   * Initiate Google OAuth login
   */
  login(): void {
    try {
      const authUrl = this.getAuthUrl();
      console.log('🔐 Redirecting to Google OAuth...');
      console.log('🔗 Redirect URI being used:', this.redirectUri);
      console.log('🔗 Full Auth URL:', authUrl);
      
      // Let's try a different approach - open in same window but with a simple redirect
      alert(`About to redirect to Google OAuth.\n\nRedirect URI: ${this.redirectUri}\n\nClick OK to continue.`);
      
      window.location.href = authUrl;
    } catch (error) {
      console.error('Google OAuth initialization error:', error);
      throw error;
    }
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string): Promise<GoogleAuthResponse> {
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    
    const params = new URLSearchParams({
      client_id: this.clientId,
      client_secret: (import.meta as any).env.GOOGLE_CLIENT_SECRET || '',
      code,
      grant_type: 'authorization_code',
      redirect_uri: this.redirectUri
    });

    console.log('🔄 Exchanging code for token with Google...');
    console.log('🔗 Using redirect URI:', this.redirectUri);

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Token exchange failed:', errorData);
      throw new Error(errorData.error_description || 'Failed to exchange code for token');
    }

    const tokenData = await response.json();
    console.log('✅ Token exchange successful');
    return tokenData;
  }

  /**
   * Get user information from Google
   */
  async getUserInfo(accessToken: string): Promise<GoogleUserInfo> {
    const userInfoUrl = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`;
    
    console.log('🔄 Fetching user info from Google...');
    const response = await fetch(userInfoUrl);
    
    if (!response.ok) {
      console.error('❌ Failed to fetch user info from Google');
      throw new Error('Failed to fetch user information from Google');
    }

    const userInfo = await response.json();
    console.log('✅ User info received from Google:', {
      email: userInfo.email,
      name: userInfo.name,
      verified: userInfo.verified_email
    });
    
    return userInfo;
  }

  /**
   * Handle complete OAuth callback flow
   */
  async handleCallback(code: string): Promise<GoogleUserInfo> {
    try {
      console.log('🔐 Processing Google OAuth callback...');
      
      // Exchange code for access token
      const tokenResponse = await this.exchangeCodeForToken(code);
      
      // Get user information
      const userInfo = await this.getUserInfo(tokenResponse.access_token);
      
      console.log('✅ Google OAuth successful:', userInfo.email);
      
      return userInfo;
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      throw error;
    }
  }

  /**
   * Generate random state for CSRF protection
   */
  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  /**
   * Logout and revoke Google tokens
   */
  async logout(accessToken?: string): Promise<void> {
    if (accessToken) {
      try {
        await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
          method: 'POST'
        });
        console.log('🔐 Google tokens revoked');
      } catch (error) {
        console.warn('Failed to revoke Google tokens:', error);
      }
    }
  }
}

// Export singleton instance
export const googleAuthService = new GoogleAuthService();
export default googleAuthService;