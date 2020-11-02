const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

const animalID = window.localStorage.getItem("currentAnimal");
const titleElem = document.getElementById("title");

const submitSaveElem = document.getElementById("save");
const missingInfoElem = document.getElementById("missingInfo");
const buttonSpinnerElem = document.getElementById("buttonSpinner");
const successfulSaveElem = document.getElementById("successfulSave");

//Datos únicos
const iframeElem = document.getElementById("iframe");
const youtubeIdElem = document.getElementById("youtubeId");
const animalPhotoElem = document.getElementById("animalPhoto");
const statusElem = document.getElementById("status");
const statusTextElem = document.getElementById("statusText");

//Datos en español
const especieElem = document.getElementById("especie");
const acercaElem = document.getElementById("acerca");
const caracteristicasElem = document.getElementById("caracteristicas");
const nombreCientElem = document.getElementById("nomCient");
const estadoConElem = document.getElementById("estadoCon");
const distGeoElem = document.getElementById("distGeo");
const habitatEspElem = document.getElementById("habitatEsp");
const dietaElem = document.getElementById("dieta");
const reproduccionElem = document.getElementById("reproduccion");

//English data
const speciesElem = document.getElementById("species");
const aboutElem = document.getElementById("about");
const characteristicsElem = document.getElementById("characteristics");
const scieNameElem = document.getElementById("scieName");
const conStatusElem = document.getElementById("conStatus");
const geoDistElem = document.getElementById("geoDist");
const habitatEngElem = document.getElementById("habitatEng");
const dietElem = document.getElementById("diet");
const reproductionElem = document.getElementById("reproduction");

//Llaves características
const caracs = [
  "Nombre científico",
  "Estado de conservación",
  "Distribución geográfica",
  "Hábitat",
  "Dieta",
  "Reproducción",
];

const caracsElems = [
  nombreCientElem,
  estadoConElem,
  distGeoElem,
  habitatEspElem,
  dietaElem,
  reproduccionElem,
];

const characs = [
  "Scientific name",
  "Conservation status",
  "Geographical distribution",
  "Habitat",
  "Diet",
  "Reproduction",
];

const characsElems = [
  scieNameElem,
  conStatusElem,
  geoDistElem,
  habitatEngElem,
  dietElem,
  reproductionElem,
];

//Keepers
const allKeepersElem = document.getElementById("allKeepers");

const createSelectKeepers = (array, form, currentKeeper) => {
  for (let i = 0; i < array.length; i++) {
    let keeper = array[i];

    const option = document.createElement("option");
    option.setAttribute("value", keeper.id);
    option.innerText = keeper.name;

    if (currentKeeper === keeper.name) {
      option.selected = true;
    }

    form.appendChild(option);
  }
};

fetch(`/admin/animals/${animalID}`)
  .then((res) => res.json())
  .then((animal_info) => {
    titleElem.innerText = `Actualizar: ${animal_info.species}`;

    //Switch status (Animal status - Active/Inactive)
    if (animal_info.isActive) {
      statusElem.checked = true;
      statusTextElem.innerText = "Activo";
    } else {
      statusElem.checked = false;
      statusTextElem.innerText = "Inactivo";
    }

    //Video
    let youtubeURL = "";
    // Checks if the camera is from youtube or another page
    if (animal_info.youtubeID.includes("http")) {
      youtubeURL = animal_info.youtubeID
    } else {
      youtubeURL = `https://www.youtube.com/embed/${animal_info.youtubeID}`
    }
    iframeElem.setAttribute("src", youtubeURL);
    youtubeIdElem.setAttribute("value", animal_info.youtubeID);

    //Photo
    animalPhotoElem.setAttribute("src", animal_info.profilePhoto);

    //Keepers
    createSelectKeepers(
      animal_info.allKeepers,
      allKeepersElem,
      animal_info.keeper
    );

    //Datos en español
    especieElem.setAttribute("value", animal_info.species);
    acercaElem.innerHTML = animal_info.about;

    let chars = "";
    for (let key in animal_info.characteristics) {
      for (let i = 0; i < caracs.length; i++) {
        if (key === caracs[i]) {
          if (i == 0) {
            //Nombre científico (input value)
            caracsElems[i].value = animal_info.characteristics[key];
          } else {
            //Demás atributos (textarea)
            caracsElems[i].innerHTML = animal_info.characteristics[key];
          }
        }
      }

      let temp = `${key}: ${animal_info.characteristics[key]}\n`;
      chars = chars.concat(temp);
    }
    caracteristicasElem.innerHTML = chars;

    //English data
    speciesElem.setAttribute("value", animal_info.species_en);

    aboutElem.innerHTML = animal_info.about_en;

    chars = "";
    for (let key in animal_info.characteristics_en) {
      for (let i = 0; i < characs.length; i++) {
        if (key === characs[i]) {
          if (i == 0) {
            //Scientific name (input value)
            characsElems[i].value = animal_info.characteristics_en[key];
          } else {
            //Other attributes (textarea)
            characsElems[i].innerHTML = animal_info.characteristics_en[key];
          }
        }
      }

      let temp = `${key}: ${animal_info.characteristics_en[key]}\n`;
      chars = chars.concat(temp);
    }
    characteristicsElem.innerHTML = chars;

    loaderElements.className += " hidden";
    body.style.overflow = "auto";
  })
  .catch("Error in the request");

submitSaveElem.addEventListener("click", () => {
  missingInfoElem.style.display = "none";
  successfulSaveElem.style.display = "none";

  //Información única
  const status = statusElem.checked;
  const youtubeId = youtubeIdElem.value;
  const keeper = allKeepersElem.options[allKeepersElem.selectedIndex].value;

  //Información español
  const especie = especieElem.value;
  const acerca = acercaElem.value;
  const nombreCient = nombreCientElem.value;
  const estadoCon = estadoConElem.value;
  const distGeo = distGeoElem.value;
  const habitatEsp = habitatEspElem.value;
  const dieta = dietaElem.value;
  const reproduccion = reproduccionElem.value;

  //English information
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
    especie != "" &&
    acerca != "" &&
    nombreCient != "" &&
    estadoCon != "" &&
    distGeo != "" &&
    habitatEsp != "" &&
    dieta != "" &&
    reproduccion != "" &&
    species != "" &&
    about != "" &&
    scieName != "" &&
    conStatus != "" &&
    geoDist != "" &&
    habitatEng != "" &&
    diet != "" &&
    reproduction != ""
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
      name: nombreCient,
      name_en: scieName,
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

    fetch(`/admin/animals/${animalID}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((res) => {
        successfulSaveElem.removeAttribute("style");
        buttonSpinnerElem.style.display = "none";
        setTimeout(() => {
          location.reload();
        }, 3000);
      })
      .catch((err) => err);
  } else {
    missingInfoElem.removeAttribute("style");
  }
});

const formTest = document.getElementById("formTest");
formTest.setAttribute("action", `/admin/animals/${animalID}`);

const submitPhoto = document.getElementById("newProfilepic");
const formPhoto = document.getElementById("submitPhoto");
submitPhoto.addEventListener("change", () => {
  formPhoto.className = "btn btn-success";
  formPhoto.disabled = false;
});
