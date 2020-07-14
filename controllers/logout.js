// Removes the user key from the redis database
const handleLogout = (req, res) => {
  const { token } = req.headers;
  redisClient.del(token, (err, response) => {
    if (response === 1) {
      res.json(true)
    } else {
      console.log("Error:", err)
    }
  })
}

module.exports = {
  handleLogout: handleLogout,
} 