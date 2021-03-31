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
const apodoElem = document.getElementById("apodo");
const especieElem = document.getElementById("especie");
const acercaElem = document.getElementById("acerca");
const caracteristicasElem = document.getElementById("caracteristicas");
const nombreCientElem = document.getElementById("nomCient");
const estadoConElem = document.getElementById("estadoCon");
const distGeoElem = document.getElementById("distGeo");
const habitatEspElem = document.getElementById("habitatEsp");
const dietaElem = document.getElementById("dieta");
const reproduccionElem = document.getElementById("reproduccion");
const fichaNombreCienElem = document.getElementById("fichaNomCient");
const fichaEstadoConElem = document.getElementById("fichaEstadoCon");
const fichaDistGeoElem = document.getElementById("fichaDistGeo");
const fichaHabitatEspElem = document.getElementById("fichaHabitatEsp");
const fichaDietaElem = document.getElementById("fichaDieta");
const fichaReproduccionElem = document.getElementById("fichaReproduccion");
const referenciasElem = document.getElementById("referencias");
const contenedor = document.getElementById("car");

//English data
const nicknameElem = document.getElementById("nickname");
const speciesElem = document.getElementById("species");
const aboutElem = document.getElementById("about");
const characteristicsElem = document.getElementById("characteristics");
const scieNameElem = document.getElementById("scieName");
const conStatusElem = document.getElementById("conStatus");
const geoDistElem = document.getElementById("geoDist");
const habitatEngElem = document.getElementById("habitatEng");
const dietElem = document.getElementById("diet");
const reproductionElem = document.getElementById("reproduction");
const technicalScieNameElem = document.getElementById("technicalScieName");
const technicalConStatusElem = document.getElementById("technicalConStatus");
const technicalGeoDistElem = document.getElementById("technicalGeoDist");
const technicalHabitatEngElem = document.getElementById("technicalHabitatEng");
const technicalDietElem = document.getElementById("technicalDiet");
const technicalReproductionElem = document.getElementById(
  "technicalReproduction"
);
const referencesElem = document.getElementById("references");
const container = document.getElementById("char");

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

//Ficha técnica
const fichaTec = [
  "Nombre científico",
  "Estado de conservación",
  "Distribución geográfica",
  "Hábitat",
  "Dieta",
  "Reproducción",
  "Referencias",
];

const fichaTecElems = [
  fichaNombreCienElem,
  fichaEstadoConElem,
  fichaDistGeoElem,
  fichaHabitatEspElem,
  fichaDietaElem,
  fichaReproduccionElem,
  referenciasElem,
];

const fichaTec_en = [
  "Scientific name",
  "Conservation status",
  "Geographical distribution",
  "Habitat",
  "Diet",
  "Reproduction",
  "References",
];

