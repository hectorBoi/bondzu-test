const animalInfo = require("./animalInfo");

const getAllVideos = async (Parse) => {
  const tableObj = Parse.Object.extend("Video");
  const query = new Parse.Query(tableObj);
  const result = await query.find();

  const response = result.map(temp => {
    return {
      id: temp.id, name: temp.get("titles")[0]
    }
  });
  return response;
}


const getAllKeepers = async (Parse) => {
  const tableObj = Parse.Object.extend("Keeper");
  const query = new Parse.Query(tableObj);
  const result = await query.find();

  let response = []
  for (let keeper of result) {
    if (keeper.get("zoo").id) {
      let zooTemp = keeper.get("zoo").id
      const zooTable = Parse.Object.extend("Zoo");
      const zooQuery = new Parse.Query(zooTable);
      zooQuery.equalTo("objectId", zooTemp);
      zoo = await zooQuery.first();
      response.push({ id: keeper.id, name: zoo.get("name") });
    }
  };

  return response;
}

// Extracts the animals from the database and filter the results before sending them to the front end
const handleAdminAnimals = async (req, res, Parse) => {
  try {
    const { username } = req.cookies;
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username);
    const user = await query.first();

    if (!user.get("isAdmin")) {
      throw { message: "No admin" }
    }

    const animalTable = Parse.Object.extend("AnimalV2");
    const queryAnimals = new Parse.Query(animalTable);
    const animals = await queryAnimals.find();
    const animalsInfo = await animalInfo.getAnimals(animals);
    res.json(animalsInfo);
  } catch (err) {
    res.json(err)
  }
}

// Returns all the information (spanish and english) of single animal for the admin
const getAnimal = async (req, res, Parse) => {
  try {
    const { username } = req.body;
    const animalID = req.params.animalID;

    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username);
    const user = await query.first();

    if (!user.get("isAdmin")) {
      throw { message: "No admin" }
    }

    const animalTable = Parse.Object.extend("AnimalV2");
    const queryAnimal = new Parse.Query(animalTable);
    const animal = await queryAnimal.get(animalID)
    let animal_info = await animalInfo.getAnimalInfoAdmin(animal, Parse);
    animal_info.allKeepers = await getAllKeepers(Parse);
    animal_info.allVideos = await getAllVideos(Parse);;

    res.json(animal_info);
  } catch (err) {
    res.json(err)
  }
}

// Updates the animal info provided by the admin console
const updateAnimal = async (req, res, Parse) => {
  try {
    const { username, token } = req.body; // TODO DEBE DE SER COOKIES
    const animalID = req.params.animalID;
    const { about, about_en, characteristics, characteristics_en, profilePhoto, species, species_en, youtubeID, keeper, isActive, priority } = req.body;

    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username);
    const user = await query.first();

    if (!user.get("isAdmin")) {
      throw { message: "No admin" }
    }

    // Creates the userType for the user
    let typeTable = Parse.Object.extend("UserType");
    let queryUserType = new Parse.Query(typeTable);
    queryUserType.equalTo("objectId", priority);
    const results = await queryUserType.find();

    const animalTable = Parse.Object.extend("AnimalV2");
    const queryAnimal = new Parse.Query(animalTable);
    const animal = await queryAnimal.get(animalID);

    let videoTable = Parse.Object.extend("Video");
    let queryVideo = new Parse.Query(videoTable);
    const videosArray = await queryVideo.find();

    for (let video of videosArray) {
      let anID = video.get("animal_id").id
      if (anID === animalID) {
        let temp = video.get("youtube_ids");
        temp[0] = youtubeID;
        video.set("youtube_ids", temp);
        video.set("titles", [species])
        const videoAnimal = await video.save(null, { sessionToken: token });
      }
    }

    const keeperPointer = {
      "__type": "Pointer",
      "className": "Keeper",
      "objectId": keeper
    }
    const keeperArray = [keeperPointer]
    // TODO: profilePhoto pendientes 
    animal.set("animalRequiredPriority", results[0]);
    animal.set("about", about);
    animal.set("about_en", about_en);
    animal.set("characteristics", characteristics);
    animal.set("characteristics_en", characteristics_en);
    animal.set("species", species);
    animal.set("species_en", species_en);
    animal.set("isActive", isActive);
    animal.set("keepers", keeperArray);

    const updatedAnimal = await animal.save(null, { sessionToken: token });

    res.json(updatedAnimal);
  } catch (err) {
    console.log(err)
    res.json(err)
  }
}

const createAnimal = async (req, res, Parse) => {
  try {
    const { username, token } = req.body; // DEBE DE SER COOKIES
    const { about, about_en, characteristics, characteristics_en, profilePhoto, species, species_en, youtubeID, keeper, isActive, priority } = req.body;

    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username);
    const user = await query.first();

    if (!user.get("isAdmin")) {
      throw { message: "No admin" }
    }

    // Creates the userType for the user
    let typeTable = Parse.Object.extend("UserType");
    let queryUserType = new Parse.Query(typeTable);
    queryUserType.equalTo("objectId", priority);
    const results = await queryUserType.find();

    const animalTable = Parse.Object.extend("AnimalV2");
    let animal = new animalTable();

    const keeperPointer = {
      "__type": "Pointer",
      "className": "Keeper",
      "objectId": keeper
    }
    const keeperArray = [keeperPointer]
    // TODO: profilePhoto pendientes 
    animal.set("animalRequiredPriority", results[0]);
    animal.set("about", about);
    animal.set("about_en", about_en);
    animal.set("characteristics", characteristics);
    animal.set("characteristics_en", characteristics_en);
    animal.set("species", species);
    animal.set("species_en", species_en);
    animal.set("isActive", isActive);
    animal.set("keepers", keeperArray);

    const updatedAnimal = await animal.save(null, { sessionToken: token });

    const videoTable = Parse.Object.extend("Video");
    let video = new videoTable();
    video.set("videoRequiredPriority", results[0]);
    video.set("animal_id", updatedAnimal);
    video.set("youtube_ids", [youtubeID]);

    const newVideo = await video.save(null, { sessionToken: token });

    res.json(updatedAnimal);
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  handleAdminAnimals: handleAdminAnimals,
  getAnimal: getAnimal,
  updateAnimal: updateAnimal,
  createAnimal: createAnimal
}

