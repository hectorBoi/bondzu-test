const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");
const invalidPassword = document.getElementById("invalidPassword");

submit.addEventListener("click", () => {
  const us = email.value;
  const pw = password.value;

  fetch("http://bondzuweb-env.eba-rndn2r3v.us-east-1.elasticbeanstalk.com/login", {
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
        document.cookie = `username=${username}`;
        document.cookie = `token=${token}`;
        document.cookie = `usertype=${userType}`;
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
