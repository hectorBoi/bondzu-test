// Returns the url for the banners image
const getBanner = async (req, res, Parse) => {
  try {
    const bannerTable = Parse.Object.extend("Banner");
    const query = new Parse.Query(bannerTable);
    const banner = await query.first();

    res.json(banner.get("photo")._url)
  } catch (err) {
    res.json("User not found")
  }
}