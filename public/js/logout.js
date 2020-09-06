const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  fetch("/logout", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(res => {
      if (res) {
        document.cookie = "token=;" + "expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "usertype=;" + "expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "username=;" + "expires=Thu, 01 Jan 1970 00:00:00 GMT";
        location.replace("/")
      }
    })
    .catch(err => {
      if (err.code === 101) {
        alert(err.message)
      }
    })
})