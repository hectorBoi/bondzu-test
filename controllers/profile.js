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
      return photo._url
    }
    return null
  } catch (err) {
    return "Error"
  }
}

// Returns the users information
const handleProfile = async (req, res, Parse) => {
  const username = req.params.username; // DEBERIA DE SER HEADER

  try {
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username)
    const user = await query.first();

    const name = user.get("name");
    const lastname = user.get("lastname");
    const photo = await getPhoto(username, Parse)

    const response = {
      name,
      lastname,
      photo
    }

    res.json(response)
  } catch (err) {
    res.json("User not found")
  }
}

//Updates the user profile with new info
const updateProfile = async (req, res, Parse) => {
  const { Nname, Nlastname, Npassword, username, token } = req.body;

  try {
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username)
    const user = await query.first();


    if (Nname !== "") {
      user.set("name", Nname);
    }

    if (Nlastname !== "") {
      user.set("lastname", Nlastname);
    }

    if (Npassword !== "") {
      user.setPassword(Npassword);
    }

    const newUser = await user.save(null, { sessionToken: token });
    console.log(newUser)
    res.json({
      username: newUser.get("name"),
      email: newUser.get("lastname"),
    })

  } catch (err) {
    console.log(err)
    res.json("Not saved")
  }
}

module.exports = {
  handleProfile: handleProfile,
  updateProfile: updateProfile,
}