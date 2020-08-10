const animalInfo = require("./animalInfo");

// Filter the array of animals depending on the type of the user
const filterAnimals = (userType, animals) => {
  let filteredArray = [];
  switch (userType) {
    case "etDcoSci6K": // 0
      filteredArray = animals.filter(animal => animal.userType === "etDcoSci6K");
      break;
    case "jHbSEutegP": // 1
      filteredArray = animals.filter(animal => animal.userType === "etDcoSci6K" || animal.userType === "jHbSEutegP");
      break;
    case "nRXYUkuJJq": // 2
      filteredArray = animals.filter(animal => animal.userType === "etDcoSci6K" || animal.userType === "jHbSEutegP" || animal.userType === "nRXYUkuJJq");
      break;
    case "mWm6R6DLFX": // 3
      filteredArray = animals;
      break;
  }
  return filteredArray;
}

// Extracts the animals from the database and filter the results before sending them to the front end
const handleAnimals = async (req, res, Parse) => {
  const { usertype, username, token } = req.headers; // DEBERIA DE SER HEADER

  try {
    const animalTable = Parse.Object.extend("AnimalV2");
    const query = new Parse.Query(animalTable);
    query.equalTo("isActive", true);
    const activeAnimals = await query.find();
    const animalsInfo = await animalInfo.getAnimals(activeAnimals);
    console.log(animalsInfo)
    const result = filterAnimals(usertype, animalsInfo)
    res.json(result);
  } catch (err) {
    res.json(err)
  }
}

// Extracts the information of a specific animal from the database
const handleSingleAnimal = async (req, res, Parse) => {
  const { usertype, animalID } = req.body; // DEBERIA DE SER HEADER

  try {
    const animalTable = Parse.Object.extend("AnimalV2");
    const query = new Parse.Query(animalTable);
    const animal = await query.get(animalID)
    const animal_info = await animalInfo.getAnimalInfo(animal, Parse);
    res.json(animal_info);
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  handleAnimals: handleAnimals,
  handleSingleAnimal, handleSingleAnimal,
}