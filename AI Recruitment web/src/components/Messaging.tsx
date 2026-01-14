import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreHorizontal,
  Star,
  Archive,
  Trash2,
  Filter,
  Users,
  MessageSquare,
  Clock,
  CheckCheck,
  Circle,
  User,
  Briefcase,
  MapPin
} from 'lucide-react';

interface MessagingProps {
  user: any;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'file' | 'system';
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantTitle: string;
  participantCompany: string;
  participantLocation: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
  tags: string[];
  priority: 'high' | 'medium' | 'low';
}

export function Messaging({ user }: MessagingProps) {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      participantId: 'candidate-1',
      participantName: 'Sarah Johnson',
      participantAvatar: '👩‍💼',
      participantTitle: 'Senior Software Engineer',
      participantCompany: 'Google',
      participantLocation: 'San Francisco, CA',
      lastMessage: 'Thank you for considering my application. I\'m very interested in this position.',
      lastMessageTime: '2024-01-15T10:30:00Z',
      unreadCount: 2,
      isOnline: true,
      priority: 'high',
      tags: ['Interview Scheduled', 'Top Candidate'],
      messages: [
        {
          id: 'm1',
          senderId: 'candidate-1',
          senderName: 'Sarah Johnson',
          senderAvatar: '👩‍💼',
          content: 'Hi! I wanted to follow up on my application for the Senior Full Stack Developer position.',
          timestamp: '2024-01-15T09:00:00Z',
          isRead: true,
          type: 'text'
        },
        {
          id: 'm2',
          senderId: user?.id || 'recruiter-1',
          senderName: user?.name || 'Recruiter',
          senderAvatar: user?.avatar || '👤',
          content: 'Hello Sarah! Thank you for your interest. I\'ve reviewed your profile and I\'m impressed with your background. Would you be available for a quick call this week?',
          timestamp: '2024-01-15T09:15:00Z',
          isRead: true,
          type: 'text'
        },
        {
          id: 'm3',
          senderId: 'candidate-1',
          senderName: 'Sarah Johnson',
          senderAvatar: '👩‍💼',
          content: 'Thank you for considering my application. I\'m very interested in this position.',
          timestamp: '2024-01-15T10:30:00Z',
          isRead: false,
          type: 'text'
        }
      ]
    },
    {
      id: '2',
      participantId: 'candidate-2',
      participantName: 'Michael Chen',
      participantAvatar: '👨‍💻',
      participantTitle: 'Product Manager',
      participantCompany: 'Microsoft',
      participantLocation: 'Seattle, WA',
      lastMessage: 'I have some questions about the role requirements.',
      lastMessageTime: '2024-01-14T16:45:00Z',
      unreadCount: 0,
      isOnline: false,
      priority: 'medium',
      tags: ['Product Manager'],
      messages: [
        {
          id: 'm4',
          senderId: 'candidate-2',
          senderName: 'Michael Chen',
          senderAvatar: '👨‍💻',
          content: 'I have some questions about the role requirements.',
          timestamp: '2024-01-14T16:45:00Z',
          isRead: true,
          type: 'text'
        }
      ]
    },
    {
      id: '3',
      participantId: 'candidate-3',
      participantName: 'Emily Rodriguez',
      participantAvatar: '👩‍🎨',
      participantTitle: 'UX Designer',
      participantCompany: 'Apple',
      participantLocation: 'Cupertino, CA',
      lastMessage: 'Here\'s my portfolio link as requested.',
      lastMessageTime: '2024-01-13T14:20:00Z',
      unreadCount: 1,
      isOnline: true,
      priority: 'low',
      tags: ['Design', 'Portfolio Shared'],
      messages: [
        {
          id: 'm5',
          senderId: 'candidate-3',
          senderName: 'Emily Rodriguez',
          senderAvatar: '👩‍🎨',
          content: 'Here\'s my portfolio link as requested.',
          timestamp: '2024-01-13T14:20:00Z',
          isRead: false,
          type: 'text'
        }
      ]
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `m${Date.now()}`,
      senderId: user?.id || 'recruiter-1',
      senderName: user?.name || 'Recruiter',
      senderAvatar: user?.avatar || '👤',
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: true,
      type: 'text'
    };

    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id 
        ? { 
            ...conv, 
            messages: [...conv.messages, message],
            lastMessage: newMessage,
            lastMessageTime: message.timestamp
          }
        : conv
    ));

    setSelectedConversation(prev => prev ? {
      ...prev,
      messages: [...prev.messages, message],
      lastMessage: newMessage,
      lastMessageTime: message.timestamp
    } : null);

    setNewMessage('');
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.participantTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'unread' && conv.unreadCount > 0) ||
                         (filterStatus === 'online' && conv.isOnline);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Messages</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Communicate with candidates and team members
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-white dark:bg-slate-600 text-blue-600 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('unread')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'unread'
                    ? 'bg-white dark:bg-slate-600 text-blue-600 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilterStatus('online')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'online'
                    ? 'bg-white dark:bg-slate-600 text-blue-600 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Online
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 border-b border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                    selectedConversation?.id === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-r-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl">
                        {conversation.participantAvatar}
                      </div>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                          {conversation.participantName}
                        </h3>
                        <div className="flex items-center gap-2">
                          {conversation.unreadCount > 0 && (
                            <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                              {conversation.unreadCount}
                            </span>
                          )}
                          <span className="text-xs text-slate-500">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {conversation.participantTitle} • {conversation.participantCompany}
                      </p>

                      <p className="text-sm text-slate-500 truncate mb-2">
                        {conversation.lastMessage}
                      </p>

                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(conversation.priority)}`}>
                          {conversation.priority}
                        </span>
                        {conversation.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg">
                        {selectedConversation.participantAvatar}
                      </div>
                      {selectedConversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {selectedConversation.participantName}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {selectedConversation.isOnline ? 'Online' : 'Offline'} • {selectedConversation.participantTitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map((message, index) => {
                    const isOwnMessage = message.senderId === (user?.id || 'recruiter-1');
                    
                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              isOwnMessage
                                ? 'bg-blue-500 text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p className={`text-xs text-slate-500 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                            {formatTime(message.timestamp)}
                            {isOwnMessage && (
                              <CheckCheck className="w-3 h-3 inline ml-1 text-blue-500" />
                            )}
                          </p>
                        </div>
                        
                        {!isOwnMessage && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm mr-2 order-0">
                            {message.senderAvatar}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <Smile className="w-5 h-5" />
                    </button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}