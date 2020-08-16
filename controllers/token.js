// Creates the user session and returns the token to the browser, so it can be managed in the frontend
const createSession = async (data) => {
  const { user, userType, sessiontoken } = data;
  return {
    token: sessiontoken,
    username: user,
    userType: userType,
  }
}

module.exports = {
  createSession: createSession,
}