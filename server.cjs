const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

let cnt = 0;

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}, total users: ${++cnt}`);

  socket.on("join-room", (roomID) => {
    socket.join(roomID); 
    console.log(`Socket ${socket.id} joined room using room Id ${roomID}`);
  
    socket.on("code-change", ({ code, roomId }) => {
      socket.to(roomId).emit("code-update", code);
    });
  });
  

  socket.on("code-change", ({ code, roomId }) => {
    console.log(`📝 Received code-change from ${socket.id} in room ${roomId}`);
    socket.to(roomId).emit("code-update", code);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}, total users: ${--cnt}`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
