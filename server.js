const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/indexRoutes");
require("dotenv").config();

const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("App Connected to DB Successfully");
});

app.use(bodyParser.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Welcome to Mentor Application");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
