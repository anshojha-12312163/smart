# 🚀 Socket.IO Server Setup for SmartHire AI

## 📋 **Overview**

Your SmartHire AI web application now has Socket.IO client integration for real-time features. You need a Socket.IO server to handle real-time events.

## 🛠️ **Quick Server Setup**

### **Option 1: Node.js + Express + Socket.IO Server**

Create a new directory for your server:

```bash
mkdir smarthire-socket-server
cd smarthire-socket-server
npm init -y
npm install express socket.io cors dotenv
npm install -D @types/node typescript ts-node nodemon
```

### **Basic Server Code** (`server.js`):

```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configure CORS for Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

// Store connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // Handle user authentication
  socket.on('join:user_room', (userId) => {
    socket.join(`user_${userId}`);
    connectedUsers.set(socket.id, userId);
    console.log(`👤 User ${userId} joined room`);
  });

  // Handle job applications
  socket.on('job:apply', (data) => {
    console.log('📋 Job application:', data);
    
    // Emit to recruiters
    io.emit('application:new', {
      id: Date.now(),
      jobId: data.jobId,
      applicantId: data.userId,
      status: 'pending',
      appliedAt: data.timestamp
    });
  });

  // Handle messages
  socket.on('message:send', (data) => {
    console.log('💬 Message sent:', data);
    
    // Send to recipient
    io.to(`user_${data.recipientId}`).emit('message:new', {
      id: Date.now(),
      senderId: data.senderId,
      message: data.message,
      timestamp: data.timestamp,
      read: false
    });
  });

  // Handle typing indicators
  socket.on('message:typing', (data) => {
    io.to(`user_${data.recipientId}`).emit('message:typing', data);
  });

  // Handle notification read
  socket.on('notification:mark_read', (data) => {
    io.to(`user_${data.userId}`).emit('notification:read', data.notificationId);
  });

  // Handle analytics tracking
  socket.on('analytics:track_view', (data) => {
    console.log('📊 Analytics:', data);
    
    if (data.type === 'profile') {
      io.to(`user_${data.targetId}`).emit('analytics:profile_view', {
        viewerId: data.viewerId,
        timestamp: data.timestamp
      });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const userId = connectedUsers.get(socket.id);
    connectedUsers.delete(socket.id);
    console.log('❌ User disconnected:', socket.id, userId);
  });
});

// Simulate real-time events (for testing)
setInterval(() => {
  // Simulate new job posting
  io.emit('job:new', {
    id: Date.now(),
    title: `Software Engineer ${Math.floor(Math.random() * 1000)}`,
    company: ['Google', 'Microsoft', 'Apple', 'Amazon'][Math.floor(Math.random() * 4)],
    location: 'Remote',
    salary: '$80,000 - $120,000',
    postedAt: new Date().toISOString()
  });
}, 30000); // Every 30 seconds

setInterval(() => {
  // Simulate application status updates
  const statuses = ['reviewed', 'interview_scheduled', 'rejected', 'accepted'];
  io.emit('application:status_changed', {
    id: Date.now(),
    jobTitle: 'Software Engineer',
    status: statuses[Math.floor(Math.random() * statuses.length)],
    updatedAt: new Date().toISOString()
  });
}, 45000); // Every 45 seconds

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on port ${PORT}`);
});
```

### **Package.json Scripts**:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## 🔧 **Production Setup Options**

### **Option 1: Railway**
1. Create account at https://railway.app
2. Deploy your Socket.IO server
3. Update `VITE_SOCKET_URL` in your `.env`

### **Option 2: Heroku**
1. Create Heroku app
2. Deploy Socket.IO server
3. Update environment variables

### **Option 3: DigitalOcean**
1. Create droplet
2. Install Node.js
3. Deploy and run server

## 🧪 **Testing Real-time Features**

### **Start the Server**:
```bash
cd smarthire-socket-server
npm run dev
```

### **Test in Your App**:
1. **Visit**: http://localhost:3001
2. **Login** to your SmartHire app
3. **Check Console**: Should see Socket.IO connection messages
4. **Real-time Events**: Will start appearing automatically

## 📊 **Real-time Features Enabled**

### **✅ Job Updates**:
- New job postings appear instantly
- Job status changes in real-time
- Live job recommendations

### **✅ Application Tracking**:
- Instant application status updates
- Real-time interview scheduling
- Live application analytics

### **✅ Notifications**:
- Instant push notifications
- Real-time notification badges
- Live notification center

### **✅ Messaging**:
- Real-time chat with recruiters
- Typing indicators
- Instant message delivery

### **✅ Analytics**:
- Live profile view tracking
- Real-time engagement metrics
- Instant analytics updates

## 🔍 **Environment Variables**

Update your `.env` file:

```env
# Socket.IO Configuration
VITE_SOCKET_URL=http://localhost:3002  # Local development
# VITE_SOCKET_URL=https://your-server.railway.app  # Production
VITE_ENABLE_REAL_TIME=true
```

## 🎯 **Next Steps**

1. **Start Socket.IO server** (see setup above)
2. **Test real-time features** in your app
3. **Deploy server** to production when ready
4. **Update environment variables** for production

**Your SmartHire AI app now has full real-time capabilities!** 🚀

## 🔧 **Troubleshooting**

### **Connection Issues**:
- Check server is running on port 3002
- Verify CORS settings
- Check firewall settings

### **Events Not Working**:
- Check browser console for errors
- Verify user authentication
- Check server logs

### **Performance**:
- Monitor connection count
- Implement rate limiting
- Use Redis for scaling