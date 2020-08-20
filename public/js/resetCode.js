const sendCodeForm = document.getElementById("sendCodeForm");
const restorePasswordForm = document.getElementById("restorePasswordForm");

const emailElem = document.getElementById("emailReset");
const codeElem = document.getElementById("codeReset");
const passwordElem = document.getElementById("passwordReset");
const passwordConfElem = document.getElementById("passwordConfReset");

const sendCodeBtn = document.getElementById("sendCodeBtn");
const restorePasswordBtn = document.getElementById("restorePasswordBtn");

const smtpToken = "e532f17b-18c6-49a2-99f7-04f158ff339c";

const backTopElem = document.getElementById("backTop");
backTopElem.style.display = "none";

const missingEmail = document.getElementById("missingEmail");
const invalidCode = document.getElementById("invalidCode");
const sentCode = document.getElementById("sentCode");
const invalidPasswordConf = document.getElementById("invalidPasswordConf");
const missingFields = document.getElementById("missingFields");
const successPassword = document.getElementById("successPassword");
const userDoesntExist = document.getElementById("userDoesntExist");


sendCodeBtn.addEventListener("click", () => {
  missingEmail.style.display = "none";

  fetch("/passwordReset", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: emailElem.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (emailElem.value != "") {
        if (res.message === "success") {
          sentCode.removeAttribute("style");
          sendCodeForm.removeAttribute("style");
          emailElem.disabled = true;
          restorePasswordBtn.removeAttribute("style");
          sendCodeBtn.setAttribute("style", "display: none;");
          userDoesntExist.style.display = "none";
        } else {
          userDoesntExist.removeAttribute("style");
        }
      } else {
        missingEmail.removeAttribute("style");
      }
    })
    .catch((err) => console.log(err));
});

restorePasswordBtn.addEventListener("click", () => {
  sentCode.style.display = "none";

  if (codeElem.value !== "" && passwordElem.value !== "" && passwordConfElem.value !== "") {
    missingFields.style.display = "none";

    if (passwordElem.value === passwordConfElem.value) {
      invalidPasswordConf.style.display = "none";

      fetch("/passwordReset", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: emailElem.value,
          code: codeElem.value,
          password: passwordElem.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "success") {
            successPassword.removeAttribute("style");
            invalidCode.style.display = "none";
            setTimeout(() => {
              location.replace("/");
            }, 4000);
          } else if (res.message === "fail") {
            invalidCode.removeAttribute("style");
          } else {
            alert("Hubo un error en el servidor, por favor intentar de nuevo");
          }
        })
        .catch((err) => console.log(err));
    } else {
      invalidPasswordConf.removeAttribute("style");
    }
  } else {
    missingFields.removeAttribute("style");
  }
});
