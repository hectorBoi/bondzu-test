const express = require("express");
const morgan = require("morgan");
const Parse = require('parse/node');
const mailer = require('express-mailer');
// Initialize connection with Parse Database
Parse.initialize("7aGqZRDKBITfaIRAXq2oKoBkuWkhNqJZJWmf318I", "", "fF5zsMkXpw3eIcmg4ggwh6HlynYnNpYmZeJyl5Cw");
Parse.serverURL = "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com/parse";
Parse.appName = 'Bondzu';


// Imports all the controllers for the different routes
const register = require('./controllers/register');
const signin = require('./controllers/login');
const profile = require('./controllers/profile');
const animals = require('./controllers/animals');
const adoptions = require('./controllers/adoptions');
const logout = require('./controllers/logout');
const banner = require('./controllers/banner');
const admin = require('./controllers/admin');
const passwordReset = require('./controllers/passwordReset');
const middlewares = require('./middlewares');

const fileUpload = require('express-fileupload');
const cookieParser = require("cookie-parser");
const helmet = require('helmet');

// Declares the express server and  middlewares
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());
app.use(cookieParser());
app.use(helmet());

mailer.extend(app, {
  from: 'contactoBondzu@gmail.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'contactoBondzu@gmail.com',
    pass: 'eGB*e4Pkd06Q'
  }
})

app.set('views', __dirname + '/views');
// set the view engine to pug
app.set('view engine', 'pug');

// Manages the login for clients
app.get("/", (req, res) => {
  const { lang } = req.cookies;
  if (lang === "es" || lang === undefined) {
    res.redirect("/es/index.html");
  } else if (lang === "en") {
    res.redirect("/en/index.html");
  }
})

// Manages the login for admins
app.get("/adminLogin", signin.signinAuth(Parse));

app.get("/admin/animals", (req, res) => {
  admin.handleAdminAnimals(req, res, Parse);
});

app.get("/admin/animals/:animalID", (req, res) => {
  admin.getAnimal(req, res, Parse);
});

app.post("/admin/animals/:animalID", (req, res) => {
  admin.updateAnimal(req, res, Parse);
});

app.post("/admin/animals", (req, res) => {
  admin.createAnimal(req, res, Parse);
});

///////////////////////////////

// Handlers for all the routes
app.post("/login", signin.signinAuth(Parse));

app.post("/register", (req, res) => {
  register.handleRegister(req, res, Parse);
});

app.post("/passwordReset", (req, res) => {
  passwordReset.passwordReset(req, res, Parse, app.mailer);
});

app.post("/logout", (req, res) => {
  logout.handleLogout(req, res, Parse)
})

app.get("/profile/", (req, res) => {
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

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Initilizes the server
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening in port ${port}`));