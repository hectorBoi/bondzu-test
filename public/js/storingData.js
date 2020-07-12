// Run function when getting the response from the server
const saveTokenSession = (data) => {
  // Saves the session token in the browser local storage, so the session can exists even if the window is closed
  const { token, userType, username }
  window.localStorage.setItem("token", token);
  window.localStorage.setItem("usertype", userType);
  window.localStorage.setItem("username", username);
}

// Run for the moment of login
// In case the user already has an existing session, it sends the token to the backend to skip the login process
const getSessionToken = () => {
  const token = window.localStorage.getItem("token");
  const userType = window.localStorage.getItem("userType");
  const language = window.localStorage.getItem("language");
  const language = window.localStorage.getItem("username");

  if (token) {
    fetch("http://localhost:8081/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "token": token,
        "usertype": userType,
        "language": language,
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          console.log(`This is the response: ${res}`);
        }
      })
      .catch(console.log)
  }
}