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
    const animalTable = Parse.Object.extend("AnimalV2");
    const query = new Parse.Query(animalTable);
    query.equalTo("isActive", true);
    const activeAnimals = await query.find();

    const animalsInfo = await animalInfo.getAnimals(activeAnimals, lang);
    const result = await filterAnimals(usertype, animalsInfo);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

// Extracts the information of a specific animal from the database
const handleSingleAnimal = async (req, res, Parse) => {
  try {
    const { lang } = req.cookies;
    const animalID = req.params.animalID;
    const animalTable = Parse.Object.extend("AnimalV2");
    const query = new Parse.Query(animalTable);
    const animal = await query.get(animalID);
    const isAdopted = await adopts.isAdopted(req, res, Parse, animalID);
    const animal_info = await animalInfo.getAnimalInfo(animal, Parse, lang);
    animal_info.isAdopted = isAdopted;
    res.json(animal_info);
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  handleAnimals: handleAnimals,
  handleSingleAnimal,
  handleSingleAnimal,
};
