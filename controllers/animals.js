// Transforms the array of Parse.Objects into Json
const getAnimalInfo = (array) => {
  return array.map(animal => {
    return animal = {
      keepers: animal.get("keepers"),
      profilePhoto: animal.get("profilePhoto"),
      name: animal.get("name"),
      about: animal.get("about"),
      characteristics: animal.get("characteristics"),
      species: animal.get("species"),
      userType: animal.get("animalRequiredPriority").id,
    }
  }
  )
}

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

// Extracts the animals from the database and filter the results befor sending them to the front end
const handleAnimals = async (req, res, Parse) => {
  const { usertype } = req.headers; // DEBERIA DE SER HEADER

  try {
    let animalTable = Parse.Object.extend("AnimalV2");
    let query = new Parse.Query(animalTable);
    query.equalTo("isActive", true);
    const activeAnimals = await query.find();
    const animalsInfo = getAnimalInfo(activeAnimals);
    const result = filterAnimals(usertype, animalsInfo)
    res.json(result);
  } catch (err) {
    res.json("Didnt work")
  }
}

module.exports = {
  handleAnimals: handleAnimals,
}