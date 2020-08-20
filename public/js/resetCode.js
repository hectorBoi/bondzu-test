const sendCodeForm = document.getElementById("sendCodeForm");
const restorePasswordForm = document.getElementById("restorePasswordForm");

const emailElem = document.getElementById("emailReset");
const codeElem = document.getElementById("codeReset");
const passwordElem = document.getElementById("passwordReset");
const passwordConfElem = document.getElementById("passwordConfReset");

const sendCodeBtn = document.getElementById("sendCodeBtn");
const restorePasswordBtn = document.getElementById("restorePasswordBtn");


const smtpToken = "e532f17b-18c6-49a2-99f7-04f158ff339c";

sendCodeBtn.addEventListener("click", () => {
  fetch("/passwordReset", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "username": emailElem.value, // EMAILELEM.VALUE!!!
    })
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.number);
      if (res.number) {
        Email.send({
          SecureToken: smtpToken,
          To: emailElem.value, // EMAILELEM.VALUE!!!
          From: "contactoBondzu@gmail.com",
          Subject: "Recuperacion de contraseña",
          Body: `El codigo para recuperar tu contraseña es el siguiente: ${res.number}, porfavor ingresalo en la ventana correspondiente dentro de la pagina de Bondzu`,
        }).then((message) => {
          alert("Se envio un curreo con indicaciones para recuperar tu contraseña!")/*$("#toastSuccess").toast("show")*/;
          sendCodeForm.style.display = "none";
          restorePasswordForm.style.display = "";
        })
      } else {
        alert("No se encontro a ningun usuario con ese correo")
        // $("#toastError").toast("show");
      }
    })
    .catch(err => console.log(err))
});

restorePasswordForm.addEventListener("click", () => {
  if (passwordElem.value === passwordConfElem.value) {
    fetch("/passwordReset", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "username": emailElem.value, // EMAILELEM.VALUE!!!
        "code": codeElem.value,  // CODELELEM.VALUE!!!
        "password": passwordElem.value // PASSWORDELEM.VALUE!!!
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message === "success");
        if (res.message !== "error") {
          alert("El cambio se realizo de manera exitosa, por favor inicia sesion con tu contraseña nueva.");
          location.replace("/");
        } else if (res.message === "fail") {
          alert("El codigo no corresponde con el enviado en el correo, por favor verifique el codigo");
          // $("#toastError").toast("show");
        } else {
          alert("Hubo un error en el servidor, por favor intentar de nuevo");
          location.reload();
        }
      })
      .catch(err => console.log(err))
  } else {
    alert("Las contraseñas no coinciden")
  }
});
