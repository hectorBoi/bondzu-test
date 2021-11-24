// Represents all the routes for the admin console
const animalInfo = require("./animalInfo");
const { Parse } = require("../database");
const { Router } = require("express");

// Initializes the router
const router = Router();

router.get("/:username", async (req, res, next) => {
  try {
    //Recover user id
    const { username, lang } = req.cookies;
    const userTable = Parse.Object.extend("User");
    const userInfoQuery = new Parse.Query(userTable);
    userInfoQuery.equalTo("username", username);
    const user = await userInfoQuery.find();
    const userId = user[0].id;

    // Search the animals adopted by the user
    const table = Parse.Object.extend("Adoption");
    const query = new Parse.Query(table);
    // Include the adopted animal information
    query.include("adopted");
    // Adopter id must be equal to userId
    query.equalTo("adopter", {
      __type: "Pointer",
      className: "_User",
      objectId: userId,
    });
    const result = await query.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

//LEGACY
/*
// Returns a list of all the adoptions for a specific user, the information is to show the catalog screen
router.get('/:userID', async (req, res, next) => {
  try {
    // Gets the user from the database
    const { username, lang } = req.cookies;
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username);
    const user = await query.first();

    // Manages the adoptions relationship in the data base, only gets the animals that are active and returns their information
    const adoptions = user.get("adoptersRelation");
    const queryAD = adoptions.query();
    queryAD.equalTo("isActive", true);
    const activeAdoptions = await queryAD.find();
    const adoptionsInfo = await animalInfo.getAnimals(activeAdoptions, lang);

    res.json(adoptionsInfo);
  } catch (err) {
    next(err)
  }
});


// Returns a list of all the adoptions for a specific user, the information is to show the catalog screen
router.post('/:animalID', async (req, res, next) => {
  try {
    const { username, token } = req.cookies;
    const { animalID } = req.params;
    // Gets the user from the database
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username);
    const user = await query.first();
    const adoptions = user.get("adoptersRelation");
    // Gets the animal from the database based on the ID provided
    const animalTable = Parse.Object.extend("AnimalV2");
    const queryAnimal = new Parse.Query(animalTable);
    const animal = await queryAnimal.get(animalID);
    // Adds the animal to the the user adoptions relationship
    adoptions.add(animal);
    animal.increment("adopters");
    const testAnimal = await animal.save(null, { sessionToken: token });
    const test = await user.save(null, { sessionToken: token });
    res.json("Worked");
  } catch (err) {
    next(err)
  }
});
*/
// Checks in the database if the animal is adopted by the user or not
const isAdopted = async (req, res, animalID) => {
  try {
    const { username, lang } = req.cookies;
    // Gets the user from the database
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username);
    const user = await query.first();

    // Gets the adoptions relationship
    const adoptions = user.get("adoptersRelation");
    const queryAD = adoptions.query();
    queryAD.equalTo("isActive", true);
    const activeAdoptions = await queryAD.find();

    const adoptionsInfo = await animalInfo.getAnimals(activeAdoptions, lang);

    // Checks if the animal is adopted or not
    let isAdopted = false;
    adoptionsInfo.map((animal) => {
      if (animal.id === animalID) {
        isAdopted = true;
      }
    });

    return isAdopted;
  } catch (err) {
    console.log(err);
    res.status(400).json("Adoptions did not worked");
  }
};
/*
module.exports = {
  isAdopted,
  router,
}*/

module.exports = { router, isAdopted };
