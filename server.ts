import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: '*' }
  });
  const PORT = 3000;

  // Socket.io logic
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_hub', (hubId) => {
      // Leave previous rooms (except own id)
      Array.from(socket.rooms).forEach(room => {
        if (room !== socket.id) {
          socket.leave(room);
        }
      });
      socket.join(hubId);
      console.log(`User ${socket.id} joined hub ${hubId}`);
    });

    socket.on('send_message', (data) => {
      // data: { id, hubId, text, user, timestamp }
      io.to(data.hubId).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
