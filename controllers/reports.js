const { Parse } = require("../database");
const { Router } = require("express");

// Initializes the router
const router = Router();

// Retrieve all users from the db, ordered by date of creation
router.get("/users", async (req, res, next) => {
  try {
    const table = Parse.Object.extend("User");
    const query = new Parse.Query(table);
    query.descending("createdAt");
    query.limit(999999);
    const result = await query.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Retrieve all users registered after a given date, ordered by date of creation
router.get("/users/:date", async (req, res, next) => {
  try {
    const startDate = req.params.date;
    const table = Parse.Object.extend("User");
    const query = new Parse.Query(table);
    query.descending("createdAt");
    query.greaterThanOrEqualTo("createdAt", new Date(startDate))
    const result = await query.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Retrieve all animals from the db, ordering by number of adopters
router.get("/animals", async (req, res, next) => {
  try {
    const table = Parse.Object.extend("AnimalV2");
    const query = new Parse.Query(table);
    query.descending("adopters");
    query.limit(999999);
    const result = await query.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Retrieve all messages from the db
router.get("/messages", async (req, res, next) => {
  try {
    const table = Parse.Object.extend("Messages");
    const query = new Parse.Query(table);
    query.limit(999999);
    const result = await query.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
