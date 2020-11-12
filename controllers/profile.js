// Represents all the routes for the admin console
const { Parse } = require("../database");
const { Router } = require("express");

// Initializes the router
const router = Router();

// Returns the profile information for the user
router.get('/', async (req, res, next) => {
  try {
    const { username } = req.cookies;
    // Gets the reference for the user
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username);
    const user = await query.first();

    // Gets the reference for the user type
    const typeTable = Parse.Object.extend("UserType");
    const queryType = new Parse.Query(typeTable);
    const usertype = await queryType.get(user.get("userType").id);

    // Extracts the user's information
    const name = user.get("name");
    const lastname = user.get("lastname");
    const photo = await getPhoto(username, Parse);

    // Constructs the response for the fron tend
    const response = {
      name,
      lastname,
      username,
      photo,
      usertype: usertype.get("name"),
    };

    res.json(response);
  } catch (err) {
    console.log(err)
    next(err)
  }
});

// Updates the profile with the given information and returns the updated info
router.post('/', async (req, res, next) => {
  try {
    const { Nname, Nlastname, Npassword } = req.body;
    const { username, token, lang } = req.cookies;
    // Gets the reference for the user table
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username);
    const user = await query.first();

    // In case that the request is to update the user profile picture the request is treated differently
    if (req.files) {
      // Gets the reference for the user
      const userTable = Parse.Object.extend("User");
      const query = new Parse.Query(userTable);
      query.equalTo("username", username);
      const user = await query.first();

      // Constructs the picture from the bit array sended by the frontend
      const data = Array.from(Buffer.from(req.files.newProfilepic.data));
      const contentType = req.headers["content-type"];
      const file = new Parse.File("testing.png", data, contentType);
      user.set("photoFile", file);
      // Saves the new photo
      const newUser = await user.save(null, { sessionToken: token });
      if (lang == "en") {
        res.redirect("/en/profile.html");
      } else {
        res.redirect("/es/profile.html");
      }
    } else {
      // Updates the fields with the new info
      if (Nname) {
        user.set("name", Nname);
      }

      if (Nlastname) {
        user.set("lastname", Nlastname);
      }

      if (Npassword) {
        user.setPassword(Npassword);
      }

      const newUser = await user.save(null, { sessionToken: token });

      let resp = { 
        message: "Success", 
        token: user.getSessionToken() 
      }
      
      res.json(resp);
    }
  } catch (err) {
    console.log(err);
    next(err)
 }
});

// === Helper functions used in the routes
//Gets the URL of the photo of the user
const getPhoto = async (username) => {
  try {
    const userTable = Parse.Object.extend("User");
    const query = new Parse.Query(userTable);
    query.equalTo("username", username);
    const userArr = await query.find();
    const user = userArr[0];
    const photo = user.get("photoFile");
    if (photo) {
      const photoUrl = photo._url.replace(
        "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/",
        "https://d36skj58da74xm.cloudfront.net/"
      );
      return photoUrl;
    }

    return null;
  } catch (err) {
    return "Error";
  }
};

module.exports = router;
