const { createApi } = require('unsplash-js');
const { Router } = require('express');

// Initializes the router
const router = Router();

// Creates the Unsplash API
const api = createApi({
  accessKey: 'qPWUlDxoKXZ58yjBWqi0OsdtZgG_Y_2pN5m43m5akHs',
});

let setPhotosResponse = null
// Returns the wallpapers from the Unsplash API
router.get('/', async (req, res, next) => {
    try {
        await api.search.getPhotos(
            { query: "animals in danger", orientation: "landscape", perPage: 300}
            )
            .then(result => {
            setPhotosResponse = result;
        })
        res.json(setPhotosResponse);
    } catch (err) {
      next(err);
    }
  });
module.exports = router;