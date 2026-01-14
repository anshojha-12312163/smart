# 🔧 Fix Google OAuth "Error 401: invalid_client"

## 🚨 Current Issue:
**Error**: "Access blocked: Authorization Error - The OAuth client was not found. Error 401: invalid_client"

This means the Google Client ID is not properly configured in Google Cloud Console.

## ✅ STEP-BY-STEP FIX:

### Step 1: Go to Google Cloud Console
1. **Visit**: https://console.cloud.google.com/
2. **Login** with your Google account
3. **Select or Create** a project for SmartHire AI

### Step 2: Enable Google+ API
1. **Go to**: APIs & Services → Library
2. **Search for**: "Google+ API" or "People API"
3. **Click**: Enable
4. **Also Enable**: "Google Identity Services API"

### Step 3: Create OAuth 2.0 Credentials
1. **Go to**: APIs & Services → Credentials
2. **Click**: "+ CREATE CREDENTIALS"
3. **Select**: "OAuth 2.0 Client IDs"
4. **Application type**: Web application
5. **Name**: SmartHire AI Web Client

### Step 4: Configure Authorized Origins
**CRITICAL**: Add these exact URLs:

**Authorized JavaScript origins**:
```
http://localhost:3001
http://127.0.0.1:3001
```

**Authorized redirect URIs** (leave empty for popup-based auth):
```
(No redirect URIs needed for popup authentication)
```

### Step 5: Get Your New Client ID
1. **Copy** the Client ID (looks like: `123456789-abcdefg.apps.googleusercontent.com`)
2. **Copy** the Client Secret (for future backend use)

### Step 6: Update Your .env File
Replace the current Client ID with your new one:

```env
VITE_GOOGLE_CLIENT_ID=YOUR_NEW_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_NEW_CLIENT_SECRET_HERE
```

### Step 7: Restart Development Server
```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

## 🔍 ALTERNATIVE: Use Test Client ID

If you want to test immediately, I can provide a working test Client ID:

### Option A: Create Your Own (Recommended)
Follow steps 1-6 above to create your own Google OAuth client.

### Option B: Quick Test Setup
1. **Go to**: https://console.cloud.google.com/
2. **Create** a new project: "SmartHire-Test"
3. **Enable** Google+ API
4. **Create** OAuth 2.0 credentials
5. **Add** `http://localhost:3001` to authorized origins
6. **Copy** your new Client ID to `.env`

## 🧪 VERIFY SETUP:

### Test Your Configuration:
1. **Visit**: https://developers.google.com/oauthplayground/
2. **Click**: Settings (gear icon)
3. **Check**: "Use your own OAuth credentials"
4. **Enter**: Your Client ID and Secret
5. **Test**: If it works here, it will work in your app

### Expected Result:
- ✅ No "invalid_client" error
- ✅ Google login popup appears
- ✅ Successful authentication
- ✅ Real user data retrieved

## 🚨 COMMON MISTAKES TO AVOID:

1. **Wrong Origins**: Must be exactly `http://localhost:3001` (no trailing slash)
2. **API Not Enabled**: Must enable Google+ API or People API
3. **Wrong Application Type**: Must be "Web application"
4. **Case Sensitivity**: Client ID is case-sensitive
5. **Cache Issues**: Clear browser cache after changes

## 🎯 QUICK FIX CHECKLIST:

- [ ] Google Cloud project created
- [ ] Google+ API enabled
- [ ] OAuth 2.0 client created
- [ ] `http://localhost:3001` added to authorized origins
- [ ] New Client ID copied to `.env` file
- [ ] Development server restarted
- [ ] Browser cache cleared

**After following these steps, your Google OAuth should work perfectly!** 🚀

## 📞 Need Help?
If you're still having issues:
1. **Check**: Google Cloud Console → APIs & Services → Credentials
2. **Verify**: Your Client ID is active and properly configured
3. **Test**: Use Google OAuth Playground to verify credentials
4. **Clear**: Browser cache and cookies for localhost:3001