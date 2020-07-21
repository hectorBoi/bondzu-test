const logout = document.getElementById("logout");

logout.addEventListener("click", () => {

  fetch("/logout", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "token": window.localStorage.getItem("token"),
    }
  })
    .then(res => {
      if (res) {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("usertype")
        window.localStorage.removeItem("username")
        location.replace("/")
      }
    })
    .catch(err => {
      if (err.code === 101) {
        alert(err.message)
      }
    })
})