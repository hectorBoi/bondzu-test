const nameElem = document.getElementById("nameReg");
const lastnameElem = document.getElementById("lastnameReg");
const usertypeElem = document.getElementById("usertypeReg");
const emailElem = document.getElementById("emailReg");
const passwordElem = document.getElementById("passwordReg");
const passwordConfElem = document.getElementById("passwordRegConf");
const submitElem = document.getElementById("submitReg");

const existingUser = document.getElementById("existingUser");
const noMatchPasswords = document.getElementById("noMatchPasswords");
const missingInputs = document.getElementById("missingInputs");

submitElem.addEventListener("click", () => {
  const name = nameElem.value;
  const lastname = lastnameElem.value;
  //const usertype = usertypeElem.options[usertypeElem.selectedIndex].value;
  const email = emailElem.value;
  const password = passwordElem.value;
  const passwordConf = passwordConfElem.value;

  existingUser.style.display = "none";
  noMatchPasswords.style.display = "none";
  missingInputs.style.display = "none";

  if (
    name != "" &&
    lastname != "" &&
    email != "" &&
    password != "" &&
    passwordConf != ""
  ) {
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
            document.cookie = `username=${username}`;
            document.cookie = `token=${token}`;
            document.cookie = `usertype=${userType}`;
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
