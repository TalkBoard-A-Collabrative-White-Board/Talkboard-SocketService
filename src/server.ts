import express from "express";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "talkboard-socketservice",
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "TalkBoard Socket Service",
    version: "1.0.0",
    status: "running",
  });
});

export { app, httpServer };
