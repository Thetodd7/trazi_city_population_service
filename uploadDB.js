const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Population = require("./src/models/populationModel");

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const data = JSON.parse(fs.readFileSync("city_populations.json", "utf-8"));

data.forEach(async (item) => {
  await Population.updateOne(
    { state: item.State.toLowerCase(), city: item.City.toLowerCase() },
    { $set: { population: item.Population } },
    { upsert: true }
  );
});

console.log("Data imported successfully");
