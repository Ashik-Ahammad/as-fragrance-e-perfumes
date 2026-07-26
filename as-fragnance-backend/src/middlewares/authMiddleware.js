const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
const dotenv = require("dotenv");
const { getDB } = require("../config/db");

dotenv.config();

// Create JWKS for verifying Clerk authentication tokens
const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
);

/**
 * Basic token verification middleware for protected routes
 */
const verifyToken = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  
  const token = authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid token format" });
  
  try {
    const { payload } = await jwtVerify(token, JWKS);
    req.tokenPayload = payload;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Forbidden - Token expired or invalid" });
  }
};

/**
 * Admin verification middleware for admin-only routes
 */
const verifyAdmin = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  
  const token = authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid token format" });
  
  try {
    const { payload } = await jwtVerify(token, JWKS);
    req.tokenPayload = payload;

    const email = payload?.email || payload?.sub;
    if (!email)
      return res.status(403).json({ message: "Forbidden - No email in token" });

    // Fetch user from DB to check if they have admin role
    const db = getDB();
    const userCollection = db.collection("user");
    const dbUser = await userCollection.findOne({ email });

    if (dbUser?.role !== "admin") {
      return res.status(403).json({ message: "Forbidden - Admin only" });
    }

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Forbidden - Token expired or invalid" });
  }
};

module.exports = { verifyToken, verifyAdmin };
