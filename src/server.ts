import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome To talkBoard Socket Service");
});

export default app;
