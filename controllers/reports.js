const { Parse } = require('../database');
const { Router } = require('express');

// Initializes the router
const router = Router();

router.post('/lastLoginWeb/', async (req, res, next) => {
  try {
    const { username, token, lang } = req.cookies;
    const userTable = Parse.Object.extend('User');
    const query = new Parse.Query(userTable);
    query.equalTo('username', username);
    const user = await query.first();

    const today = new Date();
    user.set('lastLoginWeb', today);
    user.set('lastLogin', today);
    const newUser = await user.save(null, { sessionToken: token });
    let resp = {
      message: 'Success',
      token: user.getSessionToken(),
    };
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

// Retrieve all users from the db, ordered by date of creation
router.get('/users', async (req, res, next) => {
  try {
    const table = Parse.Object.extend('User');
    const query = new Parse.Query(table);
    query.descending('createdAt');
    query.limit(999999);
    const result = await query.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Retrieve all users registered after a given date, ordered by date of creation
router.get('/users/:date', async (req, res, next) => {
  try {
    const startDate = req.params.date;
    const table = Parse.Object.extend('User');
    const query = new Parse.Query(table);
    query.descending('createdAt');
    query.greaterThanOrEqualTo('createdAt', new Date(startDate));
    const result = await query.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Retrieve all animals from the db, ordering by number of adopters
router.get('/animals', async (req, res, next) => {
  try {
    const table = Parse.Object.extend('AnimalV2');
    const query = new Parse.Query(table);
    query.descending('adopters');
    query.limit(999999);
    const result = await query.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Retrieve all messages from the db along with the related users and animal
router.get('/messages', async (req, res, next) => {
  try {
    const table = Parse.Object.extend('Messages');
    const query = new Parse.Query(table);
    // Includes the information of the ObjectId pointers
    query.include('id_user');
    query.include('animal_Id');
    const result = await query.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Retrieve all adoption from the db along with the related users and animal
router.get('/adoptions', async (req, res, next) => {
  try {
    const table = Parse.Object.extend('Adoption');
    const query = new Parse.Query(table);
    // Includes the information of the ObjectId pointers
    query.descending('adoptionDate');
    query.include('adopter');
    query.include('adopted');
    const result = await query.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
