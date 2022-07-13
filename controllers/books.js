// Represents all the routes for the admin console
const bookInfo = require("./bookInfo");
const { Parse } = require("../database");
const { Router } = require("express");

// Initializes the router
const router = Router();

router.get('/all', async (req, res, next) => {
  try {
    const { lang, usertype } = req.cookies;
    // Gets the reference for the animal table
    const bookTable = Parse.Object.extend("Book");
    const query = new Parse.Query(bookTable);
    query.equalTo("isActive", true);
    const activeBooks = await query.find();

    // Extracts the information for the animals and returns it for the catalog screen
    const booksInfo = await bookInfo.getBooks(activeBooks, lang);
    res.json(booksInfo);
  } catch (err) {
    console.error(`Error when attempting to recover books: ${err}`);
  }
});

module.exports = router;
