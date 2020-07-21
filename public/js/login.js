const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  const us = email.value;
  const pw = password.value;

  fetch("https://bondzuweb-env.eba-rndn2r3v.us-east-1.elasticbeanstalk.com/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: us,
      password: pw,
    })
  })
    .then(res => res.json())
    .then(res => {
      if (res) {
        if (res.token) {
          const { token, userType, username } = res;
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("usertype", userType);
          window.localStorage.setItem("username", username);
          location.replace("/")
        } else {
          alert(err.message);
        }
      }
    })
    .catch(err => {
      if (err.code === 101) {
        alert(err.message)
      }
    })
})

