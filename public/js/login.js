const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  const us = email.value;
  const pw = password.value;

  fetch("/login", {
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
      if (res.token) {
        const { token, userType, username } = res;
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("usertype", userType);
        window.localStorage.setItem("username", username);
        location.replace("/navBarLoggedIn.html");
      }
      if (res === "Incorrect") {
        alert("Usuario o contraseña incorrecta. Intente de nuevo.");
      }
    })
    .catch(err => {
      if (err.code === 101) {
        alert(err.message)
      }
    })
})

