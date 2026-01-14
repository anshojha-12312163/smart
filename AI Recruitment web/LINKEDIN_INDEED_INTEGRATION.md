# 🔗 LinkedIn & Indeed Real Data Integration Guide

## 🎯 Connect Real Job Data from LinkedIn and Indeed

**Status**: ✅ Ready to Implement  
**Contact**: anshojha420@gmail.com | +91 9956126495

---

## 📊 Overview

This guide shows you how to connect **REAL job data** from LinkedIn and Indeed directly into your SmartHire AI platform.

---

## 🚀 Quick Start - 3 Methods Available

### Method 1: RapidAPI (Easiest - Recommended) ⭐
- ✅ No complex setup
- ✅ Works immediately
- ✅ Free tier available
- ✅ LinkedIn + Indeed + Glassdoor

### Method 2: Direct API Integration
- ⚠️ Requires API approval
- ⚠️ More complex setup
- ✅ More control

### Method 3: Web Scraping (Backup)
- ⚠️ Against ToS
- ⚠️ Can break easily
- ✅ No API keys needed

**We'll use Method 1 (RapidAPI) - It's the best option!**

---

## 🔑 Step 1: Get API Keys (5 minutes)

### RapidAPI Setup

1. **Go to RapidAPI**
   - Visit: https://rapidapi.com/
   - Sign up for free account

2. **Subscribe to Job Search APIs**

   **LinkedIn Jobs API**:
   - Search: "LinkedIn Jobs Search"
   - API: https://rapidapi.com/rockapis-rockapis-default/api/linkedin-jobs-search
   - Click "Subscribe to Test"
   - Choose FREE plan (100 requests/month)
   - Copy your API key

   **Indeed Jobs API**:
   - Search: "Indeed Jobs Search"
   - API: https://rapidapi.com/letscrape-6bRBa3QguO5/api/indeed-jobs-search
   - Click "Subscribe to Test"
   - Choose FREE plan
   - Copy your API key

   **JSearch (Multi-source)**:
   - Search: "JSearch"
   - API: https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
   - Includes: LinkedIn, Indeed, Glassdoor, ZipRecruiter
   - FREE: 150 requests/month
   - Copy your API key

---

## 🔧 Step 2: Configure Your Application

### Update Environment Variables

Edit `AI Recruitment web/.env`:

```env
# Existing variables
VITE_API_URL=http://localhost:3002/api
VITE_SOCKET_URL=http://localhost:3002

# Add these NEW variables for real job data
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
VITE_RAPIDAPI_HOST_JSEARCH=jsearch.p.rapidapi.com
VITE_RAPIDAPI_HOST_LINKEDIN=linkedin-jobs-search.p.rapidapi.com
VITE_RAPIDAPI_HOST_INDEED=indeed-jobs-search.p.rapidapi.com

# Enable real data mode
VITE_USE_REAL_DATA=true
```

### Update Server Environment

Edit `AI Recruitment web/server/.env`:

```env
# Add RapidAPI configuration
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_HOST_JSEARCH=jsearch.p.rapidapi.com
RAPIDAPI_HOST_LINKEDIN=linkedin-jobs-search.p.rapidapi.com
RAPIDAPI_HOST_INDEED=indeed-jobs-search.p.rapidapi.com
```

---

## 📝 Step 3: API Integration Code

I'll create the integration files for you now...

