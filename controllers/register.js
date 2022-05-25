const token = require('./token');

// Creates "user" with users information
const createUser = async (data, Parse) => {
  try {
    const { name, lastname, email, password, userType } = data;
    const today = new Date();
    let user = new Parse.User();
    user.set('username', email);
    user.set('password', password);
    user.set('email', email);
    user.set('name', name);
    user.set('lastname', lastname);
    user.set('platform', 'Pagina web');
    user.set('lastLoginWeb', today);

    // Creates the userType for the user
    let typeTable = Parse.Object.extend('UserType');
    let query = new Parse.Query(typeTable);
    query.equalTo('objectId', 'mWm6R6DLFX');
    const results = await query.find();
    user.set('userType', results[0]);
    return user;
  } catch (error) {
    console.log(error);
  }
};

// Performs the authentication of the users credential with the DB
const handleRegister = async (req, res, Parse) => {
  // In case the user doesnt exist, it creates the user in the database and returns the session token
  try {
    const { name, email, password, lastname } = req.body;

    if (!name || !lastname || !email || !password) {
      return res.status(400).json('Incorrect form submission');
    }
    
    //Request Email Verification
    const verified = await Parse.User.requestEmailVerification(email, {
      success: function() {
        // Email Verification request was sent successfully
        alert("email sent successfully");
        return true;
      },
      error: function(error) {
        // Show the error message somewhere
        alert("Error: " + error.code + " " + error.message);
        return false;
      }
    });

    //Checks if it was sent or not
    verified.then((result) => {
      if(result) {
        // true was sent
      } else {
        return res.status(400).json('Already registered');
      }
    })
    
    const user = await createUser(req.body, Parse);
    await user.signUp();
    const session = await Parse.User.logIn(email, password);
    const username = session.get('username');
    const typeID = session.get('userType');
    const userSession = await token.createSession({
      user: username,
      userType: typeID.id,
      sessiontoken: user.getSessionToken(),
    });
    res.json(userSession);
  } catch (error) {
    res.status(400).json('Already registered');
    console.log(error);
  }
};

module.exports = {
  handleRegister: handleRegister,
};
