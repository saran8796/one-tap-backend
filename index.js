// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";
// import serviceBookingRoutes from "./routes/serviceBookingRoutes.js"; // <-- Add this import

// import shopRoutes from "./routes/shopRoutes.js";
// import serviceRoutes from "./routes/serviceRoutes.js";

// import serviceMasterRoutes from "./routes/serviceMasterRoutes.js";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to DB
// connectDB();

// // API routes
// app.use("/api/users", userRoutes);
// app.use("/api/servicebookings", serviceBookingRoutes);
// app.use("/api/shops", shopRoutes);
// app.use("/api/services", serviceRoutes);
// app.use("/api/service-master", serviceMasterRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import serviceBookingRoutes from "./routes/serviceBookingRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import serviceMasterRoutes from "./routes/serviceMasterRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import http from "http"; // ✅ ADD
import { Server } from "socket.io"; // ✅ ADD

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Create HTTP server (replace app.listen)
const server = http.createServer(app);

// ✅ Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // or your frontend URL
    methods: ["GET", "POST"],
  },
});

// ✅ Make io global so ANY controller can use io.emit()
global.io = io;

// ✅ Socket connection listener
io.on("connection", (socket) => {
  console.log("⚡ Vendor/Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Vendor/Client disconnected:", socket.id);
  });
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/servicebookings", serviceBookingRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/service-master", serviceMasterRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
