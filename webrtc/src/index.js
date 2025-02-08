import { app } from "./app.js";
import http from "http";
import { Server as socketio } from "socket.io";

const server = http.createServer(app);
const io = new socketio(server, {
  cors: {
    origin: ["http://localhost:5173","https://videostreaming-eight.vercel.app"], // Frontend Vite server URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // ভিডিও কল রুমে জয়েন
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
    socket.to(roomId).emit("joined");
  });

  // ICE Candidate এক্সচেঞ্জ করা
  socket.on("ice-candidate", (candidate, roomId) => {
    console.log(`ICE Candidate sent to room: ${roomId}`);
    socket.to(roomId).emit("ice-candidate", candidate);
  });

  // socket.on("ready", (roomId) => {
  //   console.log(`User ${socket.id} is ready in room: ${roomId}`);
  //   socket.to(roomId).emit("ready");
  // });

  // Caller → Receiver: Offer পাঠানো
  socket.on("offer", (offer, roomId) => {
    console.log(`Offer sent to room: ${roomId}`);
    socket.to(roomId).emit("offer", offer);
  });

  // Receiver → Caller: Answer পাঠানো
  socket.on("answer", (answer, roomId) => {
    console.log(`Answer sent to room: ${roomId}`);
    socket.to(roomId).emit("answer", answer);
  });

  // Ready signal পাঠানো

  // ইউজার ডিসকানেক্ট হলে
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen( 8000, () => {
  console.log(`⚙️ Server is running at port :}`);
});
