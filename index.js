// Requires
const express = require('express');
const morgan = require('morgan'); 
const app = express(); // Creates express server instance

// Import project dirs
const { apiRouter } = require('./api/index');
const { client } = require('./db/index');


// Middleware
app.use(morgan('dev'));

// Middleware for translating (parsing) JSON content that has been sent to us in a request
app.use(express.json());

// Middleware for translating (parsing) encoded html forms that have been sent to us in a request
app.use(express.urlencoded( { extended: false } ));

// Route Handeler
// app.get("/", (req, res) => {})
app.use('/api', apiRouter);

// Port
const PORT = process.env.PORT || 3001
client.connect();
app.listen(PORT, () => {
    console.log(`Now running on port ${PORT}`)
});

// Export
module.exports = {
    client,
    jwt,
    bcrypt
}