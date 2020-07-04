const handleRegister = async (req, res, Parse) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json("Incorrect form submission");
  }

  let user = new Parse.User();
  user.set("username", email);
  user.set("password", password);
  user.set("email", email);
  user.set("name", name);
  try {
    await user.signUp();
    res.json("Register completed!");
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
}

module.exports = {
  handleRegister: handleRegister,
}