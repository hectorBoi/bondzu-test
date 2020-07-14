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
const getBanner = async (req, res, Parse) => {
    try {
    const bannerTable = Parse.Object.extend("Banner");
    const query = new Parse.Query(bannerTable);
    const banner = await query.first();

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