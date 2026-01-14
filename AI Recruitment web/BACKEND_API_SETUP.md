# Backend API Setup for SmartHire AI OAuth

This document provides the complete backend API implementation needed for the OAuth authentication system.

## 🚀 Required API Endpoints

### 1. Authentication Endpoints

#### POST /api/auth/login
```typescript
// Email/Password Login
{
  "email": "user@example.com",
  "password": "userpassword"
}

// Response
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "userType": "jobseeker" | "recruiter",
    "avatar": "avatar_url"
  },
  "token": "jwt_token_here"
}
```

#### POST /api/auth/register
```typescript
// User Registration
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "userpassword",
  "hasResume": true
}

// Response
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "userType": "jobseeker",
    "avatar": null
  },
  "token": "jwt_token_here"
}
```

#### POST /api/auth/google/callback
```typescript
// Google OAuth Callback
{
  "code": "google_auth_code",
  "state": "csrf_state_token"
}

// Response
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@gmail.com",
    "name": "User Name",
    "userType": "jobseeker",
    "avatar": "google_avatar_url",
    "googleId": "google_user_id"
  },
  "token": "jwt_token_here"
}
```

#### POST /api/auth/linkedin/callback
```typescript
// LinkedIn OAuth Callback
{
  "code": "linkedin_auth_code",
  "state": "csrf_state_token"
}

// Response - Same format as Google
```

#### POST /api/auth/github/callback
```typescript
// GitHub OAuth Callback
{
  "code": "github_auth_code",
  "state": "csrf_state_token"
}

// Response - Same format as Google
```

## 🔧 Backend Implementation Examples

### Node.js/Express Implementation

```typescript
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { googleAuthService } from './services/googleAuth';
import { linkedinAuthService } from './services/linkedinAuth';
import { githubAuthService } from './services/githubAuth';

const app = express();
app.use(express.json());

// Email/Password Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user in database
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        avatar: user.avatar
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, hasResume } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      userType: 'jobseeker',
      hasResume
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        avatar: null
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Google OAuth Callback
app.post('/api/auth/google/callback', async (req, res) => {
  try {
    const { code, state } = req.body;
    
    // Exchange code for user info
    const googleUser = await googleAuthService.handleCallback(code);
    
    // Find or create user
    let user = await User.findOne({ 
      $or: [
        { googleId: googleUser.id },
        { email: googleUser.email }
      ]
    });
    
    if (!user) {
      user = await User.create({
        googleId: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
        avatar: googleUser.picture,
        userType: 'jobseeker',
        emailVerified: googleUser.verified_email
      });
    } else {
      // Update user with Google info
      user.googleId = googleUser.id;
      user.avatar = googleUser.picture;
      user.emailVerified = googleUser.verified_email;
      await user.save();
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        avatar: user.avatar,
        googleId: user.googleId
      },
      token
    });
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(400).json({ message: error.message });
  }
});

// LinkedIn OAuth Callback
app.post('/api/auth/linkedin/callback', async (req, res) => {
  try {
    const { code, state } = req.body;
    
    // Exchange code for user info
    const linkedinUser = await linkedinAuthService.handleCallback(code);
    
    // Similar implementation to Google OAuth
    // ... (implement LinkedIn user creation/update logic)
    
  } catch (error) {
    console.error('LinkedIn OAuth error:', error);
    res.status(400).json({ message: error.message });
  }
});

// GitHub OAuth Callback
app.post('/api/auth/github/callback', async (req, res) => {
  try {
    const { code, state } = req.body;
    
    // Exchange code for user info
    const githubUser = await githubAuthService.handleCallback(code);
    
    // Similar implementation to Google OAuth
    // ... (implement GitHub user creation/update logic)
    
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.status(400).json({ message: error.message });
  }
});
```

### Database Schema (MongoDB/Mongoose)

```typescript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for OAuth users
  
  // User Type
  userType: { 
    type: String, 
    enum: ['jobseeker', 'recruiter'], 
    default: 'jobseeker' 
  },
  
  // OAuth IDs
  googleId: { type: String, sparse: true },
  linkedinId: { type: String, sparse: true },
  githubId: { type: String, sparse: true },
  
  // Profile
  avatar: { type: String },
  bio: { type: String },
  location: { type: String },
  
  // Verification
  emailVerified: { type: Boolean, default: false },
  
  // Resume
  hasResume: { type: Boolean, default: false },
  resumeUrl: { type: String },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
```

### Environment Variables

```env
# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Database
MONGODB_URI=mongodb://localhost:27017/smarthire
# OR
DATABASE_URL=postgresql://username:password@localhost:5432/smarthire

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🔐 OAuth Service Implementations

### Google OAuth Service (Backend)

```typescript
import { OAuth2Client } from 'google-auth-library';

class GoogleAuthService {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.FRONTEND_URL}/auth/google/callback`
    );
  }

  async handleCallback(code: string) {
    const { tokens } = await this.client.getToken(code);
    this.client.setCredentials(tokens);

    const ticket = await this.client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    
    return {
      id: payload!.sub,
      email: payload!.email,
      name: payload!.name,
      picture: payload!.picture,
      verified_email: payload!.email_verified
    };
  }
}

export const googleAuthService = new GoogleAuthService();
```

## 🚀 Quick Start

1. **Install Dependencies**:
```bash
npm install express jsonwebtoken bcrypt google-auth-library mongoose cors helmet
npm install -D @types/express @types/jsonwebtoken @types/bcrypt
```

2. **Set Environment Variables**: Copy the env vars above to your `.env` file

3. **Implement Endpoints**: Use the code examples above

4. **Test OAuth Flow**:
   - Start your backend server
   - Configure OAuth providers with correct redirect URIs
   - Test the complete flow from frontend to backend

## 📝 Notes

- All OAuth providers return user data in the same format for consistency
- JWT tokens are used for session management
- Passwords are hashed with bcrypt for security
- Email addresses are stored in lowercase for consistency
- OAuth users don't require passwords
- Users can link multiple OAuth providers to one account

The frontend is now configured to work with these exact API endpoints!