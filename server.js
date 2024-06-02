const express = require("express");
const indexRouter = require("./routes/index.route");
const { connectDatabase, disconnectDatabase } = require("./db/connect");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

connectDatabase();

app.use(express.json());
app.use(cors());
app.use(indexRouter);

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
