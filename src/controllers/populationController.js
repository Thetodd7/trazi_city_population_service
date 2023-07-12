const Population = require("../models/populationModel");

exports.getPopulation = async (stateName, cityName) => {
  try {
    const data = await Population.findOne({ state: stateName, city: cityName });
    return data ? data.population : null;
  } catch (err) {
    console.error("Error in getPopulation:", err);
    throw err;
  }
};

exports.setPopulation = async (stateName, cityName, population) => {
  console.log(stateName, cityName, population);
  try {
    const result = await Population.updateOne(
      { state: stateName, city: cityName },
      { $set: { population: population } },
      { upsert: true, new: true, runValidators: true }
    );
    console.log("Update Result:", result);
    return result;
  } catch (err) {
    console.error("Error in setPopulation:", err);
    throw err;
  }
};
