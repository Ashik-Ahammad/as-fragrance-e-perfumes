const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

/**
 * Connects to MongoDB and initializes the database instance
 */
const connectDB = async () => {
  try {
    // In Vercel serverless functions, the client connects implicitly
    db = client.db("as_fragrance");
    console.log("Ping Pong. AS-F Server successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

/**
 * Returns the connected database instance
 * @returns {Db} MongoDB Database Instance
 */
const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};

module.exports = { connectDB, getDB, client };
