const animalInfo = require("./adInfo");
const { Parse } = require("../database");
const { Router } = require("express");

// Initializes the router
const router = Router();

// Extracts the image from the database and filter the results before sending them to the front end
router.get('/image', async (req, res, next) => {
  try {
    const { lang, usertype } = req.cookies;
    // Gets the reference for the animal table
    const adTable = Parse.Object.extend("Ads");
    const query = new Parse.Query(adTable);
    query.equalTo('Platform', 'Web');
    const webAd = await query.find();

    // Extracts the information for the animals and returns it for the catalog screen
    const adInfo = await adInfo.getImage(webAd, lang);
    res.json(adInfo);
  } catch (err) {
    next(err)
  }
});

module.exports = router;
