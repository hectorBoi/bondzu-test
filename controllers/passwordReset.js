// Transforms the array of Parse.Objects into Json 
const passwordReset = async (req, res, Parse, mailer) => {
  if (!req.body.code) {
    try {
      const { username } = req.body;
      const randomNumber = Math.floor(Math.random() * (99999 - 10000) + 10000).toString();

      const userTable = Parse.Object.extend("User");
      const query = new Parse.Query(userTable);
      query.equalTo("username", username)
      const user = await query.first();
      user.set("passwordCode", randomNumber);

      const newUser = await user.save(null, { useMasterKey: true });


      var mailOptions = {
        to: username,
        subject: 'Recuperar contraseña Bondzu',
        user: {  // data to view template, you can access as - user.name
          code: randomNumber
        }
      }

      mailer.send('email', mailOptions, (err, message) => {
        if (err) {
          console.log(err);
          res.send('There was an error sending the email');
          return;
        }
        return res.send('Email has been sent!');
      })
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Couldnt find user" });
    }
  } else if (req.body.code) {
    try {
      const { username, code, password } = req.body;

      const userTable = Parse.Object.extend("User");
      const query = new Parse.Query(userTable);
      query.equalTo("username", username)
      const user = await query.first();

      const dbcode = user.get("passwordCode");

      if (code === dbcode) {
        user.set("password", password);
        const newUser = await user.save(null, { useMasterKey: true });
        res.json({ message: "success" });
      } else {
        res.json({ message: "fail" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "error" });
    }
  }
}

module.exports = {
  passwordReset
}
