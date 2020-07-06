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

// Extracts the value of the token from the header of the request
// const getAuthTokenId = (req, res) => {
//   const { authorization, userType } = req.headers;

//   // Checks if the token is already in the redis Database
//   return redisClient.get(authorization, (err, value) => {
//     if (err || !value) {
//       return res.status(400).json("Unauthorized");
//     }
//     return res.json(
//       () => {
//         return {
//           username: value,
//           userType: userType,
//           token: authorization
//         }
//       }
//     )
//   })
// }

// Creates the user session and returns the token to the browser, so it can be managed in the frontend
const createSession = (data) => {
  const { user, userType } = data;
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