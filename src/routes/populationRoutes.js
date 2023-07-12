const express = require("express");
const router = express.Router();
const populationController = require("../controllers/populationController");

router.get("/state/:state/city/:city", async (req, res) => {
  const stateName = req.params.state.toLowerCase();
  const cityName = req.params.city.toLowerCase();
  try {
    const populationData = await populationController.getPopulation(
      stateName,
      cityName
    );
    if (populationData !== null) {
      res.status(200).json({ population: populationData });
    } else {
      res.status(400).send("State/City combo not found");
    }
  } catch (err) {
    console.error("Error in GET request:", err);
    res.status(500).send("Server Error");
  }
});

router.put("/state/:state/city/:city", async (req, res) => {
  const stateName = req.params.state.toLowerCase();
  const cityName = req.params.city.toLowerCase();
  let population = NaN;

  if (req.is("text/plain")) {
    // When Content-Type is text/plain, req.body is the body string
    population = Number(req.body);
  } else {
    // Otherwise, expect the population value to be in req.body.population
    population = parseInt(req.body.population, 10);
  }

  // Check if the population is a valid number
  if (isNaN(population)) {
    return res.status(400).send("Invalid population value");
  }
  try {
    const result = await populationController.setPopulation(
      stateName,
      cityName,
      population
    );

    if (result.acknowledged && result.modifiedCount >= 0) {
      res.status(200).send("Updated successfully");
    } else if (result.acknowledged && result.upsertedCount > 0) {
      res.status(201).send("Created successfully");
    } else {
      res.status(400).send("Data could not be added");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
