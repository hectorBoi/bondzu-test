// Represents all the routes for the admin console
const animalInfo = require("./animalInfo");
const { Parse } = require("../database");
const { Router } = require("express");

// Initializes the router
const router = Router();

// Returns all the animals to show the catalog inside the admin console
router.get("/animals", async (req, res, next) => {
  try {
    // Verifies if the user making the request is an Admin
    const { username } = req.cookies;
    const user = await getUser(username);

    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    // Extracts all the animals from the database and responds with them
    const animalTable = Parse.Object.extend("AnimalV2");
    const queryAnimals = new Parse.Query(animalTable);
    const animals = await queryAnimals.find();
    const animalsInfo = await animalInfo.getAnimals(animals);
    res.json(animalsInfo);
  } catch (err) {
    next(err);
  }
});

// Returns all the zoos for the pages where the admin can select the new zoo for a given animal or colleague
router.get("/animals/keepers", async (req, res, next) => {
  try {
    // Verifies if the user making the request is an Admin
    const { username } = req.cookies;
    const user = await getUser(username);

    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    allKeepers = await getAllKeepers();

    const resp = {
      allKeepers: allKeepers,
    };

    res.json(resp);
  } catch (err) {
    next(err);
  }
});

// Returns all the information of single animal identified by the ID given for the admin
router.get("/animals/:animalID", async (req, res, next) => {
  try {
    // Verifies if the user making the request is an Admin
    const { username } = req.cookies;
    const animalID = req.params.animalID;

    const user = await getUser(username);

    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    // Get the specific animal with they ID from the database and extracts all the information needed for the update
    const animal = await getAnimalDB(animalID);
    let animal_info = await animalInfo.getAnimalInfoAdmin(animal);
    animal_info.allKeepers = await getAllKeepers();

    res.json(animal_info);
  } catch (err) {
    next(err);
  }
});

// Updates the animal with the info provided by the admin console, returns the updated info
router.post("/animals/:animalID", async (req, res, next) => {
  try {
    const { username, token } = req.cookies;
    const animalID = req.params.animalID;

    // Gets all the variables sended in the request
    const {
      name,
      name_en,
      about,
      about_en,
      characteristics,
      characteristics_en,
      technicalData,
      technicalData_en,
      species,
      species_en,
      youtubeID,
      keeper,
      isActive,
      priority,
    } = req.body;

    // Verifies if the user making the request is an Admin
    const user = await getUser(username);

    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    // Gets the priority reference for the animal and the animal from the database
    // The animal is searched based on the provided ID
    const userType = await getUserType(priority);
    const animal = await getAnimalDB(animalID);
    // Gets the reference for the video table in the database
    let videoTable = Parse.Object.extend("Video");
    let queryVideo = new Parse.Query(videoTable);
    const videosArray = await queryVideo.find();

    // Updates the reference in the video table for the animal video
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

    // Creates the array for the keeper field
    const keeperPointer = {
      __type: "Pointer",
      className: "Zoo",
      objectId: keeper,
    };

    const keeperArray = [keeperPointer];

    // Updates all the fields of the animal with the new information sended in the request
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

    if (technicalData) {
      animal.set("technicalData", technicalData);
    }

    if (technicalData_en) {
      animal.set("technicalData_en", technicalData_en);
    }

    // In case that the request is to update the animal photo, the request is treated differently
    if (req.files) {
      console.log("In the update photo");
      const photo = await createsPhotoFile(req);
      animal.set("profilePhoto", photo);
      const updatedAnimal = await animal.save(null, { sessionToken: token });
      res.redirect("/admin/updateAnimal.html");
    }

    const updatedAnimal = await animal.save(null, { sessionToken: token });
    res.json(updatedAnimal);
  } catch (err) {
    next(err);
  }
});

// Creates an animal and video with info provided by the admin console, returns to the index page
router.post("/animals", async (req, res, next) => {
  try {
    const { username, token } = req.cookies;

    // Gets all the variables sended in the request
    const {
      name,
      name_en,
      about,
      about_en,
      characteristics,
      characteristics_en,
      technicalData,
      technicalData_en,
      species,
      species_en,
      youtubeID,
      keeper,
      isActive,
      priority,
    } = req.body;

    // Verifies if the user making the request is an Admin
    const user = await getUser(username);

    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    // Gets the priority reference for the animal and the animal from the database
    // The animal is searched based on the provided ID
    const userType = await getUserType(priority);

    // Gets the reference for the animal table in the database
    const animalTable = Parse.Object.extend("AnimalV2");
    let animal = new animalTable();

    // Creates the pointer for the keeper array
    const keeperPointer = {
      __type: "Pointer",
      className: "Zoo",
      objectId: keeper,
    };

    const keeperArray = [keeperPointer];

    // Updates all the fields of the animal with the new information sent in the request
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

    if (technicalData) {
      animal.set("technicalData", technicalData);
    }

    if (technicalData_en) {
      animal.set("technicalData_en", technicalData_en);
    }

    animal.set("adopters", 0);

    // In case that the request is to update the animal photo, the request is treated differently
    if (req.files) {
      const photo = await createsPhotoFile(req);
      animal.set("profilePhoto", photo);
      const updatedAnimal = await animal.save(null, { sessionToken: token });
      res.redirect("/admin/updateAnimal.html");
    }

    const updatedAnimal = await animal.save(null, { sessionToken: token });

    // Creates the entry in the video table with the reference of the new animal
    const videoTable = Parse.Object.extend("Video");
    let video = new videoTable();
    video.set("videoRequiredPriority", userType);
    video.set("animal_id", updatedAnimal);
    video.set("youtube_ids", [youtubeID]);

    const newVideo = await video.save(null, { sessionToken: token });

    res.json(updateAnimal);
  } catch (err) {
    next(err);
  }
});

