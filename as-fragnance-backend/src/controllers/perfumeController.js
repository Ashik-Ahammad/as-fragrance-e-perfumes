const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const getPerfumeCollection = () => getDB().collection("perfumes");

exports.addPerfume = async (req, res) => {
  try {
    const result = await getPerfumeCollection().insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to add perfume" });
  }
};

exports.getPerfumes = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, stock, page, limit } = req.query;
    let query = {};

    // regex search for perfumeTitle OR category
    if (search) {
      query.$or = [
        { perfumeTitle: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All") {
      query.category = { $regex: category, $options: "i" };
    }

    if (stock && stock !== "All") {
      query.stock = stock;
    }

    if (minPrice || maxPrice) {
      // In this DB, price is stored as a string (e.g., '499'). 
      // To properly filter by price range, we need to handle this.
      // However, MongoDB string comparison for numbers doesn't work well with $gte.
      // Ideally, the DB should store prices as Numbers.
      // For now, if they are strings, this might fail or act weirdly, but let's cast the query value.
      // Actually, if we use $expr and $toDouble it works, but let's try standard first as some might be numbers.
      query.$expr = {
        $and: []
      };
      
      if (minPrice) {
        query.$expr.$and.push({ $gte: [{ $toDouble: "$price" }, Number(minPrice)] });
      }
      if (maxPrice) {
        query.$expr.$and.push({ $lte: [{ $toDouble: "$price" }, Number(maxPrice)] });
      }
      
      // If we are using $expr, we shouldn't mix it with standard query if it's empty
      if (query.$expr.$and.length === 0) {
         delete query.$expr;
      }
    }

    if (page && limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;

      const totalPerfumes = await getPerfumeCollection().countDocuments(query);
      const perfumes = await getPerfumeCollection().find(query).skip(skip).limit(limitNum).toArray();

      res.json({
        perfumes,
        totalPages: Math.ceil(totalPerfumes / limitNum),
        currentPage: pageNum,
        totalPerfumes
      });
    } else {
      const result = await getPerfumeCollection().find(query).toArray();
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch perfumes" });
  }
};

exports.getPerfumeById = async (req, res) => {
  try {
    const result = await getPerfumeCollection().findOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch perfume details" });
  }
};

exports.updatePerfume = async (req, res) => {
  try {
    const result = await getPerfumeCollection().updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update perfume" });
  }
};

exports.deletePerfume = async (req, res) => {
  try {
    const result = await getPerfumeCollection().deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete perfume" });
  }
};
