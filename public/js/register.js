const nameElem = document.getElementById("name");
const lastnameElem = document.getElementById("lastname");
const emailElem = document.getElementById("email");
const passwordElem = document.getElementById("password");
const usertypeElem = document.getElementById("usertype");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  const name = nameElem.value;
  const lastname = lastnameElem.value;
  const email = emailElem.value;
  const password = passwordElem.value;
  const usertype = usertypeElem.value;

  fetch("/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      lastname: lastname,
      email: email,
      usertype: usertype,
      password: password,
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
          location.replace("/navBarLoggedIn.html");
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

