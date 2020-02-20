const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const logger = require("morgan");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const PORT = process.env.NODE_ENV || 3000;

app.use(logger("dev"));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(require("./routes/api"));

// Set up MongoDB Cluster if Available
const uri =
  "mongodb+srv://Alpha:Password1@cluster0-wqjz0.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(err => {
  const collection = client.db("budget").collection("myMoney");

  // perform actions on the collection object
  client.close();

  // Local Mongo Set up via Mongoose
  localMongo = () => {
    mongoose.connect(MONGODB_URI || "mongodb://localhost/budget", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  };
  if (err) {
    console.log("No Connection to MongoDB Cluster: -> LOCAL ONLY");
    localMongo();
    throw err;
  } else client.open(collection);
  console.log("Connected to MondoDB Cluster");
});

// Start API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
