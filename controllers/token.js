const jwt = require("jsonwebtoken");
const redisClient = require('../server').redisClient;

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
const createSession = (data) => {
  const { user, userType } = data;
  console.log(user, userType);
  const token = signToken(user);
  return setToken(user, token)
    .then(() => {
      return {
        username: user,
        userType: userType,
        token: token
      }
    })
    .catch(console.log)
}

module.exports = {
  createSession: createSession,
}