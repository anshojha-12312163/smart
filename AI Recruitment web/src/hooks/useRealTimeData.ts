// React Hook for Real-time Data with Socket.IO
import { useState, useEffect, useCallback } from 'react';
import { socketService } from '../services/socketService';

interface UseRealTimeDataOptions {
  autoConnect?: boolean;
  enableNotifications?: boolean;
}

interface RealTimeData {
  jobs: any[];
  applications: any[];
  notifications: any[];
  messages: any[];
  analytics: any;
  interviews: any[];
}

export function useRealTimeData(options: UseRealTimeDataOptions = {}) {
  const { autoConnect = true, enableNotifications = true } = options;
  
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<RealTimeData>({
    jobs: [],
    applications: [],
    notifications: [],
    messages: [],
    analytics: {},
    interviews: []
  });
  
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting');

  // Update connection status
  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
      setConnectionStatus('connected');
      console.log('✅ Real-time data connected');
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      setConnectionStatus('disconnected');
      console.log('❌ Real-time data disconnected');
    };

    const handleError = (error: any) => {
      setConnectionStatus('error');
      console.error('❌ Real-time data error:', error);
    };

    // Subscribe to connection events
    socketService.on('connect', handleConnect);
    socketService.on('disconnect', handleDisconnect);
    socketService.on('error', handleError);

    // Check initial connection status
    if (socketService.isSocketConnected()) {
      handleConnect();
    }

    return () => {
      socketService.off('connect', handleConnect);
      socketService.off('disconnect', handleDisconnect);
      socketService.off('error', handleError);
    };
  }, []);

  // Handle real-time job updates
  useEffect(() => {
    const handleNewJob = (job: any) => {
      setData(prev => ({
        ...prev,
        jobs: [job, ...prev.jobs].slice(0, 100) // Keep latest 100 jobs
      }));
    };

    const handleJobUpdate = (updatedJob: any) => {
      setData(prev => ({
        ...prev,
        jobs: prev.jobs.map(job => 
          job.id === updatedJob.id ? { ...job, ...updatedJob } : job
        )
      }));
    };

    const handleJobDelete = (jobId: string) => {
      setData(prev => ({
        ...prev,
        jobs: prev.jobs.filter(job => job.id !== jobId)
      }));
    };

    socketService.on('job:new', handleNewJob);
    socketService.on('job:updated', handleJobUpdate);
    socketService.on('job:deleted', handleJobDelete);

    return () => {
      socketService.off('job:new', handleNewJob);
      socketService.off('job:updated', handleJobUpdate);
      socketService.off('job:deleted', handleJobDelete);
    };
  }, []);

  // Handle real-time application updates
  useEffect(() => {
    const handleApplicationStatusChange = (application: any) => {
      setData(prev => ({
        ...prev,
        applications: prev.applications.map(app =>
          app.id === application.id ? { ...app, ...application } : app
        )
      }));
    };

    const handleNewApplication = (application: any) => {
      setData(prev => ({
        ...prev,
        applications: [application, ...prev.applications]
      }));
    };

    socketService.on('application:status_changed', handleApplicationStatusChange);
    socketService.on('application:new', handleNewApplication);

    return () => {
      socketService.off('application:status_changed', handleApplicationStatusChange);
      socketService.off('application:new', handleNewApplication);
    };
  }, []);

  // Handle real-time notifications
  useEffect(() => {
    const handleNewNotification = (notification: any) => {
      setData(prev => ({
        ...prev,
        notifications: [notification, ...prev.notifications].slice(0, 50) // Keep latest 50
      }));
    };

    const handleNotificationRead = (notificationId: string) => {
      setData(prev => ({
        ...prev,
        notifications: prev.notifications.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      }));
    };

    socketService.on('notification:new', handleNewNotification);
    socketService.on('notification:read', handleNotificationRead);

    return () => {
      socketService.off('notification:new', handleNewNotification);
      socketService.off('notification:read', handleNotificationRead);
    };
  }, []);

  // Handle real-time messages
  useEffect(() => {
    const handleNewMessage = (message: any) => {
      setData(prev => ({
        ...prev,
        messages: [message, ...prev.messages].slice(0, 100) // Keep latest 100
      }));
    };

    socketService.on('message:new', handleNewMessage);

    return () => {
      socketService.off('message:new', handleNewMessage);
    };
  }, []);

  // Handle real-time analytics
  useEffect(() => {
    const handleProfileView = (viewData: any) => {
      setData(prev => ({
        ...prev,
        analytics: {
          ...prev.analytics,
          profileViews: (prev.analytics.profileViews || 0) + 1,
          lastProfileView: viewData
        }
      }));
    };

    const handleJobView = (viewData: any) => {
      setData(prev => ({
        ...prev,
        analytics: {
          ...prev.analytics,
          jobViews: (prev.analytics.jobViews || 0) + 1,
          lastJobView: viewData
        }
      }));
    };

    socketService.on('analytics:profile_view', handleProfileView);
    socketService.on('analytics:job_view', handleJobView);

    return () => {
      socketService.off('analytics:profile_view', handleProfileView);
      socketService.off('analytics:job_view', handleJobView);
    };
  }, []);

  // Handle interview updates
  useEffect(() => {
    const handleInterviewReminder = (interview: any) => {
      setData(prev => ({
        ...prev,
        interviews: prev.interviews.map(int =>
          int.id === interview.id ? { ...int, ...interview } : int
        )
      }));
    };

    socketService.on('interview:reminder', handleInterviewReminder);

    return () => {
      socketService.off('interview:reminder', handleInterviewReminder);
    };
  }, []);

  // Request notification permission on mount
  useEffect(() => {
    if (enableNotifications) {
      socketService.requestNotificationPermission();
    }
  }, [enableNotifications]);

  // Utility functions
  const sendMessage = useCallback((recipientId: string, message: string) => {
    socketService.sendMessage(recipientId, message);
  }, []);

  const applyToJob = useCallback((jobId: string, applicationData: any) => {
    socketService.applyToJob(jobId, applicationData);
  }, []);

  const markNotificationRead = useCallback((notificationId: string) => {
    socketService.markNotificationRead(notificationId);
  }, []);

  const trackProfileView = useCallback((profileId: string) => {
    socketService.trackProfileView(profileId);
  }, []);

  const trackJobView = useCallback((jobId: string) => {
    socketService.trackJobView(jobId);
  }, []);

  const reconnect = useCallback(() => {
    socketService.reconnect();
  }, []);

  return {
    // Connection status
    isConnected,
    connectionStatus,
    
    // Real-time data
    data,
    
    // Utility functions
    sendMessage,
    applyToJob,
    markNotificationRead,
    trackProfileView,
    trackJobView,
    reconnect,
    
    // Computed values
    unreadNotifications: data.notifications.filter(n => !n.read).length,
    unreadMessages: data.messages.filter(m => !m.read).length,
    recentJobs: data.jobs.slice(0, 10),
    pendingApplications: data.applications.filter(a => a.status === 'pending'),
  };
}