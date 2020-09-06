const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");
const invalidPassword = document.getElementById("invalidPassword");

submit.addEventListener("click", () => {
  const us = email.value;
  const pw = password.value;

  invalidPassword.style.display = "none";

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
        document.cookie = `username=${username}; path=/;`;
        document.cookie = `token=${token}; path=/`;
        document.cookie = `usertype=${userType}; path=/`;
        location.replace("/");
      }
      if (res === "Incorrect") {
        invalidPassword.removeAttribute("style");
      }
    })
    .catch((err) => {
      if (err.code === 101) {
        alert(err.message);
      }
    });
});
