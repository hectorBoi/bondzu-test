const token = require("./token")

// Creates "user" with users information
const createUser = async (data, Parse) => {
  const { name, lastname, email, password, userType } = data;
  let user = new Parse.User();
  user.set("username", email);
  user.set("password", password);
  user.set("email", email);
  user.set("name", name);
  user.set("lastname", lastname);

  // Creates the userType for the user
  let typeTable = Parse.Object.extend("UserType");
  let query = new Parse.Query(typeTable);
  query.equalTo("objectId", userType);

  try {
    const results = await query.find();
    user.set("userType", results[0]);
    return user
  } catch (error) {
    console.log(error)
  }
}



// Performs the authentication of the users credential with the DB
const handleRegister = async (req, res, Parse) => {
  const { name, email, password, userType, lastname } = req.body;

  if (!name || !lastname || !email || !password || !userType) {
    return res.status(400).json("Incorrect form submission");
  }

  const user = await createUser(req.body, Parse);

  // In case the user doesnt exist, it creates the user in the database and returns the session token
  try {
    await user.signUp();
    const session = await Parse.User.logIn(email, password)
    const username = session.get("username")
    const typeID = session.get("userType")
    const userSession = token.createSession({ user: username, userType: typeID.id, sessiontoken: user.getSessionToken() })
    res.json(userSession);
  } catch (error) {
    res.status(400).json("Already registered");
  }
}


module.exports = {
  handleRegister: handleRegister,
}