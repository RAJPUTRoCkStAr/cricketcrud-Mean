const express = require("express");
const mongoose = require("mongoose");
const routers = require('./routes');
const app = express();
const cors = require('cors');
const port = 5000;

const mongodatabaseURL = "mongodb+srv://Csksports:msdhoni@cluster0.acomnca.mongodb.net/"; // Change "mydatabase" to your actual database name

// Connect to MongoDB
mongoose.connect(mongodatabaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB Connected!!!......");

    // Start the server after successful database connection
    app.listen(port, () => {
        console.log("Server is running on port " + port);
    });
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

const connection = mongoose.connection;

connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(routers);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
