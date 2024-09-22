const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const EmployeeRouter = require('./Routes/EmployeeRouter');
require('dotenv').config();
require('./Models/db'); // Ensure the database connection is properly handled
const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Routes
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Auth routes
app.use('/auth', AuthRouter); // Routes for /auth endpoints
app.use('/products', ProductRouter); 
app.use('/create', EmployeeRouter); // Changed route prefix to /employee

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
