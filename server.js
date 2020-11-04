const express = require("express");
const morgan = require("morgan");
const Parse = require("parse/node");
const mailer = require("express-mailer");

require('dotenv').config();

// Initialize connection with Parse Database
Parse.initialize(
  "7aGqZRDKBITfaIRAXq2oKoBkuWkhNqJZJWmf318I",
  "",
  "fF5zsMkXpw3eIcmg4ggwh6HlynYnNpYmZeJyl5Cw"
);
Parse.serverURL =
  "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com/parse";
Parse.appName = "Bondzu";

// Imports all the controllers for the different routes
const register = require("./controllers/register");
const signin = require("./controllers/login");
const profile = require("./controllers/profile");
const animals = require("./controllers/animals");
const adoptions = require("./controllers/adoptions");
const logout = require("./controllers/logout");
const banner = require("./controllers/banner");
const admin = require("./controllers/admin");
const passwordReset = require("./controllers/passwordReset");
const middlewares = require("./middlewares");

const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

// Declares the express server and  middlewares
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());
app.use(cookieParser());
app.use(helmet());

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

app.set("views", __dirname + "/views");
// set the view engine to pug
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

// Manages the login and routes for admin
app.post("/adminLogin", signin.signinAuth(Parse));

app.get("/admin/animals", (req, res) => {
  admin.handleAdminAnimals(req, res, Parse);
});

app.get("/admin/animals/keepers", (req, res) => {
  admin.getKeepers(req, res, Parse);
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

app.post("/admin/zoo", (req, res) => {
  admin.createZoo(req, res, Parse);
});

app.post("/admin/zoo/:zooID", (req, res) => {
  admin.updateZoo(req, res, Parse);
});

app.post("/admin/zoos", (req, res) => {
  admin.handleZoos(req, res, Parse);
});

app.post("/admin/zoos/:zooID", (req, res) => {
  admin.getZoo(req, res, Parse);
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
  logout.handleLogout(req, res, Parse);
});

app.get("/profile/", (req, res) => {
  profile.handleProfile(req, res, Parse);
});

app.post("/profile", (req, res) => {
  profile.updateProfile(req, res, Parse);
});

app.get("/animals", (req, res) => {
  animals.handleAnimals(req, res, Parse);
});

app.post("/animals", (req, res) => {
  animals.handleAnimals(req, res, Parse);
});

app.get("/singleAnimal/:animalID", (req, res) => {
  animals.handleSingleAnimal(req, res, Parse);
});

app.post("/singleAnimal/:animalID", (req, res) => {
  animals.handleSingleAnimal(req, res, Parse);
});

app.get("/adoptions/:userID", (req, res) => {
  adoptions.getAdoptions(req, res, Parse);
});

app.post("/adoptions", (req, res) => {
  // THIS IS TEMPORAL
  adoptions.getAdoptions(req, res, Parse);
});

app.post("/adoptions/:animalID", (req, res) => {
  adoptions.updateAdoptions(req, res, Parse);
});

app.get("/banner", (req, res) => {
  banner.getBanner(req, res, Parse);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


//////////////////////////////// scripts to modify the animals to change from keeper to zoo
// const changeToZoo = async () => {
//   try {
//     // Get all the animals
//     const animalTable = Parse.Object.extend("AnimalV2");
//     const query = new Parse.Query(animalTable);
//     query.equalTo("isActive", true);
//     const noActiveAnimals = await query.find();
//     console.log("no active animals: ", noActiveAnimals.length);

//     // Declares the keepers table outside the map
//     const keeperTable = Parse.Object.extend("Keeper");
//     const queryKeeper = new Parse.Query(keeperTable);
//     const allKeepers = await queryKeeper.find();
//     console.log("all keepers: ", allKeepers.length);

//     // For each animal, gets the keeper and the zoo it works for
//     noActiveAnimals.map(async animal => {
//       try {
//         const keeper = animal.get("keepers")
//         if (keeper.length != 1) {
//           return animal
//         }
//         const keeperID = keeper[0].id
//         console.log("-----------")
//         console.log("keeper from the animal table:")
//         console.log(keeperID)

//         let flag = true
//         for (let k of allKeepers) {
//           if( k.id == keeperID) {
//             console.log("Zoo:")
//             console.log(k.get("zoo"))
//             flag = false

//             // Create animal
//             const zooPointer = {
//               __type: "Pointer",
//               className: "Zoo",
//               objectId: k.get("zoo").id,
//             };
//             const zooArray = [zooPointer];
//             animal.set("keepers", zooArray);
//             await animal.save(null, { useMasterKey: true })
//             console.log("completed")
//           }
//         }

//         if (flag) {
//           console.log("No match for id: ", keeperID)
//         }

//         return animal
//       } catch (err) {
//         console.log("Error:")
//         console.log(err)
//       }
//     })

//     // console.log(result.length)
//   } catch (err) {
//     console.log("Error:")
//     console.log(err)
//   }
// }

// changeToZoo()

// const lookUpZoo = async () => {
//   try {
//     const animalTable = Parse.Object.extend("AnimalV3");
//     const query = new Parse.Query(animalTable);
//     const animals = await query.find();
  
//     const zooTable = Parse.Object.extend("Zoo");
//     const queryZoo = new Parse.Query(zooTable);
  
//     for (let animal of animals) {
//       zooID = animal.get("keepers")[0].id
//       console.log(zooID)
//       const zoo = await queryZoo.get(zooID);
//       const zooName = zoo.get("name");
//       console.log(zooName)
//     }
//   } catch (error) {
//     console.log("Error:")
//     console.log(error)
//   }
// }

// lookUpZoo()

////////////////////////////////

// Initilizes the server
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening in port ${port}`));
