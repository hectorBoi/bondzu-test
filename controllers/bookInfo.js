const PARSE_CONNECTION_URL = "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/";
const PARSE_SECURE_CONNECTION_URL = "https://d36skj58da74xm.cloudfront.net/";

const BOOK_COLUMNS = [
  "isActive",
  "title",
  "illustrator",
  "description",
  "youtubeID",
  "cover",
  "title_en",
  "description_en",
  "youtubeID_en"
];

/**
 * Returns the cover URL of a given book. If the book does not possess
 * a cover, an empty string is returned.
 * @param {Parse.Object} book The book who's cover is sought
 * @returns {String} The cover URL of the given book
 */
const getCoverURL = (book) => {
  try
  {
    const coverFile = book.get("cover");
    const coverFileURL = (coverFile) ? coverFile._url : "";
    const cover = coverFileURL.replace(PARSE_CONNECTION_URL,
                                       PARSE_SECURE_CONNECTION_URL);
    return cover;
  }
  catch (error)
  {
    console.error(`Error al intentar recuperar la portada del libro:
                 ${error}`);
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

/**
 * Returns the information of a given book
 * @param {Parse.Object} book The book who's information is sought
 * @returns {Object} The given book's information in JSON format
 */
const getBookInfo = async (book) => {
  try
  {
    const bookInformation = {id: book.id};

    for (attribute of BOOK_COLUMNS)
      bookInformation[attribute] = book.get(attribute);

    // If an error occurs when attempting to obtain the book's
    // cover, an empty string is returned instead
    const cover = getCoverURL(book) ?? "";
    bookInformation["cover"] = cover;

    return bookInformation;
  }
  catch (error)
  {
    console.error(`Error al intentar recuperar la información del libro:
                  ${error}`);
  }
};

module.exports = {
  getBooks: getBooks,
  getBookInfo
};
