import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Search, MoreVertical, Paperclip, Smile, Phone, Video, Circle } from 'lucide-react';

export function Messaging({ user }: { user: any }) {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      role: 'Senior Recruiter',
      avatar: '👩',
      lastMessage: 'Great! Let me schedule the interview for next week.',
      time: '2m ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'StartupXYZ',
      role: 'HR Manager',
      avatar: '👨',
      lastMessage: 'Thanks for your interest in the Full Stack position.',
      time: '1h ago',
      unread: 0,
      online: true
    },
    {
      id: 3,
      name: 'Emma Wilson',
      company: 'Digital Solutions',
      role: 'Talent Acquisition',
      avatar: '👩',
      lastMessage: 'Your profile looks impressive!',
      time: '3h ago',
      unread: 1,
      online: false
    },
    {
      id: 4,
      name: 'David Martinez',
      company: 'Creative Labs',
      role: 'Hiring Manager',
      avatar: '👨',
      lastMessage: 'We\'d love to discuss the UI/UX position.',
      time: '1d ago',
      unread: 0,
      online: false
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'them',
      text: 'Hi! I came across your profile and I think you\'d be a great fit for our Senior React Developer position.',
      time: '10:30 AM',
      avatar: '👩'
    },
    {
      id: 2,
      sender: 'me',
      text: 'Thank you for reaching out! I\'m very interested in learning more about the position.',
      time: '10:35 AM',
      avatar: user?.avatar
    },
    {
      id: 3,
      sender: 'them',
      text: 'Wonderful! The role involves leading our frontend team and working on cutting-edge projects. When would be a good time for a brief call?',
      time: '10:40 AM',
      avatar: '👩'
    },
    {
      id: 4,
      sender: 'me',
      text: 'I\'m available next week Tuesday or Wednesday afternoon. Would either of those work for you?',
      time: '10:45 AM',
      avatar: user?.avatar
    },
    {
      id: 5,
      sender: 'them',
      text: 'Great! Let me schedule the interview for next week.',
      time: '10:50 AM',
      avatar: '👩'
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="h-screen p-8 pb-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto h-full flex flex-col"
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">Messages</h1>
          <p className="text-gray-400">Connect with recruiters and hiring managers</p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8 overflow-hidden">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <motion.div
                  key={conv.id}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  onClick={() => setSelectedChat(conv)}
                  className={`p-4 cursor-pointer border-b border-white/5 transition-all ${
                    selectedChat?.id === conv.id ? 'bg-cyan-500/10 border-l-2 border-l-cyan-400' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-xl">
                        {conv.avatar}
                      </div>
                      {conv.online && (
                        <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-400 text-green-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-white text-sm truncate">{conv.name}</h3>
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{conv.time}</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-1">{conv.role} • {conv.company}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 truncate flex-1">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <span className="ml-2 px-2 py-0.5 bg-cyan-500 text-white text-xs rounded-full flex-shrink-0">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              {selectedChat ? (
                <motion.div
                  key={selectedChat.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full"
                >
                  {/* Chat Header */}
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-xl">
                          {selectedChat.avatar}
                        </div>
                        {selectedChat.online && (
                          <Circle className="absolute bottom-0 right-0 w-2.5 h-2.5 fill-green-400 text-green-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{selectedChat.name}</h3>
                        <p className="text-xs text-gray-400">{selectedChat.role} • {selectedChat.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <Phone className="w-5 h-5 text-gray-400" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <Video className="w-5 h-5 text-gray-400" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex gap-3 ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-lg flex-shrink-0">
                          {msg.avatar}
                        </div>
                        <div className={`max-w-md ${msg.sender === 'me' ? 'items-end' : ''}`}>
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              msg.sender === 'me'
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                                : 'bg-white/10 text-gray-200'
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 px-2">{msg.time}</p>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Typing indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-lg">
                        {selectedChat.avatar}
                      </div>
                      <div className="bg-white/10 px-4 py-3 rounded-2xl">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t border-white/10">
                    <div className="flex items-end gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <Paperclip className="w-5 h-5 text-gray-400" />
                      </motion.button>
                      <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-cyan-400/50 transition-all">
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSend();
                            }
                          }}
                          placeholder="Type a message..."
                          rows={1}
                          className="w-full bg-transparent text-white placeholder-gray-400 outline-none resize-none"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <Smile className="w-5 h-5 text-gray-400" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSend}
                        className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                      >
                        <Send className="w-5 h-5 text-white" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-full"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                      <Send className="w-10 h-10 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No Conversation Selected</h3>
                    <p className="text-gray-400">Select a conversation to start messaging</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
