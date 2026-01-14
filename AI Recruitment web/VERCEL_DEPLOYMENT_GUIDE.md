# 🚀 Deploy SmartHire AI to Vercel

## Complete Deployment Guide

**Time Required**: 10-15 minutes  
**Cost**: FREE (Vercel Hobby Plan)  
**Contact**: anshojha420@gmail.com | +91 9956126495

---

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ GitHub account with your code pushed
- ✅ Vercel account (free - sign up at vercel.com)
- ✅ Google OAuth Client ID
- ✅ RapidAPI Key (for job data)

---

## 🎯 Deployment Steps

### Step 1: Prepare Your Repository (Already Done! ✅)

Your code is already pushed to:
```
https://github.com/anshojha-12312163/smart.git
```

### Step 2: Sign Up for Vercel

1. Go to: **https://vercel.com/signup**
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account
4. Complete the signup process

### Step 3: Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find your repository: `anshojha-12312163/smart`
3. Click **"Import"**

### Step 4: Configure Project Settings

**Root Directory**:
```
AI Recruitment web
```

**Framework Preset**: Vite (should auto-detect)

**Build Command**:
```bash
npm run build
```

**Output Directory**:
```
build
```

**Install Command**:
```bash
npm install
```

### Step 5: Add Environment Variables

Click **"Environment Variables"** and add these:

#### Required Variables:

```env
VITE_GOOGLE_CLIENT_ID=550986261082-25n3dar3s01rld145ma1q06ksojfai6r.apps.googleusercontent.com
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
VITE_USE_REAL_DATA=true
```

#### Optional Variables (for backend):

```env
VITE_API_URL=https://your-backend-url.com/api
VITE_SOCKET_URL=https://your-socket-server.com
```

**Note**: If you don't have a backend yet, leave these empty. The app will use fallback data.

### Step 6: Update Google OAuth Settings

1. Go to: **https://console.cloud.google.com/apis/credentials**
2. Select your OAuth 2.0 Client ID
3. Add your Vercel URL to **Authorized JavaScript origins**:
   ```
   https://your-app-name.vercel.app
   ```
4. Add to **Authorized redirect URIs**:
   ```
   https://your-app-name.vercel.app
   https://your-app-name.vercel.app/auth/callback
   ```
5. Click **"Save"**

### Step 7: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Your app will be live at: `https://your-app-name.vercel.app`

---

## 🎉 Post-Deployment

### Test Your Deployment

1. Visit your Vercel URL
2. Test Google OAuth login
3. Test job search with real data
4. Check all features work correctly

### Get Your Production URL

Vercel will give you:
- **Production URL**: `https://your-app-name.vercel.app`
- **Preview URLs**: For each git push
- **Custom Domain**: Optional (can add later)

---

## 🔧 Vercel Configuration Files

### vercel.json (Already Created ✅)

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures:
- ✅ React Router works correctly
- ✅ All routes redirect to index.html
- ✅ SPA routing functions properly

### .vercelignore (Already Created ✅)

Excludes unnecessary files from deployment:
- node_modules
- .env files
- logs
- server folder (deploy separately)

---

## 🌐 Custom Domain (Optional)

### Add Your Own Domain

1. Go to your project settings in Vercel
2. Click **"Domains"**
3. Add your domain (e.g., `smarthire.ai`)
4. Follow DNS configuration instructions
5. Vercel provides free SSL certificate

---

## 🔄 Automatic Deployments

### How It Works

Every time you push to GitHub:
1. Vercel automatically detects the push
2. Builds your project
3. Deploys to production (main branch)
4. Creates preview URLs (other branches)

### Deploy Commands

```bash
# Make changes
git add .
git commit -m "your changes"
git push

# Vercel automatically deploys!
```

---

## 🚀 Deploy Socket.IO Server (Optional)

Your Socket.IO server needs separate deployment:

### Option 1: Deploy to Render.com (FREE)

1. Go to: **https://render.com**
2. Create new **Web Service**
3. Connect your GitHub repo
4. Set root directory: `AI Recruitment web/server`
5. Build command: `npm install`
6. Start command: `node server.js`
7. Add environment variables from `server/.env`
8. Deploy!

### Option 2: Deploy to Railway.app (FREE)

1. Go to: **https://railway.app**
2. Create new project from GitHub
3. Select `AI Recruitment web/server` folder
4. Add environment variables
5. Deploy!

### Option 3: Deploy to Heroku

