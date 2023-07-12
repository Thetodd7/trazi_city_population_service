const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Add this line to use express.text() middleware
app.use(express.text());

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const populationRoutes = require('./routes/populationRoutes');

app.use('/api/population', populationRoutes);

const port = process.env.PORT || 5555;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
