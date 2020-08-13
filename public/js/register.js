const nameElem = document.getElementById("nameReg");
const lastnameElem = document.getElementById("lastnameReg");
const usertypeElem = document.getElementById("usertypeReg");
const emailElem = document.getElementById("emailReg");
const passwordElem = document.getElementById("passwordReg");
const passwordConfElem = document.getElementById("passwordRegConf");
const submitElem = document.getElementById("submitReg");

submitElem.addEventListener("click", () => {
  const name = nameElem.value;
  const lastname = lastnameElem.value;
  const usertype = usertypeElem.options[usertypeElem.selectedIndex].value;
  const email = emailElem.value;
  const password = passwordElem.value;
  const passwordConf = passwordConfElem.value;

  const existingUser = document.getElementById("existingUser");

  if (passwordConf === password) {
    fetch("/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        lastname: lastname,
        email: email,
        // userType: usertype,
        password: password,
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
        if (res === "Already registered") {
          //alert("Ese usuario ya existe!");
          existingUser.removeAttribute("style");
        }
      })
      .catch((err) => {
        if (err.code === 101) {
          alert(err.message);
        }
      });
  } else {
    alert("Las contraseñas no coinciden, intenta de nuevo.");
  }
});
