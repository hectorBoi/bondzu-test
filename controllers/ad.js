const adInfo = require("./adInfo");
const { Parse } = require("../database");
const { Router } = require("express");

// Initializes the router
const router = Router();

// Extracts the image from the database and filter the results before sending them to the front end
router.get('/image', async (req, res, next) => {
  try {
    const { lang, usertype } = req.cookies;
    // Gets the reference for the adl table
    const adTable = Parse.Object.extend("Ads");
    const query = new Parse.Query(adTable);
    query.equalTo("Platform", "Web");
    const webAd = await query.find();

    // Extracts the information for the ads and returns it for the catalog screen
    const adsInfo = await adInfo.getImage(webAd, lang);
    res.json(adsInfo);
  } catch (err) {
    console.error(`Error when attempting to recover ad: ${err}`);
    //next(err)
  }
});

module.exports = router;
