const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");
const invalidUser = document.getElementById("invalidUser");
const invalidPassword = document.getElementById("invalidPassword");

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
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.token) {
        const { token, userType, username } = res;
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("usertype", userType);
        window.localStorage.setItem("username", username);
        location.replace("/");
      }
      if (res === "Incorrect") {
        //alert("Usuario o contraseña incorrecta. Intente de nuevo.");
        invalidUser.removeAttribute("style");
        invalidPassword.removeAttribute("style");
      }
    })
    .catch((err) => {
      if (err.code === 101) {
        alert(err.message);
      }
    });
});
