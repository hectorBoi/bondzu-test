const express = require("express");
const Parse = require('parse/node');
// Setup for redis
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URI);
module.exports = {
  redisClient: redisClient,
}
// Initialize connection with Parse Database
Parse.initialize("7aGqZRDKBITfaIRAXq2oKoBkuWkhNqJZJWmf318I");
Parse.serverURL = "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com/parse";

// Imports all the controllers for the different routes
const register = require('./controllers/register');
const signin = require('./controllers/login');
const profile = require('./controllers/profile');
const animals = require('./controllers/animals');
const auth = require('./controllers/authorization');
const adoptions = require('./controllers/adoptions');

// Declares the express server and  middlewares
const app = express();
app.use(express.json());
app.use(express.static("public"));

// Handlers for all the routes
app.post("/login", signin.signinAuth(Parse));

app.post("/register", (req, res) => {
  register.handleRegister(req, res, Parse);
});

app.get("/profile", auth.requireAuth, (req, res) => {
  profile.handleProfile(req, res, Parse);
});

app.post("/profile", (req, res) => {
  profile.handleProfile(req, res, Parse);
});

app.get("/animals", auth.requireAuth, (req, res) => {
  animals.handleAnimals(req, res, Parse);
})

app.post("/animals", (req, res) => {
  animals.handleAnimals(req, res, Parse);
})

app.get("/adoptions", auth.requireAuth, (req, res) => {
  adoptions.handleAdoptions(req, res, Parse);
})

app.post("/adoptions", (req, res) => {
  adoptions.handleAdoptions(req, res, Parse);
})

// Initilizes the server
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening in port ${port}`));