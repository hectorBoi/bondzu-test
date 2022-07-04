const { Parse } = require("../database");

const puppeteer = require("puppeteer");

// Transforms the array of Parse.Objects into Json for the books list
const getBooks = async (array, lang) => {
  try {
    if (lang === "en") {
      let bookInfo = array.map((book) => {
        let photo = "";
        let photoUrl = "";
        if (book.get("profilePhoto")) {
          photo = book.get("profilePhoto")._url;
          photoUrl = photo.replace(
            "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/",
            "https://d36skj58da74xm.cloudfront.net/"
          );
        }
        return (book = {
          id: book.id,
          profilePhoto: photoUrl,
          species: book.get("species_en"),
          name: book.get("name_en"),
          userType: book.get("bookRequiredPriority").id,
        });
      });
      return bookInfo;
    } else {
      let bookInfo = array.map((book) => {
        let photo = "";
        let photoUrl = "";
        if (book.get("profilePhoto")) {
          photo = book.get("profilePhoto")._url;
          photoUrl = photo.replace(
            "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/",
            "https://d36skj58da74xm.cloudfront.net/"
          );
        }
        return (book = {
          id: book.id,
          profilePhoto: photoUrl,
          species: book.get("species"),
          name: book.get("name"),
          userType: book.get("bookRequiredPriority").id,
        });
      });
      return bookInfo;
    }
  } catch (error) {
    resizeBy.status(400).json("Couldnt get books");
  }
};
