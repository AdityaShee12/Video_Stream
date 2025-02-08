import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js"; // Router Import

export const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to WebRTC Backend!");
});