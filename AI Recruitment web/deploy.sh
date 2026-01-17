#!/bin/bash

# 🚀 SmartHire AI - Vercel Deployment Script
# Author: Ansh Ojha (anshojha420@gmail.com)

echo "🚀 Starting SmartHire AI Deployment to Vercel..."
echo "================================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "🔑 Please login to Vercel:"
    vercel login
fi

# Build the project locally first to check for errors
echo "🔨 Building project locally..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Local build successful!"
else
    echo "❌ Local build failed. Please fix errors before deploying."
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment Successful!"
    echo "========================"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Set up environment variables in Vercel Dashboard"
    echo "2. Configure OAuth redirect URIs"
    echo "3. Test all functionality"
    echo ""
    echo "🔧 Required Environment Variables:"
    echo "- VITE_GOOGLE_CLIENT_ID"
    echo "- VITE_APP_NAME"
    echo "- NODE_ENV=production"
    echo ""
    echo "📱 Test your deployment:"
    echo "- Landing page functionality"
    echo "- Dark/light theme toggle"
    echo "- Google OAuth authentication"
    echo "- Navigation and routing"
    echo "- Real-time features"
    echo ""
    echo "🎯 Your SmartHire AI platform is now live!"
else
    echo "❌ Deployment failed. Check the error messages above."
    exit 1
fi