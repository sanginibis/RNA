const express = require('express'); // the framework for creating REST calls
const path = require('path');
const auth = require('./middlewares/auth'); // the authentication middleware that is responsbile to generate the signed tokens
const errors = require('./middlewares/error'); // the common error handler middleware

const app = express(); // createing the app from the express framework

const urlConfig = require("./config/url.config"); // all urls for teh REST methods are configured here

// fore cross domain access
const cors = require('cors');

// test the db connection
require('./db/testConnection').connect(); // initialise the database and test the connection

app.use(express.json()); // making sure that the all incoming requests are json

app.use(cors());

// this is to test whether the server is running
const dateNow = new Date(Date.now());
const dateLocale = new Date(dateNow).toLocaleDateString('en-gb');
const dateNowTime = new Date(dateNow).toLocaleTimeString('en-gb');
console.log(dateNow + ' ' + dateNowTime);
app.get("/test", (req, res) => res.json(dateLocale + ' ' + dateNowTime + ". Yes, server is running"));

// adding the token verification for the calls as a middleware so that all requests are inspected
app.use(auth.authenticateToken);


// adding the routes and errors to the middleware
app.use(urlConfig.users.base, require("./routes/routes"));
app.use(errors.errorHandler);


// starting the server
app.listen(process.env.port || 4000, function () {
    console.log("server started")
});

