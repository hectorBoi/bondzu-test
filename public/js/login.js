const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

console.log(email, password, submit);

submit.addEventListener("click", () => {
  const us = email.value;
  const pw = password.value;

  console.log(us)
  console.log(pw)

  fetch("http://localhost:8081/login", {
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
        console.log("This is the response");
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

