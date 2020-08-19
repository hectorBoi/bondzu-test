// Transforms the array of Parse.Objects into Json 
const passwordReset = async (req, res, Parse) => {
  if (!req.body.code) {
    try {
      const { username, token } = req.body; // req.cookies
      console.log(username);
      const randomNumber = Math.floor(Math.random() * (99999 - 10000) + 10000).toString();

      const userTable = Parse.Object.extend("User");
      const query = new Parse.Query(userTable);
      query.equalTo("username", username)
      const user = await query.first();
      user.set("passwordCode", randomNumber);
      console.log(randomNumber);
      console.log(user.get("passwordCode"));

      const newUser = await user.save(null, { useMasterKey: true });

      console.log(randomNumber);
      console.log(newUser.get("passwordCode"));

      res.json({ number: randomNumber });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Couldnt find user" });
    }
  } else if (req.body.code) {
    try {
      const { username, token } = req.body; // req.cookies
      const { code, password } = req.body;

      const userTable = Parse.Object.extend("User");
      const query = new Parse.Query(userTable);
      query.equalTo("username", username)
      const user = await query.first();

      const dbcode = user.get("passwordCode");

      if (code === dbcode) {
        user.set("password", password);
        const newUser = await user.save(null, { sessionToken: "fF5zsMkXpw3eIcmg4ggwh6HlynYnNpYmZeJyl5Cw" });
        res.json({ message: true });
      } else {
        res.json({ message: false });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error" });
    }
  }
}

module.exports = {
  passwordReset
}
