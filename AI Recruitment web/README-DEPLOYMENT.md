# 🚀 SmartHire AI - Vercel Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Project Status
- [x] React + Vite application
- [x] Dark mode implementation complete
- [x] Real-time data integration
- [x] Google OAuth authentication
- [x] Microsoft OAuth integration
- [x] Socket.IO server setup
- [x] Professional UI/UX design

## 🔧 Deployment Steps

### 1. **Vercel Account Setup**
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login
```

### 2. **Deploy to Vercel**
```bash
# Navigate to project directory
cd "AI Recruitment web"

# Deploy to Vercel
vercel

# Follow the prompts:
# ? Set up and deploy "~/AI Recruitment web"? [Y/n] Y
# ? Which scope do you want to deploy to? [Your Account]
# ? Link to existing project? [y/N] N
# ? What's your project's name? smarthire-ai-recruitment
# ? In which directory is your code located? ./
```

### 3. **Environment Variables Setup**

In your Vercel Dashboard, add these environment variables:

#### **Required Variables:**
```
VITE_GOOGLE_CLIENT_ID=550986261082-25n3dar3s01rld145ma1q06ksojfai6r.apps.googleusercontent.com
VITE_APP_NAME=SmartHire AI
NODE_ENV=production
VITE_NODE_ENV=production
```

#### **Optional Variables (for enhanced features):**
```
VITE_MICROSOFT_CLIENT_ID=your_microsoft_client_id
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_RAPIDAPI_KEY=your_rapidapi_key
```

### 4. **Domain Configuration**

#### **Update OAuth Redirect URIs:**
1. **Google Console** (https://console.cloud.google.com/):
   - Add your Vercel domain to authorized origins
   - Add redirect URI: `https://your-app-name.vercel.app`

2. **Microsoft Azure** (if using Microsoft OAuth):
   - Update redirect URIs in Azure App Registration
   - Add: `https://your-app-name.vercel.app`

### 5. **Custom Domain (Optional)**
```bash
# Add custom domain
vercel domains add yourdomain.com

# Configure DNS records as instructed by Vercel
```

## 📁 Project Structure
```
AI Recruitment web/
├── src/                    # React source code
├── public/                 # Static assets
├── server/                 # Socket.IO server (separate deployment)
├── build/                  # Build output (auto-generated)
├── vercel.json            # Vercel configuration
├── .vercelignore          # Files to ignore during deployment
├── .env.production        # Production environment variables
└── package.json           # Dependencies and scripts
```

## 🔧 Build Configuration

### **Vite Configuration** (`vite.config.ts`)
- ✅ React SWC plugin enabled
- ✅ Path aliases configured
- ✅ Build target: esnext
- ✅ Output directory: build

### **Vercel Configuration** (`vercel.json`)
- ✅ Static build with Vite
- ✅ SPA routing configuration
- ✅ Security headers
- ✅ API routes for Socket.IO server

## 🌐 Socket.IO Server Deployment

The Socket.IO server needs separate deployment:

### **Option 1: Railway**
```bash
# Deploy server to Railway
cd server
railway login
railway init
railway up
```

### **Option 2: Render**
```bash
# Deploy server to Render
# Connect GitHub repo and deploy server folder
```

### **Option 3: Heroku**
```bash
# Deploy server to Heroku
cd server
heroku create smarthire-socket-server
git push heroku main
```

## 🔐 Security Configuration

### **Environment Variables Security:**
- ✅ All sensitive data in Vercel environment variables
- ✅ No secrets in code repository
- ✅ Production-specific configuration

### **OAuth Security:**
- ✅ Authorized domains configured
- ✅ Redirect URIs whitelisted
- ✅ CORS properly configured

## 📊 Performance Optimization

### **Build Optimizations:**
- ✅ Vite for fast builds
- ✅ Code splitting enabled
- ✅ Asset optimization
- ✅ Tree shaking

### **Runtime Optimizations:**
- ✅ Lazy loading components
- ✅ Efficient state management
- ✅ Optimized images
- ✅ Minimal bundle size

## 🚀 Deployment Commands

### **Quick Deploy:**
```bash
# One-command deployment
vercel --prod
```

### **Development Preview:**
```bash
# Deploy preview branch
vercel
```

### **Production Deployment:**
```bash
# Deploy to production
vercel --prod
```

## 📱 Post-Deployment Testing

### **Functionality Checklist:**
- [ ] Landing page loads correctly
- [ ] Dark/light theme toggle works
- [ ] Google OAuth authentication
- [ ] Navigation between pages
- [ ] Real-time job data loading
- [ ] Interview prep camera/microphone
- [ ] Analytics charts rendering
- [ ] Mobile responsiveness
- [ ] Performance metrics

### **Performance Testing:**
```bash
# Test with Lighthouse
npx lighthouse https://your-app-name.vercel.app

# Expected scores:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 95+
# SEO: 90+
```

## 🔧 Troubleshooting

### **Common Issues:**

1. **Build Failures:**
   ```bash
   # Check build logs
   vercel logs
   
   # Local build test
   npm run build
   ```

2. **Environment Variables:**
   ```bash
   # Verify environment variables
   vercel env ls
   
   # Add missing variables
   vercel env add VARIABLE_NAME
   ```

3. **OAuth Issues:**
   - Verify redirect URIs match deployment URL
   - Check environment variables are set
   - Ensure domains are authorized

4. **Socket.IO Connection:**
   - Update Socket.IO server URL in production
   - Check CORS configuration
   - Verify server deployment status

## 📈 Monitoring & Analytics

### **Vercel Analytics:**
- ✅ Real-time performance monitoring
- ✅ Core Web Vitals tracking
- ✅ User analytics
- ✅ Error tracking

### **Custom Monitoring:**
```javascript
// Add to your app for custom analytics
if (process.env.NODE_ENV === 'production') {
  // Initialize analytics
  // Track user interactions
  // Monitor performance
}
```

## 🎯 Success Metrics

### **Deployment Success Indicators:**
- ✅ Build completes without errors
- ✅ All pages load correctly
- ✅ Authentication flows work
- ✅ Real-time features functional
- ✅ Mobile responsive design
- ✅ Fast loading times (<3s)
- ✅ High Lighthouse scores

## 📞 Support

### **Resources:**
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deploying)

### **Contact:**
- **Developer:** Ansh Ojha
- **Email:** anshojha420@gmail.com
- **Phone:** +91 9956126495

---

## 🎉 Ready for Production!

Your SmartHire AI Recruitment platform is now ready for deployment to Vercel with:
- ✅ Professional enterprise design
- ✅ Complete dark mode support
- ✅ Real-time job data integration
- ✅ Advanced authentication systems
- ✅ Comprehensive analytics
- ✅ Mobile-responsive interface
- ✅ Production-ready configuration

**Deploy Command:** `vercel --prod`