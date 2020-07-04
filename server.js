const express = require("express");
const Parse = require('parse/node');

Parse.initialize("7aGqZRDKBITfaIRAXq2oKoBkuWkhNqJZJWmf318I");
Parse.serverURL = "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com/parse";

const register = require('./controllers/register')
const signin = require('./controllers/login')


const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/login", (req, res) => {
  signin.handleLogin(req, res, Parse)
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, Parse)
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening in port ${port}`));