// Creates a zoo with the info provided by the admin console, returns to the index page
router.post("/zoo", async (req, res, next) => {
  try {
    const { username, token } = req.cookies;

    // Gets all the variables sended in the request
    const { name, location, description, photoUrl } = req.body;

    // Verifies that the user making the request is admin
    const user = await getUser(username);

    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    // Gets the reference for the zoo
    const zoosTable = Parse.Object.extend("Zoo");
    let zoo = new zoosTable();

    // Creates an entry with all the information sended in the request
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
    next(err);
  }
});

// Update the zoo identified by the ID given for the admin
router.post("/zoo/:zooID", async (req, res, next) => {
  try {
    const { username, token } = req.cookies;

    // Gets all the variables sended in the request
    const { name, location, description, photoUrl } = req.body;

    const zooID = req.params.zooID;

    // Verifies that the user making the request is admin
    const user = await getUser(username);

    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    // Gets the zoo from the database with the id provided
    let zoo = await getZooDB(zooID);

    // Updates all the fields with the info provided in the request
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
    next(err);
  }
});

// Update the zoo returns a list of all the zoos for the catalog in the admin console
router.get("/zoos", async (req, res, next) => {
  try {
    const { username } = req.cookies;
    const user = await getUser(username);

    // Verifies that the user is an admin
    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    // Returns a list of all the zoos
    const ZooTable = Parse.Object.extend("Zoo");
    const queryZoos = new Parse.Query(ZooTable);
    const zoos = await queryZoos.find();
    const zoosInfo = await animalInfo.getZoos(zoos);
    res.json(zoosInfo);
  } catch (err) {
    next(err);
  }
});

// Returns all the information of a specific zoo to the admin console
router.get("/zoos/:zooID", async (req, res, next) => {
  try {
    const { username } = req.cookies;
    const zooID = req.params.zooID;

    const user = await getUser(username);

    // Verifies that the user is an admin
    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    // Returns all the information of the zoo
    const zoo = await getZooDB(zooID);
    let zoo_info = await animalInfo.getZooInfo(zoo);

    res.json(zoo_info);
  } catch (err) {
    next(err);
  }
});

// Returns all the members of Bondzu
router.get("/members", async (req, res, next) => {
  try {
    let membersInfo = [];

    const membersTable = Parse.Object.extend("Members");
    const membersQuery = new Parse.Query(membersTable);
    const resultMembers = await membersQuery.find();

    for (let member of resultMembers) {
      membersInfo.push({ name: member.get("name"), description: member.get("description"), email: member.get("email"), division: member.get("division"), animal: member.get("animal") });
    }

    //console.log(membersInfo)
    res.json(membersInfo);
  } catch (err) {
    next(err);
  }
});

// Creates a new Bondzu member, returns to the index page
router.post("/member", async (req, res, next) => {
  try {
    const { username, token } = req.cookies;

    // Gets all the variables sent in the request
    const {
      name,
      description,
      description_en,
      email,
      division,
      priority,
    } = req.body;

    // Verifies if the user making the request is an Admin
    const user = await getUser(username);

    if (!user.get("isAdmin")) {
      throw { message: "No admin" };
    }

    // Gets the priority reference for the members from the database
    // The member is searched based on the provided ID
    const userType = await getUserType(priority);

    // Gets the reference for the member table in the database
    const membersTable = Parse.Object.extend("Members");
    let member = new membersTable();

    // Updates all the fields of the animal with the new information sent in the request
    if (name) {
      member.set("name", name);
    }

    if (description) {
      member.set("description", description);
    }

    if (description_en) {
      member.set("description_en", description_en);
    }

    if (email) {
      member.set("email", email);
    }

    if (division) {
      member.set("division", division);
    }

    const updatedMember = await member.save(null, { sessionToken: token });

    res.json(updatedMember);
  } catch (err) {
    next(err);
  }
});

// === This are all the helpers functions used in the routes

// Returns an array of all the zoo's so the admin can choose one instead of creating one
const getAllKeepers = async () => {
  try {
    let response = [];

    const zooTable = Parse.Object.extend("Zoo");
    const zooQuery = new Parse.Query(zooTable);
    const resultZoo = await zooQuery.find();

    for (let zoo of resultZoo) {
      response.push({ id: zoo.id, name: zoo.get("name") });
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

// Gets the photo file from the admin and transforms it into a parse file
const createsPhotoFile = async (req) => {
  const data = Array.from(Buffer.from(req.files.newProfilepic.data));
  const contentType = req.headers["content-type"];
  const file = new Parse.File("testing.png", data, contentType);
  return file;
};

// Gets a specific user from the database
const getUser = async (username) => {
  const userTable = Parse.Object.extend("User");
  const query = new Parse.Query(userTable);
  query.equalTo("username", username);
  const user = await query.first();
  return user;
};

// Gets a specific animal from the database
const getAnimalDB = async (animalID) => {
  const animalTable = Parse.Object.extend("AnimalV2");
  const queryAnimal = new Parse.Query(animalTable);
  const animal = await queryAnimal.get(animalID);
  return animal;
};

// Gets a specific zoo from the database
const getZooDB = async (zooID) => {
  const zooTable = Parse.Object.extend("Zoo");
  const queryZoo = new Parse.Query(zooTable);
  const zoo = await queryZoo.get(zooID);
  return zoo;
};

// Gets a specific userType from the database
const getUserType = async (priority) => {
  let typeTable = Parse.Object.extend("UserType");
  let queryUserType = new Parse.Query(typeTable);
  queryUserType.equalTo("objectId", priority);
  const results = await queryUserType.find();
  return results[0];
};

module.exports = router;
