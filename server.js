const express = require("express");
const Parse = require('parse/node');
const fileupload = require('express-fileupload')
// Initialize connection with Parse Database
Parse.initialize("7aGqZRDKBITfaIRAXq2oKoBkuWkhNqJZJWmf318I");
Parse.serverURL = "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com/parse";

// Imports all the controllers for the different routes
const register = require('./controllers/register');
const signin = require('./controllers/login');
const profile = require('./controllers/profile');
const animals = require('./controllers/animals');
const adoptions = require('./controllers/adoptions');
const logout = require('./controllers/logout');
const banner = require('./controllers/banner');

// Declares the express server and  middlewares
const app = express();
app.use(express.json());
app.use(fileupload());
app.use(express.static("public"));

// Handlers for all the routes
app.post("/login", signin.signinAuth(Parse));

app.post("/register", (req, res) => {
  register.handleRegister(req, res, Parse);
});

app.post("/logout", (req, res) => {
  logout.handleLogout(req, res, Parse)
})

app.get("/profile/:username", (req, res) => {
  profile.handleProfile(req, res, Parse);
});

app.post("/profile", (req, res) => {
  profile.updateProfile(req, res, Parse);
});

app.get("/animals", (req, res) => {
  animals.handleAnimals(req, res, Parse);
})

app.post("/animals", (req, res) => {
  animals.handleAnimals(req, res, Parse);
})

app.get("/singleAnimal/:animalID", (req, res) => {
  animals.handleSingleAnimal(req, res, Parse);
})

app.post("/singleAnimal/:animalID", (req, res) => {
  animals.handleSingleAnimal(req, res, Parse);
})

app.get("/adoptions/:userID", (req, res) => {
  adoptions.getAdoptions(req, res, Parse);
})

app.post("/adoptions", (req, res) => { // THIS IS TEMPORAL
  adoptions.getAdoptions(req, res, Parse);
})

app.post("/adoptions/:animalID", (req, res) => {
  adoptions.updateAdoptions(req, res, Parse);
})

app.get("/banner", (req, res) => {
  banner.getBanner(req, res, Parse);
})

// Initilizes the server
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening in port ${port}`));