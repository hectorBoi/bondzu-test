// Creates the user session and returns the token to the browser, so it can be managed in the frontend
const createSession = async ({ user, userType, userID, sessiontoken }) => {
  return {
    token: sessiontoken,
    username: user,
    userType: userType,
    userID: userID,
  };
};

module.exports = {
  createSession: createSession,
};
