const animalInfo = require("./animalInfo");

// Returns an array of all the keepers so the admin can choose one instead of creating one
const getAllKeepers = async (Parse) => {
  const tableObj = Parse.Object.extend("Keeper");
  const query = new Parse.Query(tableObj);
  const result = await query.find();

  let response = [];
  for (let keeper of result) {
    if (keeper.get("zoo").id) {
      let zooTemp = keeper.get("zoo").id;
      const zooTable = Parse.Object.extend("Zoo");
      const zooQuery = new Parse.Query(zooTable);
      zooQuery.equalTo("objectId", zooTemp);
      zoo = await zooQuery.first();
      response.push({ id: keeper.id, name: zoo.get("name") });
    }
  }

  return response;
};

// Gets the photo file from the admin and transforms it into a parse file
const createsPhotoFile = async (req, Parse) => {
  const data = Array.from(Buffer.from(req.files.newProfilepic.data));
  const contentType = req.headers["content-type"];
  const file = new Parse.File("testing.png", data, contentType);
  return file;
};

// Gets a specific user from the database
const getUser = async (username, Parse) => {
  const userTable = Parse.Object.extend("User");
  const query = new Parse.Query(userTable);
  query.equalTo("username", username);
  const user = await query.first();
  return user;
};

// Gets a specific animal from the database
const getAnimalDB = async (animalID, Parse) => {
  const animalTable = Parse.Object.extend("AnimalV2");
  const queryAnimal = new Parse.Query(animalTable);
  const animal = await queryAnimal.get(animalID);
  return animal;
};

// Gets a specific zoo from the database
const getZooDB = async (zooID, Parse) => {
  const zooTable = Parse.Object.extend("Zoo");
  const queryZoo = new Parse.Query(zooTable);
  const zoo = await queryZoo.get(zooID);
  return zoo;
};

// Gets a specific userType from the database
const getUserType = async (priority, Parse) => {
  let typeTable = Parse.Object.extend("UserType");
  let queryUserType = new Parse.Query(typeTable);
  queryUserType.equalTo("objectId", priority);
  const results = await queryUserType.find();
  return results[0];
};

// Extracts the animals from the database and filter the results before sending them to the front end
const handleAdminAnimals = async (req, res, Parse) => {
  try {
    const { username } = req.cookies;
    const user = await getUser(username, Parse);

    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    const animalTable = Parse.Object.extend("AnimalV2");
    const queryAnimals = new Parse.Query(animalTable);
    const animals = await queryAnimals.find();
    const animalsInfo = await animalInfo.getAnimals(animals);
    res.json(animalsInfo);
  } catch (err) {
    res.json(err);
  }
};

// Returns all the information (spanish and english) of single animal for the admin
const getAnimal = async (req, res, Parse) => {
  try {
    const { username } = req.cookies;
    const animalID = req.params.animalID;

    const user = await getUser(username, Parse);

    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    const animal = await getAnimalDB(animalID, Parse);
    let animal_info = await animalInfo.getAnimalInfoAdmin(animal, Parse);
    animal_info.allKeepers = await getAllKeepers(Parse);

    res.json(animal_info);
  } catch (err) {
    res.json(err);
  }
};

const getKeepers = async (req, res, Parse) => {
  try {
    const { username } = req.cookies;

    const user = await getUser(username, Parse);

    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    allKeepers = await getAllKeepers(Parse);

    const resp = {
      allKeepers: allKeepers
    }

    res.json(resp);
  } catch (err) {
    res.json(err);
  }
};

