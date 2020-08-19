// Transforms the array of Parse.Objects into Json 
const handlePasswordReset = async (req, res, Parse) => {
  try {
    const { username } = req.body; // SON COOKIES

    Parse.User.requestPasswordReset("adfasdfasdfasdfasdfdasdf")
      .then(() => {
        // Password reset request was sent successfully
        res.status(200).json({ message: "Email sent for reset" });
      }).catch((error) => {
        console.log(error);
        res.status(400).json({ message: "Couldnt find user" });
      });
    // res.json("Hello");
  } catch (err) {
    res.status(400).json({ message: "Couldnt find user" });
  }
}

module.exports = {
  handlePasswordReset
}
