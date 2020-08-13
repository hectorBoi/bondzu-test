const nameElem = document.getElementById("name")
const emailElem = document.getElementById("emailField")
const subjectElem = document.getElementById("subject")
const messageElem = document.getElementById("message")
const submitButton = document.getElementById("submitButton")

const smtpToken = "c398baa5-5ed6-4fd2-b82b-2b9270642c05"

submitButton.addEventListener("click", () => {
  const name = nameElem.value;
  const email = emailElem.value;
  const subject = subjectElem.value;
  const message = messageElem.value;
  const body = `_${name}_ con correo _${email}_ pregunta = ${message}`

  Email.send({
    SecureToken: smtpToken,
    To: 'duli500@hotmail.com',
    From: "duliotest@gmail.com",
    Subject: subject,
    Body: body
  }).then(
    message => alert(message)
  );
})

