// Represents all the routes for the admin console
const { Parse } = require("../database");
const { Router } = require("express");

//Library for image resize
// const sharp = require("sharp");

// Initializes the router
const router = Router();

// Returns the profile information for the user
router.get("/", async (req, res, next) => {
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
    console.log(err);
    next(err);
  }
});

// Updates the profile with the given information and returns the updated info
router.post("/", async (req, res, next) => {
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
      const image = req.files.newProfilepic.data;

      // let width = 0;
      // let height = 0;

      // sharp(image)
      //   .metadata()
      //   .then((metadata) => {
      //     width = metadata.width;
      //     height = metadata.height;
      //   })
      //   .catch((e) => {
      //     res.status(500, {
      //       error: e,
      //     });
      //   });

      // Gets the reference for the user
      const userTable = Parse.Object.extend("User");
      const query = new Parse.Query(userTable);
      query.equalTo("username", username);
      const user = await query.first();

      // Constructs the picture from the bit array sended by the frontend
      const imageData = Array.from(Buffer.from(image));
      const contentTypeImage = req.headers["content-type"];
      const profileImage = new Parse.File(
        "profilePic.png",
        imageData,
        contentTypeImage
      );
      user.set("photoFile", profileImage);

      // Resize the image with new width or height depending its aspect ratio

      //Obtain the aspect ratio of the image
      // let aspectRatio = width / height;

      // if (width < height) {
      //   //Calculates the new width for the thumbnail
      //   let newWidth = Math.round(80 * aspectRatio);

      //   sharp(image)
      //     .resize(newWidth, 80, { fit: "contain" }) //Risize the image with the new sizes
      //     .toBuffer()
      //     .then((data) => {
      //       //Construct the thumbnail from its data and uploaded it to the database
      //       const thumbnailData = Array.from(Buffer.from(data));
      //       const contentTypeThumbnail = req.headers["content-type"];
      //       const thumbnail = new Parse.File(
      //         "thumbnail.png",
      //         thumbnailData,
      //         contentTypeThumbnail
      //       );
      //       thumbnail.save();
      //       user.set("thumbnail", thumbnail);
      //     })
      //     .catch((err) => {
      //       res.status(500, { error: err });
      //     });
      // } else {
      //   let newHeigth = Math.round(80 / aspectRatio);

      //   sharp(image)
      //     .resize(80, newHeigth, { fit: "contain" }) //Risize the image with the new sizes
      //     .toBuffer()
      //     .then((data) => {
      //       //Construct the thumbnail from its data and uploaded it to the database
      //       const thumbnailData = Array.from(Buffer.from(data));
      //       const contentTypeThumbnail = req.headers["content-type"];
      //       const thumbnail = new Parse.File(
      //         "thumbnail.png",
      //         thumbnailData,
      //         contentTypeThumbnail
      //       );
      //       thumbnail.save();
      //       user.set("thumbnail", thumbnail);
      //     })
      //     .catch((err) => {
      //       res.status(500, { error: err });
      //     });
      // }

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
        token: user.getSessionToken(),
      };
      res.json(resp);
    }
  } catch (err) {
    console.log(err);
    next(err);
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
