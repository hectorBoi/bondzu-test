const { Parse } = require("../database");

const puppeteer = require("puppeteer");

// Transforms the array of Parse.Objects into Json for the books list
const getBooks = async (array, lang) => {
  try {
    if (lang === "en") {
      let bookInfo = array.map((book) => {
        let photo = "";
        let photoUrl = "";
        if (book.get("cover")) {
          photo = book.get("cover")._url;
          photoUrl = photo.replace(
            "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/",
            "https://d36skj58da74xm.cloudfront.net/"
          );
        }
        return (book = {
          id: book.id,
          cover: photoUrl,
          illustator: book.get("illustrator"),
          description: book.get("description"),
          title: book.get("title"),
        });
      });
      return bookInfo;
    } else {
      let bookInfo = array.map((book) => {
        let photo = "";
        let photoUrl = "";
        if (book.get("cover")) {
          photo = book.get("cover")._url;
          photoUrl = photo.replace(
            "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/",
            "https://d36skj58da74xm.cloudfront.net/"
          );
        }
        return (book = {
          id: book.id,
          cover: photoUrl,
          illustator: book.get("illustrator"),
          description: book.get("description"),
          title: book.get("title"),
        });
      });
      return bookInfo;
    }
  } catch (error) {
    resizeBy.status(400).json("Couldnt get books");
  }
};

module.exports = {
  getBooks: getBooks,
};