// Updates the animal with the info provided by the admin console
const updateAnimal = async (req, res, Parse) => {
  try {
    const { username, token } = req.cookies;
    const animalID = req.params.animalID;

    const {
      name,
      name_en,
      about,
      about_en,
      characteristics,
      characteristics_en,
      species,
      species_en,
      youtubeID,
      keeper,
      isActive,
      priority,
    } = req.body;

    const user = await getUser(username, Parse);

    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    const userType = await getUserType(priority, Parse);
    const animal = await getAnimalDB(animalID, Parse);

    let videoTable = Parse.Object.extend("Video");
    let queryVideo = new Parse.Query(videoTable);
    const videosArray = await queryVideo.find();

    if (youtubeID) {
      for (let video of videosArray) {
        let anID = video.get("animal_id").id;
        if (anID === animalID) {
          let temp = video.get("youtube_ids");
          temp[0] = youtubeID;
          video.set("youtube_ids", temp);
          video.set("titles", [species]);
          const videoAnimal = await video.save(null, { sessionToken: token });
        }
      }
    }

    const keeperPointer = {
      __type: "Pointer",
      className: "Keeper",
      objectId: keeper,
    };

    const keeperArray = [keeperPointer];

    if (name) {
      animal.set("name", name);
    }

    if (name_en) {
      animal.set("name_en", name_en);
    }

    if (userType) {
      animal.set("animalRequiredPriority", userType);
    }

    if (about) {
      animal.set("about", about);
    }

    if (about_en) {
      animal.set("about_en", about_en);
    }

    if (characteristics) {
      animal.set("characteristics", characteristics);
    }

    if (characteristics_en) {
      animal.set("characteristics_en", characteristics_en);
    }

    if (species) {
      animal.set("species", species);
    }

    if (species_en) {
      animal.set("species_en", species_en);
    }

    if (isActive) {
      animal.set("isActive", isActive);
    }

    if (keeper) {
      animal.set("keepers", keeperArray);
    }

    if (req.files) {
      console.log("In the update photo");
      const photo = await createsPhotoFile(req, Parse);
      animal.set("profilePhoto", photo);
      const updatedAnimal = await animal.save(null, { sessionToken: token });
      res.redirect("/admin/updateAnimal.html");
    }

    const updatedAnimal = await animal.save(null, { sessionToken: token });
    res.json(updatedAnimal);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// Creates and animal and video with info provided by the admin console
const createAnimal = async (req, res, Parse) => {
  try {
    const { username, token } = req.cookies; // TODO debe de ser cookies
    const {
      name,
      name_en,
      about,
      about_en,
      characteristics,
      characteristics_en,
      species,
      species_en,
      youtubeID,
      keeper,
      isActive,
      priority,
    } = req.body;

    const user = await getUser(username, Parse);

    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    const userType = await getUserType(priority, Parse);

    const animalTable = Parse.Object.extend("AnimalV2");
    let animal = new animalTable();

    const keeperPointer = {
      __type: "Pointer",
      className: "Keeper",
      objectId: keeper,
    };
    const keeperArray = [keeperPointer];

    if (name) {
      animal.set("name", name);
    }

    if (name_en) {
      animal.set("name_en", name_en);
    }

    if (userType) {
      animal.set("animalRequiredPriority", userType);
    }

    if (about) {
      animal.set("about", about);
    }

    if (about_en) {
      animal.set("about_en", about_en);
    }

    if (characteristics) {
      animal.set("characteristics", characteristics);
    }

    if (characteristics_en) {
      animal.set("characteristics_en", characteristics_en);
    }

    if (species) {
      animal.set("species", species);
    }

    if (species_en) {
      animal.set("species_en", species_en);
    }

    animal.set("isActive", isActive);

    if (keeper) {
      animal.set("keepers", keeperArray);
    }

    animal.set("adopters", 0);

    if (req.files) {
      const photo = await createsPhotoFile(req, Parse);
      animal.set("profilePhoto", photo);
      const updatedAnimal = await animal.save(null, { sessionToken: token });
      res.redirect("/admin/updateAnimal.html");
    }

    const updatedAnimal = await animal.save(null, { sessionToken: token });

    const videoTable = Parse.Object.extend("Video");
    let video = new videoTable();
    video.set("videoRequiredPriority", userType);
    video.set("animal_id", updatedAnimal);
    video.set("youtube_ids", [youtubeID]);

    const newVideo = await video.save(null, { sessionToken: token });

    res.json(updateAnimal);
  } catch (err) {
    res.json(err);
  }
};

// Creates a keeper with info provided by the admin console
const createZoo = async (req, res, Parse) => {
  try {
    const { username, token } = req.body; // TODO debe de ser cookies
    // This is for the zoo
    const {
      name,
      location,
      description,
      photoUrl
    } = req.body;

    const user = await getUser(username, Parse);

    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    const zoosTable = Parse.Object.extend("Zoo");
    let zoo = new zoosTable();


    if (name) {
      zoo.set("name", name);
    }

    if (location) {
      zoo.set("location", location);
    }

    if (description) {
      zoo.set("description", description);
    }

    if (photoUrl) {
      zoo.set("photoUrl", photoUrl);
    }

    const zooCreated = await zoo.save(null, { sessionToken: token });

    res.json(zooCreated);
  } catch (err) {
    res.json(err);
  }
};

// Creates a keeper with info provided by the admin console
const updateZoo = async (req, res, Parse) => {
  try {
    const { username, token } = req.body; // TODO debe de ser cookies
    // This is for the zoo
    const {
      name,
      location,
      description,
      photoUrl
    } = req.body;

    const zooID = req.params.zooID;
    console.log(zooID)

    const user = await getUser(username, Parse);

    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    let zoo = await getZooDB(zooID, Parse);

    if (name) {
      zoo.set("name", name);
    }

    if (location) {
      zoo.set("location", location);
    }

    if (description) {
      zoo.set("description", description);
    }

    if (photoUrl) {
      zoo.set("photoUrl", photoUrl);
    }

    const zooUpdated = await zoo.save(null, { sessionToken: token });

    res.json(zooUpdated);
  } catch (err) {
    console.log(err)
    res.json(err);
  }
};

module.exports = {
  handleAdminAnimals: handleAdminAnimals,
  getAnimal: getAnimal,
  updateAnimal: updateAnimal,
  createAnimal: createAnimal,
  getKeepers: getKeepers,
  createZoo: createZoo,
  updateZoo: updateZoo
};
