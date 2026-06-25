const express = require("express");
const cors = require("cors");

const database = require("./database.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(appointmentRoutes);

app.get("/health", (request, response) => {
  return response.status(200).json({
    status: "ok",
    message: "Smart Scheduler API está rodando.",
  });
});

app.get("/health/database", async (request, response) => {
  try {
    const result = await database.query("SELECT NOW()");

    return response.status(200).json({
      status: "ok",
      databaseTime: result.rows[0].now,
    });
  } catch {
    return response.status(500).json({
      status: "error",
      message: "Conexão com o Banco de Dados falhou.",
    });
  }
});

module.exports = app;