1. Install Heroku CLI
2. Create new app
3. Deploy server folder
4. Add environment variables

### Update Frontend with Server URL

After deploying server, update Vercel environment variables:

```env
VITE_SOCKET_URL=https://your-server.onrender.com
VITE_API_URL=https://your-server.onrender.com/api
```

---

## 📊 Vercel Features You Get

### Free Tier Includes:

- ✅ **Unlimited deployments**
- ✅ **Automatic HTTPS/SSL**
- ✅ **Global CDN**
- ✅ **Preview deployments**
- ✅ **Analytics** (basic)
- ✅ **100GB bandwidth/month**
- ✅ **Custom domains**
- ✅ **Automatic CI/CD**

### Performance:

- ⚡ **Edge Network** - Fast worldwide
- ⚡ **Instant cache invalidation**
- ⚡ **Optimized builds**
- ⚡ **Image optimization**

---

## 🐛 Troubleshooting

### Build Fails

**Error**: `Module not found`
```bash
# Solution: Check package.json dependencies
npm install
npm run build
```

**Error**: `Out of memory`
```bash
# Solution: Increase Node memory in vercel.json
{
  "build": {
    "env": {
      "NODE_OPTIONS": "--max-old-space-size=4096"
    }
  }
}
```

### Routes Not Working

**Problem**: 404 on refresh

**Solution**: Already fixed in `vercel.json` with rewrites:
```json
"rewrites": [
  { "source": "/(.*)", "destination": "/index.html" }
]
```

### Environment Variables Not Working

**Problem**: API calls failing

**Solution**:
1. Check variables are prefixed with `VITE_`
2. Redeploy after adding variables
3. Clear cache and redeploy

### Google OAuth Not Working

**Problem**: OAuth redirect fails

**Solution**:
1. Add Vercel URL to Google Console
2. Update authorized origins
3. Update redirect URIs
4. Wait 5 minutes for changes to propagate

---

## 🔒 Security Best Practices

### Environment Variables

- ✅ Never commit `.env` files
- ✅ Use Vercel's environment variables
- ✅ Different keys for production/development
- ✅ Rotate API keys regularly

### API Keys

- ✅ Keep RapidAPI key secret
- ✅ Monitor usage on RapidAPI dashboard
- ✅ Set up rate limiting
- ✅ Use different keys for staging/production

---

## 📈 Monitoring & Analytics

### Vercel Analytics

1. Go to your project dashboard
2. Click **"Analytics"**
3. View:
   - Page views
   - Unique visitors
   - Performance metrics
   - Error rates

### Real-Time Monitoring

```bash
# View deployment logs
vercel logs your-app-name

# View build logs
vercel logs your-app-name --build
```

---

## 🎯 Production Checklist

Before going live:

- [ ] All environment variables added
- [ ] Google OAuth configured with production URL
- [ ] RapidAPI key added and tested
- [ ] Custom domain configured (optional)
- [ ] Socket.IO server deployed (optional)
- [ ] All features tested on production
- [ ] Error tracking set up
- [ ] Analytics configured
- [ ] Performance tested
- [ ] Mobile responsiveness checked
- [ ] SEO meta tags added

---

## 🚀 Quick Deploy Commands

### Using Vercel CLI (Optional)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
cd "AI Recruitment web"
vercel --prod

# Deploy to preview
vercel
```

---

## 📞 Support & Resources

### Vercel Documentation
- **Docs**: https://vercel.com/docs
- **Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions

### Your Project
- **GitHub**: https://github.com/anshojha-12312163/smart
- **Contact**: anshojha420@gmail.com | +91 9956126495

---

## 🎉 Summary

### What You'll Have After Deployment:

✅ **Live Production URL** - Your app accessible worldwide  
✅ **Automatic HTTPS** - Secure by default  
✅ **Global CDN** - Fast loading everywhere  
✅ **Auto Deployments** - Push to deploy  
✅ **Preview URLs** - Test before production  
✅ **Free Hosting** - No credit card required  

### Deployment Time:
⏱️ **10-15 minutes** from start to live!

---

## 🔗 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Deploy Now**: https://vercel.com/new
- **Documentation**: https://vercel.com/docs
- **Your GitHub**: https://github.com/anshojha-12312163/smart

---

**Ready to deploy?** Follow the steps above and your SmartHire AI will be live in minutes! 🚀

**Questions?** Contact: anshojha420@gmail.com | +91 9956126495
