const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const getBannersCollection = () => getDB().collection("banners");

exports.getBanners = async (req, res) => {
  try {
    const result = await getBannersCollection().find().sort({ order: 1 }).toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch banners" });
  }
};

exports.addBanner = async (req, res) => {
  try {
    const result = await getBannersCollection().insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to add banner" });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const result = await getBannersCollection().updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update banner" });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const result = await getBannersCollection().deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete banner" });
  }
};
