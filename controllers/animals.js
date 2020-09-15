const animalInfo = require("./animalInfo");
const adopts = require("./adoptions");

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

// Extracts the animals from the database and filter the results before sending them to the front end
const handleAnimals = async (req, res, Parse) => {
  try {
    const { lang, usertype } = req.cookies;
    console.log("---------------");
    console.log("Entering all animals");
    const animalTable = Parse.Object.extend("AnimalV2");
    const query = new Parse.Query(animalTable);
    query.equalTo("isActive", true);
    const activeAnimals = await query.find();
    console.log("Animals loaded");

    console.log(activeAnimals);

    const animalsInfo = await animalInfo.getAnimals(activeAnimals, lang);
    console.log("Info animals loaded");
    const result = await filterAnimals(usertype, animalsInfo);
    console.log("Animals filtered");
    res.json(result);
    console.log("Info sent");
    console.log("---------------");
  } catch (err) {
    res.json(err);
  }
};

// Extracts the information of a specific animal from the database
const handleSingleAnimal = async (req, res, Parse) => {
  try {
    const { lang } = req.cookies;
    const animalID = req.params.animalID;
    console.log("---------------");
    console.log("Entering single animal");
    const animalTable = Parse.Object.extend("AnimalV2");
    const query = new Parse.Query(animalTable);
    const animal = await query.get(animalID);
    console.log("Animal loaded");
    const isAdopted = await adopts.isAdopted(req, res, Parse, animalID);
    console.log("Adopted loaded");
    const animal_info = await animalInfo.getAnimalInfo(animal, Parse, lang);
    console.log("Info loaded");
    animal_info.isAdopted = isAdopted;
    res.json(animal_info);
    console.log("Info sent");
    console.log("---------------");
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  handleAnimals: handleAnimals,
  handleSingleAnimal,
  handleSingleAnimal,
};
