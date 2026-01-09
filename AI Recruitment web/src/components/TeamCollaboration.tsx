import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  MessageSquare,
  UserPlus,
  Search,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  ThumbsUp,
  Star,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  File,
  Image as ImageIcon,
  Video,
  Link as LinkIcon,
  AtSign,
  Hash,
  Bell,
  Settings,
  Pin,
  Archive,
  Trash2,
  Edit3
} from 'lucide-react';

interface TeamCollaborationProps {
  user?: any;
}

export function TeamCollaboration({ user }: TeamCollaborationProps) {
  const [selectedChannel, setSelectedChannel] = useState('general-hiring');
  const [messageInput, setMessageInput] = useState('');
  const [activeTab, setActiveTab] = useState<'channels' | 'team' | 'tasks'>('channels');

  const channels = [
    { id: 'general-hiring', name: 'general-hiring', unread: 3, icon: Hash, color: 'blue' },
    { id: 'engineering-team', name: 'engineering-team', unread: 0, icon: Hash, color: 'purple' },
    { id: 'design-hiring', name: 'design-hiring', unread: 5, icon: Hash, color: 'pink' },
    { id: 'urgent-hires', name: 'urgent-hires', unread: 2, icon: Hash, color: 'red' },
    { id: 'candidate-reviews', name: 'candidate-reviews', unread: 8, icon: Hash, color: 'cyan' },
  ];

  const teamMembers = [
    { id: 1, name: 'Sarah Chen', role: 'Hiring Manager', avatar: '👩‍💼', status: 'online', color: 'green' },
    { id: 2, name: 'Mike Rodriguez', role: 'Tech Lead', avatar: '👨‍💻', status: 'online', color: 'green' },
    { id: 3, name: 'Emily Zhang', role: 'HR Specialist', avatar: '👩‍💼', status: 'away', color: 'yellow' },
    { id: 4, name: 'James Wilson', role: 'Recruiter', avatar: '👨‍🏫', status: 'offline', color: 'gray' },
    { id: 5, name: 'Lisa Anderson', role: 'Talent Acquisition', avatar: '👩‍🎨', status: 'online', color: 'green' },
  ];

  const messages = [
    {
      id: 1,
      user: 'Sarah Chen',
      avatar: '👩‍💼',
      message: 'Just reviewed the Full-Stack Developer candidates. We have 3 strong profiles that match our requirements.',
      timestamp: '10:30 AM',
      reactions: [{ emoji: '👍', count: 3 }, { emoji: '🎯', count: 1 }],
      attachments: []
    },
    {
      id: 2,
      user: 'Mike Rodriguez',
      avatar: '👨‍💻',
      message: 'Great! Can you share their profiles? I\'d like to schedule technical interviews for this week.',
      timestamp: '10:32 AM',
      reactions: [],
      attachments: []
    },
    {
      id: 3,
      user: 'Emily Zhang',
      avatar: '👩‍💼',
      message: 'I\'ve created interview slots for Thursday and Friday. Here\'s the schedule:',
      timestamp: '10:35 AM',
      reactions: [{ emoji: '✅', count: 2 }],
      attachments: [
        { type: 'file', name: 'Interview_Schedule.pdf', size: '234 KB' }
      ]
    },
    {
      id: 4,
      user: 'Lisa Anderson',
      avatar: '👩‍🎨',
      message: 'Also, we just received 15 new applications for the UX Designer role. Several look very promising!',
      timestamp: '11:05 AM',
      reactions: [{ emoji: '🚀', count: 4 }],
      attachments: []
    },
    {
      id: 5,
      user: 'Sarah Chen',
      avatar: '👩‍💼',
      message: 'Perfect timing! Let\'s prioritize those. @Mike can you help review the portfolios?',
      timestamp: '11:08 AM',
      reactions: [],
      attachments: []
    },
  ];

  const tasks = [
    { id: 1, title: 'Review Full-Stack Developer applications', assignee: 'Sarah Chen', status: 'in-progress', priority: 'high', dueDate: 'Today' },
    { id: 2, title: 'Schedule technical interviews', assignee: 'Mike Rodriguez', status: 'pending', priority: 'high', dueDate: 'Tomorrow' },
    { id: 3, title: 'Update job descriptions', assignee: 'Emily Zhang', status: 'completed', priority: 'medium', dueDate: 'Yesterday' },
    { id: 4, title: 'Prepare offer letters', assignee: 'Lisa Anderson', status: 'in-progress', priority: 'medium', dueDate: 'This week' },
    { id: 5, title: 'Conduct phone screenings', assignee: 'James Wilson', status: 'pending', priority: 'low', dueDate: 'Next week' },
  ];

  const sendMessage = () => {
    if (messageInput.trim()) {
      // Handle message sending
      setMessageInput('');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black text-gradient-animate mb-2">Team Collaboration</h1>
          <p className="text-gray-400">Coordinate hiring decisions with your team in real-time</p>
        </motion.div>

        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-240px)]">
          {/* Sidebar */}
          <div className="col-span-3 glass-card rounded-2xl p-4 overflow-y-auto">
            {/* Tabs */}
            <div className="flex gap-2 mb-4 glass-card p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('channels')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'channels'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Hash className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'team'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'tasks'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <CheckCircle className="w-4 h-4 mx-auto" />
              </button>
            </div>

            {/* Channels */}
            {activeTab === 'channels' && (
              <div className="space-y-1">
                <div className="flex items-center justify-between mb-3 px-2">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase">Channels</h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <UserPlus className="w-4 h-4 text-cyan-400" />
                  </motion.button>
                </div>
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <motion.button
                      key={channel.id}
                      whileHover={{ x: 4 }}
                      onClick={() => setSelectedChannel(channel.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                        selectedChannel === channel.id
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                          : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{channel.name}</span>
                      </div>
                      {channel.unread > 0 && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                          {channel.unread}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Team Members */}
            {activeTab === 'team' && (
              <div className="space-y-1">
                <div className="flex items-center justify-between mb-3 px-2">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase">Team</h3>
                  <span className="text-xs text-gray-500">{teamMembers.filter(m => m.status === 'online').length} online</span>
                </div>
                {teamMembers.map((member) => (
                  <motion.button
                    key={member.id}
                    whileHover={{ x: 4 }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:bg-white/5 transition-all"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-lg">
                        {member.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 bg-${member.color}-500`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Tasks */}
            {activeTab === 'tasks' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-3 px-2">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase">Tasks</h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <UserPlus className="w-4 h-4 text-cyan-400" />
                  </motion.button>
                </div>
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center ${
                        task.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-gray-500'
                      }`}>
                        {task.status === 'completed' && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{task.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                            task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500">{task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Main Chat Area */}
          <div className="col-span-9 glass-card rounded-2xl flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-xl">
                  <Hash className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>{selectedChannel}</h2>
                  <p className="text-sm text-gray-400">{teamMembers.length} members</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <Search className="w-5 h-5 text-gray-400" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-400" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 group hover:bg-white/5 p-3 rounded-xl transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg flex-shrink-0">
                    {msg.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{msg.user}</span>
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{msg.message}</p>
                    
                    {/* Attachments */}
                    {msg.attachments.length > 0 && (
                      <div className="space-y-2 mb-2">
                        {msg.attachments.map((attachment, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl max-w-sm">
                            <div className="p-2 bg-cyan-500/20 rounded-lg">
                              <File className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{attachment.name}</p>
                              <p className="text-xs text-gray-500">{attachment.size}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Reactions */}
                    {msg.reactions.length > 0 && (
                      <div className="flex gap-2">
                        {msg.reactions.map((reaction, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-1 text-xs transition-colors"
                          >
                            <span>{reaction.emoji}</span>
                            <span className="text-gray-400">{reaction.count}</span>
                          </motion.button>
                        ))}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Smile className="w-4 h-4 text-gray-400" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <div className="glass-card rounded-2xl p-3 flex items-end gap-3">
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Paperclip className="w-5 h-5 text-gray-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Smile className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent outline-none resize-none max-h-32"
                  style={{ color: 'var(--text-primary)' }}
                  rows={1}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!messageInput.trim()}
                  className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 mt-2 px-1">
                Press <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">Shift + Enter</kbd> for new line
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
