// Mock Backend Service for Testing OAuth
// This simulates backend API responses for development/testing

export class MockBackendService {
  
  // Simulate Google OAuth callback processing
  static async handleGoogleCallback(code: string): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful Google OAuth response
    return {
      success: true,
      user: {
        id: 'google_' + Math.random().toString(36).substr(2, 9),
        email: 'user@gmail.com',
        name: 'Google User',
        avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
        userType: 'jobseeker',
        googleId: 'google_123456789',
        emailVerified: true
      },
      token: 'mock_jwt_token_' + Math.random().toString(36).substr(2, 20)
    };
  }
  
  // Simulate email/password login
  static async handleLogin(email: string, password: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple validation
    if (!email.includes('@')) {
      throw new Error('Invalid email format');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    return {
      success: true,
      user: {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: email.toLowerCase(),
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        avatar: null,
        userType: 'jobseeker',
        emailVerified: false
      },
      token: 'mock_jwt_token_' + Math.random().toString(36).substr(2, 20)
    };
  }
  
  // Simulate user registration
  static async handleRegister(name: string, email: string, password: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation
    if (name.length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
    
    if (!email.includes('@')) {
      throw new Error('Invalid email format');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    return {
      success: true,
      user: {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: email.toLowerCase(),
        name: name,
        avatar: null,
        userType: 'jobseeker',
        emailVerified: false
      },
      token: 'mock_jwt_token_' + Math.random().toString(36).substr(2, 20)
    };
  }
}