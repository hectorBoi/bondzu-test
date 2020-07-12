const getKeeper = async (id, Parse) => {
  try {
    const keepersTable = Parse.Object.extend("Keeper");
    const queryKeeper = new Parse.Query(keepersTable);
    const keeperObj = await queryKeeper.get(id);
    const keeperZoo = keeperObj.get("zoo");

    const zooTable = Parse.Object.extend("Zoo");
    const queryZoo = new Parse.Query(zooTable);
    const zoo = await queryZoo.get(keeperZoo.id);
    const zooName = zoo.get("name");
    return zooName;
  } catch (err) {
    console.log(err)
    return "Didnt find keeper"
  }
}

// Transforms the array of Parse.Objects into Json
const getAnimalInfo = async (array, Parse) => {
  let animalInfo = await Promise.all(array.map(async animal => {
    const keeper = await getKeeper(animal.get("keepers")[0].id, Parse);
    return animal = {
      id: animal.id,
      keeper: keeper,
      profilePhoto: animal.get("profilePhoto")._url,
      name: animal.get("name"),
      about: animal.get("about"),
      characteristics: animal.get("characteristics"),
      species: animal.get("species"),
      userType: animal.get("animalRequiredPriority").id,
    }
  }
  ));

  return animalInfo;
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
  const { usertype } = req.body; // DEBERIA DE SER HEADER

  try {
    const animalTable = Parse.Object.extend("AnimalV2");
    const query = new Parse.Query(animalTable);
    query.equalTo("isActive", true);
    const activeAnimals = await query.find();
    const animalsInfo = await getAnimalInfo(activeAnimals, Parse);
    const result = filterAnimals(usertype, animalsInfo)
    res.json(result);
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  handleAnimals: handleAnimals,
}