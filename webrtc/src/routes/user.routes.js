import express from "express";

const router = express.Router();

// Test Route
router.get("/", (req, res) => {
  res.json({ message: "User API working!" });
});

// Example: Get Users
router.get("/all", (req, res) => {
  res.json([{ id: 1, name: "Aditya" }, { id: 2, name: "Shee" }]);
});

export default router;