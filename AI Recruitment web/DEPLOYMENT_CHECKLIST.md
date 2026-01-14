# ✅ Vercel Deployment Checklist

## Pre-Deployment Checklist

### Code & Configuration
- [x] All code pushed to GitHub
- [x] `vercel.json` configuration created
- [x] `.vercelignore` file created
- [x] `vite.config.ts` optimized for production
- [x] Build command configured: `npm run build`
- [x] Output directory set: `build`

### Environment Variables Ready
- [ ] `VITE_GOOGLE_CLIENT_ID` - Your Google OAuth Client ID
- [ ] `VITE_RAPIDAPI_KEY` - Your RapidAPI key for job data
- [ ] `VITE_USE_REAL_DATA` - Set to `true`
- [ ] `VITE_API_URL` - (Optional) Your backend API URL
- [ ] `VITE_SOCKET_URL` - (Optional) Your Socket.IO server URL

### Accounts & Access
- [ ] Vercel account created (https://vercel.com/signup)
- [ ] GitHub connected to Vercel
- [ ] Google Cloud Console access
- [ ] RapidAPI account with JSearch subscription

---

## Deployment Steps

### 1. Import to Vercel
- [ ] Go to https://vercel.com/new
- [ ] Click "Import Git Repository"
- [ ] Select `anshojha-12312163/smart`
- [ ] Click "Import"

### 2. Configure Project
- [ ] Set Root Directory: `AI Recruitment web`
- [ ] Verify Framework: `Vite` (auto-detected)
- [ ] Verify Build Command: `npm run build`
- [ ] Verify Output Directory: `build`

### 3. Add Environment Variables
- [ ] Add `VITE_GOOGLE_CLIENT_ID`
- [ ] Add `VITE_RAPIDAPI_KEY`
- [ ] Add `VITE_USE_REAL_DATA=true`
- [ ] Add optional backend URLs if available

### 4. Deploy
- [ ] Click "Deploy" button
- [ ] Wait 2-3 minutes for build
- [ ] Note your deployment URL

---

## Post-Deployment Steps

### 1. Update Google OAuth
- [ ] Go to https://console.cloud.google.com/apis/credentials
- [ ] Select your OAuth 2.0 Client ID
- [ ] Add Vercel URL to "Authorized JavaScript origins":
  ```
  https://your-app-name.vercel.app
  ```
- [ ] Add to "Authorized redirect URIs":
  ```
  https://your-app-name.vercel.app
  https://your-app-name.vercel.app/auth/callback
  ```
- [ ] Click "Save"
- [ ] Wait 5 minutes for changes to propagate

### 2. Test Your Deployment
- [ ] Visit your Vercel URL
- [ ] Test landing page loads
- [ ] Test Google OAuth login
- [ ] Test job search functionality
- [ ] Test all navigation links
- [ ] Test on mobile device
- [ ] Test on different browsers

### 3. Verify Features
- [ ] Dashboard loads correctly
- [ ] Job search returns real data
- [ ] Company intelligence works
- [ ] Analytics display properly
- [ ] Interview prep accessible
- [ ] CV analysis functional
- [ ] All modals and dialogs work

---

## Optional: Custom Domain

### Add Custom Domain
- [ ] Go to Vercel project settings
- [ ] Click "Domains"
- [ ] Add your domain name
- [ ] Update DNS records as instructed
- [ ] Wait for SSL certificate (automatic)
- [ ] Update Google OAuth with new domain

---

## Optional: Deploy Socket.IO Server

### If Using Real-Time Features
- [ ] Choose hosting platform (Render/Railway/Heroku)
- [ ] Deploy `AI Recruitment web/server` folder
- [ ] Add server environment variables
- [ ] Get server URL
- [ ] Update Vercel env vars with server URL
- [ ] Redeploy frontend

---

## Troubleshooting Checklist

### Build Fails
- [ ] Check all dependencies in package.json
- [ ] Verify Node version compatibility
- [ ] Check build logs in Vercel dashboard
- [ ] Try building locally: `npm run build`

### Routes Don't Work
- [ ] Verify `vercel.json` rewrites are configured
- [ ] Check SPA routing setup
- [ ] Clear Vercel cache and redeploy

### OAuth Fails
- [ ] Verify Google Client ID is correct
- [ ] Check authorized origins include Vercel URL
- [ ] Wait 5 minutes after updating Google Console
- [ ] Check browser console for errors

### API Calls Fail
- [ ] Verify environment variables are set
- [ ] Check RapidAPI key is valid
- [ ] Verify `VITE_USE_REAL_DATA=true`
- [ ] Check API quota on RapidAPI dashboard

---

## Performance Checklist

### Optimization
- [x] Code splitting configured in vite.config.ts
- [x] Asset caching headers set in vercel.json
- [x] Build output optimized
- [ ] Images optimized (if any added)
- [ ] Lazy loading implemented where needed

### Monitoring
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking (optional)
- [ ] Monitor API usage on RapidAPI
- [ ] Check performance metrics

---

## Security Checklist

### Environment Variables
- [x] No `.env` files committed to Git
- [ ] All secrets in Vercel environment variables
- [ ] Different keys for dev/production
- [ ] API keys have usage limits set

### OAuth Security
- [ ] Authorized origins restricted to your domains
- [ ] Redirect URIs properly configured
- [ ] Client secret kept secure (if using)

---

## Documentation Checklist

### Files Created
- [x] `vercel.json` - Vercel configuration
- [x] `.vercelignore` - Deployment exclusions
- [x] `VERCEL_DEPLOYMENT_GUIDE.md` - Complete guide
- [x] `DEPLOY_TO_VERCEL.md` - Quick guide
- [x] `README_DEPLOYMENT.md` - Overview
- [x] `DEPLOYMENT_CHECKLIST.md` - This file

### All Pushed to GitHub
- [x] All deployment files committed
- [x] All documentation committed
- [x] Latest changes pushed to main branch

---

## Final Verification

### Before Going Live
- [ ] All features tested on production
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility checked
- [ ] Performance acceptable (< 3s load time)
- [ ] No console errors
- [ ] All links work correctly
- [ ] Forms submit properly
- [ ] Error handling works

### Ready for Users
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled
- [ ] Monitoring set up
- [ ] Support contact info updated
- [ ] User documentation ready

---

## 🎉 Deployment Complete!

Once all items are checked, your SmartHire AI is live and ready for users!

**Your Production URL**: `https://your-app-name.vercel.app`

**Dashboard**: https://vercel.com/dashboard

**Support**: anshojha420@gmail.com | +91 9956126495

---

## Quick Reference

### Redeploy
```bash
git add .
git commit -m "your changes"
git push
# Vercel auto-deploys!
```

### View Logs
```bash
vercel logs your-app-name
```

### Environment Variables
Update in Vercel dashboard → Settings → Environment Variables → Redeploy

---

**Congratulations on your deployment! 🚀**
