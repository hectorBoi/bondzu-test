const smtpToken = "e532f17b-18c6-49a2-99f7-04f158ff339c";

fetch()

submitContactButton.addEventListener("click", () => {
  const name = nameContactElem.value;
  const email = emailContactElem.value;
  const subject = subjectContactElem.value;
  const message = messageContactElem.value;
  const body = `_${name}_ con correo _${email}_ pregunta = ${message}`;

  toastBodyElem.innerText = `Pronto nos pondremos en contacto contigo, ${name}.`;

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
