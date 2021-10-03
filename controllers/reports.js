const { Parse } = require("../database");
const { Router } = require("express");

// Initializes the router
const router = Router();

// Retrieve all users from the db, with no filters
router.get("/users", async (req, res, next) => {
  try {
    const table = Parse.Object.extend("User");
    const query = new Parse.Query(table);
    query.descending("createdAt");
    const result = await query.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Retrieve all animals from the db, with no filters
router.get("/animals", async (req, res, next) => {
  try {
    const table = Parse.Object.extend("AnimalV2");
    const query = new Parse.Query(table);
    query.descending("adopters");
    query.limit(5);
    const result = await query.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
