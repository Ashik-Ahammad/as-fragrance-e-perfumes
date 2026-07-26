const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const getUserCollection = () => getDB().collection("user");

exports.getUsers = async (req, res) => {
  try {
    const result = await getUserCollection()
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { email, role } = req.body;
    if (!email || !role)
      return res.status(400).json({ message: "Email and role required" });
    if (!["admin", "user"].includes(role))
      return res.status(400).json({ message: "Invalid role" });

    const result = await getUserCollection().updateOne(
      { email: email.toLowerCase() },
      { $set: { role } }
    );

    if (result.matchedCount === 0)
      return res.status(404).json({ message: "User not found" });
      
    res.json({
      success: true,
      message: `Role updated to "${role}" for ${email}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user role" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await getUserCollection().deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

exports.getUserRole = async (req, res) => {
  try {
    const internalKey = req.headers["x-internal-key"];
    const expectedKey = process.env.INTERNAL_API_KEY || "as-fragrance-internal";

    if (internalKey !== expectedKey) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await getUserCollection().findOne(
      { email: decodeURIComponent(email).toLowerCase() },
      { projection: { role: 1 } }
    );

    res.json({ role: user?.role || "user" });
  } catch (error) {
    console.error("[user-role] error:", error);
    res.status(500).json({ role: "user" });
  }
};
