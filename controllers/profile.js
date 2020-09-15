//Gets the URL of the photo of the user 
const getPhoto = async (username, Parse) => {
  try {
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username)
    const userArr = await query.find();
    const user = userArr[0];
    const photo = user.get("photoFile");
    if (photo) {
      const photoUrl = photo._url.replace("http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/", "https://d36skj58da74xm.cloudfront.net/");
      return photoUrl;
    }

    return null
  } catch (err) {
    return "Error"
  }
}

// Returns the users information
const handleProfile = async (req, res, Parse) => {
  try {
    const { lang, usertype } = req.cookies;
    console.log("---------------");
    console.log("Entering all animals");
    const animalTable = Parse.Object.extend("AnimalV2");
    const query = new Parse.Query(animalTable);
    query.equalTo("isActive", true);
    const activeAnimals = await query.find();
    console.log("Animals loaded");

    const animalsInfo = await animalInfo.getAnimals(activeAnimals, lang);
    console.log("Info animals loaded");
    const result = await filterAnimals(usertype, animalsInfo)
    console.log("Animals filtered");
    res.json(result);
    console.log("Info sent");
    console.log("---------------");
  } catch (err) {
    res.json("User not found")
  }
}

//Updates the user profile with new info
const updateProfile = async (req, res, Parse) => {
  try {
    const { Nname, Nlastname, Npassword } = req.body;
    const { username, token } = req.cookies;
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username)
    const user = await query.first();

    if (req.files) {
      const userTable = Parse.Object.extend("User");
      const query = new Parse.Query(userTable);
      query.equalTo("username", username)
      const user = await query.first();

      const data = Array.from(Buffer.from(req.files.newProfilepic.data))
      const contentType = req.headers['content-type'];
      const file = new Parse.File('testing.png', data, contentType);
      user.set("photoFile", file)
      const newUser = await user.save(null, { sessionToken: token });
      res.redirect("/profile.html");
    } else {
      if (Nname) {
        user.set("name", Nname);
      }

      if (Nlastname) {
        user.set("lastname", Nlastname);
      }

      if (Npassword) {
        user.setPassword(Npassword);
      }

      const newUser = await user.save(null, { sessionToken: token });
      res.json({ message: "Success" });
    }
  } catch (err) {
    console.log(err)
    res.json("Not saved")
  }
}

module.exports = {
  handleProfile: handleProfile,
  updateProfile: updateProfile,
}