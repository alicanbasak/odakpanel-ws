const express = require("express");
const { connectDatabase, disconnectDatabase } = require("./db/connect");
const cors = require("cors");
const router = require("./routes/index.route"); // Yeni dinamik route yükleyici dosyası

const app = express();
const PORT = process.env.PORT || 8080;

connectDatabase();

app.use(express.json());
app.use(cors());
app.use(router);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("Stopping the application...");
  await disconnectDatabase();
  server.close(() => {
    console.log("Server stopped");
    process.exit(0);
  });
});
