const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const sequelize = require("./db"); // Import the sequelize instance
const School = require("./models/schoolModel"); // Import the School model
const cors = require('cors');

// Import and use routes
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());  // Parses incoming JSON payloads
app.use(express.urlencoded({ extended: true }));  // Parses incoming URL-encoded data
app.use(cors());

const schoolRoutes = require("./routes/schoolRoutes");
app.use(schoolRoutes);


// Sync Sequelize models and start the server
sequelize.sync() // Sync all models
    .then(() => {
        console.log("Database & tables synced successfully!");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error syncing database:", err);
    });
