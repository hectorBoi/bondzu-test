const handleLogin = (req, res, Parse) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Incorrect form submission");
  }

  Parse.User.logInBack(email, password)
    .then(user => {
      console.log(user.get("name"));
      res.json("Correct");
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
  handleLogin: handleLogin,
}