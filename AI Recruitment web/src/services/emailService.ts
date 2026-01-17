// Real Email Service for Contact Form
// Uses EmailJS for sending real emails

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

class EmailService {
  private emailJsServiceId: string;
  private emailJsTemplateId: string;
  private emailJsPublicKey: string;
  private recipientEmail: string;

  constructor() {
    // EmailJS configuration from environment variables
    this.emailJsServiceId = (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID || '';
    this.emailJsTemplateId = (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID || '';
    this.emailJsPublicKey = (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY || '';
    this.recipientEmail = 'anshojha420@gmail.com';
  }

  /**
   * Send contact form email using EmailJS
   */
  async sendContactEmail(formData: ContactFormData): Promise<EmailResponse> {
    try {
      // Check if EmailJS is configured
      if (!this.emailJsServiceId || !this.emailJsTemplateId || !this.emailJsPublicKey) {
        console.warn('⚠️ EmailJS not configured, using fallback method');
        return this.sendEmailFallback(formData);
      }

      console.log('📧 Sending email via EmailJS...');

      // Load EmailJS SDK dynamically
      const emailjs = await this.loadEmailJS();

      // Prepare email template parameters
      const templateParams = {
        to_email: this.recipientEmail,
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        company: formData.company || 'Not specified',
        phone: formData.phone || 'Not provided',
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toLocaleString(),
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        this.emailJsServiceId,
        this.emailJsTemplateId,
        templateParams,
        this.emailJsPublicKey
      );

      console.log('✅ Email sent successfully:', response);

      return {
        success: true,
        message: 'Your message has been sent successfully! We will respond within 24 hours.',
      };

    } catch (error) {
      console.error('❌ Error sending email:', error);
      
      // Try fallback method
      return this.sendEmailFallback(formData);
    }
  }

  /**
   * Fallback method: Use mailto link or backend API
   */
  private async sendEmailFallback(formData: ContactFormData): Promise<EmailResponse> {
    try {
      console.log('📧 Using fallback email method...');

      // Try backend API if available
      const apiUrl = (import.meta as any).env?.VITE_API_URL;
      
      if (apiUrl) {
        const response = await fetch(`${apiUrl}/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          return {
            success: true,
            message: 'Your message has been sent successfully!',
          };
        }
      }

      // If no backend, save to localStorage and show mailto link
      this.saveToLocalStorage(formData);
      this.openMailtoLink(formData);

      return {
        success: true,
        message: 'Your message has been saved. Please complete sending via your email client.',
      };

    } catch (error) {
      console.error('❌ Fallback email method failed:', error);
      
      // Last resort: save locally
      this.saveToLocalStorage(formData);
      
      return {
        success: false,
        message: 'Unable to send email automatically. Please contact us directly at anshojha420@gmail.com',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Load EmailJS SDK dynamically
   */
  private async loadEmailJS(): Promise<any> {
    // Check if EmailJS is already loaded
    if ((window as any).emailjs) {
      return (window as any).emailjs;
    }

    // Load EmailJS SDK
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.async = true;
      
      script.onload = () => {
        const emailjs = (window as any).emailjs;
        if (emailjs) {
          emailjs.init(this.emailJsPublicKey);
          resolve(emailjs);
        } else {
          reject(new Error('EmailJS failed to load'));
        }
      };
      
      script.onerror = () => reject(new Error('Failed to load EmailJS SDK'));
      
      document.head.appendChild(script);
    });
  }

  /**
   * Save contact form data to localStorage
   */
  private saveToLocalStorage(formData: ContactFormData): void {
    try {
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      messages.push({
        ...formData,
        timestamp: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9),
      });
      localStorage.setItem('contactMessages', JSON.stringify(messages));
      console.log('💾 Message saved to localStorage');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Open mailto link as fallback
   */
  private openMailtoLink(formData: ContactFormData): void {
    const subject = encodeURIComponent(`SmartHire Contact: ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || 'Not specified'}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `---\n` +
      `Sent from SmartHire AI Contact Form\n` +
      `Timestamp: ${new Date().toLocaleString()}`
    );

    const mailtoLink = `mailto:${this.recipientEmail}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  }

  /**
   * Format email for display
   */
  formatEmailMessage(formData: ContactFormData): string {
    return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 NEW CONTACT MESSAGE - SmartHire AI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 FROM:
   ${formData.firstName} ${formData.lastName}
   
📧 EMAIL:
   ${formData.email}
   
🏢 COMPANY:
   ${formData.company || 'Not specified'}
   
📱 PHONE:
   ${formData.phone || 'Not provided'}
   
📋 SUBJECT:
   ${formData.subject}
   
💬 MESSAGE:
   ${formData.message}
   
⏰ TIMESTAMP:
   ${new Date().toLocaleString()}
   
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();
  }

  /**
   * Send auto-reply to user
   */
  async sendAutoReply(userEmail: string, userName: string): Promise<void> {
    try {
      if (!this.emailJsServiceId || !this.emailJsPublicKey) {
        return;
      }

      const emailjs = await this.loadEmailJS();

      const templateParams = {
        to_email: userEmail,
        to_name: userName,
        from_name: 'SmartHire AI Team',
        message: `Thank you for contacting SmartHire AI! We have received your message and will respond within 24 hours.\n\nBest regards,\nSmartHire AI Team\n\nContact: anshojha420@gmail.com\nPhone: +91 9956126495`,
      };

      await emailjs.send(
        this.emailJsServiceId,
        'auto_reply_template', // You'll need to create this template in EmailJS
        templateParams,
        this.emailJsPublicKey
      );

      console.log('✅ Auto-reply sent to user');
    } catch (error) {
      console.warn('⚠️ Could not send auto-reply:', error);
    }
  }

  /**
   * Check if EmailJS is configured
   */
  isConfigured(): boolean {
    return !!(this.emailJsServiceId && this.emailJsTemplateId && this.emailJsPublicKey);
  }

  /**
   * Get configuration status
   */
  getStatus(): {
    configured: boolean;
    method: string;
    message: string;
  } {
    if (this.isConfigured()) {
      return {
        configured: true,
        method: 'EmailJS',
        message: 'Email service is fully configured and ready to send emails.',
      };
    }

    return {
      configured: false,
      method: 'Fallback',
      message: 'EmailJS not configured. Using fallback methods (mailto/localStorage).',
    };
  }
}

// Export singleton instance
export const emailService = new EmailService();
export default emailService;
