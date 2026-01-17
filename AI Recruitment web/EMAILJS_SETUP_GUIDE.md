# 📧 EmailJS Setup Guide - Real Email Integration

**Send REAL emails from your contact form!**

---

## 🎯 What is EmailJS?

EmailJS allows you to send emails directly from your JavaScript application without a backend server.

**Benefits:**
- ✅ FREE tier (200 emails/month)
- ✅ No backend server needed
- ✅ Easy setup (5 minutes)
- ✅ Professional email templates
- ✅ Auto-reply support
- ✅ Email tracking

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create EmailJS Account

1. Go to: **https://www.emailjs.com/**
2. Click **"Sign Up"** (FREE)
3. Verify your email address
4. Log in to your dashboard

---

### Step 2: Add Email Service

1. In EmailJS dashboard, click **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for personal)
   - **Outlook** (recommended for business)
   - **Yahoo**, **Custom SMTP**, etc.

4. For **Gmail**:
   - Click **"Connect Account"**
   - Sign in with your Gmail (anshojha420@gmail.com)
   - Allow EmailJS permissions
   - Service ID will be auto-generated (e.g., `service_abc123`)

5. Click **"Create Service"**
6. **Copy your Service ID** (you'll need this)

---

### Step 3: Create Email Template

1. Click **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

**Template Name:** `contact_form_template`

**Subject:**
```
New Contact Message from {{from_name}} - SmartHire AI
```

**Content (HTML):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px;">📧 New Contact Message</h1>
    <p style="color: #f0f0f0; margin: 10px 0 0 0;">SmartHire AI Platform</p>
  </div>
  
  <div style="padding: 30px; background: white;">
    <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h2>
    
    <table style="width: 100%; margin: 20px 0;">
      <tr>
        <td style="padding: 10px; background: #f8f9fa; font-weight: bold; width: 30%;">👤 Name:</td>
        <td style="padding: 10px; background: #ffffff;">{{from_name}}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background: #f8f9fa; font-weight: bold;">📧 Email:</td>
        <td style="padding: 10px; background: #ffffff;">{{from_email}}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background: #f8f9fa; font-weight: bold;">🏢 Company:</td>
        <td style="padding: 10px; background: #ffffff;">{{company}}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background: #f8f9fa; font-weight: bold;">📱 Phone:</td>
        <td style="padding: 10px; background: #ffffff;">{{phone}}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background: #f8f9fa; font-weight: bold;">📋 Subject:</td>
        <td style="padding: 10px; background: #ffffff;">{{subject}}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background: #f8f9fa; font-weight: bold;">⏰ Time:</td>
        <td style="padding: 10px; background: #ffffff;">{{timestamp}}</td>
      </tr>
    </table>
    
    <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 30px;">💬 Message</h2>
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; white-space: pre-wrap; font-family: 'Courier New', monospace;">{{message}}</div>
    
    <div style="margin-top: 30px; padding: 20px; background: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 4px;">
      <p style="margin: 0; color: #1976d2; font-weight: bold;">📌 Action Required:</p>
      <p style="margin: 10px 0 0 0; color: #555;">Please respond to this inquiry within 24 hours.</p>
    </div>
  </div>
  
  <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; text-align: center; color: #666;">
    <p style="margin: 0; font-size: 14px;">SmartHire AI - Intelligent Recruitment Platform</p>
    <p style="margin: 5px 0 0 0; font-size: 12px;">anshojha420@gmail.com | +91 9956126495</p>
  </div>
</div>
```

4. Click **"Save"**
5. **Copy your Template ID** (e.g., `template_xyz789`)

---

### Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Find **"Public Key"** section
3. **Copy your Public Key** (e.g., `user_abc123xyz`)

---

### Step 5: Configure Your App

Add to `AI Recruitment web/.env`:

```env
# EmailJS Configuration (for contact form)
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=user_abc123xyz
```

Replace with your actual IDs from EmailJS dashboard.

---

### Step 6: Test It!

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Go to: http://localhost:3001
3. Scroll to **"Contact"** section
4. Fill out the form and click **"Send Message"**
5. Check your email (anshojha420@gmail.com)!

---

## 🎨 Optional: Create Auto-Reply Template

Send automatic confirmation emails to users!

1. Create another template: `auto_reply_template`

**Subject:**
```
Thank you for contacting SmartHire AI!
```

**Content:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px; text-align: center;">
    <h1 style="color: white; margin: 0;">✅ Message Received!</h1>
  </div>
  
  <div style="padding: 30px; background: white; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
    <p style="font-size: 16px; color: #333;">Hi {{to_name}},</p>
    
    <p style="font-size: 16px; color: #555; line-height: 1.6;">
      Thank you for reaching out to SmartHire AI! We have received your message and our team will respond within 24 hours.
    </p>
    
    <div style="background: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #667eea; margin: 0 0 10px 0;">📞 Need Immediate Assistance?</h3>
      <p style="margin: 5px 0; color: #555;">
        <strong>Email:</strong> anshojha420@gmail.com<br>
        <strong>Phone:</strong> +91 9956126495<br>
        <strong>Hours:</strong> Mon-Fri, 9am - 6pm IST
      </p>
    </div>
    
    <p style="font-size: 16px; color: #555; line-height: 1.6;">
      Best regards,<br>
      <strong>SmartHire AI Team</strong>
    </p>
  </div>
</div>
```

---

## 📊 Email Limits

### FREE Plan:
- ✅ **200 emails/month**
- ✅ **2 email services**
- ✅ **Unlimited templates**
- ✅ **Email tracking**

### Paid Plans (if needed):
- **Personal**: $7/month - 1,000 emails
- **Professional**: $15/month - 5,000 emails
- **Enterprise**: Custom pricing

---

## 🔧 Troubleshooting

### Emails not sending?

1. **Check configuration:**
   ```bash
   # Make sure these are in your .env file
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

2. **Restart server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

3. **Check EmailJS dashboard:**
   - Go to "Email History"
   - See if emails are being sent
   - Check for errors

4. **Check browser console:**
   - Open DevTools (F12)
   - Look for email service logs
   - Check for errors

### Gmail blocking emails?

1. Enable "Less secure app access" in Gmail settings
2. Or use Gmail App Password:
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Generate App Password
   - Use that in EmailJS

---

## 🎉 Success!

Your contact form now sends REAL emails!

**What happens when user submits:**
1. ✅ Email sent to you (anshojha420@gmail.com)
2. ✅ Auto-reply sent to user
3. ✅ Message saved in localStorage
4. ✅ Beautiful success message shown
5. ✅ Form resets automatically

---

## 📧 Fallback Methods

If EmailJS is not configured, the app will:
1. Try backend API (if available)
2. Open mailto link
3. Save message to localStorage
4. Show user how to contact directly

**Your app works even without EmailJS!**

---

## 🔐 Security Notes

- ✅ Public Key is safe to expose (it's meant to be public)
- ✅ Service ID and Template ID are also safe
- ✅ Never expose your Private Key
- ✅ EmailJS handles all email authentication

---

## 📞 Support

**Questions?**
- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- SmartHire Support: anshojha420@gmail.com

---

**Status**: ✅ **READY TO USE**

Your contact form is now configured to send real emails!

