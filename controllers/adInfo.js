const {
  Parse
} = require("../database");

const puppeteer = require("puppeteer");

// Transforms the array of Parse.Objects into Json
const getImage = async (array, lang) => {
  try {
    /*if (lang === "en") {
      let adImage = array.map((ad) => {
        let photo = "";
        let photoUrl = "";
        if (ad.get("Image")) {
          photo = ad.get("Image")._url;
          photoUrl = photo.replace(
            "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/",
            "https://d36skj58da74xm.cloudfront.net/"
          );
        }
        return (ad = {
          Image: photoUrl
        });
      });
      return adImage;
    }*/
    let adImage = array.map((ad) => {
      let photo = "";
      let photoUrl = "";
      if (ad.get("Image")) {
        photo = ad.get("Image")._url;
        photoUrl = photo.replace(
          "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/",
          "https://d36skj58da74xm.cloudfront.net/"
        );
      }
      return (ad = { Image: photoUrl });
    });
    return adImage;
  } catch (error) {
    res.status(400).json("Couldnt get ads");
  }
};

module.exports = {
  getImage: getImage,
};
