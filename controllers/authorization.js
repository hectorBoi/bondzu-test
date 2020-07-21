const redisClient = require('../server').redisClient;

// Checks if the request of the user has the authorization token, if not, redirects the user to the homepage
const requireAuth = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.redirect("/");
  }

  return redisClient.get(token, (err, data) => {
    if (err || !data) {
      return res.redirect("/");
    }
    return next();
  })
}

module.exports = {
  requireAuth: requireAuth,
}