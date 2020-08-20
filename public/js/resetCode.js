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

sendCodeBtn.addEventListener("click", () => {
  missingEmail.style.display = "none";

  fetch("/passwordReset", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: emailElem.value, // EMAILELEM.VALUE!!!
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (emailElem.value != "") {
        console.log(res.number);
        if (res.number) {
          Email.send({
            SecureToken: smtpToken,
            //To: emailElem.value, // EMAILELEM.VALUE!!!
            //From: "contactoBondzu@gmail.com",
            Subject: "Bondzú - Recuperación de contraseña",
            Body: `El código para recuperar tu contraseña es el siguiente: ${res.number}, porfavor ingresalo en la ventana correspondiente dentro de la pagina de Bondzu`,
          }).then((message) => {
            sentCode.removeAttribute("style");
            sendCodeForm.removeAttribute("style");
            emailElem.disabled = true;
            restorePasswordBtn.removeAttribute("style");
            sendCodeBtn.setAttribute("style", "display: none;");
            //alert(
            // "Se envio un curreo con indicaciones para recuperar tu contraseña!"
            //) /*$("#toastSuccess").toast("show")*/;
            //sendCodeForm.style.display = "none";
            //restorePasswordForm.style.display = "";
          });
        } else {
          alert("No se encontro a ningun usuario con ese correo");
          // $("#toastError").toast("show");
        }
      } else {
        missingEmail.removeAttribute("style");
      }
    })
    .catch((err) => console.log(err));
});

restorePasswordBtn.addEventListener("click", () => {
  sentCode.style.display = "none";

  if (codeElem != "" && passwordElem != "" && passwordConfElem != "") {
    missingFields.style.display = "none";

    if (passwordElem.value === passwordConfElem.value) {
      invalidPasswordConf.style.display = "none";

      fetch("/passwordReset", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: emailElem.value, // EMAILELEM.VALUE!!!
          code: codeElem.value, // CODELELEM.VALUE!!!
          password: passwordElem.value, // PASSWORDELEM.VALUE!!!
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message === "success");
          if (res.message !== "error") {
            /*alert(
              "El cambio se realizo de manera exitosa, por favor inicia sesion con tu contraseña nueva."
            );*/
            successPassword.removeAttribute("style");
            location.replace("/");
          } else if (res.message === "fail") {
            invalidCode.removeAttribute("style");
            /*alert(
              "El codigo no corresponde con el enviado en el correo, por favor verifique el codigo"
            );*/
            // $("#toastError").toast("show");
          } else {
            alert("Hubo un error en el servidor, por favor intentar de nuevo");
            location.reload();
          }
        })
        .catch((err) => console.log(err));
    } else {
      //alert("Las contraseñas no coinciden");
      invalidPasswordConf.removeAttribute("style");
    }
  } else {
    missingFields.removeAttribute("style");
  }
});
