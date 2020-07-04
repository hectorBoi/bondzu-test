const jwt = require("jsonwebtoken");
const redisClient = require('../server').redisClient;

// Performs the authentication of the users credential with the DB
const handleLogin = (req, res, Parse) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject("Incorrect form submission");
  }

  // Performs the authentication with the database, returns the result of the query if it has a match, err if not
  return Parse.User.logIn(email, password)
    .then(user => user.get("username"))
    .catch(err => Promise.reject(err))
}

// Extracts the value of the token from the header of the request
const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;

  // Checks if the token is already in the redis Database
  return redisClient.get(authorization, (err, value) => {
    if (err || !value) {
      return res.status(400).json("Unauthorized");
    }
    return res.json({ username: authorization })
  })
}

// All the JWT tokens most be signed by the application
const signToken = (username) => {
  // Payload is the data to encrypt inside the token
  const jwtPayload = username;

  return jwt.sign(jwtPayload, process.env.JWTSECRET)
}

// Saves the users token in the redis database
const setToken = (username, token) => {
  return Promise.resolve(redisClient.set(token, username))
}

// Creates the user session and returns the token to the browser, so it can be managed in the frontend
const createSession = (user) => {
  const token = signToken(user);
  return setToken(user, token)
    .then(() => { return { username: user, token: token } })
    .catch(console.log)
}

// Manages the interaction with the frontend
const signinAuth = (Parse) => (req, res) => {
  const { authorization } = req.headers;
  return authorization ?
    getAuthTokenId(req) :
    handleLogin(req, res, Parse)
      .then(data => {
        return data ? createSession(data) : Promise.reject(data);
      })
      .then(session => res.json(session))
      .catch(err => res.status(400).json(err));
}

module.exports = {
  signinAuth: signinAuth,
}