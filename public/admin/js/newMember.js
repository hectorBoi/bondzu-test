const submitSaveElem = document.getElementById("save");
const missingInfoElem = document.getElementById("missingInfo");
const buttonSpinnerElem = document.getElementById("buttonSpinner");
const successfulSaveElem = document.getElementById("successfulSave");

const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

//Datos únicos
const nombreElem = document.getElementById("nombre");
const emailElem = document.getElementById("email");
const statusElem = document.getElementById("status");
const divisionElem = document.getElementById("division");

//Datos en español
const descripcionElem = document.getElementById("descripcion");

//English data
const descriptionElem = document.getElementById("description");


loaderElements.className += " hidden";
body.style.overflow = "auto";

submitSaveElem.addEventListener("click", () => {
  missingInfoElem.style.display = "none";
  successfulSaveElem.style.display = "none";

  //Información única
  const nombre = nombreElem.value;
  const email = emailElem.value;
  const division = divisionElem.value;

  //Información español
  const description_esp = descripcionElem.value;

  //English information
  const description_en = descriptionElem.value;

  if (
    email != "" &&
    nombre != "" &&
    description_esp != "" &&
    description_en != ""
  ) {
    buttonSpinnerElem.removeAttribute("style");

    const request = {
      name: nombre,
      description: description_esp,
      description_en: description_en,
      email: email,
      division: division,
      priority: "etDcoSci6K",
    };
    console.log(request);

    fetch("/admin/member", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => location.replace("/admin/index.html"))
      .then((res) => {
        location.replace("/admin/index.html");
        successfulSaveElem.removeAttribute("style");
        buttonSpinnerElem.style.display = "none";
      })
      .catch((err) => err);
  } else {
    missingInfoElem.removeAttribute("style");
  }
});
