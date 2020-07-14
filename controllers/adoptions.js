const animalInfo = require("./animalInfo");

const handleAdoptions = async (req, res, Parse) => {
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

module.exports = {
  handleAdoptions: handleAdoptions,
}