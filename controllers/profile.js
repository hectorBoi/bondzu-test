//TODO 
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
    const birthday = user.get("birthday");
    const country = user.get("country");

    const response = {
      name,
      email,
      birthday,
      country
    }

    res.json(response)
  } catch (err) {
    res.json("User not found")
  }
}

module.exports = {
  handleProfile: handleProfile,
}