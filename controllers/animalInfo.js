const { Parse } = require("../database");

// Get the name of the zoo in charge of a specific animal
const getKeeper = async (id) => {
  try {
    const zooTable = Parse.Object.extend("Zoo");
    const queryZoo = new Parse.Query(zooTable);
    const zoo = await queryZoo.get(id);
    const zooName = zoo.get("name");
    return zooName;
  } catch (err) {
    return "Didnt find keeper";
  }
};

// Get the video of a specific animal based on the id
const getVideo = async (id) => {
  try {
    const videoTable = Parse.Object.extend("Video");
    const query = new Parse.Query(videoTable);
    const cameras = await query.find();
    const filter = cameras.filter(
      (camara) => camara.get("animal_id").id === id
    );
    if (filter[0]) {
      return filter[0].get("youtube_ids")[0];
    }
    return "No url";
  } catch (err) {
    return err;
  }
};

// Transforms the array of Parse.Objects into Json
const getAnimalInfo = async (animal, lang) => {
  try {
    if (lang === "en") {
      const video = await getVideo(animal.id);
      const keeper = await getKeeper(animal.get("keepers")[0].id);
      let photo = "";
      let photoUrl = "";
      if (animal.get("profilePhoto")) {
        photo = animal.get("profilePhoto")._url;
        photoUrl = photo.replace(
          "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/",
          "https://d36skj58da74xm.cloudfront.net/"
        );
      }
      let animalInfo = {
        about: animal.get("about_en"),
        characteristics: animal.get("characteristics_en"),
        profilePhoto: photoUrl,
        species: animal.get("species_en"),
        youtubeID: video,
        keeper: keeper,
      };
      return animalInfo;
    } else {
      const video = await getVideo(animal.id);
      const keeper = await getKeeper(animal.get("keepers")[0].id);
      let photo = "";
      let photoUrl = "";
      if (animal.get("profilePhoto")) {
        photo = animal.get("profilePhoto")._url;
        photoUrl = photo.replace(
          "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/",
          "https://d36skj58da74xm.cloudfront.net/"
        );
      }
      let animalInfo = {
        about: animal.get("about"),
        characteristics: animal.get("characteristics"),
        profilePhoto: photoUrl,
        species: animal.get("species"),
        youtubeID: video,
        keeper: keeper,
      };
      return animalInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

// Transforms the array of Parse.Objects into Json
const getAnimalInfoAdmin = async (animal) => {
  try {
    const video = await getVideo(animal.id);
    const keeper = await getKeeper(animal.get("keepers")[0].id);
    let photo = "";
    if (animal.get("profilePhoto")) {
      photo = animal.get("profilePhoto")._url;
    }

    let animalInfo = {
      name: animal.get("name"),
      name_en: animal.get("name_en"),
      about: animal.get("about"),
      about_en: animal.get("about_en"),
      characteristics: animal.get("characteristics"),
      characteristics_en: animal.get("characteristics_en"),
      profilePhoto: photo,
      species: animal.get("species"),
      species_en: animal.get("species_en"),
      youtubeID: video,
      keeper: keeper,
      isActive: animal.get("isActive"),
    };
    return animalInfo;
  } catch (error) {
    console.log(error);
  }
};

// Transforms the array of Parse.Objects into Json for the animals list
const getAnimals = async (array, lang) => {
  try {
    if (lang === "en") {
      let animalInfo = array.map((animal) => {
        let photo = "";
        let photoUrl = "";
        if (animal.get("profilePhoto")) {
          photo = animal.get("profilePhoto")._url;
          photoUrl = photo.replace(
            "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/",
            "https://d36skj58da74xm.cloudfront.net/"
          );
        }
        return (animal = {
          id: animal.id,
          profilePhoto: photoUrl,
          species: animal.get("species_en"),
          name: animal.get("name_en"),
          userType: animal.get("animalRequiredPriority").id,
        });
      });
      return animalInfo;
    } else {
      let animalInfo = array.map((animal) => {
        let photo = "";
        let photoUrl = "";
        if (animal.get("profilePhoto")) {
          photo = animal.get("profilePhoto")._url;
          photoUrl = photo.replace(
            "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/",
            "https://d36skj58da74xm.cloudfront.net/"
          );
        }
        return (animal = {
          id: animal.id,
          profilePhoto: photoUrl,
          species: animal.get("species"),
          name: animal.get("name"),
          userType: animal.get("animalRequiredPriority").id,
        });
      });
      return animalInfo;
    }
  } catch (error) {
    resizeBy.status(400).json("Couldnt get animals");
  }
};

// Transforms the array of Parse.Objects into Json for the zoo list
const getZoos = async (array) => {
  try {
    let zooInfo = array.map((zoo) => {
      return (zoo = {
        id: zoo.id,
        name: zoo.get("name"),
        photo: zoo.get("photoUrl"),
      });
    });
    return zooInfo;
  } catch (error) {
    resizeBy.status(400).json("Couldnt get zoos");
  }
};

// Transforms the array of Parse.Objects into Json
const getZooInfo = async (zoo) => {
  try {
    let zooInfo = {
      name: zoo.get("name"),
      location: zoo.get("location"),
      description: zoo.get("description"),
      photoUrl: zoo.get("photoUrl"),
    };
    return zooInfo;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAnimalInfo: getAnimalInfo,
  getAnimals: getAnimals,
  getAnimalInfoAdmin: getAnimalInfoAdmin,
  getZoos: getZoos,
  getZooInfo: getZooInfo,
};
