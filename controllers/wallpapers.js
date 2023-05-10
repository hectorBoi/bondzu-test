const { createApi } = require("unsplash-js");
const { Router } = require("express");
const axios = require("axios");

// Initializes the router
const router = Router();

// Returns the wallpapers from the Unsplash API
router.get("/", async (req, res, next) => {
	try {
		const response = await axios.get(
			"https://api.unsplash.com/search/photos",
			{
				params: {
					query: "animals in danger",
					orientation: "landscape",
					per_page: 300,
					client_id: "qPWUlDxoKXZ58yjBWqi0OsdtZgG_Y_2pN5m43m5akHs",
				},
			}
		);
		res.json(response.data);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
