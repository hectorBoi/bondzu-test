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

// Returns a list of all the adoptions for a specific user, the information is to show the catalog screen
router.post('/:animalID', async (req, res, next) => {
  try {
    const { username } = req.cookies;
    const { animalID } = req.params;

    const userTable = Parse.Object.extend("User");
    const queryUser = new Parse.Query(userTable);
    queryUser.equalTo("username", username);
    const user = await queryUser.first();

    const animalTable = Parse.Object.extend("AnimalV2");
    const queryAnimal = new Parse.Query(animalTable);
    const animal = await queryAnimal.get(animalID);
    
    const adoption = new Parse.Object("Adoption");
    adoption.set("adopter", user)
    adoption.set("adopted", animal)
    adoption.set("adoptionDate", new Date())
    adoption.save()

    res.json("Worked");
  } catch (error) {
    console.log(error);
    res.status(400).json("Adoption failed.");
  }
});

// Checks in the database if the animal is adopted by the user or not
const isAdopted = async (req, res, animalID) => {
  try {
    const { username, lang } = req.cookies;
    // Gets the user from the database
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username);
    const user = await query.first();

    // Gets the animal from the database
    const animalTable = Parse.Object.extend("AnimalV2");
    const queryAnimal = new Parse.Query(animalTable);
    queryAnimal.equalTo("isActive", true);
    const animal = await queryAnimal.get(animalID);

    // Get the adoption item from the database
    const adoptionTable = Parse.Object.extend("Adoption");
    const adoptionQuery = new Parse.Query(adoptionTable);
    adoptionQuery.equalTo("adopter", user)
    adoptionQuery.equalTo("adopted", animal)
    let result = await adoptionQuery.first()

    // Checks if the animal is adopted or not
    let isAdopted = false;

    if (result) isAdopted = true;

    return isAdopted;
  } catch (err) {
    console.log(err);
    res.status(400).json("Adoptions did not worked");
  }
};

module.exports = {
  isAdopted,
  router,
}