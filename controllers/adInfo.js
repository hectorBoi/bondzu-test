const { Parse } = require("../database");

const puppeteer = require("puppeteer");

// Transforms the array of Parse.Objects into Json
const getImage = async (ad, lang) => {
  try {
    let photo = "";
    let photoUrl = "";
    if (ad.get("Image")) {
      photo = ad.get("Image")._url;
      photoUrl = photo.replace(
        "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/",
        "https://d36skj58da74xm.cloudfront.net/"
      );
    } else {
      let photo = "";
      let photoUrl = "";
      if (ad.get("Image")) {
        photo = ad.get("Image")._url;
        photoUrl = photo.replace(
          "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/",
          "https://d36skj58da74xm.cloudfront.net/"
        );
      }
      let adInfo = {
        Image: photoUrl,
      };
      return adInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getImage: getImage,
};
