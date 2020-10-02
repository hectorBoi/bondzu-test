const token = require("./token");

// Performs the authentication of the users credential with the DB
const handleLogin = async (req, res, Parse) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return Promise.reject("Some of the fields are empty!");
    }

    // Performs the authentication with the database, returns the result of the query if it has a match, err if not
    return Parse.User.logIn(email, password)
      .then((user) => {
        const token = user.getSessionToken();
        const typeID = user.get("userType");

        if (req.originalUrl === "/adminLogin" && user.get("isAdmin") !== true) {
          throw "Not an admin";
        }
        return {
          user: user.get("username"),
          userType: typeID.id,
          sessiontoken: token,
        };
      })
      .catch((err) => Promise.reject(err));
  } catch (error) {
    console.log(error);
  }
};

// Manages the interaction with the frontend
const signinAuth = (Parse) => async (req, res) => {
  return await handleLogin(req, res, Parse)
    .then(async (data) => {
      return data ? await token.createSession(data) : Promise.reject(data);
    })
    .then((session) => res.json(session))
    .catch((err) => res.status(400).json("Incorrect"));
};

module.exports = {
  signinAuth: signinAuth,
};
