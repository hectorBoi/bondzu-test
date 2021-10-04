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
    query.limit(999999)
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
    query.limit(999999)
    const result = await query.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
