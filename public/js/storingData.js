// Run function when getting the response from the server
const saveTokenSession = (token) => {
  window.localStorage.setItem("token", token);
}

// Run for the moment of login
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