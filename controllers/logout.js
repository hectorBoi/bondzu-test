// Removes the user key from the Parse server session table
const handleLogout = (req, res, Parse) => {
  Parse.User.logOut()
    .then(() => {
      res.json("Success?")
    })
    .catch(err => console.log(err))
}

module.exports = {
  handleLogout: handleLogout,
} 