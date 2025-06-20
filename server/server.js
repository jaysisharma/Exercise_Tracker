const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();



const app = express();
const port = process.env.PORT || 5000;

// Middleware setup

app.use(cors());
app.use(express.json());

// MongoDB connection setup

console.log("Connecting to MongoDB...", process.env.ATLAS_URI);
const uri = process.env.ATLAS_URI;
try {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
  
}

// Import the routers for handling requests
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// Use the routers for handling requests

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Start the server

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
