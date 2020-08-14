const nameElem = document.getElementById("name");
const emailElem = document.getElementById("emailField");
const subjectElem = document.getElementById("subject");
const messageElem = document.getElementById("message");
const submitButton = document.getElementById("submitButton");
const toastBodyElem = document.getElementById("toastBody");

const smtpToken = "e532f17b-18c6-49a2-99f7-04f158ff339c";

submitButton.addEventListener("click", () => {
  const name = nameElem.value;
  const email = emailElem.value;
  const subject = subjectElem.value;
  const message = messageElem.value;
  const body = `_${name}_ con correo _${email}_ pregunta = ${message}`;

  toastBodyElem.innerText = `Pronto nos pondremos en contacto contigo, ${name}.`;

  if (name != "" && email != "" && subject != "" && message != "") {
    Email.send({
      SecureToken: smtpToken,
      //To: 'jorgehuerta@bondzu.com',
      To: "abr1499@gmail.com",
      From: "contactoBondzu@gmail.com",
      Subject: subject,
      Body: body,
    }).then((message) => $("#toastSuccess").toast("show"));
  } else {
    $("#toastError").toast("show");
  }
});
