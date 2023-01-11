// Requires
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { apiRouter } = require('./api/index');
const { client } = require('./db/index');
const cors = require('cors')

// Express Server
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));

// Subrouter

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