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
    return "No photo"
  } catch (err) {
    return "Error"
  }
}

// Returns the users information
const handleProfile = async (req, res, Parse) => {
  const { username } = req.body; // DEBERIA DE SER HEADER

  try {
    let userTable = Parse.Object.extend("User");
    let query = new Parse.Query(userTable);
    query.equalTo("username", username)
    const user = await query.first();

    const name = user.get("name");
    const email = user.get("email");
    const photo = await getPhoto(username, Parse)

    const response = {
      name,
      email,
      photo
    }

    res.json(response)
  } catch (err) {
    res.json("User not found")
  }
}

module.exports = {
  handleProfile: handleProfile,
}