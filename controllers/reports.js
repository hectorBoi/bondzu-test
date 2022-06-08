const { Parse } = require('../database');
const { Router } = require('express');

// Initializes the router
const router = Router();

/*
 ! I wanted to import the following two functions from controllers/admin.js for better code reusability.
 ! But for some reason, trying to do so would only trigger errors in admin.js' router.get('/*') and
 ! router.get('/animals') routes, which is why they are repeated here
 */
// Gets a specific user from the database
const getUser = async (username) => {
  const userTable = Parse.Object.extend("User");
  const query = new Parse.Query(userTable);
  query.equalTo("username", username);
  const user = await query.first();
  return user;
};

/**
 * Verifies if the user making the request to the server is an admin.
 * Requires to be preceded by await when called, in order to avoid returning an incorrect value.
 * @param {Request} req The HTTP request sent to the server
 * @returns {Boolean} True if the user is an admin, false if not
 */
 async function isAdmin(req)
 {
   const { username } = req.cookies;
   const user = await getUser(username);
   return user.get("isAdmin");
 }

/* If the requesting user is an admin, allow access to the controller's subroutes

 * Despite not using the server response res within the function's body, it is still
   required to include it as one of the function's parameters, as its dismissal produces
   a TypeError when an admin user attempts to access /admin
 */
router.get("/*", async (req, res, next) => {
  try
  {
    if (await isAdmin(req))
      next();
    else
    {
      console.log("Not an admin. Please login again with an admin account.");
      
      // Redirect to 401 Unauthorized page, or equivalent
    }
  }
  catch(error)
  {
    console.error(`ERROR: ${error}`);

    // Redirect to 500 Internal Server Error page, or equivalent
  }
});

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
  } catch (error) {
    console.error(`ERROR: ${error}`);
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
  } catch (error) {
    console.error(`ERROR: ${error}`);
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
  } catch (error) {
    console.error(`ERROR: ${error}`);
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
  } catch (error) {
    console.error(`ERROR: ${error}`);
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
  } catch (error) {
    console.error(`ERROR: ${error}`);
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
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
});

module.exports = router;
