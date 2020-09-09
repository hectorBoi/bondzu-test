const nameContactElem = document.getElementById("name");
const emailContactElem = document.getElementById("emailField");
const subjectContactElem = document.getElementById("subject");
const messageContactElem = document.getElementById("message");
const submitContactButton = document.getElementById("submitButton");
const toastBodyElem = document.getElementById("toastBody");

const backTopElem = document.getElementById("backTop");
backTopElem.style.display = "none";

const smtpToken = "e532f17b-18c6-49a2-99f7-04f158ff339c";

submitContactButton.addEventListener("click", () => {
  const name = nameContactElem.value;
  const email = emailContactElem.value;
  const subject = subjectContactElem.value;
  const message = messageContactElem.value;
  const body = `_${name}_ con correo _${email}_ pregunta = ${message}`;

  if (window.localStorage.getItem("lang") === "es") {
    toastBodyElem.innerText = `Pronto nos pondremos en contacto contigo, ${name}.`;
  } else if (window.localStorage.getItem("lang") === "en") {
    toastBodyElem.innerText = `We will contact you soon, ${name}.`;
  }

  if (name != "" && email != "" && subject != "" && message != "") {
    Email.send({
      SecureToken: smtpToken,
      To: "jorgehuerta@bondzu.com",
      From: "contactoBondzu@gmail.com",
      Subject: subject,
      Body: body,
    }).then((message) => $("#toastSuccess").toast("show"));
  } else {
    $("#toastError").toast("show");
  }
});
