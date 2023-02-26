const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

// middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bkdzfxe.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const run = async () => {
  try {
    const productCollection = client.db("moonTech").collection("products");
    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({});
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    });
  } finally {
  }
};
run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("moon tech server is runnig");
});
app.listen(port, () => {
  console.log(`moon tech server is running on ${port}`);
});
