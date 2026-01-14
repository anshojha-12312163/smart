// Real-time Socket.IO Service for SmartHire AI
import { io, Socket } from 'socket.io-client';

interface SocketEvents {
  // Job-related events
  'job:new': (job: any) => void;
  'job:updated': (job: any) => void;
  'job:deleted': (jobId: string) => void;
  'jobs:search': (data: any) => void;
  'jobs:results': (data: any) => void;
  'jobs:error': (error: any) => void;
  'jobs:update': (data: any) => void;
  
  // Application events
  'application:status_changed': (application: any) => void;
  'application:new': (application: any) => void;
  'application:interview_scheduled': (interview: any) => void;
  
  // Notification events
  'notification:new': (notification: any) => void;
  'notification:read': (notificationId: string) => void;
  
  // Messaging events
  'message:new': (message: any) => void;
  'message:typing': (data: { userId: string; isTyping: boolean }) => void;
  
  // Analytics events
  'analytics:profile_view': (data: any) => void;
  'analytics:job_view': (data: any) => void;
  'analytics:fetch': (data: any) => void;
  'analytics:data': (data: any) => void;
  
  // Interview events
  'interview:reminder': (interview: any) => void;
  'interview:started': (interview: any) => void;
  'interview:completed': (interview: any) => void;
  
  // Company events
  'company:fetch': (data: any) => void;
  'company:data': (data: any) => void;
  'company:error': (error: any) => void;
  
  // Connection events
  'connect': () => void;
  'disconnect': () => void;
  'error': (error: any) => void;
  'connection:success': (data: any) => void;
}

class SocketService {
  private socket: Socket | null = null;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private eventListeners: Map<string, Function[]> = new Map();

  constructor() {
    this.connect();
  }

  /**
   * Connect to Socket.IO server
   */
  connect(): void {
    try {
      // Get server URL from environment or use default
      const serverUrl = (import.meta as any).env?.VITE_SOCKET_URL || 'http://localhost:3002';
      
      console.log('🔌 Connecting to Socket.IO server:', serverUrl);
      
      this.socket = io(serverUrl, {
        transports: ['websocket', 'polling'],
        timeout: 20000,
        auth: {
          token: localStorage.getItem('authToken'),
          userId: this.getUserId(),
        },
        autoConnect: true,
      });

      this.setupEventListeners();
      
    } catch (error) {
      console.error('❌ Socket.IO connection error:', error);
    }
  }

  /**
   * Setup default event listeners
   */
  private setupEventListeners(): void {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => {
      console.log('✅ Socket.IO connected:', this.socket?.id);
      this.isConnected = true;
      this.reconnectAttempts = 0;
      
      // Join user room for personalized events
      this.joinUserRoom();
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket.IO disconnected:', reason);
      this.isConnected = false;
      
      // Auto-reconnect logic
      if (reason === 'io server disconnect') {
        this.socket?.connect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Socket.IO connection error:', error);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('❌ Max reconnection attempts reached');
      }
    });

    // Real-time job updates
    this.socket.on('job:new', (job) => {
      console.log('🆕 New job available:', job.title);
      this.triggerEvent('job:new', job);
    });

    this.socket.on('job:updated', (job) => {
      console.log('📝 Job updated:', job.title);
      this.triggerEvent('job:updated', job);
    });

    // Application status updates
    this.socket.on('application:status_changed', (application) => {
      console.log('📋 Application status changed:', application.status);
      this.triggerEvent('application:status_changed', application);
      
      // Show notification
      this.showNotification({
        title: 'Application Update',
        message: `Your application for ${application.jobTitle} is now ${application.status}`,
        type: 'application'
      });
    });

    // Real-time notifications
    this.socket.on('notification:new', (notification) => {
      console.log('🔔 New notification:', notification.title);
      this.triggerEvent('notification:new', notification);
    });

    // Real-time messaging
    this.socket.on('message:new', (message) => {
      console.log('💬 New message from:', message.senderName);
      this.triggerEvent('message:new', message);
    });

