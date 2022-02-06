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
const objectID = "";

//Datos en español
const descripcionElem = document.getElementById("descripcion");

//English data
const descriptionElem = document.getElementById("description");

//Fetching element
let memberEmail = window.localStorage.getItem("currentMember");
console.log(memberEmail);

fetch(`/admin/members/${memberEmail}`)
  .then((res) => res.json())
  .then((member_info) => {
    console.log(member_info);

    //Nombre
    nombreElem.setAttribute("value", member_info[0].name);

    //Email
    emailElem.setAttribute("value", member_info[0].email);
    
    //Division
    divisionElem.setAttribute("value", member_info[0].division);
    divisionElem.selectedIndex = 1;

    //Datos en español
    descripcionElem.innerHTML = member_info[0].description;

    //English data
    descriptionElem.innerHTML = member_info[0].description_en;

    //ID
    //objectID = member_info[0].objectID;

    loaderElements.className += " hidden";
    body.style.overflow = "auto";
  })
  .catch("Error in the request");

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
      objectID: objectID,
      memberRefEmail: memberEmail,
      priority: "etDcoSci6K",
    };
    //console.log(request);

    fetch("/admin/memberUpdate", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => location.replace("/admin/member.html"))
      .then((res) => {
        location.replace("/admin/member.html");
        successfulSaveElem.removeAttribute("style");
        buttonSpinnerElem.style.display = "none";
      })
      .catch((err) => err);
  } else {
    missingInfoElem.removeAttribute("style");
  }
});

const formTest = document.getElementById("formTest");
formTest.setAttribute("action", `/admin/memberUpdatePhoto/${memberEmail}`);

const submitPhoto = document.getElementById("newProfilepic");
const formPhoto = document.getElementById("submitPhoto");
submitPhoto.addEventListener("change", () => {
  formPhoto.className = "btn btn-success";
  formPhoto.disabled = false;
  formPhoto.value = "Actualizar foto";
});


/*formPhoto.addEventListener("click", () => {
  
  const request = {email: memberEmail, image: submitPhoto};

  fetch(`/admin/memberUpdatePhoto`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request)
  })
    .then((res) => {
      location.replace("/admin/member.html");
      successfulSaveElem.removeAttribute("style");
      buttonSpinnerElem.style.display = "none";
    })
    .catch((err) => err);
});*/