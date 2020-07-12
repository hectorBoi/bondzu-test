const username = document.getElementById("username");
username.innerHTML = window.localStorage.getItem("username");

// Only allows access to users which have a session
if (!window.localStorage.getItem("token")) {
  location.replace("/")
}

fetch("http://localhost:8081/animals", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    "usertype": window.localStorage.getItem("usertype"),
    "username": window.localStorage.getItem("username")
  }
})
  .then(res => res.json())
  .then(res => {
    console.log(res)
  })
  .catch("Error in the request")