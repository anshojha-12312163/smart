# 🚀 Quick Deploy to Vercel - 5 Minutes

## Fastest Way to Deploy Your SmartHire AI

---

## Method 1: Deploy via Vercel Website (Recommended)

### Step 1: Go to Vercel
👉 **https://vercel.com/new**

### Step 2: Import Your GitHub Repo
1. Click **"Import Git Repository"**
2. Find: `anshojha-12312163/smart`
3. Click **"Import"**

### Step 3: Configure Project
```
Root Directory: AI Recruitment web
Framework: Vite
Build Command: npm run build
Output Directory: build
```

### Step 4: Add Environment Variables
```env
VITE_GOOGLE_CLIENT_ID=550986261082-25n3dar3s01rld145ma1q06ksojfai6r.apps.googleusercontent.com
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
VITE_USE_REAL_DATA=true
```

### Step 5: Click Deploy! 🚀

**Done!** Your app will be live in 2-3 minutes at:
```
https://your-app-name.vercel.app
```

---

## Method 2: Deploy via Vercel CLI

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login
```bash
vercel login
```

### Deploy
```bash
cd "AI Recruitment web"
vercel --prod
```

Follow the prompts and you're done!

---

## 🔧 After Deployment

### Update Google OAuth
1. Go to: https://console.cloud.google.com/apis/credentials
2. Add your Vercel URL to authorized origins:
   ```
   https://your-app-name.vercel.app
   ```

### Test Your App
1. Visit your Vercel URL
2. Test Google login
3. Test job search
4. All features should work!

---

## 🎉 That's It!

Your SmartHire AI is now live on Vercel!

**Need detailed help?** See `VERCEL_DEPLOYMENT_GUIDE.md`

**Questions?** Contact: anshojha420@gmail.com | +91 9956126495
