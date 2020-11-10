const submitSaveElem = document.getElementById("save");
const missingInfoElem = document.getElementById("missingInfo");
const buttonSpinnerElem = document.getElementById("buttonSpinner");
const successfulSaveElem = document.getElementById("successfulSave");

const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

//Datos únicos
const youtubeIdElem = document.getElementById("youtubeId");
const animalPhotoElem = document.getElementById("animalPhoto");
const statusElem = document.getElementById("status");

//Datos en español
const apodoElem = document.getElementById("apodo");
const especieElem = document.getElementById("especie");
const acercaElem = document.getElementById("acerca");
const nombreCientElem = document.getElementById("nomCient");
const estadoConElem = document.getElementById("estadoCon");
const distGeoElem = document.getElementById("distGeo");
const habitatEspElem = document.getElementById("habitatEsp");
const dietaElem = document.getElementById("dieta");
const reproduccionElem = document.getElementById("reproduccion");

//English data
const nicknameElem = document.getElementById("nickname");
const speciesElem = document.getElementById("species");
const aboutElem = document.getElementById("about");
const scieNameElem = document.getElementById("scieName");
const conStatusElem = document.getElementById("conStatus");
const geoDistElem = document.getElementById("geoDist");
const habitatEngElem = document.getElementById("habitatEng");
const dietElem = document.getElementById("diet");
const reproductionElem = document.getElementById("reproduction");

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
  const youtubeId = youtubeIdElem.value;
  const keeper = allKeepersElem.options[allKeepersElem.selectedIndex].value;

  //Información español
  const apodo = apodoElem.value;
  const especie = especieElem.value;
  const acerca = acercaElem.value;
  const nombreCient = nombreCientElem.value;
  const estadoCon = estadoConElem.value;
  const distGeo = distGeoElem.value;
  const habitatEsp = habitatEspElem.value;
  const dieta = dietaElem.value;
  const reproduccion = reproduccionElem.value;

  //English information
  const nickname = nicknameElem.value;
  const species = speciesElem.value;
  const about = aboutElem.value;
  const scieName = scieNameElem.value;
  const conStatus = conStatusElem.value;
  const geoDist = geoDistElem.value;
  const habitatEng = habitatEngElem.value;
  const diet = dietElem.value;
  const reproduction = reproductionElem.value;

  if (
    youtubeId != "" &&
    apodo != "" &&
    especie != "" &&
    acerca != "" &&
    nombreCient != "" &&
    estadoCon != "" &&
    distGeo != "" &&
    habitatEsp != "" &&
    dieta != "" &&
    reproduccion != "" &&
    nickname != "" &&
    species != "" &&
    about != "" &&
    scieName != "" &&
    conStatus != "" &&
    geoDist != "" &&
    habitatEng != "" &&
    diet != "" &&
    reproduction != "" &&
    keeper != ""
  ) {
    buttonSpinnerElem.removeAttribute("style");

    //Características español
    const caracteristicas = {
      "Nombre científico": nombreCient,
      "Estado de conservación": estadoCon,
      "Distribución geográfica": distGeo,
      Hábitat: habitatEsp,
      Dieta: dieta,
      Reproducción: reproduccion,
    };

    //English characteristics
    const characteristics = {
      "Scientific name": scieName,
      "Conservation status": conStatus,
      "Geographical distribution": geoDist,
      Habitat: habitatEng,
      Diet: diet,
      Reproduction: reproduction,
    };

    const request = {
      name: apodo,
      name_en: nickname,
      about: acerca,
      about_en: about,
      characteristics: caracteristicas,
      characteristics_en: characteristics,
      species: especie,
      species_en: species,
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
