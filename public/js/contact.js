const nameElem = document.getElementById("name")
const emailElem = document.getElementById("emailField")
const subjectElem = document.getElementById("subject")
const messageElem = document.getElementById("message")
const submitButton = document.getElementById("submitButton")

const smtpToken = "e532f17b-18c6-49a2-99f7-04f158ff339c"

submitButton.addEventListener("click", () => {
  const name = nameElem.value;
  const email = emailElem.value;
  const subject = subjectElem.value;
  const message = messageElem.value;
  const body = `_${name}_ con correo _${email}_ pregunta = ${message}`

  Email.send({
    SecureToken: smtpToken,
    To: 'jorgehuerta@bondzu.com',
    From: "contactoBondzu@gmail.com",
    Subject: subject,
    Body: body
  }).then(
    message => alert(message)
  );
})