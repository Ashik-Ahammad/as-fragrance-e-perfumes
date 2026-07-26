const { getDB } = require("../config/db");

const getNewsletterCollection = () => getDB().collection("newsletters");

exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Email is required" });

    const existing = await getNewsletterCollection().findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "Already subscribed!" });
    }

    await getNewsletterCollection().insertOne({
      email,
      subscribedAt: new Date(),
    });
    
    res.status(200).json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
