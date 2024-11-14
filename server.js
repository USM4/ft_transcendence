import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

let playerPositions = { player1: 150, player2: 150 };

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.emit('positionUpdate', playerPositions);

  socket.on('movePaddle', ({ player, position }) => {
    playerPositions[player] = position;
    socket.broadcast.emit('positionUpdate', playerPositions);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