    // Interview reminders
    this.socket.on('interview:reminder', (interview) => {
      console.log('⏰ Interview reminder:', interview.company);
      this.triggerEvent('interview:reminder', interview);
      
      this.showNotification({
        title: 'Interview Reminder',
        message: `Interview with ${interview.company} in ${interview.timeUntil}`,
        type: 'interview',
        urgent: true
      });
    });

    // Analytics events
    this.socket.on('analytics:profile_view', (data) => {
      console.log('👁️ Profile viewed by:', data.viewerCompany);
      this.triggerEvent('analytics:profile_view', data);
    });
  }

  /**
   * Join user-specific room for personalized events
   */
  private joinUserRoom(): void {
    const userId = this.getUserId();
    if (userId && this.socket) {
      this.socket.emit('join:user_room', userId);
      console.log('🏠 Joined user room:', userId);
    }
  }

  /**
   * Get current user ID
   */
  private getUserId(): string | null {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        return userData.id || userData.googleId || null;
      }
    } catch (error) {
      console.error('Error getting user ID:', error);
    }
    return null;
  }

  /**
   * Subscribe to specific events
   */
  on<K extends keyof SocketEvents>(event: K, callback: SocketEvents[K]): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)?.push(callback);
  }

  /**
   * Unsubscribe from events
   */
  off<K extends keyof SocketEvents>(event: K, callback?: SocketEvents[K]): void {
    if (callback) {
      const listeners = this.eventListeners.get(event) || [];
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    } else {
      this.eventListeners.delete(event);
    }
  }

  /**
   * Trigger event listeners
   */
  private triggerEvent(event: string, data: any): void {
    const listeners = this.eventListeners.get(event) || [];
    listeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });
  }

  /**
   * Emit events to server
   */
  emit(event: string, data?: any): void {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    } else {
      console.warn('⚠️ Socket not connected, cannot emit:', event);
    }
  }

  /**
   * Send job application
   */
  applyToJob(jobId: string, applicationData: any): void {
    this.emit('job:apply', {
      jobId,
      applicationData,
      userId: this.getUserId(),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Send message
   */
  sendMessage(recipientId: string, message: string): void {
    this.emit('message:send', {
      recipientId,
      message,
      senderId: this.getUserId(),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Update typing status
   */
  setTyping(recipientId: string, isTyping: boolean): void {
    this.emit('message:typing', {
      recipientId,
      isTyping,
      userId: this.getUserId()
    });
  }

  /**
   * Mark notification as read
   */
  markNotificationRead(notificationId: string): void {
    this.emit('notification:mark_read', {
      notificationId,
      userId: this.getUserId()
    });
  }

  /**
   * Track profile view
   */
  trackProfileView(profileId: string): void {
    this.emit('analytics:track_view', {
      type: 'profile',
      targetId: profileId,
      viewerId: this.getUserId(),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track job view
   */
  trackJobView(jobId: string): void {
    this.emit('analytics:track_view', {
      type: 'job',
      targetId: jobId,
      viewerId: this.getUserId(),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Show browser notification
   */
  private showNotification(notification: {
    title: string;
    message: string;
    type: string;
    urgent?: boolean;
  }): void {
    // Check if browser notifications are supported and permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: notification.type,
        requireInteraction: notification.urgent || false
      });
    }
  }

  /**
   * Request notification permission
   */
  async requestNotificationPermission(): Promise<boolean> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  /**
   * Check connection status
   */
  isSocketConnected(): boolean {
    return this.isConnected && this.socket?.connected === true;
  }

  /**
   * Disconnect socket
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      console.log('🔌 Socket.IO disconnected manually');
    }
  }

  /**
   * Reconnect socket
   */
  reconnect(): void {
    this.disconnect();
    setTimeout(() => {
      this.connect();
    }, 1000);
  }
}

// Export singleton instance
export const socketService = new SocketService();
export default socketService;