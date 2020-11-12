// Represents all the routes for the admin console
const animalInfo = require("./animalInfo");
const adopts = require("./adoptions");
const { Parse } = require("../database");
const { Router } = require("express");

// Initializes the router
const router = Router();

// Extracts the animals from the database and filter the results before sending them to the front end
router.get('/all', async (req, res, next) => {
  try {
    const { lang, usertype } = req.cookies;
    // Gets the reference for the animal table
    const animalTable = Parse.Object.extend("AnimalV2");
    const query = new Parse.Query(animalTable);
    query.equalTo("isActive", true);
    const activeAnimals = await query.find();

    // Extracts the information for the animals and returns it for the catalog screen
    const animalsInfo = await animalInfo.getAnimals(activeAnimals, lang);
    const result = await filterAnimals(usertype, animalsInfo);
    res.json(result);
  } catch (err) {
    next(error)
  }
});

// Extracts the animal from the database based on the provided ID
router.get('/:animalID', async (req, res, next) => {
  try {
    const { lang } = req.cookies;
    const animalID = req.params.animalID;
    // Gets the reference for the animal table
    const animalTable = Parse.Object.extend("AnimalV2");
    const query = new Parse.Query(animalTable);
    const animal = await query.get(animalID);
    // Extracts the animal and checks for the information
    const isAdopted = await adopts.isAdopted(req, res, animalID);
    const animal_info = await animalInfo.getAnimalInfo(animal, lang);
    // Assigns if the animal is adopted or not by the user that made the request
    animal_info.isAdopted = isAdopted;
    res.json(animal_info);
  } catch (err) {
    next(error)
  }
});

// === Helper functions used in the routes

// Filter the array of animals depending on the type of the user
const filterAnimals = async (userType, animals) => {
  let filteredArray = [];
  switch (userType) {
    case "etDcoSci6K": // 0
      filteredArray = animals.filter(
        (animal) => animal.userType === "etDcoSci6K"
      );
      break;
    case "jHbSEutegP": // 1
      filteredArray = animals.filter(
        (animal) =>
          animal.userType === "etDcoSci6K" || animal.userType === "jHbSEutegP"
      );
      break;
    case "nRXYUkuJJq": // 2
      filteredArray = animals.filter(
        (animal) =>
          animal.userType === "etDcoSci6K" ||
          animal.userType === "jHbSEutegP" ||
          animal.userType === "nRXYUkuJJq"
      );
      break;
    case "mWm6R6DLFX": // 3
      filteredArray = animals;
      break;
    case "vBD6O8qUW4": // Admin
      filteredArray = animals;
      break;
  }
  return filteredArray;
};


module.exports = router;
