// Run function when getting the response from the server
const saveTokenSession = (token) => {
  // Saves the session token in the browser local storage, so the session can exists even if the window is closed
  window.localStorage.setItem("token", token);
}

// Run for the moment of login
// In case the user already has an existing session, it sends the token to the backend to skip the login process
const getSessionToken = () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    fetch("http://localhost:8081/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
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