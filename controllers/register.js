const token = require('./token');

// Creates "user" with users information
const createUser = async (data, Parse) => {
  try {
    let user = new Parse.User();
    const userInformation = Object.entries(data);   // Name, last name, email, password, email subscription active
    for (const [property, value] of userInformation)
      user.set(property, value);
    
    const { email } = data;
    user.set('username', email);
    
    const today = new Date();
    user.set('lastLoginWeb', today);
    user.set('platform', 'Pagina web');

    // Creates the userType for the user
    // ! Deprecated feature; consider eliminating
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
    /*const verified = await Parse.User.requestEmailVerification(email, {
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
    });*/

    //Checks if it was sent or not
    /*verified.then((result) => {
      if(result) {
        // true was sent
      } else {
        return res.status(400).json('Already registered');
      }
    })*/
    
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
    // FYI: https://docs.parseplatform.org/rest/guide/#error-codes
    switch (error.code)
    {
      case 202:
        console.log(`${error}`);
        res.status(400).json('Already registered');
        break;
      default:
        console.error(`An unexpected error has occurred. Please contact the Systems department.`);
        res.status(500).end();
        break;
    }
    
  }
};

module.exports = {
  handleRegister: handleRegister,
};