const fichaTec_enElems = [
  technicalScieNameElem,
  technicalConStatusElem,
  technicalGeoDistElem,
  technicalHabitatEngElem,
  technicalDietElem,
  technicalReproductionElem,
  referencesElem,
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
    titleElem.innerText = `Actualizar: ${animal_info.name}`;

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
      youtubeURL = animal_info.youtubeID;
    } else {
      youtubeURL = `https://www.youtube.com/embed/${animal_info.youtubeID}`;
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
    apodoElem.setAttribute("value", animal_info.name);
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

    chars = "";
    let ref = "";
    for (let key in animal_info.technicalData) {
      for (let i = 0; i < fichaTec.length; i++) {
        if (key === fichaTec[i]) {
          if (i == 0) {
            //Nombre científico (input value)
            fichaTecElems[i].value = animal_info.technicalData[key];
          } else if (i == 6) {
            animal_info.technicalData[key].forEach((element) => {
              let references = `${element}\n`;
              ref = ref.concat(references);
            });
            referenciasElem.value = ref;
          } else {
            //Demás atributos (textarea)
            fichaTecElems[i].innerHTML = animal_info.technicalData[key];
          }
        }
      }

      let temp = `${key}: ${animal_info.technicalData[key]}\n`;
      chars = chars.concat(temp);
    }
    contenedor.innerHTML = chars;
    //English data
    nicknameElem.setAttribute("value", animal_info.name_en);
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

    ref = "";
    chars = "";
    for (let key in animal_info.technicalData_en) {
      for (let i = 0; i < fichaTec_en.length; i++) {
        if (key === fichaTec_en[i]) {
          if (i == 0) {
            //Nombre científico (input value)
            fichaTec_enElems[i].value = animal_info.technicalData_en[key];
          } else if (i == 6) {
            animal_info.technicalData_en[key].forEach((element) => {
              let references = `${element}\n`;
              ref = ref.concat(references);
            });
            referencesElem.value = ref;
          } else {
            //Demás atributos (textarea)
            fichaTec_enElems[i].innerHTML = animal_info.technicalData_en[key];
          }
        }
      }

      let temp = `${key}: ${animal_info.technicalData_en[key]}\n`;
      chars = chars.concat(temp);
    }
    container.innerHTML = chars;

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
  const apodo = apodoElem.value;
  const especie = especieElem.value;
  const acerca = acercaElem.value;
  const nombreCient = nombreCientElem.value;
  const estadoCon = estadoConElem.value;
  const distGeo = distGeoElem.value;
  const habitatEsp = habitatEspElem.value;
  const dieta = dietaElem.value;
  const reproduccion = reproduccionElem.value;
  const fichaNombreCient = fichaNombreCienElem.value;
  const fichaEstadoCon = fichaEstadoConElem.value;
  const fichaDistGeo = fichaDistGeoElem.value;
  const fichaHabitatEsp = fichaHabitatEspElem.value;
  const fichaDieta = fichaDietaElem.value;
  const fichaReproduccion = fichaReproduccionElem.value;
  const referencias = referenciasElem.value;

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
  const technicalScieName = technicalScieNameElem.value;
  const technicalConStatus = technicalConStatusElem.value;
  const technicalGeoDist = technicalGeoDistElem.value;
  const technicalHabitatEng = technicalHabitatEngElem.value;
  const technicalDiet = technicalDietElem.value;
  const technicalReproduction = technicalReproductionElem.value;
  const references = referencesElem.value;

  //Referencias split
  const referencesArray = references.split("\n");
  const referencesArreglo = referencias.split("\n");

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
    fichaNombreCient != "" &&
    fichaEstadoCon != "" &&
    fichaDistGeo != "" &&
    fichaHabitatEsp != "" &&
    fichaDieta != "" &&
    fichaReproduccion != "" &&
    referencesArreglo != "" &&
    nickname != "" &&
    species != "" &&
    about != "" &&
    scieName != "" &&
    conStatus != "" &&
    geoDist != "" &&
    habitatEng != "" &&
    diet != "" &&
    reproduction != "" &&
    technicalScieName != "" &&
    technicalConStatus != "" &&
    technicalGeoDist != "" &&
    technicalHabitatEng != "" &&
    technicalDiet != "" &&
    technicalReproduction != "" &&
    referencesArray != ""
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

    //Ficha tecnica
    const fichaTecnica = {
      "Nombre científico": fichaNombreCient,
      "Estado de conservación": fichaEstadoCon,
      "Distribución geográfica": fichaDistGeo,
      Hábitat: fichaHabitatEsp,
      Dieta: fichaDieta,
      Reproducción: fichaReproduccion,
      Referencias: referencesArreglo,
    };

    const fichaTecnica_en = {
      "Scientific name": technicalScieName,
      "Conservation status": technicalConStatus,
      "Geographical distribution": technicalGeoDist,
      Habitat: technicalHabitatEng,
      Diet: technicalDiet,
      Reproduction: technicalReproduction,
      References: referencesArray,
    };

    const request = {
      name: apodo,
      name_en: nickname,
      about: acerca,
      about_en: about,
      characteristics: caracteristicas,
      characteristics_en: characteristics,
      technicalData: fichaTecnica,
      technicalData_en: fichaTecnica_en,
      species: especie,
      species_en: species,
      youtubeID: youtubeId,
      keeper: keeper,
      isActive: status,
      priority: "etDcoSci6K",
    };

    console.log(request);
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
  formPhoto.value = "Actualizar foto";
});
