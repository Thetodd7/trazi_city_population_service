# Tazi City Population Service

## Overview
This is a Node.js service that provides population data for different cities. You can get the population of a specific city, or update it with a new value.

## Getting Started
Before starting, you'll need to have Node.js installed on your machine. This project uses Node v16.3.1.

## Installation
First, clone this repository to your local machine using `git clone`.

Next, navigate to the project directory and run `npm install` to install all dependencies.

## Set Up Database
The data for this project is stored in MongoDB. Make sure you have MongoDB installed and running on your machine.

In order to populate the database with the initial set of data, run the `uploadDB.js` script using the command `node uploadDB.js`. This script reads data from a file `city_populations.json`, and uploads it to the MongoDB.

Make sure to set the MongoDB connection string in your `.env` file, as `DB_CONNECTION=<your_mongodb_connection_string>`.

## Running the Service
Start the service using the command `npm start`.

## Endpoints
This service exposes the following endpoints:

* `GET /api/population/state/:state/city/:city`
Fetches the population data for the given city in a given state.

* `PUT /api/population/state/:state/city/:city`
Updates the population data for the given city in a given state. Accepts the new population as a text/plain or JSON body (`{"population": 12345}`).

## Dependencies
This project uses the following dependencies:
* `cors` - For handling CORS.
* `dotenv` - For loading environment variables.
* `express` - For creating the web server.
* `mongoose` - For interfacing with MongoDB.
* `nodemon` - For development, auto restarts the server on file changes.

## Author
Todd G
