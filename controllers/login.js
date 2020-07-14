const token = require("./token")

// Performs the authentication of the users credential with the DB
const handleLogin = (req, res, Parse) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject("Some of the fields are empty!");
  }

  // Performs the authentication with the database, returns the result of the query if it has a match, err if not
  return Parse.User.logIn(email, password)
    .then(user => {
      console.log("Login session: ", user.getSessionToken())
      const typeID = user.get("userType");
      return {
        user: user.get("username"),
        userType: typeID.id,
      }
    })
    .catch(err => Promise.reject(err))
}

// Manages the interaction with the frontend
const signinAuth = (Parse) => (req, res) => {
  return handleLogin(req, res, Parse)
    .then(data => {
      return data ? token.createSession(data) : Promise.reject(data);
    })
    .then(session => res.json(session))
    .catch(err => res.status(400).json(err));
}

module.exports = {
  signinAuth: signinAuth,
}