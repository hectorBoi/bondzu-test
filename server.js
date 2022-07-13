const express = require("express");
const mailer = require("express-mailer");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

require("dotenv").config();

// Routers
const admin = require("./controllers/admin");
const profile = require("./controllers/profile");
const adoptions = require("./controllers/adoptions");
const animals = require("./controllers/animals");
const books = require("./controllers/books");
const middlewares = require("./middlewares");
const reports = require("./controllers/reports");
// Controller functions
const register = require("./controllers/register");
const login = require("./controllers/login");
const logout = require("./controllers/logout");
const passwordReset = require("./controllers/passwordReset");

// Declares the express server and middleware
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());
app.use(cookieParser());
app.use(helmet());

// Configure the SMTP server to send emails through the server
mailer.extend(app, {
  from: process.env.EMAIL,
  host: "smtp.gmail.com", // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: "SMTP", // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// set the view engine to pug
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// Manages the login for clients
app.get("/", (req, res) => {
  const { lang } = req.cookies;
  if (lang === "es" || lang === undefined) {
    res.redirect("/es/index.html");
  } else if (lang === "en") {
    res.redirect("/en/index.html");
  }
});

// Routers
app.use("/admin", admin);
app.use("/animals", animals);
app.use("/books", books);
app.use("/adoptions", adoptions.router);
app.use("/profile", profile);
app.use("/reports", reports);
// Controller functions for one type of execution
const { Parse } = require("./database"); // This is only to pass the database
// Manages the login for admins
app.post("/adminLogin", login.signinAuth(Parse));

app.post("/login", login.signinAuth(Parse));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, Parse);
});
app.post("/passwordReset", (req, res) => {
  passwordReset.passwordReset(req, res, Parse, app.mailer);
});
app.post("/logout", (req, res) => {
  logout.handleLogout(req, res, Parse);
});

// MiddleWares to catch any type of errors
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Initializes the server
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening in port ${port}`));
