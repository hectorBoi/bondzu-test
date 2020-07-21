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

// Extracts the animals from the database and filter the results befor sending them to the front end
const handleAnimals = async (req, res, Parse) => {
  const { usertype, username, token } = req.headers; // DEBERIA DE SER HEADER

  try {
    //TESTING ////
    const userTable = Parse.Object.extend("User");
    const q = new Parse.Query(userTable)
    q.equalTo("username", username);
    const user = await q.first();

    // VERY VERY IMPORTANT TO MODIFY DB
    user.set("gender", "machito alfa");
    user.save(null, { sessionToken: token })
      .then(user => console.log(user.get("gender")))
      .catch(err => console.log(err))
    ////////////

    const animalTable = Parse.Object.extend("AnimalV2");
    const query = new Parse.Query(animalTable);
    query.equalTo("isActive", true);
    const activeAnimals = await query.find();
    const animalsInfo = await animalInfo.getAnimalInfo(activeAnimals, Parse);
    const result = filterAnimals(usertype, animalsInfo)
    res.json(result);
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  handleAnimals: handleAnimals,
}