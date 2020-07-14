const animalInfo = require("./animalInfo");

const getAdoptions = async (req, res, Parse) => {
  const { username } = req.body; // DEBERIA DE SER HEADER

  try {
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username)
    const user = await query.first();

    const adoptions = user.get("adoptersRelation");
    const queryAD = adoptions.query();
    queryAD.equalTo("isActive", true);
    const activeAdoptions = await queryAD.find();
    const adoptionsInfo = await animalInfo.getAnimalInfo(activeAdoptions, Parse);

    res.json(adoptionsInfo)
  } catch (err) {
    res.status(400).json("Adoptions did not worked")
  }
}

const updateAdoptions = async (req, res, Parse) => {
  const { username } = req.body; // DEBERIA DE SER HEADER
  const { animalid, session } = req.body;

  try {
    // USER
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username)
    const user = await query.first();
    const adoptions = user.get("adoptersRelation");
    // ANIMAL
    const animalTable = Parse.Object.extend("AnimalV2");
    const queryAnimal = new Parse.Query(animalTable);
    const animal = await queryAnimal.get(animalid);
    // // ADD ADOPTION TO RELATION
    adoptions.add(animal);
    console.log("user: ", user)
    console.log("user token: ", user.getSessionToken())
    const test = await user.save(null, { sessionToken: session });
    console.log(test);
    res.json("Worked");
  } catch (err) {
    console.log(err)
    res.status(400).json("Adoptions did not worked")
  }
}

module.exports = {
  getAdoptions: getAdoptions,
  updateAdoptions: updateAdoptions,
}