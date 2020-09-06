// Get the name of the zoo in charge of a specific animal
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
    return "Didnt find keeper"
  }
}

const getVideo = async (id, Parse) => {
  try {
    const videoTable = Parse.Object.extend("Video");
    const query = new Parse.Query(videoTable);
    const cameras = await query.find();
    const filter = cameras.filter(camara => camara.get("animal_id").id === id);
    if (filter[0]) {
      return filter[0].get("youtube_ids")[0]
    }
    return "No url"
  } catch (err) {
    return err
  }
}

// Transforms the array of Parse.Objects into Json 
const getAnimalInfo = async (animal, Parse, lang) => {
  try {
    if (lang === "en") {
      const video = await getVideo(animal.id, Parse);
      const keeper = await getKeeper(animal.get("keepers")[0].id, Parse);
      const photo = animal.get("profilePhoto")._url;
      const photoUrl = photo.replace("http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/", "https://d36skj58da74xm.cloudfront.net/");
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
      const video = await getVideo(animal.id, Parse);
      const keeper = await getKeeper(animal.get("keepers")[0].id, Parse);
      const photo = animal.get("profilePhoto")._url;
      const photoUrl = photo.replace("http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/", "https://d36skj58da74xm.cloudfront.net/");
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
}

// Transforms the array of Parse.Objects into Json 
const getAnimalInfoAdmin = async (animal, Parse, lang) => {
  try {
    const video = await getVideo(animal.id, Parse);
    const keeper = await getKeeper(animal.get("keepers")[0].id, Parse);
    const photo = animal.get("profilePhoto")._url;

    let animalInfo = {
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
}

// Transforms the array of Parse.Objects into Json for the animals list
const getAnimals = async (array, lang) => {
  try {
    if (lang === "en") {
      let animalInfo = array.map(animal => {
        const photo = animal.get("profilePhoto")._url;
        const photoUrl = photo.replace("http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/", "https://d36skj58da74xm.cloudfront.net/");
        return animal = {
          id: animal.id,
          profilePhoto: photoUrl,
          species: animal.get("species_en"),
          userType: animal.get("animalRequiredPriority").id,
        }
      }
      );
      return animalInfo;
    } else {
      let animalInfo = array.map(animal => {
        const photo = animal.get("profilePhoto")._url;
        const photoUrl = photo.replace("http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/", "https://d36skj58da74xm.cloudfront.net/");
        return animal = {
          id: animal.id,
          profilePhoto: photoUrl,
          species: animal.get("species"),
          userType: animal.get("animalRequiredPriority").id,
        }
      }
      );
      return animalInfo;
    }
  } catch (error) {
    resizeBy.status(400).json("Couldnt get animals")
  }
}

module.exports = {
  getAnimalInfo: getAnimalInfo,
  getAnimals: getAnimals,
  getAnimalInfoAdmin: getAnimalInfoAdmin
}
