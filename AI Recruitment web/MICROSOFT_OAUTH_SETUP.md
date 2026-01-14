# 🔧 Microsoft OAuth Setup - Step by Step Guide

## 📍 Current Status: You're in Azure Portal ✅

I can see you're already in the Microsoft Azure portal. Here's the complete step-by-step guide:

## 🚀 STEP-BY-STEP SETUP:

### Step 1: Register Your Application
1. **In Azure Portal** (where you are now):
   - Click on **"Azure Active Directory"** (or search for it)
   - Or go directly to: https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade

### Step 2: Create App Registration
1. **In Azure Active Directory**:
   - Click **"App registrations"** in the left sidebar
   - Click **"+ New registration"**

### Step 3: Configure Application Details
**Fill in the registration form:**
- **Name**: `SmartHire AI Web App`
- **Supported account types**: 
  - Select **"Accounts in any organizational directory and personal Microsoft accounts"**
- **Redirect URI**: 
  - Platform: **Web**
  - URI: `http://localhost:3001/auth/microsoft/callback`

### Step 4: Get Your Credentials
**After registration, you'll see:**
- **Application (client) ID**: Copy this (looks like: `12345678-1234-1234-1234-123456789012`)
- **Directory (tenant) ID**: Copy this too

### Step 5: Create Client Secret
1. **In your app registration**:
   - Click **"Certificates & secrets"** in left sidebar
   - Click **"+ New client secret"**
   - **Description**: `SmartHire AI Secret`
   - **Expires**: Choose **"24 months"**
   - Click **"Add"**
   - **IMPORTANT**: Copy the **Value** immediately (it won't show again!)

### Step 6: Configure Authentication
1. **In your app registration**:
   - Click **"Authentication"** in left sidebar
   - Under **"Platform configurations"**, click **"Add a platform"**
   - Select **"Web"**
   - **Redirect URIs**: Add these URLs:
     ```
     http://localhost:3001/auth/microsoft/callback
     http://localhost:3001
     ```
   - **Front-channel logout URL**: `http://localhost:3001`
   - Check **"Access tokens"** and **"ID tokens"**
   - Click **"Configure"**

### Step 7: Set API Permissions
1. **In your app registration**:
   - Click **"API permissions"** in left sidebar
   - Click **"+ Add a permission"**
   - Select **"Microsoft Graph"**
   - Select **"Delegated permissions"**
   - Add these permissions:
     - `User.Read` (should be there by default)
     - `email`
     - `openid`
     - `profile`
   - Click **"Add permissions"**

## 📝 UPDATE YOUR .ENV FILE:

After getting your credentials, update your `.env` file:

```env
# Microsoft OAuth Configuration
VITE_MICROSOFT_CLIENT_ID=your_application_client_id_here
MICROSOFT_CLIENT_SECRET=your_client_secret_value_here
MICROSOFT_TENANT_ID=your_directory_tenant_id_here
```

## 🔍 QUICK NAVIGATION PATHS:

### Direct Azure Links:
1. **Azure Active Directory**: https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade
2. **App Registrations**: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
3. **Create New App**: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/CreateApplicationBlade

### In Azure Portal Navigation:
```
Azure Portal → Azure Active Directory → App registrations → + New registration
```

## 🧪 TESTING YOUR SETUP:

### Test URLs to verify:
1. **Authorization URL**:
   ```
   https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3001/auth/microsoft/callback&scope=openid%20profile%20email
   ```

2. **Your App**: http://localhost:3001

## ⚠️ IMPORTANT NOTES:

1. **Copy Client Secret Immediately**: The secret value is only shown once!
2. **Use Correct Redirect URI**: Must match exactly: `http://localhost:3001/auth/microsoft/callback`
3. **Enable ID Tokens**: Required for OpenID Connect
4. **Tenant ID**: Use `common` for multi-tenant or your specific tenant ID

## 🎯 WHAT YOU NEED TO COPY:

1. **Application (client) ID** → Goes to `VITE_MICROSOFT_CLIENT_ID`
2. **Client Secret Value** → Goes to `MICROSOFT_CLIENT_SECRET`  
3. **Directory (tenant) ID** → Goes to `MICROSOFT_TENANT_ID`

## 🚀 NEXT STEPS:

1. **Complete the Azure setup** using steps above
2. **Copy your credentials** to `.env` file
3. **Restart your development server**: `npm run dev`
4. **Test Microsoft login** at http://localhost:3001

**Follow these steps and you'll have Microsoft OAuth working perfectly!** 🎉