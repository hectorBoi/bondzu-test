const { Parse } = require("../database");

const puppeteer = require("puppeteer");

// Get the video of a specific animal based on the id
const getVideo = async (id) => {
  try {
    const videoTable = Parse.Object.extend("Video");
    const query = new Parse.Query(videoTable);
    const cameras = await query.find();
    const filter = cameras.filter(
      (camara) => camara.get("book_id").id === id
    );
    //For verkada video: Get the URL of the video (The actual URL in database do not work in the webpage)
    if (filter[0]) {
      if(filter[0].get("youtube_ids")[0].toString().includes("verkada")){
        const patata = getAlternativeVideo(filter[0].get("youtube_ids")[0])
        return patata;
      }
      else {
        return filter[0].get("youtube_ids")[0];
      }
    }
    return "No url";
  } catch (err) {
    return err;
  }
};

// Transforms the array of Parse.Objects into Json for the books list
const getBooks = async (array, lang) => {
  try {

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

  } catch (error) {
    res.status(400).json("Couldnt get books");
  }
};

// Transforms the array of Parse.Objects into Json
const getBookInfo = async (book, lang) => {
  try {
    let photo = "";
    let photoUrl = "";
    if (book.get("cover")) {
      photo = book.get("cover")._url;
      photoUrl = photo.replace(
        "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/",
        "https://d36skj58da74xm.cloudfront.net/"
      );
    } else {
      let photo = "";
      let photoUrl = "";
      if (book.get("cover")) {
        photo = book.get("cover")._url;
        photoUrl = photo.replace(
          "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/",
          "https://d36skj58da74xm.cloudfront.net/"
        );
      }
      let bookInfo = {
        title: book.get("title"),
        description: book.get("description"),
        illustrator: book.get("illustrator"),
        cover: photoUrl,
        youtubeID: book.get("youtubeID"),
      };
      return bookInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getBookInfo: getBookInfo,
  getBooks: getBooks,
};
