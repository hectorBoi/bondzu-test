const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  fetch("http://bondzuweb-env.eba-rndn2r3v.us-east-1.elasticbeanstalk.com/logout", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(res => {
      console.log(res)
      if (res) {
        document.cookie = "token" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = "usertype" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = "username" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        location.replace("/")
      }
    })
    .catch(err => {
      if (err.code === 101) {
        alert(err.message)
      }
    })
})