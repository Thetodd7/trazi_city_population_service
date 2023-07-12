const mongoose = require("mongoose");

const PopulationSchema = new mongoose.Schema({
  state: { type: String, required: true, lowercase: true },
  city: { type: String, required: true, lowercase: true },
  population: { type: Number, required: true },
});

// Add the index to the schema
PopulationSchema.index({ state: 1, city: 1 });

module.exports = mongoose.model("Population", PopulationSchema);
