const animalInfo = require("./animalInfo");

const getAdoptions = async (req, res, Parse) => {
  try {
    const { username } = req.cookies;
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username)
    const user = await query.first();

    const adoptions = user.get("adoptersRelation");
    const queryAD = adoptions.query();
    queryAD.equalTo("isActive", true);
    const activeAdoptions = await queryAD.find();
    const adoptionsInfo = await animalInfo.getAnimals(activeAdoptions, Parse);

    res.json(adoptionsInfo)
  } catch (err) {
    console.log(err)
    res.status(400).json("Adoptions did not worked")
  }
}

const isAdopted = async (req, res, Parse, animalID) => {
  try {
    const { username } = req.cookies; // DEBERIA DE SER HEADER
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username)
    const user = await query.first();

    const adoptions = user.get("adoptersRelation");
    const queryAD = adoptions.query();
    queryAD.equalTo("isActive", true);
    const activeAdoptions = await queryAD.find();
    const adoptionsInfo = await animalInfo.getAnimals(activeAdoptions, Parse);

    let isAdopted = false
    adoptionsInfo.map(animal => {
      if (animal.id === animalID) {
        isAdopted = true
      }
    })

    return isAdopted
  } catch (err) {
    console.log(err)
    res.status(400).json("Adoptions did not worked")
  }
}

const updateAdoptions = async (req, res, Parse) => {
  try {
    const { username, token } = req.cookies; // DEBERIA DE SER HEADER
    const { animalID } = req.params;
    // USER
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username)
    const user = await query.first();
    const adoptions = user.get("adoptersRelation");
    // ANIMAL
    const animalTable = Parse.Object.extend("AnimalV2");
    const queryAnimal = new Parse.Query(animalTable);
    const animal = await queryAnimal.get(animalID);
    // // ADD ADOPTION TO RELATION
    adoptions.add(animal);
    const test = await user.save(null, { sessionToken: token });
    res.json("Worked");
  } catch (err) {
    res.status(400).json("Adoptions did not worked")
  }
}

module.exports = {
  getAdoptions: getAdoptions,
  updateAdoptions: updateAdoptions,
  isAdopted: isAdopted
}