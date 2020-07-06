const token = require("./token")

// Performs the authentication of the users credential with the DB
const handleRegister = async (req, res, Parse) => {
  const { name, email, password, userType } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json("Incorrect form submission");
  }

  // Creates a new user with the users information
  let user = new Parse.User();
  user.set("username", email);
  user.set("password", password);
  user.set("email", email);
  user.set("name", name);

  // Creates the userType for the user
  let typeTable = Parse.Object.extend("UserType");
  let query = new Parse.Query(typeTable);
  query.equalTo("objectId", userType);

  try {
    const results = await query.find();
    user.set("userType", results[0]);
  } catch (error) {
    console.log(error)
  }

  // In case the user doesnt exists, it creates the user and returns the session token
  try {
    await user.signUp();
    const session = await Parse.User.logIn(email, password)
    const username = session.get("username")
    const typeID = session.get("userType")
    const jwt = await token.createSession({ user: username, userType: typeID.id })
    res.json(jwt);
  } catch (error) {
    res.status(400).json(error);
  }
}


module.exports = {
  handleRegister: handleRegister,
}