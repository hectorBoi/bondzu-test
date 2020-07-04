const jwt = require("jsonwebtoken");
const redis = require('redis');
const { serverAuthToken } = require("parse");
const { response } = require("express");

// Setup for redis
const redisClient = redis.createClient(process.env.REDIS_URI);

const handleLogin = (req, res, Parse) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject("Incorrect form submission");
  }

  return Parse.User.logIn(email, password)
    .then(user => user.get("username"))
    .catch(err => Promise.reject(err))
}

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, value) => {
    if (err || !value) {
      return res.status(400).json("Unauthorized");
    }
    return res.json({ username: authorization })
  })
}

const signToken = (username) => {
  const jwtPayload = username;
  return jwt.sign(jwtPayload, process.env.JWTSECRET)
}

const setToken = (username, token) => {
  return Promise.resolve(redisClient.set(token, username))
}

const createSession = (user) => {
  const token = signToken(user);
  return setToken(user, token)
    .then(() => { return { username: user, token: token } })
    .catch(console.log)
}

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