const dns = require("node:dns");
// Configure DNS servers to prevent ENOTFOUND errors on some network environments
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = require("./src/app");
const { connectDB } = require("./src/config/db");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 8000;

/**
 * Initialize application: Connect to DB and Start Server
 */
const startServer = async () => {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Start Express Server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
