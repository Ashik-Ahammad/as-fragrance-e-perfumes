const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const getCombosCollection = () => getDB().collection("combos");

exports.getCombos = async (req, res) => {
  try {
    const result = await getCombosCollection().find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch combos" });
  }
};

exports.getComboById = async (req, res) => {
  try {
    const result = await getCombosCollection().findOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch combo" });
  }
};

exports.addCombo = async (req, res) => {
  try {
    const result = await getCombosCollection().insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to add combo" });
  }
};

exports.updateCombo = async (req, res) => {
  try {
    const result = await getCombosCollection().updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update combo" });
  }
};

exports.deleteCombo = async (req, res) => {
  try {
    const result = await getCombosCollection().deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete combo" });
  }
};
