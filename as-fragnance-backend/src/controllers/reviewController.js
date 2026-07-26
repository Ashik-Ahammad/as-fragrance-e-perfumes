const { getDB } = require("../config/db");

const getReviewCollection = () => getDB().collection("reviews");

exports.getReviewsByPerfume = async (req, res) => {
  try {
    const { perfumeId } = req.params;
    const result = await getReviewCollection()
      .find({ perfumeId })
      .sort({ createdAt: -1 })
      .toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

exports.addReview = async (req, res) => {
  try {
    const reviewData = req.body;
    reviewData.createdAt = new Date();
    const result = await getReviewCollection().insertOne(reviewData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to post review" });
  }
};

exports.getRecentReviews = async (req, res) => {
  try {
    const result = await getReviewCollection()
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all reviews" });
  }
};
