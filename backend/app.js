const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (request, response) => {
  return response.status(200).json({
    status: "ok",
    message: "Smart Scheduler API está rodando",
  });
});

module.exports = app;
