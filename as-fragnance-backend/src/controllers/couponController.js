const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const getCouponCollection = () => getDB().collection("coupons");

exports.addCoupon = async (req, res) => {
  try {
    const { code, discountPercent } = req.body;
    const result = await getCouponCollection().insertOne({
      code: code.toUpperCase(),
      discountPercent: Number(discountPercent),
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to save coupon" });
  }
};

exports.verifyCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await getCouponCollection().findOne({
      code: code.toUpperCase(),
    });
    
    if (coupon) {
      res.json({ success: true, discountPercent: coupon.discountPercent });
    } else {
      res.status(400).json({ success: false, message: "Invalid Coupon" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCoupons = async (req, res) => {
  try {
    const result = await getCouponCollection().find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch coupons" });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const result = await getCouponCollection().deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete coupon" });
  }
};
