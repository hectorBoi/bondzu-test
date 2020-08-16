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
const getAnimalInfo = async (animal, Parse) => {
  const video = await getVideo(animal.id, Parse);
  const keeper = await getKeeper(animal.get("keepers")[0].id, Parse);
  let animalInfo = {
    about: animal.get("about"),
    characteristics: animal.get("characteristics"),
    profilePhoto: animal.get("profilePhoto")._url,
    species: animal.get("species"),
    youtubeID: video,
    keeper: keeper,
  };

  return animalInfo;
}

// Transforms the array of Parse.Objects into Json for the animals list
const getAnimals = async (array) => {
  let animalInfo = array.map(animal => {
    return animal = {
      id: animal.id,
      profilePhoto: animal.get("profilePhoto")._url,
      species: animal.get("species"),
      userType: animal.get("animalRequiredPriority").id,
    }
  }
  );

  return animalInfo;
}

module.exports = {
  getAnimalInfo: getAnimalInfo,
  getAnimals: getAnimals,
}
