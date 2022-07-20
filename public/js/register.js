// Registration form elements
const nameElem = document.getElementById("nameReg");
const lastnameElem = document.getElementById("lastnameReg");
const emailElem = document.getElementById("emailReg");
const passwordElem = document.getElementById("passwordReg");
const passwordConfElem = document.getElementById("passwordRegConf");
const emailSubscriptionElem = document.querySelector("#emailSubscriptionReg");
const submitElem = document.getElementById("submitReg");

// Error messages
const existingUser = document.getElementById("existingUser");
const noMatchPasswords = document.getElementById("noMatchPasswords");
const missingInputs = document.getElementById("missingInputs");

submitElem.addEventListener("click", () => {
  const name = nameElem.value;
  const lastname = lastnameElem.value;
  const email = emailElem.value;
  const password = passwordElem.value;
  const passwordConf = passwordConfElem.value;
  const isEmailSubscribed = emailSubscriptionElem.checked;

  existingUser.style.display = "none";
  noMatchPasswords.style.display = "none";
  missingInputs.style.display = "none";

  // Registration form values
  /* No se incluye el valor del checkbox para suscribirse al newsletter
     porque es un campo opcional
   */
  const inputs = new Set();
  inputs.add(name);
  inputs.add(lastname);
  inputs.add(email);
  inputs.add(password);
  inputs.add(passwordConf);

  // Si todos los campos han sido llenados:
  if (!inputs.has(""))
  {
    if (passwordConf === password) {
      fetch("/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        /* Información a almacenar en la base de datos
           ! IMPORTANTE QUE LOS NOMBRES DE LAS PROPIEDADES COINCI-
           ! DAN CON LOS NOMBRES DE LAS COLUMNAS DE LA TABLA User
         */
        body: JSON.stringify({
          name: name,
          lastname: lastname,
          email: email,
          password: password,
          emailSubscriptionActive: isEmailSubscribed
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.token) {
            const { token, userType, username } = res;
            document.cookie = `username=${username}; path=/;`;
            document.cookie = `token=${token}; path=/`;
            document.cookie = `usertype=${userType}; path=/d`;
            location.replace("/");
          }
          if (res === "Already registered") {
            existingUser.removeAttribute("style");
          }
        })
        .catch((err) => {
          if (err.code === 101) {
            alert(err.message);
          }
        });
    } else {
      noMatchPasswords.removeAttribute("style");
    }
  } else {
    missingInputs.removeAttribute("style");
  }
});
