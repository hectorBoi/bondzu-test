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

      var mailOptions_en = {
        to: username,
        subject: 'Bondzu password recover',
        user: {  // data to view template, you can access as - user.name
          code: randomNumber
        }
      }

      if (req.cookies.lang === "es") {
        mailer.send('email', mailOptions, (err, message) => {
          if (err) {
            console.log(err);
            res.send({ message: "failed" });
            return;
          } else {
            return res.send({ message: "success" });
          }
        })
      } else {
        mailer.send('email_en', mailOptions_en, (err, message) => {
          if (err) {
            console.log(err);
            res.send({ message: "failed" });
            return;
          } else {
            return res.send({ message: "success" });
          }
        })
      }
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
        user.set("passwordCode", "th1si5f0r53cur1ty")
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
