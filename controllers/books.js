// Represents all the routes for the admin console
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
    const booksInfo = await booksInfo.getBooks(activeBooks, lang);
    res.json(result);
  } catch (err) {
    next(err)
  }
});
