const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// dotenv config
dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8888;

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("as_fragrance");
    const perfumeCollection = db.collection("perfumes");

    // post permfumes to its collection
    app.post("/perfume", async (req, res) => {

      const perfumeData = req.body;
      console.log(perfumeData)
      const result = await perfumeCollection.insertOne(perfumeData);

      res.json(result);

    })

    // get perfumes from db
    app.get("/perfume", async (req, res) => {
      const result = await perfumeCollection.find().toArray();

      res.json(result);
    })

    // get single perfume by id
    app.get("/perfume/:id", async (req, res) => {
      const {id} = req.params;

      const result = await perfumeCollection.findOne({_id: new ObjectId(id)})

      res.json(result)
    })

    // edit single perfume data by id
    app.patch("/perfume/:id", async (req, res) => {
      const {id} = req.params;

      const updatedData = req.body;

      const result = await perfumeCollection.updateOne({_id: new ObjectId(id)},{ $set: updatedData })

      res.json(result)
    })

    // Delete a single perfume data by id
    app.delete("/perfume/:id", async(req, res) => {
      const {id} = req.params;

      const result = perfumeCollection.deleteOne({_id: new ObjectId(id)})

      res.json(result);
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Ping Pong. AS-F Server successfully connected to MongoDB!");
  }
  finally {
    // await client.close();
  }
}
run().catch(console.dir);

// home route
app.get("/", (req, res) => {
  res.send("AS Fragrance - Server is running");
});

// server run
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
