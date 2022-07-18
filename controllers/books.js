// Represents all the routes for the admin console
const bookInfo = require("./bookInfo");
const { Parse } = require("../database");
const { Router } = require("express");

// Initializes the router
const router = Router();

router.get('/all', async (req, res, next) => {
  try {
    const { lang, usertype } = req.cookies;
    // Gets the reference for the book table
    const bookTable = Parse.Object.extend("Book");
    const query = new Parse.Query(bookTable);
    query.equalTo("isActive", true);
    const activeBooks = await query.find();

    // Extracts the information for the books and returns it for the catalog screen
    const booksInfo = await bookInfo.getBooks(activeBooks, lang);
    res.json(booksInfo);
  } catch (err) {
    //console.error(`Error when attempting to recover books: ${err}`);
    next(err)
  }
});

// Extracts the book from the database based on the provided ID
router.get('/:bookID', async (req, res, next) => {
  try {
    const { lang } = req.cookies;
    const bookID = req.params.bookID;
    // Gets the reference for the book table
    const bookTable = Parse.Object.extend("Book");
    const query = new Parse.Query(bookTable);
    const book = await query.get(bookID);
    // Extracts the book and checks for the information
    const book_info = await bookInfo.getBookInfo(book, lang);
    res.json(book_info);
  } catch (err) {
    next(err)
  }
});

module.exports = router;
