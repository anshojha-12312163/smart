# ⚡ QUICK START - Connect Real LinkedIn & Indeed Data

## 🎯 Get Real Job Data in 3 Steps (5 Minutes)

---

## Step 1: Get FREE API Key (2 minutes)

1. Go to: **https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch**
2. Click **"Sign Up"** (free)
3. Click **"Subscribe to Test"**
4. Choose **"Basic"** plan (FREE - 150 requests/month)
5. **Copy your API key** (looks like: `abc123def456...`)

---

## Step 2: Add API Key to .env (1 minute)

Open `AI Recruitment web/.env` and add:

```env
VITE_RAPIDAPI_KEY=paste_your_api_key_here
VITE_USE_REAL_DATA=true
```

Save the file.

---

## Step 3: Restart & Test (2 minutes)

```bash
# Stop your dev server (Ctrl+C)
# Start it again
npm run dev
```

Then:
1. Open http://localhost:3001
2. Go to **Job Search**
3. Search for "Software Engineer" in "San Francisco"
4. Click **"Find jobs"**

**You should see REAL jobs from LinkedIn, Indeed, and Glassdoor!** 🎉

---

## ✅ Success Check

Look for these in your browser console:
```
🔍 Fetching REAL jobs from LinkedIn, Indeed, Glassdoor...
✅ Found 25 REAL jobs!
🎉 SUCCESS: Loaded 25 REAL jobs!
```

---

## 🚨 Troubleshooting

**No jobs showing?**
- Check your API key is correct in `.env`
- Restart your dev server
- Try search term: "developer" location: "United States"

**API error?**
- Make sure you subscribed to JSearch API on RapidAPI
- Check you copied the full API key
- Verify your subscription is active

---

## 📊 What You Get

- ✅ Real jobs from LinkedIn
- ✅ Real jobs from Indeed  
- ✅ Real jobs from Glassdoor
- ✅ Real jobs from ZipRecruiter
- ✅ 150 FREE searches per month
- ✅ Real company names, salaries, descriptions
- ✅ Direct apply links

---

## 🎉 That's It!

Your app now shows **REAL job data** from multiple sources!

**Need detailed help?** See `CONNECT_LINKEDIN_INDEED.md`

**Contact**: anshojha420@gmail.com | +91 9956126495
