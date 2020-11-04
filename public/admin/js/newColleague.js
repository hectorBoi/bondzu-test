const submitSaveElem = document.getElementById("save");
const missingInfoElem = document.getElementById("missingInfo");
const buttonSpinnerElem = document.getElementById("buttonSpinner");
const successfulSaveElem = document.getElementById("successfulSave");

const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

//Datos únicos
const nombreElem = document.getElementById("nombre");
const youtubeIdElem = document.getElementById("youtubeId");
const animalPhotoElem = document.getElementById("animalPhoto");
const statusElem = document.getElementById("status");

//Datos en español
const acercaElem = document.getElementById("acerca");
const caracteristicasElem = document.getElementById("caracteristicas");

//English data
const aboutElem = document.getElementById("about");
const characteristicsElem = document.getElementById("characteristics");

//Keepers
const allKeepersElem = document.getElementById("allKeepers");

const createSelectKeepers = (array, form) => {
  for (let i = 0; i < array.length; i++) {
    let keeper = array[i];
    //console.log(keeper);

    const option = document.createElement("option");
    option.setAttribute("value", keeper.id);
    option.innerText = keeper.name;

    form.appendChild(option);
  }
};

// Get all the keepers for selection
console.log("making the request");
fetch("/admin/animals/keepers")
  .then((res) => res.json())
  .then((info) => {
    createSelectKeepers(info.allKeepers, allKeepersElem);
    loaderElements.className += " hidden";
    body.style.overflow = "auto";
  })
  .catch((err) => console.log(err));

submitSaveElem.addEventListener("click", () => {
  missingInfoElem.style.display = "none";
  successfulSaveElem.style.display = "none";

  //Información única
  const status = statusElem.checked;
  const nombre = nombreElem.value;
  const youtubeId = youtubeIdElem.value;
  const keeper = allKeepersElem.options[allKeepersElem.selectedIndex].value;

  //Información español
  const acerca = acercaElem.value;
  const caracteristicas = {
    "": caracteristicasElem.value,
  };

  //English information
  const about = aboutElem.value;
  const characteristics = {
    "": characteristicsElem.value,
  };

  if (
    youtubeId != "" &&
    nombre != "" &&
    acerca != "" &&
    caracteristicas != "" &&
    about != "" &&
    keeper != "" &&
    characteristics != ""
  ) {
    buttonSpinnerElem.removeAttribute("style");

    const request = {
      name: nombre,
      name_en: nombre,
      about: acerca,
      about_en: about,
      characteristics: caracteristicas,
      characteristics_en: characteristics,
      species: "Colega",
      species_en: "Colleague",
      youtubeID: youtubeId,
      keeper: keeper,
      isActive: status,
      priority: "etDcoSci6K",
    };

    //console.log(request);

    fetch("/admin/animals", {
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
